import Accounts from '../Components/Accounts';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accounts: Accounts,
  currAcc: null,
  clicked: 0,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    login: {
      prepare(user, pin) {
        return {
          payload: { user, pin },
        };
      },

      reducer(state, action) {
        // payload = user , pin
        const searchedAcc = state.accounts.find(
          acc =>
            acc.userName === action.payload.user.toLowerCase() &&
            acc.pin === action.payload.pin
        );
        if (!searchedAcc) return;

        state.currAcc = searchedAcc;
      },
    },

    click(state) {
      state.clicked++;
    },

    transfer: {
      prepare(userName, amount) {
        return {
          payload: { userName, amount },
        };
      },

      reducer(state, action) {
        // payload = userName, transfer amount
        if (
          !state.accounts.some(
            acc => acc.userName === action.payload.userName
          ) ||
          state.currAcc.userName === action.payload.userName
        )
          return;

        // Target transfer
        state.accounts
          .find(acc => acc.userName === action.payload.userName)
          .movements.push(action.payload.amount);
        state.accounts
          .find(acc => acc.userName === action.payload.userName)
          .movementsDates.push(new Date().toISOString());

        // Current account
        state.accounts
          .find(acc => acc.userName === state.currAcc.userName)
          .movements.push(-action.payload.amount);
        state.accounts
          .find(acc => acc.userName === state.currAcc.userName)
          .movementsDates.push(new Date().toISOString());

        state.currAcc = state.accounts.find(
          acc => acc.userName === state.currAcc.userName
        );
      },
    },

    loan(state, action) {
      // payload = loan amount
      state.accounts
        .find(acc => acc.userName === state.currAcc.userName)
        .movements.push(action.payload);
      state.accounts
        .find(acc => acc.userName === state.currAcc.userName)
        .movementsDates.push(new Date().toISOString());

      state.currAcc = state.accounts.find(
        acc => acc.userName === state.currAcc.userName
      );
    },

    closeAccount: {
      prepare(userName, pin) {
        return {
          payload: { userName, pin },
        };
      },

      reducer(state, action) {
        // payload = username, pin

        if (
          state.currAcc.userName !== action.payload.userName ||
          state.currAcc.pin !== action.payload.pin
        )
          return;

        state.accounts.filter(acc => acc.owner !== state.currAcc.owner);
        state.currAcc = null;
      },
    },

    timeout(state) {
      state.currAcc = null;
    },
  },
});

export const { login, click, transfer, loan, closeAccount, timeout } =
  accountSlice.actions;

export default accountSlice.reducer;

export const getCurrAcc = state => state.account.currAcc;

export const getCurrAccOwner = state => state.account?.currAcc?.owner || null;

export const getCurrAccBalance = state =>
  state.account.currAcc.movements.reduce((acc, mov) => acc + mov, 0);

export const getTotalClicked = state => state.account.clicked;
