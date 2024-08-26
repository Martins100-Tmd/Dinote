import PAGEINITHOC from './PageHOCinit';
import { formattedDate, formattedTime } from './fetch';
import { useEffect } from 'react';

interface dataInt {
   title: string;
   content: string;
   [key: string]: any;
}
interface InitInt {
   newPage: boolean;
   currpageid: string;
   data: dataInt;
}

export default function InitLogic({ newPage, data, currpageid }: InitInt) {
   useEffect(() => console.log(newPage, currpageid), [newPage, currpageid]);

   if (newPage && !currpageid) {
      console.log('NewPage: ', newPage);
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
   } else if (currpageid) {
      return (
         <section className='w-full h-full bg-[#2c2c2c] flex flex-col items-start p-10 gap-10'>
            <section className='flex flex-col items-center gap-3'>
               <PAGEINITHOC tag={'input'} val={data.title} />
               <div className='flex flex-row items-center w-full justify-between'>
                  <p className='text-start w-full font-raj text-slate-200'>{formattedDate}</p>
                  <p className='text-start w-1/4 font-raj text-slate-200'>{formattedTime}</p>
               </div>
            </section>
            <PAGEINITHOC tag={'textarea'} val={data.content} />
         </section>
      );
   }
}
