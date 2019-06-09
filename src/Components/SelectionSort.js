import React from 'react';
import {GridStructure} from './GridStructure'
import {Button, ButtonGroup} from 'react-bootstrap';


export class SelectionSort extends GridStructure {
    constructor(props) {
        // 1: Grid Width 30px
        // 2: Grid Height 30px
        // 3: nRow: 3
        // 4: nCol: 10
        // 5: padding: 0.05
        // 6: margin: top: 20px, bottom: 20px, left: 20px, right: 20px


        super(props, 30, 30, 3, 10, 0.05, {
            top: 20, bottom: 20, left: 20, right: 20
        }, "selection")

        this.svg = null;

        this.indicatorInitial = {
            row: 3,
            col: 10
        }

        this.separatorInitial = {
            row: 1,
            col: 1
        }

        this.getInitialPosition = this.getInitialPosition.bind(this);
        this.getAction = this.getAction.bind(this);
        this.visulizeFind = this.visulizeFind.bind(this);
        this.visulizeMove = this.visulizeMove.bind(this);
        this.visulizeFindInverse = this.visulizeFindInverse.bind(this);
        this.visulizeMoveInverse = this.visulizeMoveInverse.bind(this);
        this.initViz = this.initViz.bind(this)
        this.clearViz = this.clearViz.bind(this)

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

    componentDidMount() {
        this.svg = this.getSVG();
        this.drawBasicStructure();
        this.initViz();
        this.setState({
            actions: this.getAction()
        })
    }

    clearViz() {
        this.svg.selectAll("g").remove();
    }

    initViz() {
        let positionMap = this.getInitialPosition();

        for (let i = 0; i < this.state.array.length; i++) {
            let position = positionMap[i]
            let num = this.state.array[i]
            let id = "selection-" + i
            this.visulizeBox(position.row, position.col, 1, 1, num, id)
        }

        this.drawSeparator(this.separatorInitial.row, this.separatorInitial.col, "selection");
        this.drawIndicator(this.indicatorInitial.row, this.indicatorInitial.col, "min", "selection");
    }

    shouldComponentUpdate(nextProps, nextState) {
        let update1 = this.state.step !== nextState.step;
        let update2 = nextState.setNewArray;
        let update3 = nextState.animation !== this.state.animation
        let update4 = nextState.animation 
        let update5 = nextState.step >= 0 && nextState.step < nextState.actions.length;

        return (update1 || update2 || update3 || update4) && update5
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.setNewArray) {
            this.clearViz();
            this.initViz();
            this.setState({
                setNewArray: false
            })
        } else {
            if (this.state.step > prevState.step) {
                let action = this.state.actions[this.state.step];
                if (action.desc === "Find the Lowest #") {
                    this.visulizeFind(action.how)
                } else if (action.desc === "Move the Lowest # to the End of Sorted Array") {
                    this.visulizeMove(action.how)
                }
            } else if (this.state.step < prevState.step) {
                let action = this.state.actions[prevState.step];
                if (action.desc === "Find the Lowest #") {
                    this.visulizeFindInverse(action.how);
                } else if (action.desc === "Move the Lowest # to the End of Sorted Array") {
                    this.visulizeMoveInverse(action.how)
                }
            }   
        }
    }

    visulizeFind(how) {
        let moveAction = how[0].split(" ")        

        let id = moveAction[1]
        let to = moveAction[3].split("-")

        this.move(id, to[0], to[1], 0.15, 0.05, () => {
            let selectAction = how[1]
            this.select(selectAction.split(" ")[1], null, this.state.speed)
        }, this.state.speed)
    }

    visulizeFindInverse(how) {
        let selectAction = how[1]
        this.deselect(selectAction.split(" ")[1], () => {
            let moveAction = how[0].split(" ")
            let from = moveAction[2].split("-")
            let indicatorID = moveAction[1];
            this.move(indicatorID, from[0], from[1], 0.15, 0.05, null, this.state.speed)
        },this.state.speed)
    }

    visulizeMove(how) {
        let indicatorMoveAction = how[0].split(" ");
        let indicatorID = indicatorMoveAction[1];
        let indicatorTo = indicatorMoveAction[3].split("-")
        this.move(indicatorID, indicatorTo[0], indicatorTo[1], 0.15, 0.05, () => {
            let elementStage1 = how[1].split(" ")
            let elementID = elementStage1[1]
            let elementMove1 = elementStage1[3].split("-")
            this.move(elementID, elementMove1[0], elementMove1[1], 0.05, 0.05, () => {
                this.shift(how[2], () => {
                    let separatorAction = how[3].split(" ")
                    let sepID = separatorAction[1]
                    let newSepPosition = separatorAction[3].split("-")
                    this.move(sepID, newSepPosition[0], newSepPosition[1], 0.5, 1, () => {
                        let elementStage2 = how[4].split(" ")
                        let elementMove2 = elementStage2[3].split("-")
                        this.move(elementID, elementMove2[0], elementMove2[1], 0.05, 0.05, () => {
                            let elementStage3 = how[5].split(" ")
                            let elementMove3 = elementStage3[3].split("-")
                            this.move(elementID, elementMove3[0], elementMove3[1], 0.05, 0.05, () => {
                                this.sorted(elementID, this.state.speed)
                            }, this.state.speed)
                        }, this.state.speed)
                    }, this.state.speed)
                }, this.state.speed, 1)
            }, this.state.speed)
        }, this.state.speed)
    }



