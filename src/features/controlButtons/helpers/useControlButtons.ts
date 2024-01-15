import {ChangeEvent, useCallback, useState} from 'react';

import {useAppDispatch} from '../../../store';
import {setClientName, setClientNameTC, setNewMessageTC, typeMessageTC} from '../reducer/controlButtonsReducer.ts';

export const useControlButtons = () => {

  const [message, setMessage] = useState<string>('');
  const [name, setName] = useState<string>('');

  const dispatch = useAppDispatch();

  const onChangeTextareaHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.currentTarget.value);
    },
    [],
  );

  const onChangeInputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.currentTarget.value);
    },
    [],
  );

  const onClickSocketHandler = useCallback(() => {
    dispatch(setNewMessageTC(message));
    setMessage('');
  }, [dispatch, message]);

  const onClickNameHandler = useCallback(() => {
    dispatch(setClientNameTC(name));
    dispatch(setClientName(name));
  }, [dispatch, name]);

  const typeUserMessageHandler = useCallback(() => {
    dispatch(typeMessageTC());
  }, [dispatch]);

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      typeUserMessageHandler();
      if (e.key === 'Enter') {
        onClickSocketHandler();
      }
    },
    [onClickSocketHandler, typeUserMessageHandler],
  );

  return {
    name,
    message,
    onChangeTextareaHandler,
    onChangeInputHandler,
    onClickNameHandler,
    onKeyDownHandler,
    onClickSocketHandler,
  };
};
