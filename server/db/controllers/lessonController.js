import Lesson from '../models/lessonModel.js'

export async function createLesson(req, res) {
    const { level, title, note, xp } = req.body

    if (!level || !title || !note || !xp) {
        res.status(500).json({ message: "some fields are missing" })
    } else {
        const exsiting_Level = await Lesson.findOne({ level })
        const exsiting_Title = await Lesson.findOne({ title })

        if (exsiting_Level || exsiting_Title) {
            res.status(500).json({
                message: "The title or level already exsits"
            })
        } else {
            await Lesson.create({
                level,
                title,
                note,
                xp
            }).then((data) => {
                res.status(201).json({
                    message: "Lesson Created",
                    data: {
                        level: data.level,
                        title: data.title,
                        note: data.note,
                        exp: data.xp
                    }
                })
            }).catch((error) => {
                res.status(500).json({
                    message: "Error creating Lesson",
                    error: error
                })
            })
        }
    }
}


export async function getLessons(req, res){
    await Lesson.find()
    .then((data)=>{
        res.status(200).json({
            messagees: "all lessons",
            data: data
        })
    })
}

export async function getLessonById(req, res){
    const {id} = req.body
    await Lesson.findById(id).then((data)=>{
        res.status(200).json({
            messagees: "requested lesson found",
            data: data
        })
    }).catch(()=>{
        res.status(500).json({
            message: "Error getting Lesson",
            error: error
        })
    })
}

export async function deletLesson(req, res) {
    const { id } = req.body
    if (id){
        await Lesson.deleteOne({ _id: id }).then(() => {
            res.status(200).json({
                message: "Lesson deleted"
            })
        }).catch((error) => {
            res.status(400).json({
                message: "Error deleting lesson",
                error: error
            })
        })
    }else{
        res.status(500).json({
            message: "No Leson Id"
        })
    }
}