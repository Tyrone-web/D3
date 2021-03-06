import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Demo from './components/demo/Demo';
import ScatterChart from './components/demo/ScatterChart';
import LineChart from './components/demo/LineChart';
import BarChart from './components/demo/BarChart';
import reportWebVitals from './reportWebVitals';
import Scroll from './components/demo/scroll';

ReactDOM.render(
  <React.StrictMode>
    <div>
      {/* <BarChart /> */}
      {/*<Demo /> */}
      {/* <ScatterChart /> */}
      <LineChart />
      {/* <Scroll /> */}
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
