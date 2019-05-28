import rd3 from 'react-d3-library'


export class BasicAction {
    constructor(actionName, step, instruction, parameters) {
        this.actionName = actionName;
        this.step = step;
        this.nextActionName = nextActionName;
        this.instruction = instruction;
    }

    visulizeStep() {

    }

    getStep() {
        return(this.step)
    }

    getResult() {
        return(this.result)
    }

    getNextAction() {
        return(this.nextActionName)
    }
}