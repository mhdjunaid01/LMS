import axiosInstance from "@/utils/axiosInstance";

const handleEditBatch = async (updatedItem, setBatch) => {
  try {
    const updatedData = {
      ...updatedItem,
      batchName: updatedItem.batchName?.toUpperCase(),
    };

    const response = await axiosInstance.put(`/batch/updateBatch/${updatedData._id}`,updatedData);

    if (response.status !== 200) throw new Error("Failed to update batch");

    setBatch((prevBatch) =>
      prevBatch.map((item) =>
        item._id === updatedData._id ? updatedData : item
      )
    );
  } catch (error) {
    console.error("Error updating batch:", error);
  }
};
export default handleEditBatch;
