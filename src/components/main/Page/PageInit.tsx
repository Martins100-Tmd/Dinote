import { useQuery } from '@tanstack/react-query';
import PAGEINITHOC from './PageHOCinit';
import { useState, useEffect, useContext } from 'react';
import { pagePreFetch } from './fetch';
import { PageContext } from '../../state/pageContext';
export default function PageInit() {
   const dateNow = new Date();
   const formattedDate = String(formatDate(dateNow));
   const timeNow = new Date();
   const formattedTime = String(formatTime(timeNow));
   let [title, settitle] = useState('');
   let [body, setbody] = useState('');
   let {
      notePageState: { pagelistempty, currpageid, sectpageid, newPage },
   } = useContext(PageContext);
   const { data, isSuccess, isError, error } = useQuery({
      queryKey: ['prefetchpage'],
      queryFn: () => pagePreFetch(currpageid),
      enabled: !!currpageid,
   });

   useEffect(() => {
      console.log(pagelistempty, 'Section has no pages yet', currpageid);
   }, [sectpageid]);

   useEffect(() => {
      if (isSuccess && data) setbody(data.body), settitle(data.title);
      if (isError) console.log(error);
   }, [currpageid]);

   if (newPage) {
      return (
         <section className='w-full h-full bg-[#2c2c2c] flex flex-col items-start p-10 gap-10'>
            <section className='flex flex-col items-center gap-3'>
               <PAGEINITHOC tag={'input'} />
               <div className='flex flex-row items-center w-full justify-between'>
                  <p className='text-start w-full font-raj text-slate-200'>{formattedDate}</p>
                  <p className='text-start w-1/4 font-raj text-slate-200'>{formattedTime}</p>
               </div>
            </section>
            <PAGEINITHOC tag={'textarea'} />
         </section>
      );
   } else {
      return sectpageid && pagelistempty ? (
         <section className='w-full h-full bg-[#2c2c2c] flex flex-col items-start p-10 gap-10'>
            <section className='flex flex-col items-center gap-3'>
               <PAGEINITHOC tag={'input'} val={title} />
               <div className='flex flex-row items-center w-full justify-between'>
                  <p className='text-start w-full font-raj text-slate-200'>{formattedDate}</p>
                  <p className='text-start w-1/4 font-raj text-slate-200'>{formattedTime}</p>
               </div>
            </section>
            <PAGEINITHOC tag={'textarea'} val={body} />
         </section>
      ) : (
         <section className={`w-full bg-[#2c2c2c] h-full flex justify-center duration-100`}>
            <div className='flex justify-center flex-col'>
               <p className='text-2xl font-semibold text-center mb-10 text-slate-50'>There aren't any pages here.</p>
               <p className='text-xl font-medium text-center font-redit text-slate-200'>Add a page to start taking notes.</p>
            </div>
         </section>
      );
   }
}

function formatTime(date: any) {
   const hours = date.getHours();
   const minutes = date.getMinutes();
   const amPm = hours >= 12 ? 'pm' : 'am';
   const formattedHours = hours % 12 || 12;
   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
   return `${formattedHours}:${formattedMinutes} ${amPm}`;
}

function formatDate(date: any) {
   const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
   return date.toLocaleDateString('en-US', options);
}
