import movementStateSingleton from "./movementStateSingleton.js";
import compressConsecutiveMovements from "./helperFunctions/compressConsecutiveMovements.js";

import backendFrontendMediator from "./backendFrontendMediator.js";

import { COMPRESSION_TIME } from "./utilities.js";

class Movement {
  #stateSingleton;
  #timeStep;
  constructor(stateSingleton, timeStep) {
    this.#stateSingleton = stateSingleton;
    this.#timeStep = timeStep;
  }
  async movement() {
    while (this.#stateSingleton.currentState().length) {
      let currentChain = this.#stateSingleton.removeArrayInChain();

      // The chain will be transformed into an array of objects,
      // each object will contain the "event" sent by the user
      // and the number of consecutive times it was called.
      // That will be used to compress the movement. Example
      // [{event: "buttomEvent" , repetitions: 3}, {event: rightEvent, repetitions: 1},...]
      currentChain = compressConsecutiveMovements(
        currentChain,
        this.#stateSingleton.isCompressed() // To track the user selection
      );

      for (let movementEvent of currentChain) {
        let value = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(movementEvent);
          }, this.#timeStep);
        });

        // With this instruction we do not have to worry about time anymore
        // now the pubsub takes the responsibility to handle the events
        // recieved by the movement
        backendFrontendMediator.publish(movementEvent.event, value);
      }
    }

    this.#stateSingleton.notifyExecution();
  }
}

const movementInstance = new Movement(movementStateSingleton, COMPRESSION_TIME);

export default movementInstance;
