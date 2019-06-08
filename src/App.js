import React from 'react';
import './App.css';
import {SortTwoArray} from './Components/SortTwoArray'
import { Intro } from './Components/Intro'
import { RuleOfThumb } from './Components/RuleOfThumb';
import {SelectionSort} from './Components/SelectionSort'
import {Insertion} from './Components/Insertion'
import {MergeSortBasic} from './Components/MergeSortBasic'
import {MergeSort} from './Components/MergeSort'


function App() {
  return (
    <div className="App">
      <Intro />
      <SortTwoArray />
      <RuleOfThumb />
      <MergeSort />
      <Insertion />
      <SelectionSort />
      <MergeSortBasic />
    </div>
  );
}

export default App;
