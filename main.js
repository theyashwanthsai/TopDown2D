import './style.css'
import {resources} from "./src/Resources.js";
import {Sprite} from "./src/Sprite.js";
import { Vector2 } from './src/Vector2';
import { GameLoop } from './src/GameLoop';
import { DOWN, Input, RIGHT, UP, LEFT } from './src/Input';
import { gridCells, isSpaceFree } from './src/helpers/grid';
import { moveTowards } from './src/helpers/moveTowards'
import { walls } from './src/levels/level1';
import { Animations } from './src/Animations';
import { FrameIndexPattern } from './src/FrameIndexPattern';
import { WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP,STAND_UP, STAND_DOWN, STAND_LEFT,STAND_RIGHT  } from './src/objects/Hero/heroAnimations';


const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
})

const groundSprite = new Sprite({
  resource: resources.images.village,
  frameSize: new Vector2(1920, 720),
  scale: 1,
  position: new Vector2(gridCells(0), gridCells(0))
})

const mc = new Sprite({
  resource: resources.images.mc,
  frameSize: new Vector2(32, 32),
  hFrames: 5,
  vFrames: 4,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(6)),
  animations: new Animations({
    walkDown: new FrameIndexPattern(WALK_DOWN),
    walkUp: new FrameIndexPattern(WALK_UP),
    walkLeft: new FrameIndexPattern(WALK_LEFT),
    walkRight: new FrameIndexPattern(WALK_RIGHT),
    standUp: new FrameIndexPattern(STAND_UP),
    standDown: new FrameIndexPattern(STAND_DOWN),
    standLeft: new FrameIndexPattern(STAND_LEFT),
    standRight: new FrameIndexPattern(STAND_RIGHT)
  })
})

const mcDestinationPosition = mc.position.duplicate()
let mcFacing = DOWN;

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32)
})


const input = new Input;

const moveMC = (key) => {
  if(!input.direction){
    if(mcFacing === LEFT){ mc.animations.play("standLeft")}
    if(mcFacing === DOWN){ mc.animations.play("standDown")}
    if(mcFacing === RIGHT){ mc.animations.play("standRight")}
    if(mcFacing === UP){ mc.animations.play("standUp")}
    return;
  }

  let nextX = mcDestinationPosition.x;
  let nextY = mcDestinationPosition.y;
  const gridSize = 16;

  if(key === "UP") {
    nextY -= gridSize
    mc.animations.play("walkUp")
  }
  if(key === "DOWN"){
    nextY += gridSize
    mc.animations.play("walkDown")
  } 
  if(key === "LEFT"){
    nextX -= gridSize
    mc.animations.play("walkLeft")
  } 
  if(key === "RIGHT"){
    nextX += gridSize
    mc.animations.play("walkRight")
  } 

  mcFacing = input.direction ?? mcFacing;

  // check for collision
  if(isSpaceFree(walls, nextX, nextY)){
    console.log(nextX + " " + nextY)
    mcDestinationPosition.x = nextX;
    mcDestinationPosition.y = nextY;
  }
}

const update = (delta) => {
  // updating entities can be done here
  const distance = moveTowards(mc, mcDestinationPosition, 1)
  const hasArrived = distance <= 1;
  if(hasArrived){
    moveMC(input.direction)
  }

  // animations
  mc.step(delta);
}


const draw = () => {
  // skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // set the position
  const mcOffset = new Vector2(-8, -21);
  const mcposX = mc.position.x + mcOffset.x;
  const mcposY = mc.position.y + mcOffset.y;

  // shadow.drawImage(ctx, mcposX, mcposY);
  mc.drawImage(ctx, mcposX, mcposY);
}




const gameLoop = new GameLoop(update, draw)
gameLoop.start();