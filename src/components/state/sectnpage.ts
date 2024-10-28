import { create } from 'zustand';

export const storeB = create((set) => ({
   sectionListMenu: false,
   setSectionListMenu: () => set((state: any) => ({ ...state, sectionListMenu: !state.sectionListMenu })),
   currNoteId: '',
   setCurrNoteId: (id: string) => set((state: any) => ({ ...state, currNoteId: id })),
   currSectionId: '',
   setCurrSectionId: (id: string) => set((state: any) => ({ ...state, currSectionId: id })),
}));
