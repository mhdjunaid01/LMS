import ManagementTable from '@/components/dynamicTable/managementTable';
import { useBatchContext } from '@/context/BatchContext';
import React from 'react';

const BatchManagement = () => {
  const { batch, loading } = useBatchContext(); 
  
  const columns = ["Batch Name", "Course Name", "Start Date", "End Date"];
  const columnMapping = {
    "Batch Name": "batchName",
    "Course Name": "title",
    "Start Date": "startDate",
    "End Date": "endDate"
  };

  if (loading) return <p>Loading...</p>;


  return (
    <ManagementTable
      title="Batch Management"
      columns={columns}
      data={batch}
      columnMapping={columnMapping}

    />
  );
};

export default BatchManagement;
