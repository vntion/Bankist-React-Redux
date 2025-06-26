import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/accountSlice';

export default function NavForm() {
  const [user, setUser] = useState('');
  const [pin, setPin] = useState('');

  const dispatch = useDispatch();

  const handleUser = function (e) {
    setUser(e.target.value.trim());
  };

  const handlePin = function (e) {
    setPin(e.target.value.trim());
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!user || !pin) return;

    dispatch(login(user, Number(pin)));
    setUser('');
    setPin('');
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="user"
        className="login__input login__input--user"
        value={user}
        onChange={handleUser}
      />
      <input
        type="password"
        placeholder="PIN"
        maxLength="4"
        className="login__input login__input--pin"
        value={pin}
        onChange={handlePin}
      />
      <button className="login__btn">&rarr;</button>
    </form>
  );
}
