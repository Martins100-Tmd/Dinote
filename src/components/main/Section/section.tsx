import { useState } from 'react';
import SectionContainer from './sectionCont';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSection } from './op';

const NoteSection = ({ id }: { id: string }) => {
   const queryClient = useQueryClient();
   let [state, setstate] = useState({ createSection: false });
   let [sectVal, setSectVal] = useState('');

   let addSectMutation = useMutation({
      mutationFn: (data: any) => addSection(data),
      mutationKey: ['addSection'],
      async onSuccess(data) {
         console.log(data);
         await queryClient.invalidateQueries({ queryKey: ['sectionList'] });
      },
      onError(err) {
         console.log(err);
      },
   });

   return (
      <section className='flex flex-col items-start w-full border-r border-[#222222] justify-between h-full p-2'>
         <section className='flex flex-col gap-2 items-start w-full'>
            <SectionContainer id={id} />
            <div className={`${state.createSection ? 'flex' : 'hidden'} flex-row items-center w-full p-2`}>
               <input
                  onInput={(e) => {
                     const target = e.target as HTMLInputElement;
                     setSectVal(target.value);
                  }}
                  onBlur={(e) => {
                     if (sectVal && id) {
                        addSectMutation.mutate({ title: sectVal, noteId: id });
                        setstate((prev) => ({ ...prev, createSection: false }));
                        e.target.value = '';
                     }
                  }}
                  onKeyPress={(e: any) => {
                     if (e.key === 'Enter' && sectVal && id) {
                        addSectMutation.mutate({ title: sectVal, noteId: id }), setstate((prev) => ({ ...prev, createSection: false }));
                        e.target.value = '';
                     }
                  }}
                  type='text'
                  className='border border-gray-300 bg-transparent text-white outline-none p-2 font-redit text-base'
               />
               <i
                  onClick={() => setstate((prev) => ({ ...prev, createSection: false }))}
                  className='material-icons cursor-pointer text-xl text-gray-300'
               >
                  clear
               </i>
            </div>
         </section>
         <section className='justify-end flex'>
            <div
               className='flex flex-row items-center cursor-pointer'
               onClick={() => setstate((prev) => ({ ...prev, createSection: state.createSection ? false : true }))}
            >
               <i className='material-icons text-2xl text-emerald-200 font-thin'>add</i>
               <p className='font-sand text-sm text-left text-emerald-100 font-medium'>Add Section</p>
            </div>
         </section>
      </section>
   );
};
export default NoteSection;
