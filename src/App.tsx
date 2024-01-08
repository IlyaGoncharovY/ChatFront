import {useEffect, useState} from 'react';
import {io} from 'socket.io-client';

function App() {

  const [messages, setMessages] = useState([
    {message: 'hello Vasya', id: 'e1q1q1q', user: {id: '22w2w2ww', name: 'Ilya'}},
    {message: 'hello Ilya', id: '1a1a1a', user: {id: '2s2s2s', name: 'Vasya'}},
  ]);

  useEffect(() => {
    const socket = io('http://localhost:3009');
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
    }}>
      <div>
        <div style={{
          border: '1px solid black',
          padding: '10px',
          height: '300px',
          overflow: 'scroll',
          width: '300px',
        }}>
          {messages.map((message) =>
            <div key={message.id}>
              <b>{message.user.name}:</b> {message.message}
              <hr/>
            </div>)}
        </div>
        <textarea></textarea>
        <button>send</button>
      </div>
    </div>
  );
}

export default App;
