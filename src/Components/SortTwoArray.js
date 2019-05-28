import React, { Component } from 'react';
import * as d3 from "d3";


export class SortTwoArray extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstArray: [1, 2, 4, 5],
            secondArray: [2, 3, 4, 7, 8],
            actions: [],
            step: 0
        }

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
    }

    getX(x) {
        return(x + this.margin.left);
    }

    getY(y) {
        return(y + this.margin.top)
    }

    componentDidMount() {
        this.getSteps(this.firstArray, this.secondArray);
        this.svgInitialize();
    }

    componentDidUpdate() {
        this.visulizeStep();
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
            console.log(action)
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

        for (let i = 0; i < this.state.firstArray.length; i++) {
            let num = this.state.firstArray[i];
            this.visulizeBox(1, (3 + i + 1), 1, 1, num, "ID1-" + i, "gray", "white");
        }

        for (let i = 0; i < this.state.secondArray.length; i++) {
            let num = this.state.secondArray[i];
            this.visulizeBox(2, (3 + i + 1), 1, 1, num, "ID2-" + i, "gray", "white");
        }
    }

    select(id) {
        d3.select("#" + id + " > rect").transition().duration(500).attr("fill", "green")
    }

    deselect(id) {
        d3.select("#" + id + " > rect").transition().duration(500).attr("fill", "gray")
    }

    moveTo(id, place) {
        let placeList = place.split("-")
        let nRow = +this.row[placeList[0]]
        let nCol = +placeList[1] + 3

        let newX = this.gridWidth * (nCol - 1 + this.padding)
        let newY = this.gridHeight * (nRow - 1 + this.padding)

        d3.select("#" + id).transition().duration(500)
            .attr("transform", "translate(" + this.getX(newX) + ", " + this.getY(newY) + ")")
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


    getSteps() {
        let result = [];
        let newAction = ["start"]

        let i = 0;
        let j = 0;


        while(i < this.state.firstArray.length && j < this.state.secondArray.length) {

            let num1ID = "ID" + 1 + "-" + i;
            let num1 = this.state.firstArray[i];

            newAction.push("Select " + num1ID)
            newAction.push("Move " + num1ID + " compare-1")

            let num2ID = "ID" + 2 + "-" + j;
            let num2 = this.state.secondArray[j];
            newAction.push("Deselect " + num1ID)
            newAction.push("Select " + num2ID)
            newAction.push("Move " + num2ID + " compare-2")
            newAction.push("Deselect " + num2ID)

            newAction.push("Compare " + num1ID + " " + num2ID)


            if (num1 < num2) {
                result.push(num1);
                newAction.push("Select " + num1ID)
                newAction.push("Move " + num1ID + " result-" + (result.length))
                i++;
                newAction.push("Deselect " + num1ID)
                newAction.push("Select " + num2ID)
                newAction.push("Move " + num2ID + " second-1")
                newAction.push("Deselect " + num2ID)
            } else {
                result.push(num2);
                newAction.push("Select " + num2ID)
                newAction.push("Move " + num2ID + " result-" + result.length)
                j++;
                newAction.push("Deselect " + num2ID)
                newAction.push("Select " + num1ID)
                newAction.push("Move " + num1ID + " first-1")
                newAction.push("Deselect " + num1ID)
            }
        }

        while(i < this.state.firstArray.length) {
            result.push(this.state.firstArray[i])
            let num1ID = "ID" + 1 + "-" + i;
            newAction.push("Select " + num1ID)
            newAction.push("Move " + num1ID + " result-" + result.length)
            newAction.push("Deselect " + num1ID)
            i++;
        }

        while(j < this.state.secondArray.length) {
            result.push(this.state.secondArray[j])
            let num2ID = "ID" + 2 + "-" + j;
            newAction.push("Select " + num2ID)
            newAction.push("Move " + num2ID +" result-" + result.length)
            newAction.push("Deselect " + num2ID)
            j++;
        }

        this.setState({
            actions: newAction
        })
    }

    render() {
        return(
            <div>
                <button onClick={() => {
                    this.setState({
                        step: this.state.step + 1
                    })
                }} >Next</button>
            </div>
        )
    }
}