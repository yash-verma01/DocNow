// api to register user
import validator from 'validator'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
const registerUser=async(req,res)=>{

    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"Please provide all the fields"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Please provide a valid email"})
        }
        if(password.length<8){
            return res.status(400).json({success:false,message:"Password must be at least 8 characters long"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const userData={
            name,
            email,
            password:hashedPassword
        }
        const newData=new userModel(userData);
        const user=await newData.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({success:true,token})

        
    }catch(error){
        console.error("Error in registerUser:", error);
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
    
}
//api for user login
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"Please provide all the fields"})
        }
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({success:true,token})
    }catch(error){
        console.error("Error in loginUser:", error);
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }
        res.json({success: true, user});
    } catch (error) {
        console.error("Error in getProfile:", error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}


    // const updateProfile = async (req, res) => {
    // try {
    //     const { userId, name, phone, address, dob, gender } = req.body
    //     const imageFile = req.file

    //     if (!name || !phone || !dob || !gender) {
    //     return res.json({ success: false, message: "Data Missing" })
    //     }

    //     let updateData = {
    //     name,
    //     phone,
    //     address: address ? JSON.parse(address) : undefined,
    //     dob,
    //     gender
    //     }
    //     await userModel.findByIdAndUpdate(userId, updateData)

        

    //     // If image file is present, upload to cloudinary
    //     if (imageFile) {
    //         const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
    //         const imageUrl = imageUpload.secure_url
    //         await userModel.findByIdAndUpdate(userId, { image: imageUrl })          
    //     }
    //     res.json({ success: true, message: "Profile updated successfully" })
    // } catch (error) {
    //     console.log(error)
    //     res.json({ success: false, message: error.message })
    // }
    // }
    const updateProfile = async (req, res) => {
    try {
        // Use req.userId from auth middleware for security
        const userId = req.userId;
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }

        let updateData = {
            name,
            phone,
            address: address ? JSON.parse(address) : undefined,
            dob,
            gender
        };

        // If image file is present, upload to cloudinary and add to updateData
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url;
        }

        await userModel.findByIdAndUpdate(userId, updateData);

        res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, docId, slotDate, slotTime} = req.body;

//        const docData = await doctorModel.findById(docId).select('-password');
//         if(!docData.available)
//         {
//             return res.status(400).json({ success: false, message: "Doctor is not available" });
//         }
//         let slots_booked=docData.slots_booked;
//         if(slots_booked[slotDate])
//         {
//             if(slots_booked[slotDate].includes(slotTime))
//             {
//                 return res.status(400).json({ success: false, message: "Slot is already booked" });
//             }
//             else
//             {
//                 slots_booked[slotDate].push(slotTime);
//             }
//         }
//         else
//         {
//             slots_booked[slotDate]=[];
//             slots_booked[slotDate].push(slotTime);
//         }
//         const userData = await userModel.findById(userId).select('-password');
//         delete docData.slots_booked;
//         const newAppointment = new appointmentModel({
//             userId,
//             docId,
//             slotDate,
//             slotTime,
//            userData,
//            docData,
//            amount:docData.fees,
//            date:Date.now()
//        });

//         await newAppointment.save();
//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });
//        res.json({ success: true, message: "Appointment booked successfully", appointment: newAppointment });

//     } catch (error) {
//         console.error("Error in bookAppointment:", error);
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// const bookAppointment = async (req, res) => {
//     try {
//         // ✅ User ID auth middleware se lo
//         const userId = req.userId;
//         const { docId, slotDate, slotTime } = req.body;

//         // ✅ Basic validation
//         if (!docId || !slotDate || !slotTime) {
//             return res.status(400).json({ success: false, message: "Missing required fields" });
//         }

//         // ✅ Doctor fetch
//         const docData = await doctorModel.findById(docId).select('-password');
//         if (!docData) {
//             return res.status(404).json({ success: false, message: "Doctor not found" });
//         }
//         if (!docData.available) {
//             return res.status(400).json({ success: false, message: "Doctor is not available" });
//         }

//         // ✅ Ensure slots_booked is always object
//         let slots_booked = docData.slots_booked;
//         if (typeof slots_booked !== 'object' || slots_booked === null || Array.isArray(slots_booked)) {
//             slots_booked = {};
//         }

//         // ✅ Check slot availability
//         if (slots_booked[slotDate]?.includes(slotTime)) {
//             return res.status(400).json({ success: false, message: "Slot is already booked" });
//         }

//         // ✅ Add slot
//         if (!slots_booked[slotDate]) {
//             slots_booked[slotDate] = [];
//         }
//         slots_booked[slotDate].push(slotTime);

//         // ✅ Fetch user data
//         const userData = await userModel.findById(userId).select('-password');
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // ✅ Remove booked slots before saving doctor data in appointment
//         const docDataWithoutSlots = { ...docData.toObject() };
//         delete docDataWithoutSlots.slots_booked;

