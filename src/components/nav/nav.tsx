import { useContext, useEffect } from 'react';
import createNoteState from '../state/context';
import ProfileImage from './profile';
const NoteNavComponent = function () {
   let {
      state: { username },
   } = useContext(createNoteState);

   useEffect(() => {
      console.log(username);
   }, [username]);

   return (
      <nav className='flex flex-row items-center shadow border-[#2e2e2e] border-b justify-between w-full p-3 bg-[#424242]'>
         <section className='flex flex-row items-center gap-10'>
            <i className='material-icons text-2xl opacity-70 text-white font-thin'>west</i>
            <i className='material-icons text-2xl opacity-70 text-white font-thin'>east</i>
         </section>
         <section className='flex justify-center'>
            <p className='font-redit font-medium text-center text-lg text-slate-50'>ThinkTank V:2.0</p>
         </section>
         <section className='flex flex-row items-center justify-between gap-5'>
            <p className='font-redit font-thin text-lg text-slate-50'>{username}</p>
            <span className='h-[15px] w-[2px] bg-opacity-45 bg-slate-50'></span>
            <ProfileImage firstLetter={username[0]} />
         </section>
      </nav>
   );
};

export default NoteNavComponent;
