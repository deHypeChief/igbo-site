import Test from '../models/testModel.js'


export async function createTest(req, res) {
    const { testType, questions, xp ,lesson} = req.body

    if (!testType || !questions || !xp || !lesson) {
        res.status(500).json({ message: "some fields are missing" })
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
    if (id){
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
    }else{
        res.status(500).json({
            message: "No Test Id"
        })
    }
}