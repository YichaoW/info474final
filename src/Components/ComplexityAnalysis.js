import React, { Component } from 'react';
import { Nav, Image, Table} from 'react-bootstrap';
import timePlot from './image/timeplot.png';
import spacePlot from './image/spaceplot.png';
import MathJax from 'react-mathjax2'

export class ComplexityAnalysis extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayTimePlot: true
        }
        this.handleChangePlot = this.handleChangePlot.bind(this)
    }
   
    handleChangePlot() {
        this.setState({displayTimePlot: !this.state.displayTimePlot})
    }

    componentDidMount() {

    }

    render() {
        let plotImage;
        if (this.state.displayTimePlot) {
            plotImage = <Image src={timePlot}></Image>
        } else {
            plotImage = <Image src={spacePlot}></Image>
        }


        return(
            <div className="intro-container">
                <h1>Complexity Analysis</h1>
                
                <p className='intro-text'>
                There are many sorting algorithms in programming world. However, there exist tradeoffs among the algorithms. In order to compare the performance of different algorithms, we should consider time complexity and space complexity. Time complexity denotes the amount of time taken by an algorithm to run based on the length of the input. Similarly, space complexity denotes the amount of space or memory taken by an algorithm to run based on the length of the input.

                </p>

                <p className='intro-text'>
                Normally, we use Big O-notation to analyze algorithms. It defines an upper bound of an algorithm. The mathematic definition of Big O-notation is shown below:
                </p>

                <div>
                    <MathJax.Context input='tex'>
                        <p>
                            <MathJax.Node inline>{'f(n)=O(g(n))'}</MathJax.Node> if there exists a positive integer <MathJax.Node inline>{'n_0'}</MathJax.Node> and a positive constant <MathJax.Node inline>{'c'} </MathJax.Node> such that <MathJax.Node inline>{'f(n)\\leq cg(n) \\forall n \\geq n_0'}</MathJax.Node>.
                        </p>
                    </MathJax.Context>
                </div>

                <h2>Selection Sort</h2>

                <MathJax.Context input='tex'>
                <p className='intro-text'>
                    The time complexity (worst case) for selection sort is <MathJax.Node inline>{'O(n^2)'}</MathJax.Node> since it likely will go through the whole array again for every element in the array. However, the sorting can be done within the given array so that it does not require extra memory. Thus, the space complexity is <MathJax.Node inline>{'O(1)'}</MathJax.Node>.
                </p>
                </MathJax.Context>

                <h2>Insertion Sort</h2>

                <MathJax.Context input='tex'>
                <p className='intro-text'>
                Similar to selection sort, time complexity for insertion sort is <MathJax.Node inline>{'O(n^2)'}</MathJax.Node> and space complexity is <MathJax.Node inline>{'O(1)'}</MathJax.Node>.
                </p>
                </MathJax.Context>

                <h2>Merge Sort</h2>

                <MathJax.Context input='tex'>
                <p className='intro-text'>
                Merge sort is a divide and conquer algorithm. Thus, its time complexity is <MathJax.Node inline>{'O(nlogn)'}</MathJax.Node> as merge sort always divides the array in two halves and take linear time to merge two halves. However, its space complexity become <MathJax.Node inline>{'O(n)'}</MathJax.Node> since it always need to store the elements somewhere else.
                </p>
                </MathJax.Context>


                <h2>Time and Space Complexity Comparison Table </h2>

                <Table responsive>
                    <thead>
                        <tr>
                        <th>Sorting Algorithm</th>
                        <th>Time Complexity (Average and Worst Case)</th>
                        <th>Space Complexity</th>
                        <th>Stablility</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                        <td>Selection Sort</td>
                        <MathJax.Context input='tex'>
                        <td><MathJax.Node inline>{'O(n^2)'}</MathJax.Node></td>
                        </MathJax.Context>

                        <MathJax.Context input='tex'>
                        <td><MathJax.Node inline>{'O(1)'}</MathJax.Node></td>
                        </MathJax.Context>
                        <td>Unstable</td>
                        </tr>

                        <tr>
                        <td>Insertion Sort</td>
                        <MathJax.Context input='tex'>
                        <td><MathJax.Node inline>{'O(n^2)'}</MathJax.Node></td>
                        </MathJax.Context>

                        <MathJax.Context input='tex'>
                        <td><MathJax.Node inline>{'O(1)'}</MathJax.Node></td>
                        </MathJax.Context>
                        <td>Stable</td>
                        </tr>
                        
                        <tr>
                        <td>MergeSort</td>
                        <MathJax.Context input='tex'>
                        <td><MathJax.Node inline>{'O(nlogn)'}</MathJax.Node></td>
                        </MathJax.Context>

                        <MathJax.Context input='tex'>
                        <td><MathJax.Node inline>{'O(n)'}</MathJax.Node></td>
                        </MathJax.Context>
                        <td>Stable</td>
                        </tr>
                    </tbody>
                </Table>
                <h2>Time and Space Complexity Plots</h2>
                <Nav variant="tabs" defaultActiveKey="time">
                <Nav.Item>
                    <Nav.Link eventKey="time" onClick={this.handleChangePlot}>Time</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="space" onClick={this.handleChangePlot}>Space</Nav.Link>
                </Nav.Item>
                </Nav>
                {plotImage}

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