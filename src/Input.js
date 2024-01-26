export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";


export class Input {
    constructor(){
        this.heldDirections = [];

        document.addEventListener("keydown", (e) => {
            console.log(e.code)
            if(e.code === "ArrowUp" || e.code === "KeyW"){
                this.OnArrowPressed(UP);
            }
            if(e.code === "ArrowDown" || e.code === "KeyS"){
                this.OnArrowPressed(DOWN);
            }
            if(e.code === "ArrowLeft" || e.code === "KeyA"){
                this.OnArrowPressed(LEFT);
            }
            if(e.code === "ArrowRight" || e.code === "KeyD"){
                this.OnArrowPressed(RIGHT);
            }
        })

        document.addEventListener("keyup", (e) => {
            console.log(e.code)
            if(e.code === "ArrowUp" || e.code === "KeyW"){
                this.onArrowReleased(UP);
            }
            if(e.code === "ArrowDown" || e.code === "KeyS"){
                this.onArrowReleased(DOWN);
            }
            if(e.code === "ArrowLeft" || e.code === "KeyA"){
                this.onArrowReleased(LEFT);
            }
            if(e.code === "ArrowRight" || e.code === "KeyD"){
                this.onArrowReleased(RIGHT);
            }
        })
    }

    get direction(){
        return this.heldDirections[0];
    }

    OnArrowPressed(direction){
        if(this.heldDirections.indexOf(direction) === -1){
            this.heldDirections.unshift(direction);
        }
    }

    onArrowReleased(direction){
        const index = this.heldDirections.indexOf(direction);
        if(index === -1) {
            return;
        }

        this.heldDirections.splice(index, 1);
    }

}