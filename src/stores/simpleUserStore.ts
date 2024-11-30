import {create} from 'zustand';

export interface SimpleMember {
  id: string;
  name: string;
}

interface SimpleMemberStore {
  members: SimpleMember[];
  addMember: (member: SimpleMember) => void;
  removeMember: (id: string) => void;
}

const useSimpleMemberStore = create<SimpleMemberStore>((set) => ({
  members: [],
  addMember: (member) => set((state) => ({
    members: [...state.members, member]
  })),
  removeMember: (id) => set((state) => ({
    members: state.members.filter((member) => member.id !== id)
  }))
}))

export default useSimpleMemberStore;