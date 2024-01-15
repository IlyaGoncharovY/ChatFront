import {ChangeEvent, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../store';

import {UniversalButton} from '../../common';

import {setClientName, setClientNameTC, setNewMessageTC, typeMessageTC} from './reducer/controlButtonsReducer.ts';

import s from './ControlButtons.module.css';

export const ControlButtons = () => {

  const isSetName = useAppSelector(state => state.buttons.name);

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
    dispatch(setClientName(name));
  };

  const typeUserMessageHandler = () => {
    dispatch(typeMessageTC());
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    typeUserMessageHandler();
    if (e.key === 'Enter') {
      onClickSocketHandler();

    }
  };

  return (
    <div className={s.controlButtonsContainer}>
      <div>
        <input
          type="text"
          value={name}
          onChange={onChangeInputHandler}
          placeholder={'set name...'}
          className={s.inputContainer}
        />
        <UniversalButton callBack={onClickNameHandler} title={'send name'} disabled={!name}/>
      </div>
      <div>
        <textarea
          value={message}
          onChange={onChangeTextareaHandler}
          onKeyDown={onKeyDownHandler}
          placeholder={'set message...'}
          className={s.textareaContainer}
        >
        </textarea>
        <UniversalButton callBack={onClickSocketHandler} title={'send'} disabled={!isSetName || !message}/>
      </div>
    </div>
  );
};
