import { v4 as uuid } from 'uuid';

const initialState = {
    uuid : '',
    prefrences : []
  };

  export default (state = initialState, action) => {
    switch (action.type) {

      case 'CREATE_UUID':
        return {...state, uuid : Math.floor(Math.random()*1000000000) }
      case 'SET_PREFRENCES' :
        return {...state, prefrences:action.payload}
      default:
        return state;
    }
  };