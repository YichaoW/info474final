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
                <MathJax.Context input='tex'>
                    <p className='intro-text'>
                        Normally, we use Big O-notation to analyze algorithms. This concept determines which is the dominant term of a function. In order words, it asks which term in the function grows the fastest when n is huge.
                        For example, if a function <MathJax.Node inline>{'f(n)=0.00001n^2+2n+100'}</MathJax.Node>, even the coefficent of <MathJax.Node inline>{'n^2'}</MathJax.Node> is small, it still grows the
                        fastest when n goes to infinity, which means <MathJax.Node inline>{'O(f(n))=n^2'}</MathJax.Node>
                        <br></br>
                        <br></br>
                        If you are interested in the rigorious definition, here it is:
                    </p>
                </MathJax.Context>

                <div>
                    <MathJax.Context input='tex'>
                        <p>
                            There is a positive number <MathJax.Node inline>{'n_0'}</MathJax.Node> and positive constant <MathJax.Node inline>{'c'}</MathJax.Node> such that, 
                            for all positive number <MathJax.Node inline>{'n\\ge n_0'}</MathJax.Node> if there exists a positive 
                            integer <MathJax.Node inline>{'n_0'}</MathJax.Node> and a positive constant <MathJax.Node inline>{'c'} </MathJax.Node> 
                            such that, if for all positive integer <MathJax.Node inline>{'n'}</MathJax.Node> that is greater than <MathJax.Node inline>{'n_0'}</MathJax.Node>, then 
                            <MathJax.Node inline>{'f(n)\\leq cg(n)'}</MathJax.Node>, we then say <MathJax.Node inline>{'O(f(n))=g(n)'}</MathJax.Node>.
                        </p>
                    </MathJax.Context>
                </div>

                <h2>Selection Sort</h2>

                <MathJax.Context input='tex'>
                <p className='intro-text'>
                    For each time to pick the minimum of the unsorted list, it is most likely to go through all of the items in the unsorted list. If you calculate arithemetic sum, the dominant term is <MathJax.Node inline>{'n^2'}</MathJax.Node>,
                    which means, in general, the runtime complexity for selection sort is <MathJax.Node inline>{'O(n^2)'}</MathJax.Node> 
                    <br></br>
                    <br></br>
                    And as for space complexity, the sorting can be done within the given array so that it does not require extra memory (see the animation). Thus, the space complexity is <MathJax.Node inline>{'O(1)'}</MathJax.Node>.
                </p>
                </MathJax.Context>

                <h2>Insertion Sort</h2>

                <MathJax.Context input='tex'>
                <p className='intro-text'>
                    Similar to selection sort, for each iteration of the insertion, an item is likely to search for the entire sorted list. This means the sum of the operation is similar wi
                    th the sum in selection sort, which makes it has the time complexity <MathJax.Node inline>{'O(n^2)'}</MathJax.Node>.
                    <br></br>
                    <br></br>
                    Similarily, as demonstrated by the animation, insertion sort does not need extra space, which means it has space complexity is <MathJax.Node inline>{'O(1)'}</MathJax.Node>.
                </p>
                </MathJax.Context>

                <h2>Merge Sort</h2>

                <MathJax.Context input='tex'>
                <p className='intro-text'>
                    The time complexity of the merge sort is quite hard to analyze since it involves recursion. However, if you want to do the quick estimation, there are some tricks: 
                    for an array whose length is n, merge sort need to take <MathJax.Node inline>{'log_2(n)'}</MathJax.Node> levels, and for <MathJax.Node inline>{'i^{th}'}</MathJax.Node> level, 
                    the length of array for processing is <MathJax.Node inline input = 'tex'>{'\\frac{n}{2^i}'}</MathJax.Node>. Since merging two arrays need to iterate both arrays, if you take the sum,
                    the dominant term for merge sort is <MathJax.Node inline>{'O(nlogn)'}</MathJax.Node>.
                    <br></br>
                    <br></br>
                    
                    For each level, it will create a new array, pass it to the next level, and then destroy the array in the current level. 
                    This means, as each level goes through, the is at most 1 new created array, which means ts space is just <MathJax.Node inline>{'O(n)'}</MathJax.Node>
                </p>
                </MathJax.Context>


                <h2>Time and Space Complexity Comparison Table </h2>

                <Table responsive>
                    <thead>
                        <tr>
                        <th>Sorting Algorithm</th>
                        <th>General Time Complexity</th>
                        <th>General Space Complexity</th>
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
                        </tr>

                        <tr>
                        <td>Insertion Sort</td>
                        <MathJax.Context input='tex'>
                        <td><MathJax.Node inline>{'O(n^2)'}</MathJax.Node></td>
                        </MathJax.Context>

                        <MathJax.Context input='tex'>
                        <td><MathJax.Node inline>{'O(1)'}</MathJax.Node></td>
                        </MathJax.Context>
                        </tr>
                        
                        <tr>
                        <td>MergeSort</td>
                        <MathJax.Context input='tex'>
                        <td><MathJax.Node inline>{'O(nlogn)'}</MathJax.Node></td>
                        </MathJax.Context>

                        <MathJax.Context input='tex'>
                        <td><MathJax.Node inline>{'O(n)'}</MathJax.Node></td>
                        </MathJax.Context>
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