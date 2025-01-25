export interface NoteLayoutInterface {
   sect: sectionT;
   page: string[];
}

type PageT = string[];

export interface NotePageInterface {
   page: PageT;
}

interface SectionItem {
   title: string;
   pages: string[];
}

export type sectionT = SectionItem[];

export interface NoteSectionProps {
   section: sectionT;
}

export interface Action {
   type: string;
   payload?: any;
   notename?: string;
   field?: string;
   value?: string;
}
export interface State {
   count: number;
   auth: {
      text: string;
      component: number;
   };
   credentials: { name?: string; email: string; password: string };
   addnote: boolean;
}

export interface bodyReq {
   title: string;
   content: string;
   sectionId: string;
   updatedAt?: string;
}

export interface bodyReq {
   title: string;
   content: string;
   sectionId: string;
}

export interface SortFunctions {
   [key: string]: (list: any[]) => any[];
}

// Define the allowed keys
export type SortKeys = keyof SortFunctions;

interface PageEditInterface {
   addMutation: UseMutationResult<any, Error, any, unknown>;
   body: { title: string; content: string; sectionId: string };
   setBody: Function;
   sectionId?: string;
}
