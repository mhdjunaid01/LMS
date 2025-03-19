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


const ManagementTable = ({ title, columns, data, columnMapping, onDelete }) => {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeleteModal = (id) => {
    setDeleteItemId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteItemId(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      onDelete(deleteItemId);
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex}>
                        {row[columnMapping[col]] || "N/A"}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteModal(row._id)}
                      >
                        <Trash className="h6 w-6" />
                      </Button>
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
    </Card>
  );
};

export default ManagementTable;
