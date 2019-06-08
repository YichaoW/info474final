import React, { Component } from 'react';
import * as d3 from "d3";
import {GridStructure} from './GridStructure'

export class MergeSortBasic extends GridStructure {
    constructor(props) {
        // 1: Grid Width 30px
        // 2: Grid Height 30px
        // 3: nRow: 3
        // 4: nCol: 13
        // 5: padding: 0.05
        // 6: margin: top: 20px, bottom: 20px, left: 20px, right: 20px


        super(props, 30, 30, 3, 12, 0.05, {
            top: 20, bottom: 20, left: 20, right: 20
        }, "MergeBasic")

        this.svg = null;

        this.indicatorInitial = {
            row: 3,
            col: 10
        }

        this.separatorInitial = {
            row: 1,
            col: 1
        }

        this.initViz = this.initViz.bind(this)
        this.getActions = this.getActions.bind(this)
        this.getShiftIndex = this.getShiftIndex.bind(this)
        this.vizCompare = this.vizCompare.bind(this)
        this.vizMin = this.vizMin.bind(this)
        this.vizPush = this.vizPush.bind(this)
        this.vizSortOneArray = this.vizSortOneArray.bind(this)
        this.clearViz = this.clearViz.bind(this)

        this.arrayStartCol = 3;

        let first = [1, 2, 4, 5]
        let second = [2, 3, 4, 7, 8]

        let initActions = this.getActions(first, second)

        this.state = {
            first: first,
            second: second,
            actions: initActions,
            step: 0,
            speed: 200,
            setNewArray: false,
            animation: false
        }
    }

