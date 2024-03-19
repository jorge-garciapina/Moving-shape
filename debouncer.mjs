class Debouncer {
  #debounceChain = [];
  #debounceTimeout = null;
  #debounceTime;

  constructor(debounceTime) {
    this.#debounceTime = debounceTime;
  }

  async debounce(arrowKeyEvent) {
    this.#debounceChain.push(arrowKeyEvent);

    clearTimeout(this.#debounceTimeout);

    // Create a delay using a Promise and await
    const value = await new Promise((resolve) => {
      this.#debounceTimeout = setTimeout(() => {
        resolve(this.#debounceChain);
        this.#debounceChain = [];
      }, this.#debounceTime);
    });

    return value;
  }
}

const debouncer = new Debouncer(1000);

export default debouncer;
