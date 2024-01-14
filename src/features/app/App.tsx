import {useEffect} from 'react';

import {useAppDispatch} from '../../store';

import {ChatDisplay} from '../chatDisplay';
import {ControlButtons} from '../controlButtons';

import {createConnectionTC, destroyConnectionTC} from './reducer/appReducer.ts';

import s from './App.module.css';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(createConnectionTC());
    return () => {
      dispatch(destroyConnectionTC());
    };
  }, [dispatch]);

  return (
    <div className={s.appContainer}>
      <div className={s.chatAndButtonsContainer}>
        <ChatDisplay/>
        <ControlButtons/>
      </div>
    </div>
  );
}

export default App;