    componentDidMount() {
        this.svg = this.getSVG();
        this.drawBasicStructure();
        this.initViz();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.setNewArray) {
            this.clearViz();
            this.initViz();
            this.setState({
                setNewArray: false
            })
        } else {
            let inverse = this.state.step < prevState.step
            let action = this.state.actions[this.state.step];
            if (inverse) {
                action = prevState.actions[prevState.step];
            }
            let actionSplit = [];
            if (action.desc !== null) {
                actionSplit = action.desc.split(" ")
            }
            
            if (action.desc === "Compare the Minimum of Two Arrays") {
                this.vizCompare(action.how, inverse)
            } else if (actionSplit[0] === "Looks" && actionSplit[1] === "Like") {
                this.vizMin(action.how, inverse)
            } else if (actionSplit[0] === "Push") {
                this.vizPush(action.how, inverse)
            } else if (actionSplit[0] === "Just") {
                this.vizSortOneArray(action.how, inverse)
            }
         
        }
    }

    initViz() {
        this.drawHorizontalGrid();
        this.visulizeBox(1, 1, 2, 1, "1st", "First-Tag", "gray", "white")
        this.visulizeBox(2, 1, 2, 1, "2nd", "Second-Tag", "gray", "white")
        this.visulizeBox(3, 1, 2, 1, "Result", "Result-Tag", "green", "white")
        this.drawLine(57, 0, 57, 90)
        for (let i = 0; i < this.state.first.length; i++) {
            this.visulizeBox(1, i + this.arrayStartCol, 1, 1, this.state.first[i], "MergeBasic-" + 1 + i, "gray", "white")
        }

        for (let i = 0; i < this.state.second.length; i++) {
            this.visulizeBox(2, i + this.arrayStartCol, 1, 1, this.state.second[i], "MergeBasic-" + 2 + i, "gray", "white")
        }
    }

    clearViz() {
        this.svg.selectAll("g").remove();
    }

    vizCompare(how, inverse) {
        let elem1 = how[0].split(" ")
        let elem2 = how[1].split(" ")
        if (!inverse) {
            this.select(elem1[1], null, this.state.speed)
            this.select(elem2[1], null, this.state.speed)
        } else {
            this.deselect(elem1[1], null, this.state.speed)
            this.deselect(elem2[1], null, this.state.speed)
        }
    }

    vizMin(how, inverse) {
        let elem = how[0].split(" ")[1]
        if (!inverse) {
            this.sorted(elem, null, this.state.speed)
        } else {
            this.select(elem, null, this.state.speed)
        }
    }

    vizPush(how, inverse) {
        let shiftDirection = -1
        let moveDir = 3
        if (inverse) {
            shiftDirection = 0
            moveDir = 2;
            this.select(how[0].split(" ")[1], null, this.state.speed)
        } else {
            this.deselect(how[0].split(" ")[1], null, this.state.speed)
        }

        this.shift(how[2], null, this.state.speed, shiftDirection)
        let move = how[1].split(" ");
        let movePosit = move[moveDir].split("-")
        this.move(move[1], +movePosit[0], +movePosit[1], 0.05, 0.05, null, this.state.speed)
    }

    vizSortOneArray(how, inverse) {
        let shiftDirection = -1
        let moveDir = 3
        if (inverse) {
            shiftDirection = 0
            moveDir = 2;
            this.deselect(how[0].split(" ")[1], null, this.state.speed)
        } else {
            this.sorted(how[0].split(" ")[1], null, this.state.speed)
        }

        this.shift(how[2], null, this.state.speed, shiftDirection)
        let move = how[1].split(" ");
        let movePosit = move[moveDir].split("-")
        this.move(move[1], +movePosit[0], +movePosit[1], 0.05, 0.05, null, this.state.speed)
    }

    getActions(firstArray = this.state.first, secondArray = this.state.second) {
        let first = [];
        let second = [];
        let result = [];
        for (let i = 0; i < firstArray.length; i++) {
            first.push({
                num: firstArray[i],
                id: i
            })
        }

        for (let i = 0; i < secondArray.length; i++) {
            second.push({
                num: secondArray[i],
                id: i
            })
        }

        let actions = [{
            desc: "Start Sorting",
            how: []
        }]

        let num1Position = 1 + "-" + this.arrayStartCol;
        let num2Position = 2 + "-" + this.arrayStartCol;
        while (first.length > 0 && second.length > 0) {
            let newPosition = 3 + "-" + (result.length + this.arrayStartCol)
            let num1 = first[0].num;
            let num2 = second[0].num;
            let num1ID = "MergeBasic-" + 1 + first[0].id;
            let num2ID = "MergeBasic-" + 2 + second[0].id;
            actions.push({
                desc: "Compare the Minimum of Two Arrays",
                how: [
                    "Select " + num1ID, "Select " + num2ID
                ]
            })

            if (num1 <= num2) {
                actions.push({
                    desc: "Looks Like the First Array Has the Lower Value",
                    how: [
                        "Sort " + num1ID
                    ]
                })

                result.push(first.shift())

                let shiftCommand = this.getShiftIndex(first, 1)

                actions.push({
                    desc: "Push the Minimum of the First Array to the End of the Result",
                    how: [
                        "Deselect " + num2ID,
                        "Move " + num1ID + " " + num1Position + " " + newPosition,
                        shiftCommand
                    ]
                })
            } else {
                actions.push({
                    desc: "Looks Like the Second Array Has the Lower Value",
                    how: [
                        "Sort " + num2ID
                    ]
                })
                result.push(second.shift())

                let shiftCommand = this.getShiftIndex(second, 2)

                actions.push({
                    desc: "Push the Minimum of the Second Array to the End of the Result",
                    how: [
                        "Deselect " + num1ID,
                        "Move " + num2ID + " " + num2Position + " " + newPosition,
                        shiftCommand
                    ]
                })
            }
        }

        while(first.length > 0) {
            let num1ID = "MergeBasic-" + 1 + first[0].id;
            let newPosition = 3 + "-" + (result.length + this.arrayStartCol)
            result.push(first.shift())
            let shiftCommand = this.getShiftIndex(first, 1)

            actions.push({
                desc: "Just One Array: Push the Minimum to the End of the Result",
                how: [
                    "Sort " + num1ID,
                    "Move " + num1ID + " " + num1Position + " " + newPosition,
                    shiftCommand
                ]
            })
        }

        while(second.length > 0) {
            let num2ID = "MergeBasic-" + 2 + second[0].id;
            let newPosition = 3 + "-" + (result.length + this.arrayStartCol)

            result.push(second.shift())
            let shiftCommand = this.getShiftIndex(second, 2)

            actions.push({
                desc: "Just One Array: Push the Minimum to the End of the Result",
                how: [
                    "Sort " + num2ID,
                    "Move " + num2ID + " " + num2Position + " " + newPosition,
                    shiftCommand
                ]
            })
        }

        actions.push({
            desc: "Sort Finished",
            how: []
        })

        return(actions)
    }

    getShiftIndex(nums, row) {
        let shiftCommand = "Shift ";

        let result = [];

        for (let i = 0; i < nums.length; i++) {
            result.push("MergeBasic-" + row + nums[i].id)
        }

        shiftCommand += result;

        if (nums.length > 0) {
            shiftCommand += " " + row + "-" + (this.arrayStartCol + 1)
        } else {
            shiftCommand += " null"
        }
        return(shiftCommand)
    }

    
    render() {
        let actionDisplay = "Finding Algorithm"

        if (this.state.actions.length > 0) {
            let cur = Math.min(this.state.actions.length - 1, this.state.step)
            actionDisplay = this.state.actions[cur].desc;
        }

        let animationSign = "Run!"
        if (this.state.animation) {
            animationSign = "Stop"
        }
        return(
            <div id="MergeBasic">
                <div>{actionDisplay}</div>
                <div>
                    <button onClick={() => {
                        if (this.state.step > 0) {
                            this.setState({
                                step: this.state.step - 1
                            })
                        }
                    }} disabled={this.state.step === 0 || this.state.animation}>Prev</button>
                    <button onClick={() => {
                        if (this.state.step < this.state.actions.length - 1) {
                            this.setState({
                                step: this.state.step + 1
                            })
                        }
                    }} disabled={this.state.step === this.state.actions.length - 1 || this.state.animation}>Next</button>

                    <button onClick={() => {
                        let newArray1 = this.generateRandomArray(4, 5);
                        let newArray2 = this.generateRandomArray(4, 5);
                        newArray1.sort((a, b) => {
                            return(a - b)
                        })

                        newArray2.sort((a, b) => {
                            return(a - b)
                        })

                        let newAction = this.getActions(newArray1, newArray2);
                        this.setState({
                            first: newArray1,
                            second: newArray2,
                            actions: newAction,
                            step: 0,
                            setNewArray: true
                        })
                    }} disabled={this.state.animation}>New Array</button>

                    <button onClick={() => {
                        if (!this.state.animation) {
                            let animationStep = () => {
                                this.setState({
                                    animation: window.setInterval(() => {
                                        if (this.state.step < this.state.actions.length - 1) {
                                            this.setState({
                                                step: this.state.step + 1
                                            })   
                                        } else {
                                            window.clearInterval(this.state.animation);
                                            this.setState({
                                                animation: false
                                            })
                                        }
                                    }, 800)
                                })
                            }

                            if (this.state.step === this.state.actions.length - 1) {
                                this.setState({
                                    step: 0
                                }, () => {
                                    this.clearViz();
                                    this.initViz();
                                    animationStep();
                                })
                            } else {
                                animationStep();
                            }
                        } else {
                            this.setState({
                                animation: false
                            })
                            window.clearInterval(this.state.animation);
                        }
                    }}>{animationSign}</button>
                </div>
            </div>
        )
    }
}