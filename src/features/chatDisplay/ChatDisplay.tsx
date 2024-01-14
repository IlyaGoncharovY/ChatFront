import {Messages} from './messages/Messages.tsx';
import {TypingUsers} from './typingUser/TypingUsers.tsx';

import s from './ChatDisplay.module.css';

export const ChatDisplay = () => {

  return (
    <div className={s.chatDisplayContainer}>
      <Messages/>
      <TypingUsers/>
    </div>
  );
};
