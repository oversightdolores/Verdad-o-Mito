const express = require('express');
const router = express.Router();

// Importar el controlador
const {createQuestions, getQuestion} = require('../controllers/questionController');

// Crear una nueva pregunta

const createQuestion = async(quest) => {
    try {
        const createQuest =  await createQuestions(quest)
        return createQuest
    }
    catch (error) {
    throw error
    }
}

const getQuestions = async() => {
    try {
        const quest = await getQuestion()
        return quest
    } catch (error) {
        throw error 
    }
}

module.exports = {
    createQuestion,
    getQuestions
};