    visulizeMoveInverse(how) {
        let elementStage3 = how[5].split(" ")
        let elementID = elementStage3[1]
        this.select(elementID, () => {
            let elementFrom3 = elementStage3[2].split("-")
            this.move(elementID, elementFrom3[0], elementFrom3[1], 0.05, 0.05, () => {
                let elementStage2 = how[4].split(" ")
                let elementFrom2 = elementStage2[2].split("-")
                this.move(elementID, elementFrom2[0], elementFrom2[1], 0.05, 0.05, () => {
                    let separatorAction = how[3].split(" ")
                    let sepID = separatorAction[1]
                    let newSepPosition = separatorAction[2].split("-") 
                    this.move(sepID, newSepPosition[0], newSepPosition[1], 0.5, 1, () => {
                        this.shift(how[2], () => {
                            let elementStage1 = how[1].split(" ")
                            let elementFrom1 = elementStage1[2].split("-")
                            this.move(elementID, elementFrom1[0], elementFrom1[1], 0.05, 0.05, () => {
                                let indicatorMoveAction = how[0].split(" ");
                                let indicatorID = indicatorMoveAction[1];
                                let indicatorFrom = indicatorMoveAction[2].split("-") 
                                this.move(indicatorID, indicatorFrom[0], indicatorFrom[1], 0.15, 0.05, null, this.state.speed)
                            }, this.state.speed)
                        }, this.state.speed, 0)
                    }, this.state.speed)
                }, this.state.speed)
            }, this.state.speed)
        }, this.state.speed)
    }

    getAction(array = this.state.array) {
        let actions = [{
            desc: "Start Sorting",
            how: []
        }];
        let arrayMap = [];
        let positions = this.getInitialPosition(array);
        let indexes = [];
        let indicatorRow = this.indicatorInitial.row;

        let sepPosition = JSON.parse(JSON.stringify(this.separatorInitial));

        for (let i = 0; i < array.length; i++) {
            indexes.push(i);
            arrayMap.push({
                number: array[i],
                index: i
            })
        }

        arrayMap = arrayMap.sort((a, b) => {
            return a.number - b.number;
        })
        
        for (let i = 0; i < arrayMap.length; i++) {
            let index = arrayMap[i].index;
            let elementPosition = positions[index]

            let indicatorFrom = indicatorRow + "-" + this.indicatorInitial.col;
            let indicatorTo = indicatorRow + "-" + elementPosition.col;

            let elementID = "selection-" + index
            let elementInitial = elementPosition.row + "-" + elementPosition.col;

            let findMin = {
                desc: "Find the Lowest #",
                how: ["Move indicator-selection " + indicatorFrom + " " + indicatorTo, 
                        "Select " + elementID]
            }

            indexes[index] = null;

            let shift = [];

            let shiftPosition = null

            for (let i = 0; i < index; i++) {
                if (indexes[i] !== null) {
                    let index = indexes[i];
                    if (shift.length === 0) {
                        shiftPosition = positions[index].row + "-" + positions[index].col
                    }
                    positions[index].col++;
                    shift.push("selection-" + index);
                }
            }


            let sepCur = sepPosition.row + "-" + sepPosition.col;
            sepPosition.col++;

            let elementStage1 = (elementPosition.row + 1) + "-" + elementPosition.col;
            let elementNewCol = sepPosition.col;
            let elementStage2 = (elementPosition.row + 1) + "-" + elementNewCol;
            let elementStage3 = elementPosition.row + "-" + elementNewCol;

            let sepNext = sepPosition.row + "-" + sepPosition.col;

            let move = {
                desc: "Move the Lowest # to the End of Sorted Array",
                how:["Move indicator-selection " + indicatorTo + " " + indicatorFrom,
                     "Move " + elementID + " " + elementInitial + " " + elementStage1,
                     "Shift " + shift + " " + shiftPosition,
                     "Move separator-selection " + sepCur + " " + sepNext,
                     "Move " + elementID + " " + elementStage1 + " " + elementStage2,
                     "Move " + elementID + " " + elementStage2 + " " + elementStage3
                ]
            }
            actions.push(findMin);
            actions.push(move);
        }

        actions.push({
            desc: "Sort Finished",
            how: []
        })

        return(actions)
    }

    render() {
        let actionDisplay = "Finding Algorithm"

        if (this.state.actions.length > 0) {
            let cur = Math.min(this.state.actions.length - 1, this.state.step)
            actionDisplay = this.state.actions[cur].desc;
        }

        let run = "Play"
        if (this.state.animation) {
            run = "Pause"
        }

        let step = this.state.actions[this.state.step].desc
        if (this.state.step !== 0 && this.state.step !== this.state.actions.length - 1) {
            step = "Step " + this.state.step + ": " + step;
        }

        return(
            <div id="selection" className="animationBox">
                <div>{step}</div>
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
                    let newArray = this.generateRandomArray(5, 8);
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
                                }, 1200)
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
                        window.clearInterval(this.state.animation);
                        this.setState({
                            animation: false
                        })
                    }
                }}>{run}</Button>
                </ButtonGroup>
            </div>
        )
    }
}