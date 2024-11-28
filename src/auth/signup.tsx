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
            <p className='font-play text-xl font-semibold text-white'>Sign up</p>
         </div>
         <section className='flex flex-col items-center w-full gap-5'>
            <div className='flex flex-col items-start w-full gap-4'>
               <label htmlFor='email' className='font-play font-semibold sm:text-base text-xs text-white'>
                  Username
               </label>
               <input
                  onChange={handleChange}
                  type='text'
                  name='name'
                  className='p-3 text-white w-full text-xs border-b-2 outline-none sm:bg-[#191919] bg-[#191919]/60 border rounded border-[#2c2c2c] font-play'
                  alt='text'
               />
            </div>
            <div className='flex flex-col items-start w-full gap-2'>
               <label htmlFor='email' className='font-play font-semibold sm:text-base text-xs text-white'>
                  Your Email
               </label>
               <input
                  onChange={handleChange}
                  type='email'
                  name='email'
                  className='p-3 text-white w-full text-xs border-b-2 outline-none sm:bg-[#191919] bg-[#191919]/60 rounded border border-[#2c2c2c] font-play'
                  alt='email'
               />
            </div>
            <div className='flex flex-col items-start w-full gap-2'>
               <label htmlFor='email' className='font-play font-semibold sm:text-base text-xs text-white'>
                  Password
               </label>
               <input
                  name='password'
                  onChange={handleChange}
                  type='password'
                  className='p-3 text-white w-full text-xs border-b-2 outline-none sm:bg-[#191919] bg-[#191919]/60 rounded border border-[#2c2c2c] font-play'
                  alt='password'
               />
            </div>
            <section className='w-full mt-2 flex justify-center'>
               <button
                  onClick={mutateFn}
                  className='rounded-lg shadow p-3.5 w-full text-white mx-auto font-play font-semibold border border-[#2c2c2c] sm:text-lg text-sm bg-[#202020]'
               >
                  Submit
               </button>
            </section>
         </section>
      </section>
   );
}
