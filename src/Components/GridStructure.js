import React, { Component } from 'react';
import * as d3 from "d3";

export class GridStructure extends Component {
    constructor(props, gridWidth, gridHeight, rows, cols, padding, margin, id) {
        super(props)

        this.gridWidth = gridWidth;

        this.gridHeight = gridHeight;
        this.nRow = rows;
        this.nCol = cols;
        this.width = this.gridWidth * this.nCol;
        this.height = this.gridHeight * this.nRow;
        this.padding = padding;
        this.margin = margin
        this.id = id;
        
        this.drawLine = this.drawLine.bind(this);
        this.visulizeBox = this.visulizeBox.bind(this);
        this.drawBasicStructure = this.drawBasicStructure.bind(this);
        this.generateRandomArray = this.generateRandomArray.bind(this);

        this.getX = this.getX.bind(this);
        this.getY = this.getY.bind(this);
        this.getSVG = this.getSVG.bind(this);


        this.drawVerticalGrid = this.drawVerticalGrid.bind(this);
        this.drawHorizontalGrid = this.drawHorizontalGrid.bind(this);
        this.drawSeparator = this.drawSeparator.bind(this);
        this.drawIndicator = this.drawIndicator.bind(this);


        this.select = this.select.bind(this)
        this.deselect = this.deselect.bind(this);
        this.sorted = this.sorted.bind(this);
        this.move = this.move.bind(this);
        this.shift = this.shift.bind(this);
        this.warn = this.warn.bind(this)
    }

    drawLine(x1, y1, x2, y2, color = "gray") {
        this.svg.append("line").style("stroke", color)
                        .attr("x1", this.getX(x1)).attr("y1", this.getY(y1))
                        .attr("x2", this.getX(x2)).attr("y2", this.getY(y2))
    }

    drawBasicStructure() {
        this.drawLine(0, 0, this.width, 0)
        this.drawLine(0, this.height, this.width, this.height)
        this.drawLine(0, 0, 0, this.height)
        this.drawLine(this.width, 0, this.width, this.height)
    }

    drawHorizontalGrid() {
        for (let i = 1; i <= this.nRow - 1; i++) {
            this.drawLine(0, i * this.height / this.nRow, this.width, i * this.height / this.nRow)
        }
    }

    drawVerticalGrid() {
        for (let i = 1; i <= this.nCol - 1; i++) {
            this.drawLine(i * this.width / this.nCol, 0, i * this.width / this.nCol, this.height)
        }
    }

    drawSeparator(row, col, id) {
        let x = this.gridWidth * col;
        let y = (row - 0.5) * this.gridHeight;

        let sep = this.svg.append("g").attr("id", "separator-" + id)
                    .attr("transform", "translate(" + this.getX(x) + ", " + this.getY(y) + ")")
        
        sep.append("line").attr("x1", 0)
                          .attr("y1", 0)
                          .attr("x2", 0)
                          .attr("y2", 1.5 * this.gridHeight)
                          .style("stroke", "gray")
        
        sep.append("line").attr("x1", 0)
                          .attr("y1", 0.45 * this.gridHeight)
                          .attr("x2", 1.7 * this.gridHeight)
                          .attr("y2", 0.45 * this.gridHeight)
                          .style("stroke", "gray")


        sep.append("text").attr("fill", "gray")
                          //.style("text-anchor", "middle")
                          //.style("alignment-baseline", "central")
                          .attr("font-size", "0.9rem")
                          .attr("dy", 0.4 * this.gridHeight)
                          .attr("dx", 0.05 * this.gridWidth)
                          .text("Unsort")

        
    }

    drawIndicator(row, col, text = null, id) {
        let padding = 0.05;

        let topAdditional = 0.1

        let x = (col + padding - 1) * this.gridWidth; 
        let y = (row + padding - 1 + topAdditional) * this.gridHeight;

        let indicator = this.svg.append("g").attr("id", "indicator-" + id)
                            .attr("transform", "translate(" + this.getX(x) + ", " + this.getY(y) + ")")
        
        indicator.append("line").attr("x1", 0)
                            .attr("y1", (0.5 - padding) * this.gridHeight)
                            .attr("x2", (0.5 - padding) * this.gridWidth)
                            .attr("y2", 0)
                            .style("stroke", "gray")
        
        indicator.append("line").attr("x1", (0.5 - padding) * this.gridWidth)
                            .attr("y1", 0)
                            .attr("x2", (1 - 2 * padding) * this.gridWidth)
                            .attr("y2", (0.5 - padding) * this.gridHeight)
                            .style("stroke", "gray")
        
        if (text) {
            indicator.append("text").attr("fill", "gray")
                    .style("text-anchor", "middle")
                    .style("alignment-baseline", "central")
                    .attr("font-size", "0.7rem")
                    .attr("dy", (0.5 - padding) * this.gridHeight)
                    .attr("dx", (0.5 - padding) * this.gridWidth)
                    .text(text)
        }

    }

