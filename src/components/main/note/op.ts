import { backendAPI } from '../../..';

const token = localStorage.getItem(':tk:') ?? 'empty';

export async function delNote(id: string) {
   const A = await fetch(backendAPI + 'delete/onenote/' + id, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
}
