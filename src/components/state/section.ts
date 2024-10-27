import { create } from 'zustand';

export interface sectionId {
   sectionId: string;
   setSectionId: (id: string) => void;
}

export const sectionIdStore = create<sectionId>()((set) => ({
   sectionId: '',
   setSectionId: (id: string) => set((s) => ({ ...s, sectionId: id })),
}));
