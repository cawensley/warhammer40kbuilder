export default function calcSquadNumber(array) {
  let realNumber = 0;
  if (array.length > 0) {
    for (let i = 0; i <= array.length; i += 1) {
      if (array[i] !== undefined) {
        if (array[i].Squad) { realNumber += 1; }
      }
    }
  }
  return realNumber;
}
