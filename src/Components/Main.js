import { useSelector } from 'react-redux';
import { getCurrAcc } from '../store/accountSlice';
import Balance from './Balance';
import Close from './Close';
import DisplayMovements from './DisplayMovements';
import Loan from './Loan';
import LogoutTimer from './LogoutTimer';
import Transfers from './Transfers';

export default function Main() {
  const currAcc = useSelector(getCurrAcc);

  return (
    <main className="app" style={currAcc && { opacity: 1 }}>
      {currAcc && (
        <>
          <Balance />
          <DisplayMovements />
          <Transfers />
          <Loan />
          <Close />
          <LogoutTimer />
        </>
      )}
    </main>
  );
}
