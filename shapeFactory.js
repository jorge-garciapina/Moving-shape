import {
  COMPRESSION_TIME,
  INITIAL_X_POSITION,
  INITIAL_Y_POSITION,
  INITIAL_SIZE,
  MOVEMENT_STEP,
} from "./utilities.js";

class Shape {
  static xPosition;
  static xInitial;
  static xTarget;
  static yPosition;
  static yTarget;
  static size;
  static color;
  static canvas;
  static step = MOVEMENT_STEP;
  static animationSpeed = 2;

  constructor(x, y, size) {
    Shape.xPosition = x;
    Shape.xInitial = x;
    Shape.yPosition = y;
    Shape.size = size;
    Shape.color = "#0095DD";
  }

  get canvas() {
    return Shape.canvas;
  }
  set canvas(value) {
    Shape.canvas = value;
  }
  get xPosition() {
    return Shape.xPosition;
  }

  set xPosition(value) {
    Shape.xPosition = value;
  }

  set yPosition(value) {
    Shape.yPosition = value;
  }

  get yPosition() {
    return Shape.yPosition;
  }

  get size() {
    return Shape.size;
  }

  get color() {
    return Shape.color;
  }

  get step() {
    return Shape.step;
  }

  moveRight(eventData) {
    const { repetitions } = eventData;

    Shape.xTarget = Math.min(
      this.xPosition + this.step * repetitions,
      500 - this.size
    );

    this.animateMovementRight();

    return this.xPosition;
  }

  moveLeft(eventData) {
    const { repetitions } = eventData;
    Shape.xTarget = Math.max(this.xPosition - this.step * repetitions, 0);

    this.animateMovementLeft();

    return this.xPosition;
  }

  moveUp(eventData) {
    const { repetitions } = eventData;
    Shape.yTarget = Math.max(this.yPosition - this.step * repetitions, 0);

    this.animateMovementUp();

    return this.yPosition;
  }

  moveDown(eventData) {
    const { repetitions } = eventData;
    Shape.yTarget = Math.min(
      this.yPosition + this.step * repetitions,
      500 - this.size
    );

    this.animateMovementDown();

    return this.yPosition;
  }

  ////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////

  animateMovementRight() {
    // This number will be integer.
    const animationSpeed = (Shape.xTarget - this.xPosition) / MOVEMENT_STEP;

    // The sign of speed can be use as the direction
    function executeAnimation() {
      if (this.xPosition - Shape.xTarget < 0) {
        this.xPosition += animationSpeed;

        this.draw();

        requestAnimationFrame(executeAnimation.bind(this));
      }
    }

    executeAnimation.call(this);
  }

  animateMovementLeft() {
    const animationSpeed = (Shape.xTarget - this.xPosition) / MOVEMENT_STEP;

    function executeAnimation() {
      if (this.xPosition - Shape.xTarget > 0) {
        this.xPosition += animationSpeed;

        this.draw();

        requestAnimationFrame(executeAnimation.bind(this));
      }
    }

    executeAnimation.call(this);
  }

  animateMovementUp() {
    const animationSpeed = (Shape.yTarget - this.yPosition) / MOVEMENT_STEP;
    function executeAnimation() {
      if (this.yPosition > Shape.yTarget) {
        this.yPosition += animationSpeed;

        this.draw();

        requestAnimationFrame(executeAnimation.bind(this));
      }
    }

    executeAnimation.call(this);
  }
  animateMovementDown() {
    const animationSpeed = (Shape.yTarget - this.yPosition) / MOVEMENT_STEP;

    function executeAnimation() {
      if (this.yPosition < Shape.yTarget) {
        this.yPosition += animationSpeed;

        this.draw();

        requestAnimationFrame(executeAnimation.bind(this));
      }
    }

    executeAnimation.call(this);
  }

  ////////////////////////////////////
  ////////////////////////////////////
  ////////////////////////////////////

  draw() {}
}

class Square extends Shape {
  draw(canvas) {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xPosition, this.yPosition, this.size, this.size);
  }
}

class Triangle extends Shape {
  draw() {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas

    const height = (Math.sqrt(3) / 2) * this.size;
    ctx.beginPath();
    ctx.moveTo(this.xPosition, this.yPosition - height / 2);
    ctx.lineTo(this.xPosition + this.size / 2, this.yPosition + height / 2);
    ctx.lineTo(this.xPosition - this.size / 2, this.yPosition + height / 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Circle extends Shape {
  draw() {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas

    ctx.beginPath();
    ctx.arc(this.xPosition, this.yPosition, this.size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class ShapeFactory {
  #squareInstance;
  #circleInstance;
  #triangleInstance;
  constructor(squareInstance, circleInstance, triangleInstance) {
    this.#squareInstance = squareInstance;
    this.#circleInstance = circleInstance;
    this.#triangleInstance = triangleInstance;
  }
  // return the instance not the construct
  requestShape(shape) {
    if (shape === "Square") {
      return this.#squareInstance;
    } else if (shape === "Circle") {
      return this.#circleInstance;
    } else if (shape === "Triangle") {
      return this.#triangleInstance;
    }
  }
}

const squareInstance = new Square(
  INITIAL_X_POSITION,
  INITIAL_Y_POSITION,
  INITIAL_SIZE
);

const circleInstance = new Circle(
  INITIAL_X_POSITION,
  INITIAL_Y_POSITION,
  INITIAL_SIZE
);

const triangleInstance = new Triangle(
  INITIAL_X_POSITION,
  INITIAL_Y_POSITION,
  INITIAL_SIZE
);

const shapeFactory = new ShapeFactory(
  squareInstance,
  circleInstance,
  triangleInstance
);
export default shapeFactory;
