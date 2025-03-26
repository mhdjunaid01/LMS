
import axiosInstance from "@/utils/axiosInstance";

const handleDeleteBatch=async(items,batch,setBatch)=>{
    if (!id) {
        throw new Error("Instructor ID is undefined! Cannot delete.");
      }
    
      try {
        const response = await axiosInstance.delete(`/batch/deleteBatch/${items._id}`);
    
        if (response.data.success) {
            setBatch(batch.filter((b) => b._id !== id));
        } else {
          throw new Error(`Delete request failed: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error deleting instructor:", error.message);
      }
}

export default handleDeleteBatch;
