import React, { Component } from 'react';
import * as d3 from "d3";


export class SortTwoArray extends Component {
    constructor(props) {
        super(props)

        this.row = {
            "first": 1,
            "second": 2,
            "compare": 4,
            "result": 6
        }

        this.getSteps = this.getSteps.bind(this);
        this.svgInitialize = this.svgInitialize.bind(this);
        this.getX = this.getX.bind(this);
        this.getY = this.getY.bind(this);
        this.appendTag = this.appendTag.bind(this);
        this.visulizeBox = this.visulizeBox.bind(this);
        this.select = this.select.bind(this);
        this.deselect = this.deselect.bind(this);
        this.visulizeStep = this.visulizeStep.bind(this);
        this.moveTo = this.moveTo.bind(this);
        this.compare = this.compare.bind(this);
        this.generateRandomArray = this.generateRandomArray.bind(this);
        this.visulizeArray = this.visulizeArray.bind(this);
        this.clearArray = this.clearArray.bind(this);

        this.svg = null;

        this.gridWidth = 30;
        this.nCol = 13;
        this.width = this.nCol * this.gridWidth;

        this.gridHeight = 30;
        this.nRow = 6;
        this.height = this.gridHeight * this.nRow;

        this.margin = {
            top: 20, right: 20, bottom: 20, left: 20
        }

        this.padding = 0.05;

        this.arrayItem = null;
        this.initialFirstArray = [1, 2, 4, 5]
        this.initialSecondArray = [2, 3, 4, 7, 8]
        this.initialActions = this.getSteps(this.initialFirstArray, this.initialSecondArray)

        this.state = {
            firstArray: this.initialFirstArray,
            secondArray: this.initialSecondArray,
            actions: this.initialActions,
            step: 0,
            setNewArrays: false,
            animation: false,
        }

    }

    getX(x) {
        return(x + this.margin.left);
    }

    getY(y) {
        return(y + this.margin.top)
    }

    componentDidMount() {
        let actions = this.getSteps(this.state.firstArray, this.state.secondArray);

        this.setState({
            actions: actions
        })

        this.svgInitialize();
    }

    componentWillUnmount() { 
        clearInterval(this.interval); 
    }

    shouldComponentUpdate(nextProps, nextState) {
        let update1 = this.state.step + 1 === nextState.step;
        let update2 = nextState.setNewArrays;
        let update3 = nextState.animation !== this.state.animation
        let update4 = nextState.animation 

        return update1 || update2 || update3 || update4
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.step !== prevState.step && !this.state.setNewArrays) {
            this.visulizeStep();
        } 
        
