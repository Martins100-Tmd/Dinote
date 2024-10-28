import { useContext } from 'react';
import createNoteState from '../state/context';
import ProfileImage from './profile';
const NoteNavComponent = function () {
   let {
      state: { username },
   } = useContext(createNoteState);

   return (
      <nav className='flex flex-row items-center shadow border-[#2e2e2e] border-b justify-between w-xl p-1 sm:p-3 bg-[#424242]'>
         <section className='flex flex-row items-center gap-10 cursor-pointer' onClick={() => {}}>
            <i className='text-lg sm:text-2xl text-start self-start text-[#fcfcfc] material-icons'>power_settings_new</i>
         </section>
         <section className='flex flex-row items-center gap-2 justify-center'>
            <div className='h-1.5 w-1.5 animate-ping duration-300 bg-gray-950'></div>
            <div className='h-1.5 w-1.5 animate-ping duration-500 bg-white'></div>
            <div className='h-1.5 w-1.5 animate-ping duration-700 bg-gray-400'></div>
         </section>
         <section className='flex flex-row items-center justify-between gap-5'>
            <p className='font-sand font-thin text-sm sm:text-lg text-slate-50'>{username}</p>
            <span className='h-[12px] sm:h-[15px] w-[2px] bg-opacity-45 bg-slate-50'></span>
            <ProfileImage firstLetter={username ? username[0] : 'XX'} />
         </section>
      </nav>
   );
};

export default NoteNavComponent;
