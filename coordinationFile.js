import App from "./app.js";

import movementPubSub from "./pubsubMovement.js";
import backendFrontendMediator from "./backendFrontendMediator.js";
import singletonToCompressMovement from "./movementStateSingleton.js";

import shapeFactory from "./shapeFactory.js";
import baseConverter from "./helperFunctions/baseConverter.js";

const app = new App({
  canvas: document.getElementById("myCanvas"),
  shapeSelector: document.getElementById("shapeSelector"),
  baseSelector: document.getElementById("baseConverterOptions"),
  xPositionIndicator: document.getElementById("xPosition"),
  yPositionIndicator: document.getElementById("yPosition"),
  baseConverter: baseConverter,
  mediatorInstance: backendFrontendMediator,
  shapeFactory: shapeFactory,
  movementPubSub: movementPubSub,
  upEvent: document.getElementById("upEvent"),
  downEvent: document.getElementById("downEvent"),
  rightEvent: document.getElementById("rightEvent"),
  leftEvent: document.getElementById("leftEvent"),
  compressionSelector: document.getElementById("compressionSelector"),
  movementSingleton: singletonToCompressMovement,
});
app.init();
