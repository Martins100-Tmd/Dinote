import { useContext, useEffect, useRef, useState } from 'react';
import { Icon } from '../../..';
import { useStore } from '../../state/note';
import createNoteState from '../../state/context';
import { ArrowDownWideNarrow } from 'lucide-react';
import { sortAction } from '../../state/page';
export function NoteHeadFn() {
   let [noteDrop, setNoteDrop] = useStore((state: any) => [state.action, state.setAction]);
   let { state } = useContext(createNoteState);
   let [title, settitle] = useState('Martins Notebook');
   let [sort, setsort] = useState(false);
   let { setAction } = sortAction();

   useEffect(() => {
      settitle(state.noteObj ? state.noteObj.title : 'Notebook');
   }, [state]);

   const buttonRef: any = useRef(null);

   useEffect(() => {
      sort && buttonRef && buttonRef.current && buttonRef.current.focus();
   }, [sort]);

   return (
      <section className={`w-full border-b border-[#2c2c2c] flex flex-row justify-between self-start`}>
         <div
            onClick={setNoteDrop}
            className={`w-full flex cursor-pointer flex-row items-center gap-1.5 self-center hover:bg-[#4e4e4e] p-3`}
         >
            <i className={`material-icons text-gray-200 opacity-65 text-xl self-center`}>sticky_note_2</i>
            <p className={`font-sand text-sm text-slate-50 font-thin self-center`}>{title}</p>
            <div className='pl-3'>
               <Icon Itext={noteDrop} styling={`material-icons text-xl text-slate-50 cursor-pointer self-center`} />
            </div>
         </div>
         <div className={`flex justify-end self-center p-3 w-[25%] hover:bg-[#4e4e4e] relative`}>
            <ArrowDownWideNarrow className={`material-icons text-slate-200 cursor-pointer`} onClick={() => setsort(true)} />
            <button
               ref={buttonRef}
               tabIndex={0}
               onBlur={() => setsort(false)}
               className={`min-w-[150px] min-h-[120px] -right-[150%] border-[0.1px] border-opacity-20 border-gray-100 rounded top-8 ${
                  sort ? 'flex' : 'hidden'
               } flex-col items-start justify-start absolute bg-[#323232] z-50`}
            >
               <p className='w-full flex justify-start p-2 text-sm font-medium font-sand text-gray-50 bg-[#2d2d2d] rounded'>Sort By</p>
               <div className='flex flex-col items-start w-full gap-1.5'>
                  <p
                     onClick={() => {
                        setAction('None'), setsort(false);
                     }}
                     className='pl-5 py-2 hover:bg-[#4e4e4e] hover:bg-opacity-60 w-full cursor-pointer font-sand text-start text-xs text-gray-100'
                  >
                     None
                  </p>
                  <p
                     onClick={() => {
                        setAction('sortAZ'), setsort(false);
                     }}
                     className='pl-5 py-2 hover:bg-[#4e4e4e] hover:bg-opacity-60 w-full cursor-pointer font-sand text-start text-xs text-gray-100'
                  >
                     Alphabetical (A - Z)
                  </p>
                  <p
                     onClick={() => {
                        setAction('sortZA'), setsort(false);
                     }}
                     className='pl-5 py-2 hover:bg-[#4e4e4e] hover:bg-opacity-60 w-full cursor-pointer font-sand text-start text-xs text-gray-100'
                  >
                     Alphabetical (Z - A)
                  </p>
                  <p
                     onClick={() => {
                        setAction('Created'), setsort(false);
                     }}
                     className='pl-5 py-2 hover:bg-[#4e4e4e] hover:bg-opacity-60 w-full cursor-pointer font-sand text-start text-xs text-gray-100'
                  >
                     Date Created
                  </p>
                  <p
                     onClick={() => {
                        setAction('Updated'), setsort(false);
                     }}
                     className='pl-5 py-2 hover:bg-[#4e4e4e] hover:bg-opacity-60 w-full cursor-pointer font-sand text-start text-xs text-gray-100'
                  >
                     Date Modified
                  </p>
               </div>
            </button>
         </div>
      </section>
   );
}
