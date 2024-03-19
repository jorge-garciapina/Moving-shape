class BackendFrontendMediator {
  #subscribers = {};
  constructor() {
    // In this part the code subscribes to the events recieved by the frontend
    // the advantage of this is that this mediator will handle time operations
    // and from this point the code has to worry only on communicate the event
    // recieved from the backend to the frontend
    this.subscribe("upEvent", (eventData) => {
      this.executeEvent(eventData);
    });
    this.subscribe("downEvent", (eventData) => {
      this.executeEvent(eventData);
    });
    this.subscribe("rightEvent", (eventData) => {
      this.executeEvent(eventData);
    });
    this.subscribe("leftEvent", (eventData) => {
      this.executeEvent(eventData);
    });
  }

  subscribe(eventName, callback) {
    if (!this.#subscribers[eventName]) {
      this.#subscribers[eventName] = [];
    }

    this.#subscribers[eventName].push(callback);
  }

  publish(eventName, eventData) {
    this.#subscribers[eventName].forEach((callback) => {
      callback(eventData);
    });
  }

  executeEvent(eventData) {
    let { event } = eventData;
    this.publish(`backToFront_${event}`, eventData);
  }
}

const backendFrontendMediator = new BackendFrontendMediator();

export default backendFrontendMediator;
