import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SortTwoArray} from './Components/SortTwoArray'
import { Intro } from './Components/Intro'
import { RuleOfThumb } from './Components/RuleOfThumb';

function App() {
  return (
    <div className="App">
      <Intro />
      <SortTwoArray />
      <RuleOfThumb />
    </div>
  );
}

export default App;
