import React from 'react';
import './App.css';
import { Intro } from './Components/Intro'
import { RuleOfThumb } from './Components/RuleOfThumb';
import {ComplexityAnalysis} from './Components/ComplexityAnalysis'
import {SortingAlgorithms} from './Components/SortingAlgorithms'
import {SortDemo} from './Components/SortDemo'

function App() {
  return (
    <div className="App">
      <Intro />
      <SortDemo />
      <SortingAlgorithms/>
      <ComplexityAnalysis />
      <RuleOfThumb />
    </div>
  );
}

export default App;
