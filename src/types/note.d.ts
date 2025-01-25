export interface useStoreInterFace {
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

export interface useStoreIIState {
   addnote: boolean;
   notename: string;
   currnoteobj: object;
   currsectionobj: object;
}
export interface useStoreIIInt extends useStoreIIState {
   setCurrNoteObj: (obj: useStoreIIState) => void;
   setCurrSectionObj: (obj: useStoreIIState) => void;
   setAddNote: () => void;
   setNoteName: (val: string) => void;
}

export interface useNoteIdState {
   currentnoteid: string;
   currentnotename: string;
   setCurrentNoteId: (val: string) => void;
   setCurrentNoteName: (val: string) => void;
}
