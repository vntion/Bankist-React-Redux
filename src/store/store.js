import { configureStore } from '@reduxjs/toolkit';

import accountProvider from './accountSlice';

const store = configureStore({
  reducer: {
    account: accountProvider,
  },
});

export default store;
