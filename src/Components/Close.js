import { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../index.css';
import { closeAccount } from '../store/accountSlice';

export default function Close() {
  const [user, setUser] = useState('');
  const [pin, setPin] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!user || !pin) return;

    dispatch(closeAccount(user, Number(pin)));
    setUser('');
    setPin('');
  };

  return (
    <div className="operation operation--close">
      <h2>Close account</h2>
      <form className="form form--close" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form__input form__input--user"
          value={user}
          onChange={e => setUser(e.target.value.trim())}
        />
        <input
          type="password"
          maxLength="4"
          className="form__input form__input--pin"
          value={pin}
          onChange={e => setPin(e.target.value.trim())}
        />
        <button className="form__btn form__btn--close">&rarr;</button>
        <label className="form__label">Confirm user</label>
        <label className="form__label">Confirm PIN</label>
      </form>
    </div>
  );
}
