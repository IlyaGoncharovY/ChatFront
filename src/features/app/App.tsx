import {useEffect} from 'react';

import {useAppDispatch} from '../../store';

import {ChatDisplay} from '../chatDisplay';
import {ControlButtons} from '../controlButtons';

import {createConnectionTC, destroyConnectionTC} from './reducer/appReducer.ts';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(createConnectionTC());
    return () => {
      dispatch(destroyConnectionTC());
    };
  }, [dispatch]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div>
        <ChatDisplay/>
        <ControlButtons/>
      </div>
    </div>
  );
}

export default App;
