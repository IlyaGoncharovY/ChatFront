import {TypingUsers} from './typingUser/TypingUsers.tsx';
import {Messages} from './messages/Messages.tsx';

export const ChatDisplay = () => {

  return (
    <>
      <Messages/>
      <TypingUsers/>
    </>
  );
};
