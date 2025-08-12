import doctorModel from "../models/doctorModel.js"


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
export { changeAvailability, doctorList }