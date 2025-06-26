import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../index.css';
import { click, getCurrAcc, loan } from '../store/accountSlice';

export default function Loan() {
  const [loanAmount, setLoanAmount] = useState('');

  const currAcc = useSelector(getCurrAcc);
  const dispatch = useDispatch();

  const handleLoanAmount = function (e) {
    setLoanAmount(Number(e.target.value.trim()));
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!loanAmount) return;

    if (
      loanAmount > 0 &&
      currAcc.movements.some(mov => mov >= loanAmount * 0.1)
    ) {
      setTimeout(function () {
        dispatch(loan(loanAmount));
      }, 2000);
      setLoanAmount('');
    }
    dispatch(click());
  };

  return (
    <div className="operation operation--loan">
      <h2>Request loan</h2>
      <form className="form form--loan" onSubmit={handleSubmit}>
        <input
          type="number"
          className="form__input form__input--loan-amount"
          value={loanAmount}
          onChange={handleLoanAmount}
        />
        <button className="form__btn form__btn--loan">&rarr;</button>
        <label className="form__label form__label--loan">Amount</label>
      </form>
    </div>
  );
}
