import { ReactNode, createContext, useState } from 'react';

const createNoteState = createContext(undefined as any);

export function NoteStateProvider({ children }: { children: ReactNode }) {
   let [state, setstate] = useState({
      noteObj: { id: '', title: '' },
      signal: false,
      reft: false,
      secnal: 3,
      username: 'User',
   });

   const noteObjFn = (obj: any) => setstate((s: any) => ({ ...s, noteObj: obj }));

   return <createNoteState.Provider value={{ noteObjFn, state, setstate }}>{children}</createNoteState.Provider>;
}

export default createNoteState;
