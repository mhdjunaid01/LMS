// import React, { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Edit, Trash } from "lucide-react";
// import ConfirmDelete from "../modal/ConfirmDelete";
// import EditModal from "../modal/EditModal";
// import { toast } from "sonner";

// const ManagementTable = ({
//   title,
//   columns,
//   data,
//   columnMapping,
//   onDelete,
//   onSave,
//   hideDelete,
//   hideEdit,
// }) => {
//   const [deleteItemId, setDeleteItemId] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [filterText, setFilterText] = useState("");

//   const openDeleteModal = (id) => {
//     setDeleteItemId(id);
//     setIsModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setDeleteItemId(null);
//     setIsModalOpen(false);
//   };

//   const openEditModal = (item) => {
//     setSelectedItem(item);
//     setIsEditModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (deleteItemId) {
//       try {
//         await onDelete(deleteItemId);
//         toast.success("Item deleted successfully!");
//       } catch (error) {
//         toast.error("Failed to delete item");
//       }
//     }
//     closeDeleteModal();
//   };

//   const filteredData = data.filter((row) =>
//     columns.some((col) =>
//       (row[columnMapping[col]] || "")
//         .toString()
//         .toLowerCase()
//         .includes(filterText.toLowerCase())
//     )
//   );

//   return (
//     <Card>
//       <CardHeader className="flex justify-between flex-row items-center">
//         <CardTitle className="text-3xl font-extrabold">{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Filter..."
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             className="border rounded px-4 py-2 w-full"
//           />
//         </div>
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 {columns.map((col, index) => (
//                   <TableHead key={index}>{col}</TableHead>
//                 ))}
//                 {hideEdit !== true && hideDelete !== true ? (
//                   <TableHead className="text-right">Actions</TableHead>
//                 ) : null}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredData.length > 0 ? (
//                 filteredData.map((row, rowIndex) => (
//                   <TableRow key={rowIndex}>
//                     {columns.map((col, colIndex) => (
//                       <TableCell
//                         key={colIndex}
//                         className="whitespace-normal break-words"
//                       >
//                         {row[columnMapping[col]] || "N/A"}
//                       </TableCell>
//                     ))}
//                     <TableCell className="text-right">
//                       {hideEdit !== true ? (
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => openEditModal(row)}
//                         >
//                           <Edit className="h6 w-6" />
//                         </Button>
//                       ) : null}
//                       {hideDelete !== true ? (
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => openDeleteModal(row)}
//                         >
//                           <Trash className="h6 w-6" />
//                         </Button>
//                       ) : null}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length + 1}
//                     className="text-center"
//                   >
//                     No data available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>

//       {/* Confirm Delete Modal */}
//       <ConfirmDelete
//         isOpen={isModalOpen}
//         onClose={closeDeleteModal}
//         onConfirm={handleConfirmDelete}
//         message="This action cannot be undone. Are you sure you want to delete this item?"
//       />

//       {/* Edit Modal */}
//       <EditModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={onSave}
//         selectedItem={selectedItem}
//         columns={columns}
//         columnMapping={columnMapping}
//       />
//     </Card>
//   );
// };

// export default ManagementTable;
import React, { useState } from "react";
import * as XLSX from "xlsx";
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
import { toast } from "sonner";

const ManagementTable = ({
  title,
  columns,
  data,
  columnMapping,
  onDelete,
  onSave,
  hideDelete,
  hideEdit,
}) => {
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

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

  const filteredData = data.filter((row) =>
    columns.some((col) =>
      (row[columnMapping[col]] || "")
        .toString()
        .toLowerCase()
        .includes(filterText.toLowerCase())
    )
  );

  const exportToExcel = () => {
    const excelData = filteredData.map((row) => {
      const formattedRow = {};
      columns.forEach((col) => {
        formattedRow[col] = row[columnMapping[col]] || "";
      });
      return formattedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const fileName = `${title.replace(/\s+/g, "_")}_data.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const exportToCSV = () => {
    const csvData = filteredData.map((row) => {
      const formattedRow = {};
      columns.forEach((col) => {
        formattedRow[col] = row[columnMapping[col]] || "";
      });
      return formattedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute(
      "download",
      `${title.replace(/\s+/g, "_")}_data.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Filter..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-1/2"
          />
          <div className="flex gap-2">
            <Button onClick={exportToCSV}>Export CSV</Button>
            <Button onClick={exportToExcel}>Export Excel</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col, index) => (
                  <TableHead key={index}>{col}</TableHead>
                ))}
                {hideEdit !== true && hideDelete !== true ? (
                  <TableHead className="text-right">Actions</TableHead>
                ) : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className="whitespace-normal break-words"
                      >
                        {row[columnMapping[col]] || "N/A"}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      {hideEdit !== true ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(row)}
                        >
                          <Edit className="h6 w-6" />
                        </Button>
                      ) : null}
                      {hideDelete !== true ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(row)}
                        >
                          <Trash className="h6 w-6" />
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <ConfirmDelete
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        message="This action cannot be undone. Are you sure you want to delete this item?"
      />

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
