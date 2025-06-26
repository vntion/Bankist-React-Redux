import { useSelector } from 'react-redux';
import '../index.css';

import { formatCur } from './Helpers';
import { getCurrAcc, getCurrAccBalance } from '../store/accountSlice';

export default function Balance() {
  const currAcc = useSelector(getCurrAcc);
  const balance = useSelector(getCurrAccBalance);

  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const date = new Intl.DateTimeFormat(currAcc.locale, options).format(now);

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">{date}</span>
        </p>
      </div>
      <p className="balance__value">
        {formatCur(balance, currAcc.currency, currAcc.locale)}
      </p>
    </div>
  );
}
