const express = require('express');
const router = express.Router();

const {Questions} = require("../db");

 const createQuestions = async (quest) => {
     const { question, response, description  } = quest;
     
     if(!question || !response || !description){
       throw new Error('Debe Completar Los campos')
     }
  try {

    const newQuestion = await Questions.create({
      question: question,
      response: response,
      description: description,
    });

    return newQuestion
  } catch (error) {
   throw error
  }
};


//funcion para que busque una pregunta random en la base de datos Questions 
const getQuestion = async () => {
    try {
        // Contar el número total de preguntas con la propiedad "active" en verdadero
        const count = await Questions.count({ where: { active: true } });
    
        // Generar un número aleatorio entre 0 y count - 1
        const randomIndex = Math.floor(Math.random() * count);
    
        // Buscar la pregunta en la posición aleatoria
        const question = await Questions.findOne({
          where: { active: true },
          offset: randomIndex,
        });
    
        // Enviar la pregunta como respuesta
       return question
      } catch (error) {
        // Enviar un mensaje de error en caso de fallar la operación
        throw { message: 'Error al buscar pregunta al azar' };
      }
};


module.exports = {
    createQuestions,
    getQuestion
}