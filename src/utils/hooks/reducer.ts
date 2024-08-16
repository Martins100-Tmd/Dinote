import { useReducer } from 'react';
import { Action, State } from '../../types';

const initialState: State = {
   count: 0,
   auth: {
      text: 'Sign up',
      component: 0,
   },
   credentials: { name: '', password: '', email: '' },
   addnote: false,
};

const stateReducer = (state: State, action: Action) => {
   switch (action.type) {
      case 'CHANGE_AUTH_COMP':
         return { ...state, auth: { ...state.auth, component: state.auth.text === 'Sign up' ? 0 : 1 } };
      case 'CHANGE_AUTH_TEXT':
         return { ...state, auth: { ...state.auth, text: state.auth.text === 'Sign up' ? 'Log in' : 'Sign up' } };
      case 'UPDATE_FIELD':
         return { ...state, credentials: { ...state.credentials, [`${action.field}`]: action.value } };
      case 'ADD_NOTE':
         return { ...state, addnote: !state.addnote };
      default:
         return state;
   }
};

const useGlobalReducer = () => {
   const [state, dispatch] = useReducer(stateReducer, initialState);
   const changeAuthText = () => dispatch({ type: 'CHANGE_AUTH_TEXT' });
   const changeAuthComp = () => dispatch({ type: 'CHANGE_AUTH_COMP' });
   const handleChange = (event: any) => {
      dispatch({ type: 'UPDATE_FIELD', field: event.target?.name, value: event.target.value });
   };
   const addNote = () => dispatch({ type: 'ADD_NOTE' });

   return { state, changeAuthText, changeAuthComp, handleChange, addNote };
};

export default useGlobalReducer;
