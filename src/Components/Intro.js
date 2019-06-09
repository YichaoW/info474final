import React, { Component } from 'react';
import {SortDemo} from './SortDemo'

export class Intro extends Component {
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
                <h1>Introduction</h1>
                <p className='intro-text'>
                As we live in the tech-driven world and interact with computer software on a daily basis, 
                have you ever wondered how we can a computer show a list of students’ names in alphabetical order 
                or rank them by credits earned either ascendingly or desendingly under the hood? 
                </p>
                <p className='intro-text'>
                Here comes the magic behind various computer operations and data arrangement--sorting algorithms. 
                Since sorting is a very common operation that we want to perform on a collection of data in various real-world use cases 
                and many other advanced algorithms are based on sorting including binary search, 
                people have come up with assorted ways rearrange a given array or list elements according to a certain order.
                </p>
                <p className='intro-text'>
                Different algorithms have different logic and, therefore, different characteristics and efficiency. 
                Through the interactive explorable explanation, you are going to master various sorting algorithm mechanisms 
                and how to apply them to real world situations. 
                </p>

                <h3>Sorting Demo</h3>
                <SortDemo />

            </div>
        )
    }
}