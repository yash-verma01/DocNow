import express from 'express';
import { doctorList,loginDoctor } from '../controllers/doctorController.js';
const doctorRouter = express.Router();
doctorRouter.get('/lists',doctorList)
doctorRouter.post('/login',loginDoctor)
export default doctorRouter;