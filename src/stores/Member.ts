import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

type Member = {
  id: string;
  name: string;
  expenses?: Array<string>;
}

interface MemberState {
  members: Array<Member>;
  addMember: (member: Member) => void;
  removeMember: (id: string) => void;
  addExpenseToMember: (id: string, expense: string) => void;
  removeExpenseFromMember: (id: string, expense: string) => void;
}

const useMemberStore = create<MemberState>()(
  immer((set) => ({
    members: [],
    addMember: (member) => set((state) => {
      state.members.push(member);
    }),
    removeMember: (id) => set((state) => {
      state.members = state.members.filter((member: Member) => member.id !== id);
    }),
    addExpenseToMember: (id, expense) => set((state) => {
      const member = state.members.find((m: Member) => m.id === id);
      if (member) {
        member.expenses = member.expenses
          ? [...member.expenses, expense]
          : [expense];
      }
    }),
    removeExpenseFromMember: (id, expense) => set((state) => {
      const member = state.members.find((m: Member) => m.id === id);
      if (member && member.expenses) {
        member.expenses = member.expenses.filter((e: string) => e !== expense);
      }
    })
  }))
);

export default useMemberStore;
