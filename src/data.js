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

export function addPartToExpense(id, userId) {
  const expense = expensesArr.find((i) => i.id === id);
  if (expense) {
    expense.participants.push(userId);
  }
}

export function removePartFromExpense(id, userId) {
  const expense = expensesArr.find((i) => i.id === id);
  if (expense) {
    expense.participants = expense.participants.filter((i) => i !== userId);
  }
}

export function clearArrays() {
  participantArr = [];
  expensesArr = [];
}