const singletonToCompressMovement = (function () {
  let executionIndicator = false;
  let movementChains = [];
  let compression = false;

  function isExecuting() {
    return executionIndicator;
  }

  function notifyExecution() {
    executionIndicator = !executionIndicator;
  }

  function isCompressed() {
    return compression;
  }

  function addNewChain(newChain) {
    movementChains.push(newChain);
    return;
  }

  function defineCompression(value) {
    compression = value;
  }

  function currentState() {
    return movementChains;
  }

  function removeArrayInChain() {
    return movementChains.shift();
  }

  return {
    // the first value to isExecuting is false
    isExecuting: function () {
      return isExecuting();
    },

    isCompressed: function () {
      return isCompressed();
    },

    defineCompression: function (value) {
      defineCompression(value);
    },

    notifyExecution: function () {
      notifyExecution();
    },

    addNewChain: function (newChain) {
      addNewChain(newChain);
    },
    currentState: function () {
      return currentState();
    },

    removeArrayInChain: function () {
      return removeArrayInChain();
    },
  };
})();

// Check this example implementations for guide:
// console.log(singletonToCompressMovement());
// console.log(singletonToCompressMovement());
// console.log(singletonToCompressMovement());
// console.log(singletonToCompressMovement());
export default singletonToCompressMovement;
