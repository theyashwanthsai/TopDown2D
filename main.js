import './style.css'
import {resources} from "./src/Resources.js";
import {Sprite} from "./src/Sprite.js";
import { Vector2 } from './src/Vector2';
import { GameLoop } from './src/GameLoop';
import { Input } from './src/Input';
import { gridCells } from './src/helpers/grid';
import { moveTowards } from './src/helpers/moveTowards'

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
})

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
})

const mc = new Sprite({
  resource: resources.images.mc,
  frameSize: new Vector2(32, 32),
  hFrames: 5,
  vFrames: 4,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(5))
})

const mcDestinationPosition = mc.position.duplicate()

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32)
})


const input = new Input;

const moveMC = (key) => {
  if(!input.direction){
    return;
  }

  let nextX = mcDestinationPosition.x;
  let nextY = mcDestinationPosition.y;
  const gridSize = 16;

  if(key === "UP") {
    nextY -= gridSize
    mc.frame = 6;
  }
  if(key === "DOWN"){
    nextY += gridSize
    mc.frame = 0;
  } 
  if(key === "LEFT"){
    nextX -= gridSize
    mc.frame = 12;
  } 
  if(key === "RIGHT"){
    nextX += gridSize
    mc.frame = 17;
  } 

  mcDestinationPosition.x = nextX;
  mcDestinationPosition.y = nextY;
}

const update = () => {
  // updating entities can be done here
  const distance = moveTowards(mc, mcDestinationPosition, 1)
  const hasArrived = distance <= 1;
  if(hasArrived){
    moveMC(input.direction)
  }
}


const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
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