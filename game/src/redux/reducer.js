
import {GET_QUESTION, GET_QUESTION_ERROR} from './constants'



const initialState ={
    question: [],
    user: {},
    error: {}

}


const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
      case GET_QUESTION_ERROR:
        return {
            ...state,
            error: action.payload
        }
    default:
      return state;
  }
};


export default questionReducer