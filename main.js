import './style.css'
import {resources} from "./src/Resources.js";
import {Sprite} from "./src/Sprite.js";
import { Vector2 } from './src/Vector2';

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




setInterval(() => {
  draw();
}, 300)