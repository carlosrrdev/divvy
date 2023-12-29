import {addPartToExpense, getArr} from "../data.js";
import {showResults} from "./results.js";

const container = document.getElementById("delegations_container");
const delBtn = document.getElementById('del_btn')
const noDelMessage = document.getElementById('no_del')
let delArr;

delBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showResults(delArr)
})

export function addDel() {
  container.innerHTML = '';
  const participants = getArr("part");
  const expenses = getArr("exp");
  delArr = [];

  participants.forEach((p) => {
    const partLi = document.createElement("li");
    const assignBtn = document.createElement("button");
    assignBtn.textContent = "Assign";
    assignBtn.className = "form-btn text-sm"
    const dialog = createDialogWithCheckboxes(expenses, p.id, p.name)

    assignBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.showModal();
    });

    partLi.textContent = p.name
    partLi.append(assignBtn, dialog);
    partLi.classList.add("form-list-item")


    container.appendChild(partLi);
    delArr.push({id: p.id, name: p.name, expenses:[]});
  })
  verifyStatus()
}

function createDialogWithCheckboxes(data, userId, userName) {
  const dialog = document.createElement("dialog");
  const dialogFlexContainer = document.createElement('div');
  const list = document.createElement("ul");
  const heading = document.createElement("h2");
  const doneBtn = document.createElement("button");
  dialogFlexContainer.className = "dialog-flex"
  doneBtn.type = "button";
  doneBtn.textContent = "Done"
  doneBtn.className = 'form-btn';

  heading.textContent = `Assign ${userName}'s expenses`;
  heading.className = 'checkbox-heading';

  dialog.classList.add("dialog")
  list.classList.add('dialog-container')

  doneBtn.addEventListener('click', (e) => {
    e.preventDefault()
    closeDialog(dialog, list)
  })

  dialogFlexContainer.append(heading, list, doneBtn);
  dialog.appendChild(dialogFlexContainer)

  data.forEach((item) => {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const checkbox = document.createElement("input");

    span.textContent = `$${item.amount}`;
    listItem.classList.add("checkbox-row");
    checkbox.classList.add("checkbox")

    checkbox.type = "checkbox";
    checkbox.id = `${userId}_${item.id}`;
    checkbox.dataset.exp_id = item.id
    checkbox.dataset.part_id = userId

    checkbox.addEventListener("change", (e) => {
      checkboxChange(e, listItem)
    })

    const label = document.createElement("label");
    label.htmlFor = `${userId}_${item.id}`;
    label.textContent = item.name
    label.className = "flex-1 md:cursor-pointer"
    listItem.append(checkbox, label, span);

    list.appendChild(listItem);
  });
  return dialog;
}

function checkboxChange(e, liEl) {
  if(e.target.checked) {
    liEl.classList.add("checkbox-active")
  } else {
    liEl.classList.remove("checkbox-active")
  }
}

function closeDialog(dialog, list) {
  const checkboxArr = list.querySelectorAll("li input[type='checkbox']")
  const expenses = []
  let userId;
  checkboxArr.forEach((box) => {
    userId = delArr.findLastIndex((u) => u.id === box.dataset.part_id)
    if(box.checked) {
      expenses.push(box.dataset.exp_id)
      addPartToExpense(box.dataset.exp_id, box.dataset.part_id)
    }
  })

  delArr[userId].expenses = expenses.length >= 1? expenses : [];

  dialog.close();
  verifyStatus()
}

function verifyStatus() {
  for(let i = 0; i < delArr.length; i++) {
    const object = delArr[i];
    for(let key in object) {
      if(Array.isArray(object[key])) {
        if(object[key].length === 0) {
          noDelMessage.style.display = "block"
          delBtn.style.display = "none";
          return;
        }
      }
    }
  }
  noDelMessage.style.display = "none";
  delBtn.style.display = "block"
}