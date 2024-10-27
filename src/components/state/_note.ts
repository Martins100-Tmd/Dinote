import { create } from 'zustand';

export interface NoteStoreState {
   currNoteId: string;
   currNoteName: string;
   setCurrNoteId: (val: string) => void;
   setCurrNoteName: (val: string) => void;
}

export const NoteStore = create<NoteStoreState>()((set) => ({
   currNoteId: '',
   currNoteName: '',
   setCurrNoteId: (val: string) => set((state) => ({ ...state, currNoteId: val })),
   setCurrNoteName: (val: string) => set((state) => ({ ...state, currNoteName: val })),
}));
