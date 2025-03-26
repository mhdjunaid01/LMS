import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"

const EditModal = ({ isOpen, onClose, onSave, selectedItem, columns, columnMapping }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    toast.success("Item updated successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>Edit Details</DialogTitle>
        {columns.map((col, index) => (
          <div key={index} className="mb-3">
            <label className="text-sm font-medium">{col}</label>
            <Input
              type="text"
              name={columnMapping[col]}
              value={formData[columnMapping[col]] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
