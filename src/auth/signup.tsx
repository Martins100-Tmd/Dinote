import useGlobalReducer from '../utils/hooks/reducer.ts';
import { useMutation } from '@tanstack/react-query';
import useLocalStorage from '../utils/hooks/localstorage.ts';
import { SignFn } from '../utils/fetch.ts';
import { AuthComponentSwitch } from '../components/state/authstore.ts';
import { Contact, Lock, Mail } from 'lucide-react';

export default function SignUp() {
   let { handleChange, state } = useGlobalReducer();
   let [_, setvalue] = useLocalStorage(':tk:', 'empty');
   let [setComponent, setText] = AuthComponentSwitch((s) => [s.setComponent, s.setText]);

   const mutation = useMutation({
      mutationFn: (data: any) => SignFn(data),
      mutationKey: ['signup'],
      onSuccess: (data) => {
         setvalue(data.token ?? 'empty');
         setComponent(), setText();
      },
      onError: (err) => new Error(err.message),
   });

   const mutateFn = () => {
      let { name, email, password } = state.credentials;
      name && email && password
         ? mutation.mutate({
              email,
              password,
              username: name,
           })
         : console.log('Make sure all fields are filled');
   };

   return (
      <section className='w-full h-auto flex flex-col items-start gap-10'>
         <div className='w-full flex justify-start'>
            <p className='font-sand sm:text-lg text-sm text-center font-medium text-white underline-offset-2'>
               Don't have an account, register here!
            </p>
         </div>
         <section className='flex flex-col items-center w-full gap-5'>
            <div className='flex flex-col items-start w-full gap-4'>
               <label htmlFor='email' className='font-sand font-medium sm:text-base text-sm text-slate-200'>
                  Username
               </label>
               <div className='flex flex-row items-center w-full p-0.5 bg-stone-600/50 rounded border-b-2 border border-[#2c2c2c]'>
                  <Contact className='text-white w-auto ml-1' />
                  <input
                     name='name'
                     onChange={handleChange}
                     required
                     type='name'
                     className='p-3 text-white w-full text-xs outline-none bg-transparent font-sand'
                     alt='name'
                  />
               </div>
            </div>
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
                     className='p-3 text-white w-full text-xs outline-none bg-transparent font-sand'
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
            <section className='w-full mt-2 flex justify-center'>
               <button onClick={mutateFn} className='rounded shadow p-2 w-full text-white mx-auto bg-neutral-600 font-sand'>
                  Submit
               </button>
            </section>
         </section>
      </section>
   );
}
