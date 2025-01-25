import useGlobalReducer from '../utils/hooks/reducer.ts';
import { useMutation } from '@tanstack/react-query';
import { LoginFn } from '../utils/fetch.ts';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
   let { handleChange, state } = useGlobalReducer();

   const mutation = useMutation({
      mutationFn: (data: any) => LoginFn(data),
      mutationKey: ['login'],
      onSuccess: (data) => {
         localStorage.setItem(':tk:', data.token), data && data['token'] && setTimeout(() => (location.href = '/home'), 200);
      },
      onError: (err) => console.log(err),
   });

   const btnAction = () => {
      state.credentials.email && state.credentials.password
         ? mutation.mutate(state.credentials)
         : console.log('Make sure all field are filled');
   };

   return (
      <section className='w-full min-h-[40%] justify-center flex flex-col items-start gap-6'>
         <div className='w-full flex justify-start'>
            <p className='font-sand sm:text-lg text-sm text-center font-medium text-white underline-offset-2'>
               Please log in using your username and password if you already have an account
            </p>
         </div>
         <section className='flex flex-col items-center w-full gap-10'>
            <div className='flex flex-col items-start w-full gap-2'>
               <label htmlFor='email' className='font-sand font-medium sm:text-base text-sm text-slate-200'>
                  Your Email
               </label>
               <div className='flex flex-row items-center w-full p-0.5 bg-stone-600/50 rounded border-b-2 border border-[#2c2c2c]'>
                  <Mail className='text-white w-auto ml-1' />
                  <input
                     name='email'
                     onChange={handleChange}
                     required
                     type='email'
                     className='p-3 text-white w-full text-xs outline-none font-sand autofill:bg-transparent'
                     alt='email'
                  />
               </div>
            </div>
            <div className='flex flex-col items-start w-full gap-2'>
               <label htmlFor='email' className='font-sand font-medium sm:text-base text-sm text-slate-200'>
                  Password
               </label>
               <div className='flex flex-row items-center w-full p-0.5 bg-stone-600/50 rounded border-b-2 border border-[#2c2c2c]'>
                  <Lock className='text-white w-auto ml-1' />
                  <input
                     name='password'
                     onChange={handleChange}
                     required
                     type='password'
                     className='p-3 text-white w-full text-xs outline-none bg-transparent font-sand'
                     alt='password'
                  />
               </div>
            </div>
            <section className='sm:mb-[10%] mb-[5%] w-full flex justify-center'>
               <button onClick={btnAction} className='rounded shadow p-2 w-full text-white mx-auto bg-neutral-600'>
                  <p className='font-sand font-medium text-xs sm:text-base text-center self-center'>Submit</p>
               </button>
            </section>
         </section>
      </section>
   );
}
