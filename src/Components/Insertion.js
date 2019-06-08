import React, { Component } from 'react';
import * as d3 from "d3";
import {GridStructure} from './GridStructure'

export class Insertion extends GridStructure {
    constructor(props) {
        super(props, 30, 30, 3.5, 10, 0.05, {
            top: 20, bottom: 20, left: 20, right: 20
        }, "insertion")

        this.svg = null;

        this.getInitialPosition = this.getInitialPosition.bind(this);
        this.getAction = this.getAction.bind(this);
        this.visFirst = this.visFirst.bind(this)
        this.vizBeginInsertion = this.vizBeginInsertion.bind(this)
        this.vizFirstCompare = this.vizFirstCompare.bind(this)
        this.vizFoundPlace = this.vizFoundPlace.bind(this)
        this.vizInsert = this.vizInsert.bind(this)
        this.vizWarn = this.vizWarn.bind(this)
        this.vizNextInsertion = this.vizNextInsertion.bind(this)
        this.vizCompareNearestTow = this.vizCompareNearestTow.bind(this)

        this.visFirstInverse = this.visFirstInverse.bind(this)
        this.vizBeginInsertionInverse = this.vizBeginInsertionInverse.bind(this)
        this.vizFirstCompareInverse = this.vizFirstCompareInverse.bind(this)
        this.vizFoundPlaceInverse = this.vizFoundPlaceInverse.bind(this)
        this.vizInsertInverse = this.vizInsertInverse.bind(this)
        this.vizWarnInverse = this.vizWarnInverse.bind(this)
        this.vizNextInsertionInverse = this.vizNextInsertionInverse.bind(this)
        this.vizCompareNearestTowInverse = this.vizCompareNearestTowInverse.bind(this)

        this.separatorInitial = {
            row: 1,
            col: 1
        }

        this.indicatorInitial = {
            row: 3,
            col: 10
        }

        let initArray = [3, 2, 6, 2, 9, 8, 4]

        let actions = this.getAction(initArray)

        this.state = {
            array: initArray,
            actions: actions,
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
        this.setState({
            actions: this.getAction(this.state.array)
        })
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.setNewArray) {
            this.clearViz();
            this.initViz();
            this.setState({
                setNewArray: false
            })
        } else {
            if (prevState.step < this.state.step) {
                let instruction = this.state.actions[this.state.step]
                if (instruction.desc === "Move First Item into Sorted Array") {
                    this.visFirst(instruction.how)
                } else if (instruction.desc === "Begin Insertion") {
                    this.vizBeginInsertion(instruction.how)
                } else if (instruction.desc === "Compare with the First") {
                    this.vizFirstCompare(instruction.how)
                } else if (instruction.desc === "Yeah! We Found the Place") {
                    this.vizFoundPlace(instruction.how)
                } else if (instruction.desc === "Inserting") {
                    this.vizInsert(instruction.how)
                } else if (instruction.desc === "Seems Like This is Not the Place") {
                    this.vizWarn(instruction.how)
                } else if (instruction.desc === "Go to the Next Insertion Point") {
                    this.vizNextInsertion(instruction.how)
                } else if (instruction.desc === "Compare with the Nearest Two") {
                    this.vizCompareNearestTow(instruction.how)
                }
            } else if (prevState.step > this.state.step) {
                let prevInstruction = prevState.actions[prevState.step]
                if (prevInstruction.desc === "Move First Item into Sorted Array") {
                    this.visFirstInverse(prevInstruction.how)
                } else if (prevInstruction.desc === "Begin Insertion") {
                    this.vizBeginInsertionInverse(prevInstruction.how)
                } else if (prevInstruction.desc === "Compare with the First") {
                    this.vizFirstCompareInverse(prevInstruction.how)
                } else if (prevInstruction.desc === "Yeah! We Found the Place") {
                    this.vizFoundPlaceInverse(prevInstruction.how)
                } else if (prevInstruction.desc === "Inserting") {
                    this.vizInsertInverse(prevInstruction.how)
                } else if (prevInstruction.desc === "Seems Like This is Not the Place") {
                    this.vizWarnInverse(prevInstruction.how)
                } else if (prevInstruction.desc === "Go to the Next Insertion Point") {
                    this.vizNextInsertionInverse(prevInstruction.how)
                } else if (prevInstruction.desc === "Compare with the Nearest Two") {
                    this.vizCompareNearestTowInverse(prevInstruction.how)
                }
            }
        } 
    }

