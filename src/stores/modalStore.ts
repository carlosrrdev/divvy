interface ModalStore {
  newDivvyModalIsOpen: boolean;
  viewDivvyModalIsOpen: boolean;
  addMembersModalIsOpen: boolean;
  addExpensesModalIsOpen: boolean;
  handleAddMembersModal: (ref: HTMLElement) => void;
  handleAddExpensesModal: (ref: HTMLElement) => void;
}

export const modalStore: ModalStore = {
  newDivvyModalIsOpen: false,
  viewDivvyModalIsOpen: false,
  addMembersModalIsOpen: false,
  addExpensesModalIsOpen: false,

  handleAddMembersModal(ref) {
    if(this.addMembersModalIsOpen) {
      ref.style.transform = "scale(1)"
    } else {
      ref.style.transform = "scale(0.97)"
    }
    this.addMembersModalIsOpen = !this.addMembersModalIsOpen;
  },
  handleAddExpensesModal(ref) {
    if(this.addExpensesModalIsOpen) {
      ref.style.transform = "scale(1)"
    } else {
      ref.style.transform = "scale(0.97)"
    }
    this.addExpensesModalIsOpen = !this.addExpensesModalIsOpen;
  }
}