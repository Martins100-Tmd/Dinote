import { ReactNode, createContext, useState } from 'react';
import React from 'react';

const PageContext = createContext(undefined as any);

export function PageContextProvider({ children }: { children: ReactNode }) {
   let [notePageState, setNotePageState] = useState({
      curpageid: '',
   });
   return <PageContext.Provider value={{ notePageState, setNotePageState }}>{children}</PageContext.Provider>;
}
export default PageContext;
