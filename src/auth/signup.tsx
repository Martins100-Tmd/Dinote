import useGlobalReducer from '../utils/hooks/reducer';
import { useMutation } from '@tanstack/react-query';
import useLocalStorage from '../utils/hooks/localstorage';
import { SignFn } from '../utils/fetch';

export default function SignUp() {
   let { handleChange, state } = useGlobalReducer();
   let [_, setvalue] = useLocalStorage(':tk:', 'empty');

   const mutation = useMutation({
      mutationFn: (data: any) => SignFn(data),
      mutationKey: ['signup'],
      onSuccess: (data) => setvalue(data.token ?? 'empty'),
      onError: (err) => console.log(err),
   });

   const mutateFn = () => {
      let { name, email, password } = state.credentials;
      console.log(name, email, password);
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
            <p className='font-sand text-3xl font-semibold text-white'>Sign up</p>
         </div>
         <section className='flex flex-col items-center w-full gap-5'>
            <div className='flex flex-col items-start w-full gap-4'>
               <label htmlFor='email' className='font-sand font-semibold sm:text-base text-xs text-slate-200'>
                  Username
               </label>
               <input
                  onChange={handleChange}
                  type='text'
                  name='name'
                  className='px-1 py-1.5 text-slate-50 w-full border-b-2 outline-none bg-transparent border-[#555555] font-sand'
                  alt='text'
               />
            </div>
            <div className='flex flex-col items-start w-full gap-2'>
               <label htmlFor='email' className='font-sand font-semibold sm:text-base text-xs text-slate-200'>
                  Your Email
               </label>
               <input
                  onChange={handleChange}
                  type='email'
                  name='email'
                  className='px-1 py-1.5 text-slate-50 w-full border-b-2 outline-none bg-transparent border-[#555555] font-sand'
                  alt='email'
               />
            </div>
            <div className='flex flex-col items-start w-full gap-2'>
               <label htmlFor='email' className='font-sand font-semibold sm:text-base text-xs text-slate-200'>
                  Password
               </label>
               <input
                  name='password'
                  onChange={handleChange}
                  type='password'
                  className='px-1 py-1.5 text-slate-50 w-full border-b-2 outline-none bg-transparent border-[#555555] font-sand'
                  alt='password'
               />
            </div>
            <section className='w-full mt-[5%] flex justify-center'>
               <button onClick={mutateFn} className='rounded-2xl shadow p-4 w-full mx-auto font-sand font-semibold text-xl bg-[#555555]'>
                  Submit
               </button>
            </section>
         </section>
      </section>
   );
}
