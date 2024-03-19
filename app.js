export default class App {
  #mediatorInstance;
  #canvas;
  #shapeSelector;
  #baseSelector;
  #baseConverter;
  #currentShape;
  #shapeFactory;
  #upEvent;
  #downEvent;
  #rightEvent;
  #leftEvent;
  #compressionSelector;
  #movementSingleton;
  #selectedShape = "Square";
  #xPositionIndicator;
  #yPositionIndicator;
  #base = 10;

  constructor({
    canvas,
    shapeSelector,
    baseSelector,
    xPositionIndicator,
    yPositionIndicator,
    baseConverter,
    mediatorInstance,
    shapeFactory,
    movementPubSub,
    upEvent,
    downEvent,
    rightEvent,
    leftEvent,
    compressionSelector,
    movementSingleton,
  }) {
    this.#canvas = canvas;
    this.#shapeSelector = shapeSelector;
    this.#baseSelector = baseSelector;
    this.#xPositionIndicator = xPositionIndicator;
    this.#yPositionIndicator = yPositionIndicator;
    this.#baseConverter = baseConverter;
    this.#shapeFactory = shapeFactory;
    this.#currentShape = this.#shapeFactory.requestShape(this.#selectedShape);
    this.#upEvent = upEvent;
    this.#downEvent = downEvent;
    this.#rightEvent = rightEvent;
    this.#leftEvent = leftEvent;
    this.#compressionSelector = compressionSelector;
    this.#movementSingleton = movementSingleton;

    // Associate the recieved canvas with the shape
    this.#currentShape.canvas = this.#canvas;

    ////////////////////////////////////////////////////////////
    // This events are published to the pubsubMovement
    this.#upEvent.addEventListener("click", function () {
      movementPubSub.publish("upEvent", "upEvent");
    });
    this.#downEvent.addEventListener("click", function () {
      movementPubSub.publish("downEvent", "downEvent");
    });
    this.#rightEvent.addEventListener("click", function () {
      movementPubSub.publish("rightEvent", "rightEvent");
    });
    this.#leftEvent.addEventListener("click", function () {
      movementPubSub.publish("leftEvent", "leftEvent");
    });

    ////////////////////////////////////////////////////////////
    // In this part the code subscribes to the events from the backend
    this.#mediatorInstance = mediatorInstance;
    this.#mediatorInstance.subscribe("backToFront_upEvent", (eventData) => {
      this.upMovement(eventData);
    });
    this.#mediatorInstance.subscribe("backToFront_downEvent", (eventData) => {
      this.downMovement(eventData);
    });
    this.#mediatorInstance.subscribe("backToFront_rightEvent", (eventData) => {
      this.rightMovement(eventData);
    });
    this.#mediatorInstance.subscribe("backToFront_leftEvent", (eventData) => {
      this.leftMovement(eventData);
    });
  }

  ///////////Start: Movement section///////////
  rightMovement(eventData) {
    const newXValue = this.#currentShape.moveRight(eventData);
    this.updateX_PositionIndicator(newXValue);
  }

  leftMovement(eventData) {
    const newXValue = this.#currentShape.moveLeft(eventData);
    this.updateX_PositionIndicator(newXValue);
  }

  upMovement(eventData) {
    const newYValue = this.#currentShape.moveUp(eventData);
    this.updateY_PositionIndicator(newYValue);
  }

  downMovement(eventData) {
    const newYValue = this.#currentShape.moveDown(eventData);
    this.updateY_PositionIndicator(newYValue);
  }

  ///////////End: Movement section///////////

  updateX_PositionIndicator(newXValue) {
    // To update the HTML element that indicates the x position
    this.#xPositionIndicator.innerText = this.#baseConverter.changeBase(
      newXValue,
      this.#base
    );
  }

  updateY_PositionIndicator(newYValue) {
    // To update the HTML element that indicates the y position
    this.#yPositionIndicator.innerText = this.#baseConverter.changeBase(
      newYValue,
      this.#base
    );
  }

  draw() {
    this.#currentShape.draw();
  }

  init() {
    this.draw();

    this.updateX_PositionIndicator(this.#currentShape.xPosition);
    this.updateY_PositionIndicator(this.#currentShape.yPosition);

    this.#shapeSelector.addEventListener("change", (event) => {
      this.#currentShape = this.#shapeFactory.requestShape(event.target.value);
      this.draw();
    });

    this.#baseSelector.addEventListener("change", (event) => {
      if (event.target.value === "Roman") {
        this.#base = 0;
      } else if (event.target.value === "Binary") {
        this.#base = 2;
      } else if (event.target.value === "Hexadecimal") {
        this.#base = 16;
      } else if (event.target.value === "Decimal") {
        this.#base = 10;
      }
      this.updateX_PositionIndicator(this.#currentShape.xPosition);
      this.updateY_PositionIndicator(this.#currentShape.yPosition);
    });

    this.#compressionSelector.addEventListener("change", (event) => {
      this.#movementSingleton.defineCompression(event.target.checked);
    });
  }
}
