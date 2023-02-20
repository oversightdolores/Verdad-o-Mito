import axios from "axios";
import { GET_QUESTION, GET_ERROR, GET_MESSAGE, GET_USER } from "./constants";





export const getQuestion = () => {
    return async (dispatch) => {
        try {
          const question = await axios.get('http://192.168.1.16:5174/question');
          dispatch({
            type: GET_QUESTION,
            payload: question.data,
          });
        } catch (error) {
          dispatch({
            type: GET_ERROR,
            payload: error,
          });
        }
      };
}

export const createUser = (user) => {
  return async (dispatch) => {
    try {
     const newUser = await axios.post('http://192.168.1.16:5174/register',user)
     dispatch({
      type: GET_MESSAGE,
      payload: newUser.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: error,
    });
  }
}
}

export const getUser = (sub) => {
  return async (dispatch) => {
    try {
     const user = await axios.post('http://192.168.1.16:5174/register',sub)
     dispatch({
      type: GET_USER,
      payload: user.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: error,
    });
  }
}
}