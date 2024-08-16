import { backendAPI } from '..';

export const LoginFn = async (data: any) => {
   const A = await fetch(backendAPI + 'post/login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   });
   const B = await A.json();
   return B;
};

export const SignFn = async (data: any) => {
   const A = await fetch(backendAPI + 'post/signup', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, type: 'signup' }),
   });
   return await A.json();
};

export async function addNoteFn(data: { title: string }) {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'post/newnote', {
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
      method: 'POST',
      body: JSON.stringify(data),
   });
   return await A.json();
}
