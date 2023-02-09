import axios from "axios";
import { GET_QUESTION, GET_QUESTION_ERROR } from "./constants";





export const getQuestion = () => {
    return async (dispatch) => {
        try {
          const question = await axios.get('http://192.168.1.16:5173/question');
          dispatch({
            type: GET_QUESTION,
            payload: question.data,
          });
        } catch (error) {
          dispatch({
            type: GET_QUESTION_ERROR,
            payload: error,
          });
        }
      };
}