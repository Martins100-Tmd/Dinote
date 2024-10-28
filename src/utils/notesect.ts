import { UseMutationResult } from '@tanstack/react-query';
import useGlobalReducer from './hooks/reducer';

export function addNoteLogicFn(notename: string, addNoteMutation: UseMutationResult<any, Error, string, unknown>) {
   let { addNote } = useGlobalReducer();
   const regExpNote = /^[a-zA-Z0-9 ]{3,20}/;
   console.log(notename, regExpNote.test(notename));
   if (notename && regExpNote.test(notename)) {
      addNoteMutation.mutate(notename, {
         onSuccess(data: any) {
            console.log(data);
            addNote();
         },
         onError(err: any) {
            console.log(err.message);
         },
      });
   }
}
