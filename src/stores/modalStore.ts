export interface ModalStore {
  newDivvyModalIsOpen: boolean;
  newDivvyModalBodyOnly: boolean;
  viewDivvyModalIsOpen: boolean;
  addMembersModalIsOpen: boolean;
  addExpensesModalIsOpen: boolean;
  splitResultsModalIsOpen: boolean;
  divvyUpResultsModalIsOpen: boolean;
  handleNewDivvyModal: () => void;
  handleAddMembersModal: (ref: HTMLElement) => void;
  handleAddExpensesModal: (ref: HTMLElement) => void;
  handleSplitResultsModal: () => void;
  // handleDivvyUpResultsModal: (ref: HTMLElement) => void;
}

export const modalStore: ModalStore = {
  newDivvyModalIsOpen: false,
  newDivvyModalBodyOnly: false,
  viewDivvyModalIsOpen: false,
  addMembersModalIsOpen: false,
  addExpensesModalIsOpen: false,
  splitResultsModalIsOpen: false,
  divvyUpResultsModalIsOpen: false,

  handleNewDivvyModal() {
    this.newDivvyModalIsOpen = !this.newDivvyModalIsOpen;
    this.newDivvyModalBodyOnly = !this.newDivvyModalBodyOnly;
  },

  handleAddMembersModal(ref) {
    if(this.addMembersModalIsOpen) {
      ref.style.transform = "scale(1)"
    } else {
      ref.style.transform = "scale(0.95)"
    }
    this.addMembersModalIsOpen = !this.addMembersModalIsOpen;
  },
  handleAddExpensesModal(ref) {
    if(this.addExpensesModalIsOpen) {
      ref.style.transform = "scale(1)"
    } else {
      ref.style.transform = "scale(0.95)"
    }
    this.addExpensesModalIsOpen = !this.addExpensesModalIsOpen;
  },
  handleSplitResultsModal() {
    if(this.splitResultsModalIsOpen) {
      this.splitResultsModalIsOpen = false;
      this.newDivvyModalBodyOnly = true;
    } else {
      this.splitResultsModalIsOpen = true;
      this.newDivvyModalBodyOnly = false;
    }
  }
}