import { useContext, useEffect, useState } from 'react';
import { Icon } from '../../..';
import { useStore } from '../../state/note';
import createNoteState from '../../state/context';
export function NoteHeadFn() {
   let [noteDrop, setNoteDrop] = useStore((state: any) => [state.action, state.setAction]);
   let { state } = useContext(createNoteState);
   let [title, settitle] = useState('Martins Notebook');

   useEffect(() => {
      settitle(state.noteObj ? state.noteObj.title : 'Notebook');
   }, [state]);

   return (
      <section className={`w-full border-b border-[#2c2c2c] flex flex-row justify-between self-start`}>
         <div
            onClick={setNoteDrop}
            className={`w-full flex cursor-pointer flex-row items-center gap-1.5 self-center hover:bg-[#4e4e4e] p-3`}
         >
            <i className={`material-icons text-emerald-500 opacity-65 text-3xl self-center`}>sticky_note_2</i>
            <p className={`font-redit text-lg text-slate-50 font-thin self-center`}>{title}</p>
            <div className='pl-3'>
               <Icon Itext={noteDrop} styling={`material-icons text-3xl text-slate-50 cursor-pointer self-center`} />
            </div>
         </div>
         <div className={`flex justify-end self-center p-3 w-[25%] hover:bg-[#4e4e4e]`}>
            <i className={`material-icons text-slate-200`}>menu_open</i>
         </div>
      </section>
   );
}
