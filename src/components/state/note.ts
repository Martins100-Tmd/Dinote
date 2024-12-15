import { create } from 'zustand';

interface useStoreInterFace {
   expand: boolean;
   count: number;
   slide: boolean;
   action: string;
   search: boolean;
   setSearch: () => void;
   setAction: () => void;
   setExpand: () => void;
   setCount: () => void;
   setSlide: () => void;
}

export const useStore = create<useStoreInterFace>()((set) => ({
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

interface useStoreIIState {
   addnote: boolean;
   notename: string;
   currnoteobj: object;
   currsectionobj: object;
}
interface useStoreIIInt extends useStoreIIState {
   setCurrNoteObj: (obj: useStoreIIState) => void;
   setCurrSectionObj: (obj: useStoreIIState) => void;
   setAddNote: () => void;
   setNoteName: (val: string) => void;
}
export const useStoreII = create<useStoreIIInt>()((set) => ({
   addnote: false,
   notename: '',
   currnoteobj: {},
   currsectionobj: {},
   setCurrNoteObj: (obj) => set((state) => ({ ...state, currNoteObj: obj })),
   setCurrSectionObj: (obj) => set((state) => ({ ...state, currNoteObj: obj })),
   setAddNote: () => set((state) => ({ ...state, addnote: !state.addnote })),
   setNoteName: (val: string) => set((state) => ({ ...state, notename: val })),
}));
