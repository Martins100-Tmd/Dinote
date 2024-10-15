import { backendAPI } from '../..';

const token = localStorage.getItem(':tk:') ?? 'empty';
export const AuthenticateUser = async () => {
   try {
      const response = await fetch(`${backendAPI}/get/auth`, {
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