        if (this.state.setNewArrays) {
            this.clearArray(1)
            this.clearArray(2)

            this.visulizeArray(1)
            this.visulizeArray(2)
        
        
            this.setState({
                setNewArrays: false
            })
        }
        
    }

    visulizeStep() {
        if (this.state.step < this.state.actions.length) {
            let action = this.state.actions[this.state.step]
            let actionList = action.split(" ")
            let actionName = actionList[0]
            let id = actionList[1];
            if (actionName === "Select") {
                this.select(id)
            } else if (actionName === "Move") {
                this.moveTo(id, actionList[2])
            } else if (actionName === "Deselect") {
                this.deselect(id)
            } else if (actionName === "Compare") {
                this.compare(id, actionList[2])
            } 
        }
    }

    svgInitialize() {
        this.svg = d3.select("body").append("svg")
                    .attr("width", this.width + this.margin.left + this.margin.right)
                    .attr("height", this.height + this.margin.top + this.margin.bottom);
        
        this.arrayItem = d3.select("svg").selectAll("g").enter();

        for (let i = 0; i <= this.nRow; i++) {
            this.svg.append("line").style("stroke", "gray")
                        .attr("x1", this.getX(0)).attr("y1", this.getY(i * this.height / this.nRow))
                        .attr("x2", this.getX(this.width)).attr("y2", this.getY(i * this.height / this.nRow))
        }

        for (let i = 3; i <= this.nCol; i++) {
            this.svg.append("line").style("stroke", "gray")
                        .attr("x1", this.getX(i * this.width / this.nCol)).attr("y1", this.getY(0))
                        .attr("x2", this.getX(i * this.width / this.nCol)).attr("y2", this.getY(this.height))
        }

        this.svg.append("line").style("stroke", "gray")
                        .attr("x1", this.getX(0)).attr("y1", this.getY(0))
                        .attr("x2", this.getX(0)).attr("y2", this.getY(this.height))
        
        this.appendTag(1, 2, "First")

        this.appendTag(2, 3, "Second")

        this.appendTag(4, 3.4, "Compare")
        this.appendTag(6, 2.4, "Result")

        this.visulizeArray(1);
        this.visulizeArray(2);
    }

    clearArray(order) {
        for (let i = 0; i < 5; i++) {
            let id = "ID" + order + "-" + i;
            d3.selectAll("#" + id).remove();
        }
    }

    visulizeArray(order) {
        let target = null;
        if (order === 1) {
            target = this.state.firstArray;
        } else if (order === 2) {
            target = this.state.secondArray;
        }
        for (let i = 0; i < target.length; i++) {
            let num = target[i];
            this.visulizeBox(order, (3 + i + 1), 1, 1, num, "ID" + order + "-" + i, "gray", "white");
        }
    }


    select(id) {
        d3.select("#" + id + " > rect").transition().duration(500).attr("fill", "blue")
    }

    deselect(id) {
        d3.select("#" + id + " > rect").transition().duration(500).attr("fill", "gray")
    }

    sorted(id) {
        d3.select("#" + id + " > rect").transition().duration(500).attr("fill", "green")
    }

    moveTo(id, place) {
        let placeList = place.split("-")
        let nRow = +this.row[placeList[0]]
        let nCol = +placeList[1] + 3

        let newX = this.gridWidth * (nCol - 1 + this.padding)
        let newY = this.gridHeight * (nRow - 1 + this.padding)

        d3.select("#" + id).transition().duration(500)
            .attr("transform", "translate(" + this.getX(newX) + ", " + this.getY(newY) + ")")
        
        if (nRow === this.row["result"]) {
            this.sorted(id);
        }
    }

    compare(id1, id2) {
        d3.select("#" + id1 + " > rect").transition().duration(500).attr("fill", "blue")
        d3.select("#" + id2 + " > rect").transition().duration(500).attr("fill", "blue")
    }


    appendTag(level, box, text) {
        let heightPadding = 0.05;        

        let width = this.gridWidth * 0.8 * box;
        let height = (1 - 2 * heightPadding) * this.gridHeight;

        let x = 0.1 * this.gridWidth;
        let y = (level - 1) * this.gridHeight + heightPadding * this.gridHeight;

        let textX = x + 0.1 * this.gridWidth;
        let textY = (level - 1) * this.gridHeight + 0.7 * this.gridHeight;
        let textSize = this.gridWidth * 0.6;

        this.svg.append("rect")
                .attr("x", this.getX(x)).attr("y", this.getY(y))
                .attr("rx", 5).attr("ry", 5)
                .attr("width", width).attr("height", height).attr("fill", "steelblue")
        this.svg.append("text")
                .attr("x", this.getX(textX))
                .attr("y", this.getY(textY))
                .attr("fill", "white")
                .attr("font-size", textSize + "px")
                .text(text);
    }

    visulizeBox(row, col, widthGrid, heightGrid, text, id, boxColor, textColor) {
        let padding = this.padding;
        let width = (1 - 2 * padding) * this.gridWidth * widthGrid;
        let height = (1 - 2 * padding) * this.gridHeight * heightGrid;
        let x = (col - 1 + padding) * this.gridWidth;
        let y = (row - 1 + padding) * this.gridHeight;

        let rectGroup = this.svg.append("g")
            .attr("id", id)
            .attr("transform", "translate(" + this.getX(x) + ", " + this.getY(y) + ")")

        let textX = (0.5 - padding) * this.gridWidth;
        let textY = (0.5 - padding) * this.gridHeight 
        let textSize = 1 + "rem";

        rectGroup.append("rect")
                .attr("rx", 5).attr("ry", 5)
                .attr("width", width).attr("height", height).attr("fill", boxColor)
        
        rectGroup.append("text").attr("fill", textColor)
                    .style("text-anchor", "middle")
                    .style("alignment-baseline", "central")
                    .attr("font-size", textSize)
                    .attr("dy", textY)
                    .attr("dx", textX)
                    .text(text)
    }

    generateRandomArray() {
        let length = Math.floor(Math.random() * 2 + 3)
        let newArray = []
        for (let i = 0; i < length; i++) {
            newArray[i] = Math.floor(Math.random() * 20)
        }
        return(newArray.sort((a, b) => {return a - b}));
    }


    getSteps(array1, array2) {
        let result = [];
        let newAction = ["start"]

        let i = 0;
        let j = 0;


        while(i < array1.length && j < array2.length) {

            let num1ID = "ID" + 1 + "-" + i;
            let num1 = array1[i];

            newAction.push("Select " + num1ID)
            newAction.push("Move " + num1ID + " compare-1")

            let num2ID = "ID" + 2 + "-" + j;
            let num2 = array2[j];
            newAction.push("Deselect " + num1ID)
            newAction.push("Select " + num2ID)
            newAction.push("Move " + num2ID + " compare-2")
            newAction.push("Deselect " + num2ID)

            newAction.push("Compare " + num1ID + " " + num2ID)


            if (num1 < num2) {
                result.push(num1);
                newAction.push("Deselect " + num2ID)
                newAction.push("Move " + num1ID + " result-" + (result.length))
                i++;
                newAction.push("Select " + num2ID)
                newAction.push("Move " + num2ID + " second-1")
                newAction.push("Deselect " + num2ID)
            } else {
                result.push(num2);
                newAction.push("Deselect " + num1ID)
                newAction.push("Move " + num2ID + " result-" + result.length)
                j++;
                newAction.push("Select " + num1ID)
                newAction.push("Move " + num1ID + " first-1")
                newAction.push("Deselect " + num1ID)
            }
        }

        while(i < array1.length) {
            result.push(array1[i])
            let num1ID = "ID" + 1 + "-" + i;
            newAction.push("Select " + num1ID)
            newAction.push("Move " + num1ID + " result-" + result.length)
            i++;
        }

        while(j < array2.length) {
            result.push(array2[j])
            let num2ID = "ID" + 2 + "-" + j;
            newAction.push("Select " + num2ID)
            newAction.push("Move " + num2ID +" result-" + result.length)
            j++;
        }

        return(newAction)
    }

    render() {
        let display = "Action: ";
        let action = this.state.actions[this.state.step]
        if (action) {
            display += action
        } else {
            display += "Sort Finished"
        }

        let animationSign = "Animation"
        if (this.state.animation) {
            animationSign = "Stop"
        }

        return(
            <div>
                <div>{display}</div>
                <button onClick={() => {
                    this.setState({
                        step: this.state.step + 1
                    })
                }} >Next</button>

                <button onClick={() => {
                    let array1 = this.generateRandomArray()
                    let array2 = this.generateRandomArray()
                    let newActions = this.getSteps(array1, array2)
                    this.setState({
                        setNewArrays: true,
                        firstArray: array1,
                        secondArray: array2,
                        actions: newActions,
                        step:0
                    })
                }} >New Arrays</button>

                <button onClick={() => {

                    if (!this.state.animation) {
                        this.setState({
                            animation: window.setInterval(() => {
                                this.setState({
                                    step: this.state.step + 1
                                })    
                            }, 700)
                        })
                    } else {
                        window.clearInterval(this.state.animation);
                        this.setState({
                            animation: null
                        })
                    }
                    
                }}>{animationSign}</button>
            </div>
        )
    }
}