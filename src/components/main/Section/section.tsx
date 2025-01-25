import { useState } from 'react';
import SectionContainer from './sectionCont.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSection } from './op.ts';
import React from 'react';

const NoteSection = ({ id }: { id: string }) => {
   const queryClient = useQueryClient();
   const [state, setstate] = useState(false);
   const [sectVal, setSectVal] = useState('');

   const addSectMutation = useMutation({
      mutationFn: (data: { title: string; noteId: string }) => addSection(data),
      mutationKey: ['addSection'],
      async onSuccess() {
         await queryClient.invalidateQueries({ queryKey: ['sectionList'] });
      },
      onError(err) {
         throw err;
      },
   });

   return (
      <section className='flex flex-col items-start sm:w-[70%] w-[90%] border-r border-[#222222] justify-between h-auto'>
         <section className='flex flex-col gap-2 items-start w-full p-2'>
            <SectionContainer id={id} />
            <div className={`${state ? 'flex' : 'hidden'} flex-row items-center w-full p-2 gap-2`}>
               <input
                  onInput={(e) => {
                     const target = e.target as HTMLInputElement;
                     setSectVal(target.value);
                  }}
                  onBlur={(e) => {
                     if (sectVal && id) {
                        addSectMutation.mutate({ title: sectVal, noteId: id });
                        setstate(false);
                        e.target.value = '';
                     }
                  }}
                  type='text'
                  className='border border-gray-300/30 bg-transparent text-white outline-none p-1 rounded-md font-cor text-base'
               />
               <svg
                  onClick={() => setstate(false)}
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-x cursor-pointer text-xl text-gray-300'
               >
                  <path d='M18 6 6 18' />
                  <path d='m6 6 12 12' />
               </svg>
            </div>
         </section>
         <section className='justify-center flex sticky items-center bottom-0 bg-[#262626] w-full p-2'>
            <div className='flex flex-row items-center cursor-pointer self-center' onClick={() => setstate(!state)}>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='17'
                  height='17'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-plus text-white/80 self-center'
               >
                  <path d='M5 12h14' />
                  <path d='M12 5v14' />
               </svg>
               <p className='font-cor text-[12px] font-medium self-end text-left text-white/80'>Add Section</p>
            </div>
         </section>
      </section>
   );
};
export default NoteSection;
