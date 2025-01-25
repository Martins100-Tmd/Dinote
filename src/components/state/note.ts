import { create } from 'zustand';
import { noteObjectState, useNoteIdState, useStoreIIInt, useStoreInterFace } from '../../types/note';

export const usePageControllerStore = create<useStoreInterFace>()((set) => ({
   expand: false,
   count: 0,
   slide: false,
   action: 'expand_more',
   search: false,
   setSearch: () => set((state) => ({ ...state, search: !state.search })),
   setAction: () => set((state) => ({ ...state, action: state.action === 'expand_more' ? 'expand_less' : 'expand_more' })),
   setExpand: () => set((state) => ({ ...state, expand: !state.expand })),
   setCount: () => set((state) => ({ ...state, count: state.count + 1 })),
   setSlide: () => set((state) => ({ ...state, slide: !state.slide })),
}));

export const useNoteStore = create<useStoreIIInt>()((set) => ({
   addnote: false,
   notename: '',
   currnoteobj: {},
   currsectionobj: {},
   setCurrNoteObj: (obj) => set((state) => ({ ...state, currNoteObj: obj })),
   setCurrSectionObj: (obj) => set((state) => ({ ...state, currNoteObj: obj })),
   setAddNote: () => set((state) => ({ ...state, addnote: !state.addnote })),
   setNoteName: (val: string) => set((state) => ({ ...state, notename: val })),
}));

export const useNoteIdStore = create<useNoteIdState>()((set) => ({
   currentnoteid: '',
   currentnotename: '',
   setCurrentNoteId: (val: string) => set((state) => ({ ...state, currentnoteid: val })),
   setCurrentNoteName: (val: string) => set((state) => ({ ...state, currentnotename: val })),
}));

export const useNoteObjectStore = create<noteObjectState>()((set) => ({
   noteObj: { id: '', title: '' },
   signal: false,
   reft: false,
   secnal: 3,
   setSignal: () => set((s) => ({ ...s, signal: !s.signal })),
   noteObjectUpdate: (obj: any) => set((s) => ({ ...s, noteObj: obj })),
}));
