import {getArr} from "../data.js";

const container = document.getElementById("delegations_container");

export function addDel() {
  const participants = getArr("part");
  const expenses = getArr("exp");


  participants.forEach((p) => {
    const partLi = document.createElement("li");
    const assignBtn = document.createElement("button");
    assignBtn.textContent = "Assign Expenses";
    const dialog = createDialogWithCheckboxes(expenses, p.id)

    assignBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.showModal();
    });

    partLi.textContent = p.name
    partLi.append(assignBtn, dialog);
    partLi.classList.add("form-list-item")


    container.appendChild(partLi);
  })
}

function createDialogWithCheckboxes(data, userId) {
  const dialog = document.createElement("dialog");
  const list = document.createElement("ul");
  dialog.classList.add("dialog")
  list.classList.add('dialog-container')
  dialog.appendChild(list);

  data.forEach((item) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.id = `${userId}_${item.id}`;
    checkbox.value = item.name;
    listItem.appendChild(checkbox);

    const label = document.createElement("label");
    label.htmlFor = `${userId}_${item.id}`;
    label.textContent = item.name
    listItem.appendChild(label);

    list.appendChild(listItem);
  });
  return dialog;
}