//         // ✅ Create appointment
//         const newAppointment = new appointmentModel({
//             userId,
//             docId,
//             slotDate,
//             slotTime,
//             userData,
//             docData: docDataWithoutSlots,
//             amount: docData.fees,
//             date: Date.now()
//         });

//         await newAppointment.save();

//         // ✅ Update doctor's booked slots
//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         return res.json({
//             success: true,
//             message: "Appointment booked successfully",
//             appointment: newAppointment
//         });

//     } catch (error) {
//         console.error("Error in bookAppointment:", error);
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };



const bookAppointment = async (req, res) => {
    try {
        // ✅ Auth middleware se userId lo
        const userId = req.userId;
        const { docId, slotDate, slotTime } = req.body;

        // ✅ Basic validation
        if (!docId || !slotDate || !slotTime) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // ✅ Doctor fetch
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        if (!docData.available) {
            return res.status(400).json({ success: false, message: "Doctor is not available" });
        }

        // ✅ Ensure slots_booked is always an object
        let slots_booked = docData.slots_booked || {};
        if (typeof slots_booked !== 'object' || Array.isArray(slots_booked)) {
            slots_booked = {};
        }

        // ✅ Check if slot is already booked
      if (Array.isArray(slots_booked[slotDate]) && slots_booked[slotDate].includes(slotTime)) {
            return res.status(400).json({ success: false, message: "Slot is already booked" });
        }

        // ✅ Add slot
        if (!Array.isArray(slots_booked[slotDate])) {
            slots_booked[slotDate] = [];
        }
        slots_booked[slotDate].push(slotTime);


        // ✅ Fetch user data
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ Remove slots from doctor data for appointment object
        const docDataWithoutSlots = { ...docData.toObject() };
        delete docDataWithoutSlots.slots_booked;

        // ✅ Create new appointment
        const newAppointment = new appointmentModel({
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData: docDataWithoutSlots,
            amount: docData.fees,
            date: Date.now()
        });

        await newAppointment.save();

        // ✅ Update doctor's booked slots
        // docData.slots_booked = slots_booked;
        // await docData.save();
        await doctorModel.findByIdAndUpdate(
        docId,
        { $set: { slots_booked } },
        { new: true }
        );

        return res.json({
            success: true,
            message: "Appointment booked successfully",
            appointment: newAppointment
        });

    } catch (error) {
        console.error("Error in bookAppointment:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//function to list appointments for frontend
const listAppointment=async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await appointmentModel.find({ userId })
        return res.json({
            success: true,
            appointments
        });
    } catch (error) {
        console.error("Error in listAppointment:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
//api to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { appointmentId } = req.body;

        // Validate appointmentId
        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Missing appointment ID" });
        }

        // Find and delete the appointment
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData.userId != userId) {
            return res.status(404).json({ success: false, message: "Unauthorized Action" });
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        //releasing doctor slot

        const {docId,slotDate,slotTime} = appointmentData;
        const docData = await doctorModel.findById(docId);
        let slots_booked = docData.slots_booked || {};
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!=slotTime);
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.json({ success: true, message: "Appointment cancelled successfully" });

    } catch (error) {
        console.error("Error in cancelAppointment:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
// const razorpayInstance=new razorpay({
//     key_id:process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_KEY_SECRET  
// })

// const payment = async (req, res) => {
//     try {
//         const { appointmentId } = req.body;

//         // Validate appointmentId
//         if (!appointmentId) {
//             return res.status(400).json({ success: false, message: "Missing appointment ID" });
//         }

//         // Find the appointment
//         const appointmentData = await appointmentModel.findById(appointmentId);
//         if (!appointmentData || appointmentData.cancelled) {
//             return res.status(404).json({ success: false, message: "Appointment not found" });
//         }

//         // Create a Razorpay payment option
//         const options = {
//             amount: appointmentData.amount * 100,  // Convert to paise
//             currency: "INR",
//             receipt: `receipt_${appointmentId}`
//         };

//         const order = await razorpayInstance.orders.create(options);
//         if (!order) {
//             return res.status(500).json({ success: false, message: "Failed to create order" });
//         }

//         res.json({
//             success: true,
//             order
//         });
//     } catch (error) {
//         console.error("Error in payment:", error);
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// //api to verify payment form razorpay
// const verifyRazorpayPayment = async (req, res) => {
//     try{
//         const{razorpay_order_id}=req.body
//         const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id); 
//         if(orderInfo.status==="paid")
//         {
//             await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{ payment: true });
//             res.json({ success: true, message: "Payment verified successfully" });
//         }else{
//             res.status(400).json({ success: false, message: "Payment verification failed" });
//         }
//     }catch(error){
//         console.error("Error in verifyRazorpayPayment:", error);
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

export { registerUser, loginUser, getUserProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };