
import {GET_QUESTION, GET_ERROR, GET_MESSAGE, GET_USER} from './constants'



const initialState ={
    question: [],
    user: {},
    message: {},
    error: {}

}


const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
      case GET_ERROR:
        return {
            ...state,
            error: action.payload
        };
        case GET_USER:
        return {
            ...state,
            user: action.payload
        };
      case GET_MESSAGE:
        return {
            ...state,
            message: action.payload
        }
    default:
      return state;
  }
};


export default questionReducer