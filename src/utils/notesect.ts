import { UseMutationResult } from '@tanstack/react-query';
import useGlobalReducer from './hooks/reducer';

export function addNoteLogicFn(notename: string, addNoteMutation: UseMutationResult<any, Error, string, unknown>) {
   let { addNote } = useGlobalReducer();
   const regExpNote = /^[a-zA-Z0-9 ]{3,20}/;
   if (notename && regExpNote.test(notename)) {
      addNoteMutation.mutate(notename, {
         onSuccess() {
            addNote();
         },
         onError(err: any) {
            throw err;
         },
      });
   }
}
