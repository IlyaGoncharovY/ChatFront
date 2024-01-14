import {FC} from 'react';

import {useAppSelector} from '../../../../store';
import {MessageType} from '../../reducer/chatDisplayReducer.ts';

import s from './MessagesItem.module.css';

interface IMessagesItem{
    message: MessageType
}

export const MessagesItem:FC<IMessagesItem> = ({message}) => {

  const name = useAppSelector(state => state.buttons.name);

  const isUserMessage = message.user.name === name;

  return (
    <div className={`${s.messageContainer} ${isUserMessage ? s.userMessage : s.otherMessage}`}>
      <b>{message.user.name}:</b> {message.message}
      <hr/>
    </div>
  );
};
