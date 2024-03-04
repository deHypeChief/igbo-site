import { generateToken } from "../../utils/jwt.js";
import Admin from "../models/adminModel.js";
import bcrypt from 'bcryptjs'

const handleAdmin = async (req, res) => {
    const { adminID, pin } = req.body

    if (!adminID || !pin) {
        res.status(500).json({
            message: "Some fileds are missing"
        })
    } else {
        const checkExistingAdmin = await Admin.findOne({ adminID })

        if (checkExistingAdmin) {
            res.status(400).json({
                message: "admin already exists"
            })
        } else {
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(pin, salt);


            // Create new Admin b
            await Admin.create({
                adminID,
                pin: hashedPassword,

            })
                .then((data) => {
                    res.status(201).json({
                        message: 'Admin created successfully',
                        data: {
                            _id: data.id,
                            adminID: data.adminID,
                            token: generateToken({id: data.id})

                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        error: 'Error creating admin',
                        message: error
                    });
                })

        }
    }
}

const authAdmin = async (req, res) => {
    const { adminID, pin } = req.body

    if (!adminID || !pin) {
        res.status(500).json({ message: 'adminID or Pin is missing' });
    } else {
        const admin = await Admin.findOne({ adminID })

        if (admin && (await bcrypt.compare(pin, admin.pin))) {
            res.status(200).json({
                _id: admin.id,
                adminID: admin.adminID,
                token: generateToken({id: admin.id})

            })
        } else {
            res.status(403).json(
                { message: "Invalid credentials" }
            )
        }
    }


}



async function getAdmin(req, res){
    // console.log(req);
   const {_id, adminID} = await Admin.findById(req.user.id)
   
    res.status(200).json({
        id: _id,
        role: adminID
    })
}


export { handleAdmin, authAdmin, getAdmin }