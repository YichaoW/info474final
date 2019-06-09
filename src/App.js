import React from 'react';
import './App.css';
import { Intro } from './Components/Intro'
import { RuleOfThumb } from './Components/RuleOfThumb';
import {ComplexityAnalysis} from './Components/ComplexityAnalysis'
import {SortingAlgorithms} from './Components/SortingAlgorithms'

function App() {
  return (
    <div className="App">
      <div id="title-box">
      <p id="main-title">Sorting Algorithm 101</p>
      <p id="sub-title">Better than the Algorithm Class in College</p>
      <p>By Tao Long, Haoran Pu, Yichao Wang</p>
      </div>
      <Intro />
      <SortingAlgorithms/>
      <ComplexityAnalysis />
      <RuleOfThumb />
    </div>
  );
}

export default App;
