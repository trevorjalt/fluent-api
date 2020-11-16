const express = require('express')
const LanguageService = require('./language-service')
const xss = require('xss')
const { requireAuth } = require('../middleware/jwt-auth')
const { LinkedList } = require('./linked-list')
const jsonBodyParser = express.json()

const languageRouter = express.Router()

languageRouter
    .use(requireAuth)
    .use(async (req, res, next) => {
        try {
            const language = await LanguageService.getUsersLanguage(
                req.app.get('db'),
                req.user.id,
            )

            if (!language)
                return res.status(404).json({
                    error: `You don't have any languages`,
                })

            req.language = language
            next()
        } catch (error) {
            next(error)
        }
    })

languageRouter
    .get('/', async (req, res, next) => {
        try {
            const words = await LanguageService.getLanguageWords(
                req.app.get('db'),
                req.language.id,
            )

            res.json({
                language: req.language,
                words,
            })

            next()
        } catch (error) {
            next(error)
        }
    })

languageRouter
    .get('/head', async (req, res, next) => {
        try {
            let word = await LanguageService.getListHead(
                req.app.get('db'),
                req.language.id
            );
        
            res.json({
                nextWord: word.original,
                totalScore: req.language.total_score,
                wordCorrectCount: word.correct_count,
                wordIncorrectCount: word.incorrect_count,
            });
          
        } catch (error) {
            next(error);
        }
    })

languageRouter
    .post('/guess', jsonBodyParser, async (req, res, next) => {
        try {
            const { guess } = req.body
            if (!guess)
                return res.status(400).json({
                    error: `Missing 'guess' in request body`
                })

            const words = await LanguageService.getLanguageWords(
                req.app.get('db'),
                req.language.id,
            )

            const linkedList = LanguageService.populateLinkedList(
                req.language,
                words,
            )
            const currNode = linkedList.head
            const answer = currNode.value.translation
            let isCorrect

            if (guess === answer) {
                isCorrect = true
                linkedList.head.value.memory_value = Number(currNode.value.memory_value) * 2
                linkedList.head.value.correct_count = Number(linkedList.head.value.correct_count) + 1
                linkedList.total_score = Number(linkedList.total_score) + 1
            } else {
                isCorrect = false
                linkedList.head.value.memory_value = 1
                linkedList.head.value.incorrect_count = Number(linkedList.head.value.incorrect_count) + 1
            }

            linkedList.moveListHead(linkedList.head.value.memory_value)
            await LanguageService.persistLinkedList(
                req.app.get('db'),
                linkedList,
            )

            res.json({
                nextWord: linkedList.head.value.original,
                wordCorrectCount: linkedList.head.value.correct_count,
                wordIncorrectCount: linkedList.head.value.incorrect_count,
                totalScore: linkedList.total_score,
                answer,
                isCorrect,
            })
        } catch (error) {
            next(error)
        }
    })

module.exports = languageRouter