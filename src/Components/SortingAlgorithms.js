import React, { Component } from 'react';
import {SelectionSort} from './SelectionSort'
import {Insertion} from './Insertion'
import {MergeSortBasic} from './MergeSortBasic'
import {MergeSort} from './MergeSort'

export class SortingAlgorithms extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <div className="intro-container">
                <h1>Sorting Algorithms</h1>
                <h2>Selection Sort</h2>
                <p className='intro-text'>
                Selection sort is based on the fact that, every time when we remove the minimum of an unsorted array, and attach removed value one by one, then the final array is sorted. And the reason why it works is that, we first put the first smallest item at the front of the list, then put the second smallest item after the first smallest, and then the third smallest item after the second smallest list; and the processes will continue until the largest item is put in the last position. And the following pseudocode shows the basic logic to instruct computers to process selection sort:
                </p>
                <code>
                Step 1 − Set MIN to location 0 <br></br>
                Step 2 − Search the minimum element in the list <br></br>
                Step 3 − Swap with value at location MIN <br></br>
                Step 4 − Increment MIN to point to next element<br></br>
                Step 5 − Repeat until list is sorted<br></br>
                </code>
                <p className='intro-text'>
                Interestingly, although there are the removed values need to joint together, it does NOT need an extra array to save the sorted values. This means, the selection sorted is considered as an in-place sort, which means this sorting algorithm may not need other computer memory usage other than just the given place for the initial array. And the following animation shows the general process of selection sort, and why this sorting algorithm can be considered as an in-place sort.
                </p>
                <SelectionSort />


                <h2>Insertion Sort</h2>
                <p className='intro-text'>
                Insertion sort using facts that are even more obvious than the fact for selection sort. For this sorting algorithm works, there are two major requirements: <br></br>
                </p>

                <p className='intro-text'>
                1. An array with only one or zero element is considered as a sorted array. <br></br>
                2. A sorted array is still sorted when a new item is inserted at the position where its value is between its neighbors. {`(Such as 1st Neighbor < Inserted Value <2nd Neighbor)`}
                </p>

                <p className='intro-text'>
                With those two facts, we can have an iteration that, we pick the first item of the unsorted array, and then the value is inserted into the appropriate place. And once there is no more item to be picked, we can get a sorted array. And the following pseudocode shows the basic logic to instruct computers to process insertion:
                </p>

                <code>
                Step 1 − If it is the first element, it is already sorted. return 1;<br></br>
                Step 2 − Pick next element<br></br>
                Step 3 − Compare with all elements in the sorted sub-list<br></br>
                Step 4 − Shift all the elements in the sorted sub-list that is greater than the 
                        value to be sorted<br></br>
                Step 5 − Insert the value<br></br>
                Step 6 − Repeat until list is sorted<br></br>
                </code>

                <p className='intro-text'>
                Similar with selection, with appropriate array manipulations such as shifting items in the array, the insertion sort can also be done without any further computer storage and memory requirement, which is consider another common in-place sorting algorithm. And the following animation shows the general process of insertion sort, and why this sorting algorithm can be considered as an in-place sort.
                </p>
                <Insertion />



                <h2>Merge Sort</h2>
                <p className='intro-text'>
                Unlike both Insertion Sort and Selection Sort, the theory behind Merge Sort can be a little bit hard to comprehend. Basically, it also requires two facts to make it an efficient sorting algorithm:
                </p>
                <p className='intro-text'>
                1: An array with only one element is considered as a sorted array.
	2: It is super easy to merge two sorted arrays into one sorted array 

                </p>
                <p className='intro-text'>
                The first one is kind of making sense. However, the second one may need some deeper thought. Basically, you can consider this as a selection sort where the minimum is always at the front of the two arrays. This means the computer does not need to iterate through the array for finding the minimum, which makes merge two sorted arrays be an easy task. And the following animation shows why such merging process is an easy task for your computer.
                </p>
                <MergeSortBasic />

                <p className='intro-text'>
                With those two facts, the interesting though about Merge Sort is that: suppose we first break the unsorted array into smaller and smaller pieces, until the pieces only contain 1 item. Then, since merging two sorted arrays is an easy task, we then merge those separated pieces into one joint array. This means, by using both facts, we can successfully sort the pieces. And the following pseudocode shows the basic logic to break the arrays and merge them back.
                </p>
                
                <code>
                Step 1 − if it is only one element in the list it is already sorted, return.<br></br>
                Step 2 − divide the list recursively into two halves until it can no more be divided.<br></br>
                Step 3 − merge the smaller lists into new list in sorted order.<br></br>
                </code>
                <p className='intro-text'>
                However, this algorithm does have some imperfection on memory storage. For each time, the computer breaks the array into smaller pieces, it must store it in other place in order to further process the smaller ones. This means in terms of computer storage usage; this algorithm is not as efficient as insertion sort and selection sort. However, it does shine in other aspects, which will be introduced in time complexity section. And the following animation shows the general process of merge sort, and why it may need some auxiliary storage. 
                </p>
                <MergeSort />
            </div>
        )
    }
}