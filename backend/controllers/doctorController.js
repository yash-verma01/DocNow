import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const changeAvailability = async (req, res) => {
    console.log("Changing doctor availability")
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        console.log(docData)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "Doctor availability changed successfully" })
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" })
    }
}

const doctorList=async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" })
    }
}


//api to login doctor

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: "invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            return res.json({ success: true, message: "Login successful", token })
        }
        res.json({ success: false, message: "Invalid credentials" })
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" })
    }
}

export { changeAvailability, doctorList, loginDoctor }