    select(id, callback = null, duration) {
        if (callback) {
            d3.select("#" + id + " > rect").transition().duration(duration).attr("fill", "blue").on("end", callback)
        } else {
            d3.select("#" + id + " > rect").transition().duration(duration).attr("fill", "blue")
        }
    }

    deselect(id, callback = null, duration = 500) {
        if (callback) {
            d3.select("#" + id + " > rect").transition().duration(duration).attr("fill", "gray").on("end", callback)
        } else {
            d3.select("#" + id + " > rect").transition().duration(duration).attr("fill", "gray")
        }
    }

    sorted(id, duration) {
        d3.select("#" + id + " > rect").transition().duration(duration).attr("fill", "green")
    }

    warn(id, duration) {
        d3.select("#" + id + " > rect").transition().duration(duration).attr("fill", "red")
    }

    move(id, row, col, yPadding = 0.05, xPadding = 0.05, callback = null, duration = 500) {
        let newX = this.gridWidth * (+col - 1 + xPadding)
        let newY = this.gridHeight * (+row - 1 + yPadding)

        if (callback) {
            d3.select("#" + id).transition().duration(duration)
                .attr("transform", "translate(" + this.getX(newX) + ", " + this.getY(newY) + ")")
                .on("end", callback)
        } else {
            d3.select("#" + id).transition().duration(duration)
                .attr("transform", "translate(" + this.getX(newX) + ", " + this.getY(newY) + ")")
        }        
    }

    shift(shift, callback = null, duration = 500, direction) {
        let shiftSplit = shift.split(/[ ]+/)
        let elements = shiftSplit[1]
        if (elements === "null") {
            if (callback !== null) {
                callback();
            }
        } else {
            let elementsSplit = elements.split(",")
            let firstPosition = shiftSplit[2].split("-")
            for (let i = 0; i < elementsSplit.length; i++) {
                let elementID = elementsSplit[i]
                let next = null;
                if (i === elementsSplit.length - 1) {
                    next = callback;
                }
                this.move(elementID, firstPosition[0], +firstPosition[1] + i + direction, 
                                0.05, 0.05, next, duration)
            }
        }
    } 

    visulizeBox(row, col, widthGrid, heightGrid, text, id, boxColor = "gray", textColor = "white", 
                    borderRadius = 5, xPadding = 0.05, yPadding = 0.05) {
        let width = (1 - 2 * xPadding) * this.gridWidth * widthGrid;
        let height = (1 - 2 * yPadding) * this.gridHeight * heightGrid;
        let x = (col - 1 + xPadding) * this.gridWidth;
        let y = (row - 1 + yPadding) * this.gridHeight;

        let rectGroup = this.svg.append("g")
            .attr("id", id)
            .attr("transform", "translate(" + this.getX(x) + ", " + this.getY(y) + ")")

        let textX = (0.5 - xPadding) * this.gridWidth * widthGrid;
        let textY = (0.5 - yPadding) * this.gridHeight * heightGrid; 
        let textSize = 1 + "rem";

        rectGroup.append("rect")
                .attr("rx", borderRadius).attr("ry", borderRadius)
                .attr("width", width).attr("height", height).attr("fill", boxColor)
        
        rectGroup.append("text").attr("fill", textColor)
                    .style("text-anchor", "middle")
                    .style("alignment-baseline", "central")
                    .attr("font-size", textSize)
                    .attr("dy", textY)
                    .attr("dx", textX)
                    .text(text)
    }

    getX(x) {
        return(x + this.margin.left);
    }

    getY(y) {
        return(y + this.margin.top)
    }

    getSVG() {
        let svg = d3.select("#" + this.id).append("svg")
                    .attr("width", this.width + this.margin.left + this.margin.right)
                    .attr("height", this.height + this.margin.top + this.margin.bottom);
        return(svg)
    }

    generateRandomArray(minLength, maxLength) {
        let length = Math.round(Math.random() * (maxLength - minLength) + minLength)
        let newArray = []
        for (let i = 0; i < length; i++) {
            newArray[i] = Math.floor(Math.random() * 20) - 4;
        }
        return(newArray);
    }
}