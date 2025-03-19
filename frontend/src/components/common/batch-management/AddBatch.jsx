import { useBatchContext } from "@/context/BatchContext";
import { batchFormControls } from "@/config/customForms";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CommenForm from "../CommenForm";
import { checkBatchFormIsValid } from "@/utils/batchUtils";

export default function AddBatch() {
  const { batchFormData, setBatchFormData, courses, instructors,handleAddBatch} = useBatchContext();
  console.log("Batch Form Data:", batchFormData);
 const formControls= batchFormControls(courses || [], instructors || [])
  console.log("Form Controls:", formControls);

  return (
    <Card className="p-6 space-y-4">
      <CardHeader>
        <CardTitle>Add Batch</CardTitle>
        <CardDescription>Enter batch details including Course and Instructor.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CommenForm
       formControls={batchFormControls(courses || [], instructors || [])}
          buttonText={"Add Batch"}
          formData={batchFormData}
          setFormData={setBatchFormData}
          isButtonDisabled={!checkBatchFormIsValid(batchFormData)}
          handleSubmit={handleAddBatch}
        />
      </CardContent>
    </Card>
  );
}
