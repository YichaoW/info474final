import React from 'react';
import './App.css';
import { Intro } from './Components/Intro'
import { RuleOfThumb } from './Components/RuleOfThumb';
import {ComplexityAnalysis} from './Components/ComplexityAnalysis'
import {SortingAlgorithms} from './Components/SortingAlgorithms'

function App() {
  return (
    <div className="App">
      <p id="main-title">Sorting Algorithm 101</p>
      <Intro />
      <SortingAlgorithms/>
      <ComplexityAnalysis />
      <RuleOfThumb />
    </div>
  );
}

export default App;
