import * as React from 'react';
import logo from './logo.svg';
import './App.css';

import { useLoading } from '@swyx/hooks';

function LambdaDemo() {
  const [isLoading, load] = useLoading();
  const [msg, setMsg] = React.useState(null);
  const handleClick = (api: string) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    load(
      fetch('/.netlify/functions/' + api)
        .then(response => response.json())
        .then(json => setMsg(json.msg))
    );
  };

  return (
    <p>
      <button onClick={handleClick('hello')}>
        {isLoading ? 'Loading...' : 'Call Lambda'}
      </button>
      <button onClick={handleClick('async-chuck-norris')}>
        {isLoading ? 'Loading...' : 'Call Async Lambda'}
      </button>
      <br />
      <span>{msg}</span>
    </p>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <LambdaDemo />
      </header>
    </div>
  );
}

export default App;
