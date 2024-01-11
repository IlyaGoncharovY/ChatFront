import {ChangeEvent, useState} from 'react';

import {setClientNameTC, setNewMessageTC, typeMessageTC} from './reducer/controlButtonsReducer.ts';
import {useAppDispatch} from '../../store';

export const ControlButtons = () => {

  const [message, setMessage] = useState<string>('');
  const [name, setName] = useState<string>('');

  const dispatch = useAppDispatch();

  const onChangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onClickSocketHandler = () => {
    dispatch(setNewMessageTC(message));
    setMessage('');
  };

  const onClickNameHandler = () => {
    dispatch(setClientNameTC(name));
  };

  const typeUserMessageHandler = () => {
    dispatch(typeMessageTC());
  };


  return (
    <div>
      <div>
        <input type="text" value={name} onChange={onChangeInputHandler}/>
        <button onClick={onClickNameHandler}>send name</button>
      </div>
      <div>
        <textarea
          value={message}
          onChange={onChangeTextareaHandler}
          onKeyDown={typeUserMessageHandler}
        >
        </textarea>
        <button onClick={onClickSocketHandler}>send</button>
      </div>
    </div>
  );
};
