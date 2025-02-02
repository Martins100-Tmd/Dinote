import { useQuery } from '@tanstack/react-query';
import { FormImg, Login, Signup, backendAPI } from '..';
import { useState } from 'react';
import { AuthComponentSwitch } from '../components/state/authstore';

const Authentication: React.FC = function () {
   let [setComponent, component, setText, text] = AuthComponentSwitch((s) => [s.setComponent, s.component, s.setText, s.text]);
   let auth_components = [<Login />, <Signup />][component];
   let [show, setshow] = useState(true);

   const { isSuccess, isLoading, isError } = useQuery({
      queryKey: ['spawn-server'],
      queryFn: async () => {
         const A = await fetch(backendAPI + '/get/users');
         return await A.json();
      },
   });

   let RN = (
      <p className={`font-play text-xs sm:text-lg text-center w-full text-white`}>
         We're waking up our servers! On our free hosting plan, servers pause after 5 minutes of inactivity, so it may take approximately
         50seconds to 1minutes to respond. Thanks for your patience!
      </p>
   );

   if (isSuccess) {
      RN = <p className={`font-play text-xs sm:text-lg text-center w-full text-white`}>Server is Ready!!</p>;
      setTimeout(() => setshow(false), 0);
   }
   if (isLoading) {
      setTimeout(() => {
         RN = (
            <div>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30'
                  height='30'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-loader-circle animate-spin z-50 text-indigo-300'
               >
                  <path d='M21 12a9 9 0 1 1-6.219-8.56' />
               </svg>
            </div>
         );
      }, 10000);
   }
   if (isError) {
      RN = <p className={`font-play text-xs sm:text-lg text-center w-full text-red-600`}>Error Spawning Server! My Bad!</p>;
   }

   return (
      <>
         <section className='w-full h-screen bg-[rgba(0,0,0,3)] flex justify-center relative'>
            <img src={FormImg} className='object-center flex object-cover w-full h-full absolute inset-0 z-0' alt='red' loading='lazy' />
            <div className='absolute z-10 bg-black/45 w-full h-full'></div>
            <section className='sm:relative absolute inset-0 z-50 md:w-[45%] sm:w-3/5 h-full sm:h-auto rounded border border-[#2c2c2c] p-5 mx-auto my-auto justify-center w-full flex flex-row-reverse gap-3 sm:bg-[rgba(0,0,0,0.5)] bg-[rgba(0,0,0,3)]/60'>
               <div className='flex flex-col-reverse items-start w-full self-start h-auto justify-start'>
                  <div className='w-full flex justify-end'>
                     <p
                        onClick={() => {
                           setText(), setComponent();
                        }}
                        className='font-sand text-end self-end text-base font-medium text-white cursor-pointer'
                     >
                        {text}
                     </p>
                  </div>
                  <div className='h-[90%] w-[90%] mx-auto my-auto self-start'>{auth_components}</div>
               </div>
            </section>
         </section>
         <section
            className={`min-w-full h-screen top-0 ${
               show ? 'left-0 fixed' : '-left-full absolute'
            } z-50 flex justify-center bg-black bg-opacity-95`}
         >
            <div className='flex justify-center sm:w-3/5 w-full p-3 mx-auto mt-[10%]'>{RN}</div>
         </section>
      </>
   );
};

export default Authentication;
