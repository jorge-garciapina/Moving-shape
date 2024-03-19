import singletonToCompressMovement from "./movementStateSingleton.js";
import debouncer from "./debouncer.mjs";
import movementInstance from "./movement.js";

class ChainEventsInADebounce {
  #debouncerInstance;
  #singletonInstance;
  #movementObserver;
  constructor(debouncerInstance, singletonInstance, movementObserver) {
    this.#debouncerInstance = debouncerInstance;
    this.#singletonInstance = singletonInstance;
    this.#movementObserver = movementObserver;
  }
  addToCurrentChain = async function (arrowKeyEvent) {
    let currentChain = await this.#debouncerInstance.debounce(arrowKeyEvent);

    this.#singletonInstance.addNewChain(currentChain);

    // This is to prevent call the movement function when there are chains
    // on the queue
    if (!this.#singletonInstance.isExecuting()) {
      this.#singletonInstance.notifyExecution();
      this.#movementObserver.movement();
    }
  };
}

const chainEventsInADebounce = new ChainEventsInADebounce(
  // Debouncer,
  debouncer,
  singletonToCompressMovement,
  movementInstance
);

export default chainEventsInADebounce;
