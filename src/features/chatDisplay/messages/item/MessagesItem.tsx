import {FC} from 'react';

import {MessageType} from '../../../chat/reducer';

interface IMessagesItem{
    message: MessageType
}

export const MessagesItem:FC<IMessagesItem> = ({message}) => {
  return (
    <div>
      <b>{message.user.name}:</b> {message.message}
      <hr/>
    </div>
  );
};
