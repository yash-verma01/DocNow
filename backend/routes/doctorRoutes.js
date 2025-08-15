import express from 'express';
import { doctorList,loginDoctor,doctorAppointments,appointmentCancel,appointmentComplete } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
const doctorRouter = express.Router();
doctorRouter.get('/lists',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,doctorAppointments)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)

export default doctorRouter;