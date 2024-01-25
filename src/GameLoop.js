export class GameLoop {
    constructor(update, render){
        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000/60;
        
        this.update = update;
        this.render = render;

        this.rafId = null;
        this.isRunning = false;
    }

    mainLoop = (timestamp) => {
        if(!this.isRunning) return;

        let deltaTime = timestamp - this.lastFrameTime
        this.lastFrameTime = timestamp
    }
}