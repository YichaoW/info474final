import React from 'react';
import './App.css';
import {SelectionSort} from './Components/SelectionSort'
import {Insertion} from './Components/Insertion'
import {MergeSortBasic} from './Components/MergeSortBasic'
import {MergeSort} from './Components/MergeSort'
import {SortDemo} from './Components/SortDemo'


function App() {
  return (
    <div className="App">
      <SortDemo />
      <MergeSort />
      <Insertion />
      <SelectionSort />
      <MergeSortBasic />
    </div>
  );
}

export default App;
