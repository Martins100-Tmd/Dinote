import { backendAPI } from '../../..';

export async function delNote(id: string) {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'delete/onenote/' + id, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
}
