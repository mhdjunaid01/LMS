import { useBatchContext } from "@/context/BatchContext";
import { batchFormControls } from "@/config/customForms";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CommonForm from "../CommonForm";
import { checkBatchFormIsValid } from "@/utils/batchUtils";
import { batchSchema } from "@/services/schemasZod";

export default function AddBatch() {
  const { batchFormData, setBatchFormData, courses, instructors, handleAddBatch } = useBatchContext();
  
  const formControls = batchFormControls(courses || [], instructors || []);

  return (
    <Card className="p-6 space-y-4">
      <CardHeader>
        <CardTitle>Add Batch</CardTitle>
        <CardDescription>Enter batch details including Course and Instructor.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CommonForm
          formControls={formControls}
          buttonText={"Add Batch"}
          formData={batchFormData}
          setFormData={setBatchFormData}
          isButtonDisabled={!checkBatchFormIsValid(batchFormData)}
          handleSubmit={handleAddBatch}
          validationSchema={batchSchema}
        />
      </CardContent>
    </Card>
  );
}