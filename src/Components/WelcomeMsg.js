import { useSelector } from 'react-redux';
import { getCurrAccOwner } from '../store/accountSlice';

export default function WelcomeMsg() {
  const owner = useSelector(getCurrAccOwner);

  return (
    <p className="welcome">
      {owner ? `Welcome back, ${owner.split(' ')[0]}` : 'Log in to get started'}
    </p>
  );
}