    visFirst(how) {
        let sepMove = how[0].split(" ")
        let sepTo = sepMove[3].split("-")
        this.move(sepMove[1], +sepTo[0], +sepTo[1], 0.5, 1, () => {
            let sortAct = how[1].split(" ")
            this.sorted(sortAct[1], this.state.speed)
        }, this.state.speed)
    }

    visFirstInverse(how) {
        let sepMove = how[0].split(" ")
        let sepFrom = sepMove[2].split("-")
        this.move(sepMove[1], +sepFrom[0], +sepFrom[1], 0.5, 1, () => {
            let deselectAct = how[1].split(" ")
            this.deselect(deselectAct[1], null, this.state.speed)
        }, this.state.speed)
    }

    vizBeginInsertion(how) {
        let indicatorAct = how[0].split(" ")
        let indicatorTo = indicatorAct[3].split("-")
        this.move(indicatorAct[1], indicatorTo[0], indicatorTo[1], 0.15, 0.05, null, this.state.speed)

        let moveAct = how[1].split(" ")
        let moveTo = moveAct[3].split("-")
        this.move(moveAct[1], moveTo[0], moveTo[1], 0.05, 0.05, null, this.state.speed)
    }

    vizBeginInsertionInverse(how) {
        let indicatorAct = how[0].split(" ")
        let indicatorFrom = indicatorAct[2].split("-")
        this.move(indicatorAct[1], indicatorFrom[0], indicatorFrom[1], 
                    0.15, 0.05, null, this.state.speed)

        let moveAct = how[1].split(" ")
        let moveFrom = moveAct[2].split("-")
        this.move(moveAct[1], moveFrom[0], moveFrom[1], 0.05, 0.05, null, this.state.speed)
    }

    vizFirstCompare(how) {
        let select1 = how[0].split(" ")
        let select2 = how[1].split(" ")

        this.select(select1[1], null, this.state.speed)
        this.select(select2[1], null, this.state.speed)
    }

    vizFirstCompareInverse(how) {
        let select1 = how[0].split(" ")
        let select2 = how[1].split(" ")

        this.sorted(select1[1], null, this.state.speed)
        this.deselect(select2[1], null, this.state.speed)
    }

    vizCompareNearestTow(how) {
        for (let i = 0; i < how.length; i++) {
            this.select(how[i].split(" ")[1], null, this.state.speed)
        }
    }

    vizCompareNearestTowInverse(how) {
        this.sorted(how[0].split(" ")[1], null, this.state.speed)
        this.sorted(how[1].split(" ")[1], null, this.state.speed)
        this.deselect(how[2].split(" ")[1], null, this.state.speed)
    }

    vizFoundPlace(how) {
        let sort = how[0].split(" ")
        this.sorted(sort[1], null, this.state.speed)
    }

    vizFoundPlaceInverse(how) {
        let select = how[0].split(" ")
        this.select(select[1], null, this.state.speed)
    }

    vizInsert(how) {
        let sepIndex = 0;
        let moveIndex = 1;
        let indicatorIndex = 2;

        if (how.length > 3) {
            let shift = how[0]
            this.shift(shift, null, this.state.speed, 1)  
            sepIndex++;
            moveIndex++;
            indicatorIndex++;
            let sortAct = how[4].split(" ")
            this.sorted(sortAct[1], null, this.state.speed)
            if (how.length === 6) {
                let sortAct2 = how[5].split(" ")
                this.sorted(sortAct2[1], null, this.state.speed)
            }
        }

        let sepMove = how[sepIndex].split(" ")
        let sepTo = sepMove[3].split("-")
        this.move(sepMove[1], +sepTo[0], +sepTo[1], 0.5, 1, () => {

            let itemMove = how[moveIndex].split(" ")
            let itemTo = itemMove[3].split("-")
            this.move(itemMove[1], itemTo[0], itemTo[1], 0.05, 0.05, () => {
            }, this.state.speed)
            
            let indicatorMove = how[indicatorIndex].split(" ")
            let indicatorTo = indicatorMove[3].split("-")
            this.move(indicatorMove[1], indicatorTo[0], indicatorTo[1], 0.15, 0.05, null, this.state.speed)
        }, this.state.speed)
    }

