import React, { useContext } from 'react';
import { MyContext } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './style/app.css';
import Stage1 from './components/stage1';
import Stage2 from './components/stage2';

const App = () => {

  const Context = useContext(MyContext);

  return (
    <div className='wrapper'>
      <div className='center-wrapper'>

        <h1>Who pays the bill ?</h1>
        {Context.state.stage === 1 ? <Stage1 /> : <Stage2 />}

      </div>
    </div>
  )
}

export default App;