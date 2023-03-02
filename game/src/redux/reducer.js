import { createSlice } from '@reduxjs/toolkit';

const partidaSlice = createSlice({
  name: 'partida',
  initialState: {
    user: {},
    users: [],
    partidas: [],
    errors: {},
    question: {},
    partidaSeleccionada: {},
    turnoActual: 0,
  },
  reducers: {
    setUser: (state,action) => {
      state.user = action.payload;
    },
    setUsers: (state,action) => {
      state.users = action.payload;
    },
    setPartidas: (state, action) => {
      state.partidas = action.payload;
    },
    setPartidaSeleccionada: (state, action) => {
      state.partidaSeleccionada = action.payload;
    },
    setTurnoActual: (state, action) => {
      state.turnoActual = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setQuestion: (state, action) => {
      state.question = action.payload
    }
  },
});

export const { setPartidas, setPartidaSeleccionada, setTurnoActual, setUser, setUsers } = partidaSlice.actions;

export default partidaSlice.reducer;
