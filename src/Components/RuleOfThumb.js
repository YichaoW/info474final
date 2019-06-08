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
                As we live in the tech-driven world and interact with computer software on a daily basis, 
                have you ever wondered how we can a computer show a list of students’ names in alphabetical order 
                or rank them by credits earned either ascendingly or desendingly under the hood? 
                </p>
            </div>
        )
    }
}