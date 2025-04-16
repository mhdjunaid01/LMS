import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import ConfirmDelete from "../modal/ConfirmDelete";
import EditModal from "../modal/EditModal";
import { toast } from "sonner"


const ManagementTable = ({ title, columns, data, columnMapping, onDelete, onSave,hideDelete,hideEdit}) => {

  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }
  

  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteModal = (id) => {
    setDeleteItemId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteItemId(null);
    setIsModalOpen(false);
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
   
    setIsEditModalOpen(true);
   
  };
  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      try {
        await onDelete(deleteItemId);
        toast.success("Item deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete item"); 
      }
    }
    closeDeleteModal();
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col, index) => (
                  <TableHead key={index}>{col}</TableHead>
                ))}
                {
                  hideEdit !== true && hideDelete !== true ? 
                <TableHead className="text-right">Actions</TableHead>
                :null
                }
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex} className="whitespace-normal break-words">
                        {row[columnMapping[col]] || "N/A"}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      {hideEdit!== true ?
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(row)}
                      >
                        <Edit className="h6 w-6" />
                      </Button>
                      :
                      null
                      
                    }
                      { hideDelete!==true ?
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteModal(row)}
                      >
                        <Trash className="h6 w-6" />
                      </Button>
                      :
                      null
}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Confirm Delete Modal */}
      <ConfirmDelete
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        message="This action cannot be undone. Are you sure you want to delete this item?"
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={onSave} 
        selectedItem={selectedItem}
        columns={columns}
        columnMapping={columnMapping}
      />
    </Card>
  );
};

export default ManagementTable;
