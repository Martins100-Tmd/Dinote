import { ReactNode, createContext, useState } from 'react';

interface secStateInt {
   sectionfirstborn: string;
   currsection: string;
}

interface sectionContextInt {
   sectionState: secStateInt;
   setFirstBorn: (id: string) => void;
   setCurrSection: (id: string) => void;
}

const sectionContext = createContext<sectionContextInt>({
   sectionState: { sectionfirstborn: '', currsection: '' },
   setFirstBorn: () => {},
   setCurrSection: () => {},
});

export const SectionContextProvider = ({ children }: { children: ReactNode }) => {
   let [sectionState, setSectionState] = useState<secStateInt>({
      sectionfirstborn: '',
      currsection: '',
   });

   const setFirstBorn = (id: string) => setSectionState((prev) => ({ ...prev, sectionfirstborn: id }));
   const setCurrSection = (id: string) => setSectionState((prev) => ({ ...prev, currsection: id }));

   return <sectionContext.Provider value={{ sectionState, setCurrSection, setFirstBorn }}>{children}</sectionContext.Provider>;
};

export default sectionContext;
