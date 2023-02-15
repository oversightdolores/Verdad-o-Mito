const router = require("express").Router()


const {createQuestion, getQuestions} = require('../middleware/middlewareQuestion')

router.post("/", async (req, res) => {
    const quest = req.body
    console.log(quest)
    try {
        const newQuestion = await createQuestion(quest)
        res.status(200).send(newQuestion)
    } catch (error) {
    res.status(400).send(error)
    }
})

router.get("/", async (req, res) => {
    try {
        const getQuest = await getQuestions()
        res.status(200).send(getQuest)
    } catch (error) {
        res.status(404).send(error)
    }
})


module.exports = router