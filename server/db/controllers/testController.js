import Lesson from '../models/lessonModel.js'
import Test from '../models/testModel.js'


export async function createTest(req, res) {
    const { testType, questions, xp, lesson } = req.body

    if (!testType || !questions || !xp || !lesson) {
        res.status(500).json({ message: "some fields are missing" })
    } else {
        const exsiting_Test = await Test.findOne({ lesson })

        if (exsiting_Test) {
            res.status(500).json({
                message: "A test has been assinge to this level"
            })
        } else {
            const exsiting_Lesson = await Lesson.findOne({ lesson })
            if (!exsiting_Lesson) {
                res.status(500).json({
                    message: "The Lesson level does not exist"
                })
            } else {
                await Test.create({
                    testType,
                    questions,
                    lesson,
                    xp
                }).then((data) => {
                    res.status(201).json({
                        message: "Test created",
                        data: {
                            type: data.quiz,
                            questions: data.questions,
                            expPoint: data.xp,
                            lessonLevel: data.lesson,
                            created: data.dateCreated
                        }
                    })
                }).catch((error) => {
                    res.status(500).json({
                        message: "Error creating Test",
                        error: error
                    })
                })
            }
        }
    }
}
export async function getTest(req, res) {
    await Test.find()
        .then((data) => {
            res.status(200).json({
                messagees: "all lessons",
                data: data
            })
        })
}


export async function deleteTest(req, res) {
    const { id } = req.body
    if (id) {
        await Test.deleteOne({ _id: id }).then(() => {
            res.status(200).json({
                message: "Test deleted"
            })
        }).catch((error) => {
            res.status(400).json({
                message: "Error deleting test",
                error: error
            })
        })
    } else {
        res.status(500).json({
            message: "No Test Id"
        })
    }
}

export async function getTestByLevel(req, res) {
    const { level } = req.body
    await Test.findOne({ lesson: level }).then((data) => {
        res.status(200).json({
            messagees: "requested test found",
            data: data
        })
    }).catch(() => {
        res.status(500).json({
            message: "Error getting Lesson",
            error: error
        })
    })
}

export async function getLessonWithOutQuiz(req, res) {
    let _lesson = []
    let _test = []
    let data = []

    await Lesson.find().then((data) => {
        _lesson = data
    })
    await Test.find().then((data) => {
        _test = data
    })

    if (_lesson && _test) {
        _lesson.forEach((item, index) => {
            if (item.level != _test[index].lesson) {
                data.push(item)
            }
        })

        res.status(200).json({
            messagees: "requested test found",
            data: data,
        })
    } else {
        res.status(400).json({
            message: "Error getting Lesson with out quiz",
        })
    }
}
