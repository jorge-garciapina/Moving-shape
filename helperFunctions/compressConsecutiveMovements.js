/**
 *
 * @param {Array} arr The array recieved by the debouncer
 * @param {Boolean} isCompressed Curent user selection
 * @returns [{event: *event name*, repetitions: *repetitions of event*}]
 */
export default function compressConsecutiveMovements(arr, isCompressed) {
  const result = [];
  let tempArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (isCompressed) {
      tempArray.push(arr[i]);

      // Check if the next element is different or if we are at the end
      if (arr[i] !== arr[i + 1]) {
        // Instead of pushing the array, we push an object with event and repetitions
        result.push({ event: arr[i], repetitions: tempArray.length });
        tempArray = []; // Reset for the next group
      }
    } else {
      result.push({ event: arr[i], repetitions: 1 });
    }
  }

  return result;
}
