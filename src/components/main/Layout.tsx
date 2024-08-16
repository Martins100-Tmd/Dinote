import NoteSection from './Section/section';
import NotePage from './Page/Page';
import { storeB } from '../state/sectnpage';

const NoteLayout = function () {
   let [currNoteId, currSectId] = storeB((state: any) => [state.currNoteId, state.currSectionId]);
   return (
      <section className='flex flex-row w-full h-[93%]'>
         <NoteSection id={currNoteId} />
         <NotePage id={currSectId} />
      </section>
   );
};
export default NoteLayout;
