import './style.css'
import {resources} from "./src/Resources.js";
import {Sprite} from "./src/Sprite.js";
import { Vector2 } from './src/Vector2';
import { GameLoop } from './src/GameLoop';
import { Input } from './src/Input';

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
  hFrames: 3,
  vFrames: 8,
  frame: 1,
})

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32)
})

const mcPos = new Vector2(16*6, 16*6);
const input = new Input;

const moveMC = (key) => {
  if(key === "UP") {
    mcPos.y -= 1;
    mc.frame = 6;
  }
  if(key === "DOWN"){
    mcPos.y += 1;
    mc.frame = 0;
  } 
  if(key === "LEFT"){
    mcPos.x -= 1;
    mc.frame = 9;
  } 
  if(key === "RIGHT"){
    mcPos.x += 1;
    mc.frame = 3;
  } 
}

const update = () => {
  // updating entities can be done here
  moveMC(input.direction)
}


const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // set the position
  const mcOffset = new Vector2(-8, -21);
  const mcposX = mcPos.x + mcOffset.x;
  const mcposY = mcPos.y + mcOffset.y;

  shadow.drawImage(ctx, mcposX, mcposY);
  mc.drawImage(ctx, mcposX, mcposY);
}




const gameLoop = new GameLoop(update, draw)
gameLoop.start();