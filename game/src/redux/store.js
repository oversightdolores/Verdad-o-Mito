import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'; // Importa tu reducer principal

const store = configureStore({
  reducer: rootReducer,
});

export default store;
