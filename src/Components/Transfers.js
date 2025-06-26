import { useState } from 'react';
import '../index.css';
import { useDispatch } from 'react-redux';
import { click, transfer } from '../store/accountSlice';

export default function Transfers() {
  const [userName, setUserName] = useState('');
  const [amount, setAmount] = useState('');

  const dispatch = useDispatch();

  const handleUserName = function (e) {
    setUserName(e.target.value.trim());
  };

  const handleAmount = function (e) {
    setAmount(Number(e.target.value.trim()));
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!userName || !amount || amount <= 0) return;

    dispatch(click());
    dispatch(transfer(userName, Number(amount)));
    setUserName('');
    setAmount('');
  };

  return (
    <div className="operation operation--transfer">
      <h2>Transfer money</h2>
      <form className="form form--transfer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form__input form__input--to"
          value={userName}
          onChange={handleUserName}
        />
        <input
          type="number"
          className="form__input form__input--amount"
          value={amount}
          onChange={handleAmount}
        />
        <button className="form__btn form__btn--transfer">&rarr;</button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
}
