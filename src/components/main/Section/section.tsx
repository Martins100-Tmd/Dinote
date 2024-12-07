import { useState } from 'react';
import SectionContainer from './sectionCont';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSection } from './op';

const NoteSection = ({ id }: { id: string }) => {
   const queryClient = useQueryClient();
   let [state, setstate] = useState(false);
   let [sectVal, setSectVal] = useState('');

   let addSectMutation = useMutation({
      mutationFn: (data: any) => addSection(data),
      mutationKey: ['addSection'],
      async onSuccess() {
         await queryClient.invalidateQueries({ queryKey: ['sectionList'] });
      },
      onError(err) {
         throw err;
      },
   });

   return (
      <section className='flex flex-col items-start sm:w-[70%] w-[90%] border-r border-[#222222] justify-between h-auto p-2'>
         <section className='flex flex-col gap-2 items-start w-full'>
            <SectionContainer id={id} />
            <div className={`${state ? 'flex' : 'hidden'} flex-row items-center w-full p-2`}>
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
                  className='border border-gray-300 bg-transparent text-white outline-none p-2 font-redit text-base'
               />
               <i onClick={() => setstate(false)} className='material-icons cursor-pointer text-xl text-gray-300'>
                  clear
               </i>
            </div>
         </section>
         <section className='justify-end flex sticky bottom-0'>
            <div className='flex flex-row items-center cursor-pointer' onClick={() => setstate(!state)}>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-plus text-indigo-300 self-center'
               >
                  <path d='M5 12h14' />
                  <path d='M12 5v14' />
               </svg>
               <p className='font-play text-sm text-left text-indigo-200 font-medium'>Add Section</p>
            </div>
         </section>
      </section>
   );
};
export default NoteSection;
