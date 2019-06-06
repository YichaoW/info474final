import React from 'react';
import './App.css';
import {SelectionSort} from './Components/SelectionSort'
import {Insertion} from './Components/Insertion'
import {MergeSortBasic} from './Components/MergeSortBasic'
import {MergeSort} from './Components/MergeSort'


function App() {
  return (
    <div className="App">
      <MergeSort />
      <Insertion />
      <SelectionSort />
      <MergeSortBasic />
    </div>
  );
}

export default App;
