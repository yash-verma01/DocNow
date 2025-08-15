import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"


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

//api to get doctor appointment for doctor panel

const doctorAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ docId: req.docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Internal Server Error" });
    }
};

const appointmentComplete = async (req, res) => {
  try {
    const {  appointmentId } = req.body;
    const docId = req.docId; // get from middleware

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId == docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ success: true, message: 'Appointment Completed' });
    } else {
      return res.json({ success: false, message: 'Mark Failed' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const {appointmentId } = req.body;
    const docId = req.docId; // get from middleware

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.json({ success: true, message: 'Appointment Cancelled' });
    } else {
      return res.json({ success: false, message: 'Cancelation Failed' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId; // get from middleware
    const appointments = await appointmentModel.find({ docId });
    let learning = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        learning += item.amount;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashData = {
        earnings: learning,
        patients: patients.length,
        appointments: appointments.length,
        latestAppointments: appointments.reverse().slice(0, 5),

    }
    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

//to get doctor dashboard data doctor profile

const doctorProfile=async (req, res) => {
  try {
    const docId = req.docId; // get from middleware
    const profileData = await doctorModel.findById(docId).select('-password');
    if (!profileData) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};


//update doctor profileform doctor panel


const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId; // get from middleware
    const{fees,address,available}=req.body
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

export { changeAvailability, doctorList, loginDoctor, doctorAppointments, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile }