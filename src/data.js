let participantArr = [];
let expensesArr = []

export function getArr(arr) {
  if(arr === "part") {
    return participantArr;
  } else if (arr === "exp") {
    return expensesArr;
  }
}

export function addToArr(arr, item) {
  if(arr === "part") {
    participantArr.push(item);
    return participantArr;
  } else if (arr === "exp") {
    expensesArr.push(item);
    return expensesArr;
  }
}

export function updateAndDelete(arr, id) {
  if(arr === "part") {
    participantArr = participantArr.filter((i) => i.id !== id);
    return participantArr;
  } else if (arr === "exp") {
    expensesArr = expensesArr.filter((i) => i.id !== id);
    return expensesArr;
  }
}

export function clearArrays() {
  participantArr = [];
  expensesArr = [];
}