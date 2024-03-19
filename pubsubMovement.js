import chainEventsInADebounce from "./asynchronousObserver.js";

class MovementPubSub {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  publish(event, eventObject) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((callback) => {
        callback(eventObject);
      });
    }
  }
}

const movementPubSub = new MovementPubSub();

// These are just the subscribers for the user events.
// upEvent, buttomEvent, rightEvent, leftEvent are the movements

// All the events must be chained according to the Debounce time,
// the addToCurrentChain method of chainEventsInADebounce will be in charge
// to chain the events when the movement events are recieved
movementPubSub.subscribe("upEvent", (data) => {
  chainEventsInADebounce.addToCurrentChain(data);
});
movementPubSub.subscribe("downEvent", (data) => {
  chainEventsInADebounce.addToCurrentChain(data);
});
movementPubSub.subscribe("rightEvent", (data) => {
  chainEventsInADebounce.addToCurrentChain(data);
});
movementPubSub.subscribe("leftEvent", (data) => {
  chainEventsInADebounce.addToCurrentChain(data);
});

///////////////////////////////////////
// Example to test, delete optional
// movementPubSub.subscribe("upEvent", (data) => {
//   console.log(data);
// });
// movementPubSub.subscribe("buttomEvent", (data) => {
//   console.log(data);
// });
// movementPubSub.subscribe("rightEvent", (data) => {
//   console.log(data);
// });
// movementPubSub.subscribe("leftEvent", (data) => {
//   console.log(data);
// });

export default movementPubSub;