    vizInsertInverse(how) {
        let sepIndex = 0;
        let moveIndex = 1;
        let indicatorIndex = 2;

        if (how.length > 3) {
            let shift = how[0]
            this.shift(shift, null, this.state.speed, 0)  
            sepIndex++;
            moveIndex++;
            indicatorIndex++;
            let selectAct = how[4].split(" ")
            this.select(selectAct[1], null, this.state.speed)
            if (how.length === 6) {
                let selectAct2 = how[5].split(" ")
                this.select(selectAct2[1], null, this.state.speed)
            }
        }

        let sepMove = how[sepIndex].split(" ")
        let sepFrom = sepMove[2].split("-")
        this.move(sepMove[1], +sepFrom[0], +sepFrom[1], 0.5, 1, () => {

            let itemMove = how[moveIndex].split(" ")
            let itemFrom = itemMove[2].split("-")
            this.move(itemMove[1], itemFrom[0], itemFrom[1], 0.05, 0.05, () => {
            }, this.state.speed)
            
            let indicatorMove = how[indicatorIndex].split(" ")
            let indicatorFrom = indicatorMove[2].split("-")
            this.move(indicatorMove[1], indicatorFrom[0], indicatorFrom[1], 0.15, 0.05, null, this.state.speed)
        }, this.state.speed)
    }

    vizWarn(how) {
        let warn = how[0].split(" ")
        this.warn(warn[1], this.state.speed)
    }

    vizWarnInverse(how) {
        let select = how[0].split(" ")
        this.select(select[1], null, this.state.speed)
    }

    vizNextInsertion(how) {
        let itemMove = how[0].split(" ")
        let itemTo = itemMove[3].split("-")
        this.move(itemMove[1], itemTo[0], itemTo[1], 0.05, 0.05, null, this.state.speed)

        let indicatorMove = how[1].split(" ")
        let indicatorTo = indicatorMove[3].split("-")
        this.move(indicatorMove[1], indicatorTo[0], indicatorTo[1], 0.15, 0.05, null, this.state.speed)
        this.sorted(how[2].split(" ")[1], null, this.state.speed)
        
        this.deselect(itemMove[1], null, this.speed)
        if (how.length > 4) {
            this.sorted(how[4].split(" ")[1], null, this.state.speed)
        }
    }

    vizNextInsertionInverse(how) {
        let itemMove = how[0].split(" ")
        let itemFrom = itemMove[2].split("-")
        this.move(itemMove[1], itemFrom[0], itemFrom[1], 0.05, 0.05, null, this.state.speed)

        let indicatorMove = how[1].split(" ")
        let indicatorFrom = indicatorMove[2].split("-")
        this.move(indicatorMove[1], indicatorFrom[0], indicatorFrom[1], 0.15, 0.05, null, this.state.speed)
        
        this.select(how[2].split(" ")[1], null, this.state.speed)
        
        this.warn(itemMove[1], null, this.speed)
        if (how.length > 4) {
            this.select(how[4].split(" ")[1], null, this.state.speed)
        }
    }

    clearViz() {
        this.svg.selectAll("g").remove();
    }

    initViz() {
        let positionMap = this.getInitialPosition();

        for (let i = 0; i < this.state.array.length; i++) {
            let position = positionMap[i]
            let num = this.state.array[i]
            let id = "insertion-" + i
            this.visulizeBox(position.row, position.col, 1, 1, num, id)
        }

        this.drawSeparator(this.separatorInitial.row, this.separatorInitial.col, "insertion");
        this.drawIndicator(this.indicatorInitial.row, this.indicatorInitial.col, null, "insertion");
    }

