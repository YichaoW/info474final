import React from 'react';
import {GridStructure} from './GridStructure'
import {Button, ButtonGroup} from 'react-bootstrap';


export class MergeSort extends GridStructure {
    constructor(props) {
        // 1: Grid Width 30px
        // 2: Grid Height 30px
        // 3: nRow: 4
        // 4: nCol: 15
        // 5: padding: 0.05
        // 6: margin: top: 20px, bottom: 20px, left: 20px, right: 20px


        super(props, 30, 30, 4, 15, 0.05, {
            top: 20, bottom: 20, left: 20, right: 20
        }, "MergeSort")

        this.drawMergeGrid = this.drawMergeGrid.bind(this);
        this.initViz = this.initViz.bind(this)
        this.clearViz = this.clearViz.bind(this)
        this.getInitialPosition = this.getInitialPosition.bind(this)
        this.getAction = this.getAction.bind(this)
        this.getActionHandler = this.getActionHandler.bind(this)
        this.visSplit = this.visSplit.bind(this)
        this.vizSort = this.vizSort.bind(this)
        this.vizMerge = this.vizMerge.bind(this)
        this.vizPush = this.vizPush.bind(this)

        let initArray = [3, 2, 6, 2, 9, 8, 4, -3]
        this.arrayStartCol = 1;

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
        this.drawHorizontalGrid();
        //this.drawMergeGrid();
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
            
            if (action.desc === "Split Array into Smaller Pieces") {
                this.visSplit(action.how, inverse)
            } else if (action.desc === "Array with Single Item is Sorted") {
                this.vizSort(action.how, inverse)
            } else if (action.desc === "Merge Two Sorted Array") {
                this.vizMerge(action.how, inverse)
            } else if (action.desc === "Push the Minimum to Next Level") {
                this.vizPush(action.how, inverse)
            }
         
        }
    }

    initViz() {
        for (let i = 0; i < this.state.array.length; i++) {
            this.visulizeBox(1, i + this.arrayStartCol, 1, 1, this.state.array[i], "MergeSort-" + i, "gray", "white")
        }

        let xPadding = 0.40
        this.visulizeBox(2, 8, 1, 1, "", "Barriar-1", "#525252", "white", 0, xPadding, 0)
        this.visulizeBox(3, 8, 1, 1, "", "Barriar-2", "#525252", "white", 0, xPadding, 0)
        this.visulizeBox(3, 4, 1, 1, "", "Barriar-3", "#525252", "white", 0, xPadding, 0)
        this.visulizeBox(3, 12, 1, 1, "", "Barriar-4", "#525252", "white", 0, xPadding, 0)
        for (let i = 1; i <= 7; i++) {
            this.visulizeBox(4, 2 * i, 1, 1, "", "Barriar-" + (4 + i), "#525252", "white", 0, xPadding, 0)
        }

    }

    clearViz() {
        this.svg.selectAll("g").remove();
    }

    visSplit(how, inverse) {
        let shift = how[0].split(" ")
        let shiftCommand = shift[0] + " " + shift[1] + " " + shift[2]
        let shiftLength = +shift[3]
        let moveDir = 3;
        if (inverse) {
            shiftLength = 0;
            moveDir = 2
        }
        if (!inverse) {
            this.shift(shiftCommand, () => {
                for (let i = 1; i < how.length; i++) {
                    let move = how[i].split(" ")
                    let moveTarget = move[moveDir].split("-")
                    this.move(move[1], moveTarget[0], moveTarget[1], 0.05, 0.05, null, this.state.speed)
                }
            }, this.state.speed, shiftLength)
        } else {

            let callBack = null;
            for (let i = 1; i < how.length; i++) {
                let move = how[i].split(" ")
                let moveTarget = move[moveDir].split("-")
                if (i === how.length - 1) {
                    callBack = () => {
                        this.shift(shiftCommand, null, this.state.speed, shiftLength)
                    }
                }
                this.move(move[1], moveTarget[0], moveTarget[1], 0.05, 0.05, callBack, this.state.speed)
            }
        }
    }

    vizSort(how, inverse) {
        if (inverse) {
            this.deselect(how[0].split(" ")[1], null, this.state.speed)
        } else {
            this.sorted(how[0].split(" ")[1], null, this.state.speed)
        }
    }

    vizMerge(how, inverse) {
        for (let i = 0; i < how.length; i++) {
            if (inverse) {
                this.sorted(how[i].split(" ")[1], null, this.state.speed)
            } else {
                this.select(how[i].split(" ")[1], null, this.state.speed)
            }
        } 
    }

    vizPush(how, inverse) {
        let moveDir = 3;
        if (inverse) {
            moveDir = 2;
            this.select(how[0].split(" ")[1], null, this.state.speed)
        } else {
            this.sorted(how[0].split(" ")[1], null, this.state.speed)
        }
        let move = how[1].split(" ")
        let moveTarget = move[moveDir].split("-")
        this.move(move[1], moveTarget[0], moveTarget[1], 0.05, 0.05, null, this.state.speed)
    }

    drawMergeGrid() {
        for (let i = 1; i <= 14; i++) {
            this.drawLine(i * 30, 90, i * 30, 120)
        }
        this.drawLine(210, 30, 210, 60)
        this.drawLine(240, 30, 240, 60)

        for (let i = 1; i <= 3; i++) {
            this.drawLine(120 * i, 60, 120 * i, 90)
            this.drawLine(120 * i - 30, 60, 120 * i - 30, 90)
        }
        
    }

    getInitialPosition(array = this.state.array) {
        let positionMap = {}
        for (let i = 0; i < array.length; i++) {
            positionMap[i] = {
                row: 1,
                col: i + this.arrayStartCol
            }
        } 
        return(positionMap)
    }

    getAction(array) {
        let actions = [{
            desc: "Start Sort",
            how: []
        }]

        let newArray = []
        for (let i = 0; i < array.length; i++) {
            newArray.push({
                num: array[i],
                id: i
            })
        }
        let position = this.getInitialPosition(array);
        this.getActionHandler(newArray, position, 1, actions);

        actions.push({
            desc: "Sort Finish",
            how: []
        })
        return(actions)
    }

    getActionHandler(array, position, level, actions) {
        if (array.length === 1) {
            let id = "MergeSort-" + array[0].id
            actions.push({
                desc: "Array with Single Item is Sorted",
                how: ["Sort " + id]
            })
        } else {
            let shiftLength = Math.ceil(array.length / 2)
            let shiftStartIndex = Math.floor(array.length / 2)
            let shiftInitPosition = position[array[shiftStartIndex].id]
            let initCoordinate = shiftInitPosition.row + "-" + shiftInitPosition.col
            let shiftCommand = "Shift "
            let shift = []
            for (let i = shiftStartIndex; i < array.length; i++) {
                let id = array[i].id
                shift.push("MergeSort-" + id)
                position[id].col += shiftLength
            }
            shiftCommand += shift + " " + initCoordinate + " " + shiftLength

            let action = {};
            action.desc = "Split Array into Smaller Pieces"
            action.how = [shiftCommand]

            for (let i = 0; i < array.length; i++) {
                let id = array[i].id
                let initPosition = position[id].row + "-" + position[id].col;
                position[id].row++;
                let newPosition = position[id].row + "-" + position[id].col;
                action.how.push("Move MergeSort-" + id + " " + initPosition + " " + newPosition)
            }

            actions.push(action)
            let copyArray1 = [...array]
            let copyArray2 = copyArray1.splice(shiftStartIndex)

            let copyArray3 = [...array]
            this.getActionHandler(copyArray1, position, level + 1, actions);
            this.getActionHandler(copyArray2, position, level + 1, actions)

            let sortNewAction = {};
            sortNewAction.desc = "Merge Two Sorted Array"
            sortNewAction.how = [];
            for (let i = 0; i < copyArray3.length; i++) {
                sortNewAction.how.push("Select MergeSort-" + array[i].id)
            }
            actions.push(sortNewAction);
            let copyArray4 = copyArray3.splice(shiftStartIndex)
            copyArray3.sort((a, b) => {
                return a.num - b.num
            })

            copyArray4.sort((a, b) => {
                return a.num - b.num
            })

            let initPosition = position[copyArray3[0].id]
            let initRow = initPosition.row - 1;
            let initCol = initPosition.col;

            let i = 0;
            let j = 0;
            let result = [];
            while (i < copyArray3.length && j < copyArray4.length) {
                let num1 = copyArray3[i].num
                let num2 = copyArray4[j].num
                let pushAction = {
                    desc: "Push the Minimum to Next Level"
                }
                
                let numID = copyArray3[i].id
                if (num2 < num1) {
                    numID = copyArray4[j].id
                    j++;
                } else {
                    i++;
                }
                let originalPosit = position[numID].row + "-" + (position[numID].col);
                let newPosit = initRow + "-" + (initCol + result.length)
                position[numID].row = initRow;
                position[numID].col = initCol+ result.length;
                result.push(numID)
                pushAction.how = [
                    "Sort MergeSort-" + numID,
                    "Move MergeSort-" + numID + " " + originalPosit + " " + newPosit
                ]
                actions.push(pushAction)
            }

            
            while (i < copyArray3.length)  {
                let pushAction = {
                    desc: "Push the Minimum to Next Level"
                }
                
                let numID = copyArray3[i].id
                i++;
                
                let originalPosit = position[numID].row + "-" + position[numID].col
                let newPosit = initRow + "-" + (initCol + result.length)
                position[numID].row = initRow;
                position[numID].col = initCol + result.length;
                result.push(numID)
                pushAction.how = [
                    "Sort MergeSort-" + numID,
                    "Move MergeSort-" + numID + " " + originalPosit + " " + newPosit
                ]
                actions.push(pushAction)
            }

            while (j < copyArray4.length) {
                let pushAction = {
                    desc: "Push the Minimum to Next Level"
                }
                
                let numID = copyArray4[j].id
                j++;
                let originalPosit = position[numID].row + "-" + position[numID].col
                let newPosit = initRow + "-" + (initCol + result.length)
                position[numID].row = initRow;
                position[numID].col = initCol + result.length;
                result.push(numID)
                pushAction.how = [
                    "Sort MergeSort-" + numID,
                    "Move MergeSort-" + numID + " " + originalPosit + " " + newPosit
                ]
                actions.push(pushAction)
            }
        }
    }


    render() {
        let actionDisplay = "Finding Algorithm"

        if (this.state.actions.length > 0) {
            let cur = Math.min(this.state.actions.length - 1, this.state.step)
            actionDisplay = this.state.actions[cur].desc;
        }

        let animationSign = "Play"
        if (this.state.animation) {
            animationSign = "Pause"
        }

        return(
            <div id="MergeSort" className="animationBox">
                <div>{actionDisplay}</div>
                <div>
                    <ButtonGroup>
                    <Button variant="secondary" onClick={() => {
                        if (this.state.step > 0) {
                            this.setState({
                                step: this.state.step - 1
                            })
                        }
                    }} disabled={this.state.step === 0 || this.state.animation}>Prev</Button>
                    <Button variant="secondary" onClick={() => {
                        if (this.state.step < this.state.actions.length - 1) {
                            this.setState({
                                step: this.state.step + 1
                            })
                        }
                    }} disabled={this.state.step === this.state.actions.length - 1 || this.state.animation}>Next</Button>

                    <Button variant="secondary" onClick={() => {
                        let newArray = this.generateRandomArray(8, 8);

                        let newAction = this.getAction(newArray);
                        this.setState({
                            array: newArray,
                            actions: newAction,
                            step: 0,
                            setNewArray: true
                        })
                    }} disabled={this.state.animation}>Generate New Array</Button>

                    <Button variant="secondary" onClick={() => {
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
                                }, 700)})}
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
                            window.clearInterval(this.state.animation);
                            this.setState({
                                animation: false
                            })
                        }
                    }}>{animationSign}</Button>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}