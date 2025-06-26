import { useEffect, useState } from 'react';

import Movements from './Movements';
import Summary from './Summary';
import { useSelector } from 'react-redux';
import { click, getCurrAcc } from '../store/accountSlice';
import { useDispatch } from 'react-redux';

export default function DisplayMovements() {
  const [isSort, setIsSort] = useState(false);

  const currAcc = useSelector(getCurrAcc);
  const dispatch = useDispatch();

  const handleSort = function () {
    setIsSort(sort => !sort);
    dispatch(click());
  };

  useEffect(() => {
    setIsSort(false);
  }, [currAcc]);

  return (
    <>
      <Movements currAcc={currAcc} sort={isSort} />
      <Summary currAcc={currAcc} onSort={handleSort} />
    </>
  );
}
