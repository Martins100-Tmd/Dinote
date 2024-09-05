import { backendAPI } from '../..';

const token = localStorage.getItem(':tk:') ?? 'empty';
export const AuthenticateUser = async () => {
   const A = await fetch(backendAPI + 'get/auth', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   const B = await A.json();
   return B;
};
