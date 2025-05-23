import handleDeleteBatch from '@/components/actions/BatchDelete';
import handleEditBatch from '@/components/actions/EditBatch';
import ManagementTable from '@/components/dynamicTable/managementTable';
import { useBatchContext } from '@/context/BatchContext';
import {  motion} from "framer-motion";
// import axiosInstance from '@/utils/axiosInstance';
import React from 'react';

const BatchManagement = () => {
  const { batch, loading, error, setBatch } = useBatchContext(); 

  const columns = ["Batch Name", "Course Name", "Start Date", "End Date"];
  const columnMapping = {
    "Batch Name": "batchName",
    "Course Name": "title",
    "Start Date": "startDate",
    "End Date": "endDate"
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (items) => {
    await handleDeleteBatch(items, batch, setBatch);
  };

  const handleSaveEdit = async (updatedItem) => {
   await handleEditBatch(updatedItem, setBatch);
  };

  return (
     <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
    <ManagementTable
      title="Batch Management"
      columns={columns}
      data={batch}
      columnMapping={columnMapping}
      onDelete={handleDelete}
      onSave={handleSaveEdit}
    />
    </motion.div>
  );
};

export default BatchManagement;
