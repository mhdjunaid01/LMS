import User from '../models/User.js';

const editStudents = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, email, role } = req.body;

        if (!id) return res.status(400).json({ message: 'User ID is required' });
        
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { userName, email, role },
            { new: true, runValidators: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ 
            message: 'User updated successfully', 
            updatedUser: {
                _id: updatedUser._id,
                userName: updatedUser.userName,
                email: updatedUser.email,
                role: updatedUser.role
              }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export { editStudents };