import { Vector2 } from "./Vector2";

export class Sprite {
    constructor({
        resource,
        frameSize,
        hFrames,
        vFrames,
        frame,
        scale,
        position,
        animations,
    }) {
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16, 16);
        this.hFrames = hFrames ?? 1; // if else basically
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0, 0);
        this.animations = animations ?? null;
        this.buildFrameMap();
    }

    buildFrameMap(){
        let count = 0;
        for(let i = 0; i < this.vFrames; i++){
            for(let j = 0; j < this.hFrames; j++){
                this.frameMap.set(
                    count,
                    new Vector2(this.frameSize.x*j, this.frameSize.y*i)
                )
                count++;
            }
        }
    }


    step(delta){
        if(!this.animations) {
            return;
        }

        this.animations.step(delta);
        this.frame = this.animations.frame;
    }

    drawImage(ctx, x, y){
        if(!this.resource.isLoaded){
            return;
        }
        // to find the correct frame of the spritesheet
        let frameCoordX = 0;
        let frameCoordY = 0;

        const frame = this.frameMap.get(this.frame);
        if(frame){
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(
            this.resource.image,
            frameCoordX,
            frameCoordY,
            frameSizeX,
            frameSizeY,
            x,
            y,
            frameSizeX * this.scale,
            frameSizeY * this.scale,
        );
    }
}