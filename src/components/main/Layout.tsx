import NoteSection from './Section/section';
import NotePage from './Page/Page';
import { useNoteIdStore } from '../state/note';

const NoteLayout = function () {
   let noteid = useNoteIdStore((s) => s.currentnoteid);
   return (
      <section className='flex flex-row w-full h-[93%] bg-[rgba(54,54,54,0.9)]'>
         <NoteSection id={noteid} />
         <NotePage />
      </section>
   );
};
export default NoteLayout;
