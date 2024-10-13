import { backendAPI } from '../../..';
const token = localStorage.getItem(':tk:') ?? 'empty';

export const fetchSectionPages = async function (id: string) {
   const A = await fetch(backendAPI + 'get/page/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
};

interface dataInt {
   title: string;
   content: string;
}
export const addPage = async function (data: dataInt) {
   const A = await fetch(backendAPI + 'post/newpage', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
   });
   return await A.json();
};
export const updatePage = async function (data: dataInt, id: string) {
   const A = await fetch(backendAPI + 'put/onepage/' + id, {
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

export const getSolePage = async function (id: string) {
   const A = await fetch(backendAPI + 'get/getpage/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
};

export const updPageName = async function (id: string, data: { title: string }) {
   const A = await fetch(backendAPI + 'put/pagename/' + id, {
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

export async function deletePage(id: string) {
   const A = await fetch(backendAPI + 'delete/onepage/' + id, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
}
