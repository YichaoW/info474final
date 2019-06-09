import React, { Component } from 'react';

export class RuleOfThumb extends Component {
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
                <h1>Rule of Thumb</h1>
                <p className='intro-text'>
                    In real life, not all cases are general cases. Somtimes those analysis may not work under some special cases. One example can be,
                     suppose the lists in your application are almost sorted, meaning there is a fix number of items that are not sorted. In this case, 
                      since the number of insertion is fixed and not dependent on the length of the array, insertion sort actually performs better since its runtime 
                      is just O(n) once the number of insertion is fixed. With those in mind, if you just want to have the algorithm with the best trade-off, considering 
                      the properties of your lists in the app can sometimes give you good advices.
                </p>

                <p className='intro-text'>Another thing you may consider is the property of sorting algorithm: stability. Stability means, 
                 suppose two items have the same value, if the sorted list still keeps the relative order as if they are in the unsorted list. This property has lots of 
                 important applications such as sort an array with multiple categories. If you are building applications which need those features, keeping in mind 
                 about stability can help you filter some sorting algorithms that are not suitable.</p>

                <p className='intro-text'>
                 Last but not the least, try to use the trial and error technique: there are far more three sorting algorithms mentioned in this explorable explaination:
                 quick sort, heap sort, rainbow sort, random sort... There are just so many sorting algorithms invented by computer scientists. This means, if you still not sure
                  which sort algorithm is good for your application based in previous suggestions, just try everything. And eventually, one of them will give you the best result.</p>
            </div>
        )
    }
}