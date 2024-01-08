import {ChangeEvent, useEffect, useState} from 'react';
import {io} from 'socket.io-client';

const socket = io('http://localhost:3009');

type UserType = {
    id: string
    name: string
}

type MessagesType = {
    message: string,
    id: string,
    user: UserType
}

function App() {

  const [messages, setMessages] = useState<MessagesType[]>([]);

  const [message, setMessage] = useState<string>('');

  const [name, setName] = useState<string>('');

  const onChangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onClickSocketHandler = () => {
    socket.emit('click-message-sent', message);
    setMessage('');
  };

  const onClickNameHandler = () => {
    socket.emit('client-name-sent', name);
  };

  useEffect(() => {
    socket.on('init-messages-published', (messages: MessagesType[]) => {
      setMessages(messages);
    });
    socket.on('new-message-sent', (message: MessagesType) => {
      setMessages(prevState => [...prevState, message]);
    });
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div>
        <div style={{
          border: '1px solid black',
          padding: '10px',
          height: '300px',
          overflow: 'scroll',
          width: '300px',
        }}>
          {messages.map((message: MessagesType) =>
            <div key={message.id}>
              <b>{message.user.name}:</b> {message.message}
              <hr/>
            </div>)}
        </div>
        <input type="text" value={name} onChange={onChangeInputHandler}/>
        <button onClick={onClickNameHandler}>send name</button>
        <textarea
          value={message}
          onChange={onChangeTextareaHandler}>
        </textarea>
        <button onClick={onClickSocketHandler}>send</button>
      </div>
    </div>
  );
}

export default App;
