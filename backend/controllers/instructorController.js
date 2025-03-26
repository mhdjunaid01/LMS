import User from "../models/User.js";

const getInstructor = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" }).populate("role", "instructor -password").exec();
    if (instructors.length===0) {
      return res.status(404).json({ message: "No instructors found", success: false });
    }
    res.status(200).json({ success: true, instructors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

const deleteInstructor = async (req,res)=>{
  try {
    const {id} = req.params;
    const instructor = await User.findByIdAndDelete(id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found", success: false });
    }
    res.status(200).json({ success: true, message: "Instructor deleted successfully" });
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
}

const editIntructor = async(req,res)=>{
  try {
    const {id}=req.params
    const {userName, email,  role}=req.body;
    
    const response = await User.findByIdAndUpdate(id, { userName, email, role }, { new: true });
    if (!response) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({
      success: true,
      updatedUser: {
        _id: response._id,
        userName: response.userName,
        email: response.email,
        role: response.role
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
    
  }

}

export { getInstructor,deleteInstructor,editIntructor }
