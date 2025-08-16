import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import upload from "../middlewares/multer.js"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

// add doctor
const addDoctor = async (req,res) => {
try {
const{name, email, password, speciality,degree, experience, about, fees, address}=req.body
const imageFile=req.file


// checking for all data to add doctor
if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
return res.json({success:false,message: "Missing Details"})
}

// validating email format
if (!validator.isEmail(email)) {
return res. json({success:false,message: "Please enter a valid email"})
}

if (password.length < 8) {
    return res. json({success: false, message: "Please enter a strong password"})
}
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

if (!imageFile) {
    return res.json({ success: false, message: "No image file uploaded" });
  }


const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
const imageUrl = imageUpload.secure_url

const doctorData = {
    name,
    email, 
    image: imageUrl, 
    password: hashedPassword, 
    speciality, 
    degree, 
    experience, 
    about, 
    fees,
    address: JSON. parse(address), 
    date:Date.now()
}

const newDoctor = new doctorModel(doctorData)
await newDoctor.save()
res. json({success: true,message: "Doctor Added" })
}

catch(error) {
    console.log(error)
    res. json({success: false,message: error.message})
}
}
//api for admin login
const loginAdmin = async (req,res) => {
    try {
        const {email, password} = req.body
        
        if (email === process.env.ADMIN_EMAIL && password === process. env.ADMIN_PASSWORD) {
        const token = jwt.sign(email+password, process.env. JWT_SECRET)
        res. json ({success:true,token})
        }
        else 
        res. json({success:false,message:"Invalid credentials"})
        }
    catch (error) {
    console.log(error)
    res. json({success: false,message:error.message})
    }
}

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success: true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//api to get all appointments

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success: true, appointments});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//api to appointment cancellation

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Missing appointment ID" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData;
        const docData = await doctorModel.findById(docId);
        let slots_booked = docData.slots_booked || {};
        
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e != slotTime);
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment cancelled successfully" });

    } catch (error) {
        console.error("Error in cancelAppointment:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//api to get admin dashboard
const adminDashboard=async (req, res) => { 
    try {
        const totalDoctors = await doctorModel.find({});
        const totalUser=await userModel.find({});
        const totalAppointments = await appointmentModel.find({});
        const dashData={
            doctors: totalDoctors.length,
            patients: totalUser.length,
            appointments: totalAppointments.length,
            latestAppointments: totalAppointments.reverse().slice(0, 5),
        }
         console.log(dashData);
        res.json({
            success: true,
            dashData
        });
    } catch (error) {
        console.error("Error in adminDashboard:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export {addDoctor,loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard }
