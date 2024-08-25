import { backendAPI } from '../../..';

export const fetchSectionPages = async function (id: string) {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'get/page/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
};
