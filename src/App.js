import React from 'react';
import './App.css';
import {SortTwoArray} from './Components/SortTwoArray'
import { Intro } from './Components/Intro'
import { RuleOfThumb } from './Components/RuleOfThumb';
import {SelectionSort} from './Components/SelectionSort'
import {Insertion} from './Components/Insertion'
import {MergeSortBasic} from './Components/MergeSortBasic'
import {MergeSort} from './Components/MergeSort'
import {ComplexityAnalysis} from './Components/ComplexityAnalysis'


function App() {
  return (
    <div className="App">
      <Intro />
      <SortTwoArray />
      <MergeSort />
      <Insertion />
      <SelectionSort />
      <MergeSortBasic />
      <ComplexityAnalysis />
      <RuleOfThumb />
    </div>
  );
}

export default App;
