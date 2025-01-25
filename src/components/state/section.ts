import { create } from 'zustand';
import { sectionId } from '../../types/section';

export const sectionIdStore = create<sectionId>()((set) => ({
   sectionId: '',
   setSectionId: (id: string) => set((s) => ({ ...s, sectionId: id })),
}));
