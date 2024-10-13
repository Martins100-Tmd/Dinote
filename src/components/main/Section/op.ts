import { backendAPI } from '../../..';
const token = localStorage.getItem(':tk:') ?? 'empty';
export async function addSection(data: { title: string; noteId: string }) {
   const A = await fetch(backendAPI + 'post/newsection', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
   });
   return await A.json();
}

export async function delSection(id: string) {
   const A = await fetch(backendAPI + 'delete/onesect/' + id, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
}

export const newkey = Math.floor(Math.random() * 1000);

export const fetchNoteSection = async (id: string) => {
   const A = await fetch(backendAPI + 'get/section/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         Authorization: 'Bearer ' + token,
      },
   });
   return id ? await A.json() : new Promise((res) => res([]));
};

export const updSectionName = async function (id: string, data: { title: string }) {
   const A = await fetch(backendAPI + 'put/sectname/' + id, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ ...data, title: data.title ?? 'untitled' }),
   });
   return await A.json();
};
