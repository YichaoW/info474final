import React, { Component } from 'react';

export class ComplexityAnalysis extends Component {
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
                <h1>Complexity Analysis</h1>
                <p className='intro-text'>
                There are many sorting algorithms in programming world. However, there exist tradeoffs among the algorithms. In order to compare the performance of different algorithms, we should consider time complexity and space complexity. Time complexity denotes the amount of time taken by an algorithm to run based on the length of the input. Similarly, space complexity denotes the amount of space or memory taken by an algorithm to run based on the length of the input.

                </p>

                <p className='intro-text'>
                Normally, we use Big O-notation to analyze algorithms. It defines an upper bound of an algorithm. The mathematic definition of Big O-notation is shown below:
                </p>

                <h2>Insertion Sort</h2>

                <p className='intro-text'>
                The time complexity (worst case) for insertion sort is O(n^2) since it likely will go through the whole array again for every element in the array. However, the sorting can be done within the given array so that it does not require extra memory. Thus, the space complexity is O(1).
                </p>

                <h2>Selection Sort</h2>

                <p className='intro-text'>
                Similar to insertion sort, time complexity for selection sort is O(n^2) and space complexity is O(1).
                </p>

                <h2>Merge Sort</h2>

                <p className='intro-text'>
                Merge sort is a divide and conquer algorithm. Thus, its time complexity is O(nlogn) as merge sort always divides the array in two halves and take linear time to merge two halves. However, its space complexity become O(n) since it always need to store the elements somewhere else.
                </p>

                <p className='intro-text'>
                From above, we can see although the time complexity for merge sort is O(nlogn) which is faster than insertion and selection sort, it takes more space to run. 
                </p>

                <p className='intro-text'>
                In addition to time and space complexity, sometimes we also care stability of the sorting algorithms. A sorting technique is stable if it does not change the order of elements with the same value. Insertion sort and merge sort are stable while selection sort is not.
                </p>

                <p className='intro-text'>
                Therefore, we can choose the best algorithm to solve particular problem by evaluate these tradeoffs.  
                </p>
            </div>
        )
    }
}