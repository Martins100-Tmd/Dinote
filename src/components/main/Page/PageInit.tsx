import { useMutation, useQueryClient } from '@tanstack/react-query';
import { backendAPI } from '../../..';
import { sectionId } from '../../state/section';
import { useState } from 'react';

interface bodyReq {
   title: string;
   content: string;
   sectionId: string;
}

export default function PageInit() {
   const dateNow = new Date();
   const formattedDate = String(formatDate(dateNow));
   const timeNow = new Date();
   const formattedTime = String(formatTime(timeNow));
   let currSectId = sectionId((s: any) => s.currSectId);
   const queryClient = useQueryClient();
   let [body, setbody] = useState<bodyReq>({
      title: '',
      content: '',
      sectionId: currSectId,
   });

   const addMutation = useMutation({
      mutationKey: ['addPage'],
      mutationFn: (body: bodyReq) => addPage(body),
      onSuccess: async (data) => {
         console.log(data);
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
      },
      onError: async (error) => {
         console.log(error);
      },
   });
   return (
      <section className='w-full h-full bg-[#2c2c2c] flex flex-col items-start p-10 gap-10'>
         <section className='flex flex-col items-center gap-3'>
            <input
               onBlur={() => (body.title ? addMutation.mutate(body) : '')}
               onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  setbody((bd) => ({ ...bd, title: target.value }));
               }}
               type='text'
               className='w-full outline-none border-b bg-transparent border-slate-200 font-raj text-slate-100 text-3xl font-medium'
               autoFocus
            />
            <div className='flex flex-row items-center w-full justify-between'>
               <p className='text-start w-full font-raj text-slate-200'>{formattedDate}</p>
               <p className='text-start w-1/4 font-raj text-slate-200'>{formattedTime}</p>
            </div>
         </section>
         <textarea
            onBlur={() => (body.title ? addMutation.mutate(body) : '')}
            onChange={(e) => {
               const target = e.target as HTMLTextAreaElement;
               setbody((bd) => ({ ...bd, content: target.value }));
            }}
            className='text-slate-100 text-xl w-full h-full font-raj text-start bg-transparent outline-none border-none'
         ></textarea>
      </section>
   );
}

function formatTime(date: any) {
   const hours = date.getHours();
   const minutes = date.getMinutes();
   const amPm = hours >= 12 ? 'pm' : 'am';
   const formattedHours = hours % 12 || 12;
   // Handle 0 and 12 hours
   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

   return `${formattedHours}:${formattedMinutes} ${amPm}`;
}

function formatDate(date: any) {
   const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
   return date.toLocaleDateString('en-US', options);
}

// const formattedTime = formatTime(now);

async function addPage(body: bodyReq) {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'post/newPage/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
   });
   return await A.json();
}