    getAction(array = this.state.array) {
        let actions = [{
            desc: "Start Sorting",
            how: []
        }]

        let unsorted = [...array];
        let sorted = [];


        let positions = this.getInitialPosition(array);
        let sepPosition = JSON.parse(JSON.stringify(this.separatorInitial));
        let indicatorPosition = JSON.parse(JSON.stringify(this.indicatorInitial));

        let initSep = sepPosition.row + "-" + sepPosition.col

        sepPosition.col++;

        let newSep = sepPosition.row + "-" + sepPosition.col
        let firstElementCol = positions[0].col

        actions.push({
            desc: "Move First Item into Sorted Array",
            how: [
                "Move separator-insertion " + initSep + " " + newSep,
                "Sort insertion-0" 
            ]
        })

        sorted.push({
            num: unsorted.shift(),
            index: 0
        });

        let size = unsorted.length
        for (let i = 0; i < size; i++) {
            let num = unsorted.shift();
            let numID = i + 1;
            let elementPosition = positions[numID]
            let elementID = "insertion-" + (numID);

            let elementRow = elementPosition.row;
            let elementCol = elementPosition.col;

            indicatorPosition.row = 3;
            indicatorPosition.col = (firstElementCol - 0.5);
            actions.push({
                desc: "Begin Insertion",
                how: [
                    "Move indicator-insertion " + this.indicatorInitial.row + "-" + this.indicatorInitial.col + " "
                                                + 3 + "-" + (firstElementCol - 0.5),
                    "Move " + elementID + " " + elementRow + "-" + elementCol + " " +  3.5 + "-" + (firstElementCol - 0.5)
                ]
            })

            positions[numID].col = (firstElementCol - 0.5)
            positions[numID].row = 3.5


            let j = 0;
            let hasSorted = false;
            while(j < sorted.length && !hasSorted) {
                let action1 = {};
                let action2 = {};
                let action3 = {};

                let sortedIndex = sorted[j].index;
                let sortPosition = positions[sortedIndex]
                let sortedNum = sorted[j].num;

                if (j === 0) {
                    action1.desc = "Compare with the First"
                    action1.how = [
                        "Select insertion-" + sortedIndex,
                        "Select insertion-" + numID
                    ]
                } else {
                    action1.desc = "Compare with the Nearest Two"
                    action1.how = [
                        "Select insertion-" + sortedIndex,
                        "Select insertion-" + sorted[j - 1].index,
                        "Select insertion-" + numID
                    ]   
                }

                if (num < sortedNum) {
                    hasSorted = true;
                    action2.desc = "Yeah! We Found the Place"
                    action2.how = ["Sort insertion-" + numID]
                    action3.desc = "Inserting"
                    sepPosition.col++;


                    let shiftElements = sorted.slice(j, sorted.length);
                    
                    for (let k = 0; k < shiftElements.length; k++) {
                        shiftElements[k] = "insertion-" + shiftElements[k].index
                    }
                    
                    let elementCurPosition = positions[numID].row + "-" + positions[numID].col

                    action3.how = [
                        "Shift " + shiftElements + " " + sortPosition.row + "-" + sortPosition.col,
                        "Move separator-insertion " + sepPosition.row + "-" + (sepPosition.col - 1) + " " 
                                                    + sepPosition.row + "-" + sepPosition.col,
                        "Move " + elementID + " " + elementCurPosition + 
                                              " " + sortPosition.row + "-" + sortPosition.col,
                        "Move indicator-insertion " + (indicatorPosition.row) + "-" + (indicatorPosition.col)
                                                        + " " + this.indicatorInitial.row + "-" + this.indicatorInitial.col,
                        "Sort insertion-" + sortedIndex
                    ]

                    if (j > 0) {
                        action3.how.push("Sort insertion-" + sorted[j - 1].index)
                    }

                    indicatorPosition.col = this.indicatorInitial.col
                    indicatorPosition.row = this.indicatorInitial.row

                    positions[numID].row = sortPosition.row
                    positions[numID].col = sortPosition.col

                    for (let k = j; k < sorted.length; k++) {
                        positions[sorted[k].index].col++;
                    }

                    sorted.push({
                        num: num,
                        index: numID
                    })

                    sorted.sort((a, b) => { 
                        return a.num - b.num;
                    })
                } else {
                    action2.desc = "Seems Like This is Not the Place"
                    action2.how = ["Warn insertion-" + numID]

                    action3.desc = "Go to the Next Insertion Point"

                    let numPosition = positions[numID]
                    let numPositionFrom = numPosition.row + "-" + numPosition.col
                    numPosition.col++;

                    let newPositionTo = numPosition.row + "-" + numPosition.col

                    let indicatorFrom = indicatorPosition.row + "-" + indicatorPosition.col
                    indicatorPosition.col++;
                    let indicatorTo = indicatorPosition.row + "-" + indicatorPosition.col

                    action3.how = [
                        "Move " + elementID + " " + numPositionFrom + " " + newPositionTo,
                        "Move indicator-insertion " + indicatorFrom + " " + indicatorTo,
                        "Sort insertion-" + sortedIndex,
                        "Deselect " + elementID
                    ]

                    if (j > 0) {
                        action3.how.push("Sort insertion-" + sorted[j - 1].index)
                    }
                }
                actions.push(action1)
                actions.push(action2)
                actions.push(action3)
                j++
            }
            
            if (!hasSorted) {
                actions.push({
                    desc: "Yeah! We Found the Place",
                    
                    how: [
                        "Sort " + elementID
                    ]
                })

                actions.push({
                    desc: "Inserting",
                    how: [
                        "Move separator-insertion " + sepPosition.row + "-" + sepPosition.col + " " 
                                                    + sepPosition.row + "-" + (sepPosition.col + 1),
                        "Move " + elementID + " " + positions[numID].row + "-" + positions[numID].col 
                                            + " " + (sepPosition.row + 1) + "-" + (sepPosition.col + 1),
                        "Move indicator-insertion " + (indicatorPosition.row) + "-" + (indicatorPosition.col)  + " " 
                                            + this.indicatorInitial.row + "-" + this.indicatorInitial.col
                        
                    ]
                })
                positions[numID].row = (sepPosition.row + 1)
                positions[numID].col = (sepPosition.col + 1)
                sepPosition.col++;
                indicatorPosition.row = this.indicatorInitial.row
                indicatorPosition.col = this.indicatorInitial.col

                sorted.push({
                    num: num,
                    index: numID
                })
                sorted.sort((a, b) => {
                    return a.num < b.num;
                })
            }
        }
        actions.push({
            desc: "Insert Sort Finished",
            how: []
        })
        return(actions)
    }

    getInitialPosition(array = this.state.array) {
        let positionMap = {}
        for (let i = 0; i < array.length; i++) {
            positionMap[i] = {
                row: 2,
                col: i + 2
            }
        } 
        return(positionMap)
    }

    render() {

        let run = "Run!"
        if (this.state.animation) {
            run = "Stop!"
        }
        return(
            <div id="insertion">
                <div>{this.state.actions[this.state.step].desc}</div>
                <button onClick = {() => {
                    this.setState({
                        step: this.state.step + 1
                    })
                }}>Next</button>
                
                <button onClick={() => {
                    if (this.state.step > 0) {
                        this.setState({
                            step: this.state.step - 1
                        })
                    }
                }}>Prev</button>

                <button onClick={() => {
                    let newArray = this.generateRandomArray(5, 8);
                    let newAction = this.getAction(newArray);
                    this.setState({
                         array: newArray,
                         actions: newAction,
                         step: 0,
                         setNewArray: true
                    })
                }}>New Array</button>

                <button onClick={() => {
                    if (!this.state.animation) {
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
                            }, 1200)
                        })
                    } else {
                        window.clearInterval(this.state.animation);
                        this.setState({
                            animation: false
                        })
                    }
                }}>{run}</button>
            </div>
        )
    }
}