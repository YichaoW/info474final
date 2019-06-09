import React from 'react';
import {GridStructure} from './GridStructure'

export class SortDemo extends GridStructure {
    constructor(props) {
        super(props, 30, 30, 3, 9, 0.05, {
            top: 20, bottom: 20, left: 20, right: 20
        }, "SortDemo")

        this.input = [3, 2, 6, 2, 9, 8, 4]
        this.svg = null;
        this.initViz = this.initViz.bind(this)

        this.initCol = 3

        this.default = "unsort"

        this.state = {
            order: this.default
        }
    }

    componentDidMount() {
        this.svg = this.getSVG();
        let x = 120;
        let y = 30;
        this.drawBasicStructure();
        this.drawHorizontalGrid();
        this.drawLine(x + 3, y + 15, x + 15, y + 27)
        this.drawLine(x + 27, y + 15, x + 15, y + 27)
        this.drawLine(x + 12, y + 3, x + 12, y + 24)
        this.drawLine(x + 18, y + 3, x + 18, y + 24)
        this.initViz();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.order !== this.state.order) {
            let nums = []
            for (let i = 0; i < this.input.length; i++) {
                nums.push({
                    num: this.input[i],
                    id: i
                })
            }
            if (this.state.order === "unsort") {
                for (let i = 0; i < this.input.length; i++) {
                    let id = "Output-" + i;
                    this.move(id, 3, this.initCol + i, 0.05, 0.05, null, 300)
                    this.deselect(id, null, 300)
                }
            } else {
                nums.sort((a, b) => {
                    let num1 = a.num;
                    let num2 = b.num
                    if (this.state.order === "aesc") {
                        return(num1 - num2)
                    } else {
                        return(num2 - num1)
                    }
                })

                for (let i = 0; i < nums.length; i++) {
                    let id = "Output-" + nums[i].id;
                    this.move(id, 3, this.initCol + i, 0.05, 0.05, null, 300)
                    this.sorted(id, null, 300)
                }
            }
        }
    }

    initViz() {
        this.visulizeBox(1, 1, 2, 1, "Input", "Input-Tag", "#007bff", "white")
        this.visulizeBox(3, 1, 2, 1, "Output", "Output-Tag", "#007bff", "white")
        for (let i = 0; i < this.input.length; i++) {
            this.visulizeBox(1, i + this.initCol, 1, 1, this.input[i], "Input-" + i, "gray", "white")
            this.visulizeBox(3, i + this.initCol, 1, 1, this.input[i], "Output-" + i, "gray", "white")
        }

    }

    render() {
        return(
            <div id="SortDemo" className="animationBox">
                <select onChange = {(e) => {
                    this.setState({
                        order: e.target.value
                    })
                }} value={this.state.order} selected={this.default}>
                    <option value="unsort">Unsort</option>
                    <option value="aesc">Sort by Ascending</option>
                    <option value="desc">Sort by Descending</option>
                </select>
            </div>
        )
    }
}