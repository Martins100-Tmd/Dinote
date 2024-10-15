import { backendAPI } from '../../..';
import { SortFunctions } from '../../../types';
const token = localStorage.getItem(':tk:') ?? 'empty';

export const fetchSectionPages = async function (id: string) {
   try {
      const response = await fetch(`${backendAPI}/get/page/${id}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
};

interface dataInt {
   title: string;
   content: string;
}
export const addPage = async function (data: dataInt) {
   try {
      const response = await fetch(`${backendAPI}/post/newpage`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
         body: JSON.stringify(data),
      });
      return await response.json();
   } catch (error) {
      throw error;
   }
};
export const updatePage = async function (data: dataInt, id: string) {
   try {
      const response = await fetch(`${backendAPI}/put/onepage/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
         body: JSON.stringify({ ...data, title: data.title ?? 'untitled' }),
      });
      return await response.json();
   } catch (error) {
      throw error;
   }
};

export const getSolePage = async function (id: string) {
   try {
      const response = await fetch(`${backendAPI}/get/getpage/${id}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
};

export const updPageName = async function (id: string, data: { title: string }) {
   try {
      const response = await fetch(`${backendAPI}/put/pagename/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
         body: JSON.stringify({ ...data, title: data.title ?? 'untitled' }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
};

export async function deletePage(id: string) {
   try {
      const response = await fetch(`${backendAPI}/delete/onepage/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
         },
      });
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
      return await response.json();
   } catch (error) {
      throw error;
   }
}

export let sortFunctions: SortFunctions = {
   None: (list: any[]) => {
      return list;
   },
   Alphabet: (list: any[]) => {
      return list.sort((a, b) => a.title[0].charCodeAt() - b.title[0].charCodeAt());
   },
   Created: (list: any[]) => {
      return list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
   },
   Updated: (list: any[]) => {
      return list.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
   },
};
