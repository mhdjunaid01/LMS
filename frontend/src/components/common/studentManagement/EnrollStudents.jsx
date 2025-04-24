import { enrollFormControls } from '@/config/customForms'
import { useBatchContext } from '@/context/BatchContext'
import { useEnrollmentContext } from '@/context/EnrollmentContext'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CommonForm from '../CommonForm';
import { checkEnrollFormIsValid } from '@/utils/enrollUtils';
import { enrollSchema } from '@/services/schemasZod.js';
import { motion } from 'framer-motion';
const EnrollStudents = () => {
const { enrollFormData, setEnrollFormData, unEnrolledStudents, handleEnrollStudents } = useEnrollmentContext();
const { courses, batch } = useBatchContext();

const formControls = enrollFormControls(unEnrolledStudents || [], courses || [], batch || []);
console.log(unEnrolledStudents,"uuuuuuuuuuuuuu");
console.log(batch,"bbbbbbbbbbb");
console.log("dddddddddddddddddddd",enrollFormData);


  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="p-6 space-y-4">
      <CardHeader>
        <CardTitle>Enroll Students</CardTitle>
        <CardDescription>Select Student,course and Batch .</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CommonForm
          formControls={formControls}
          buttonText={"Enroll Students"}
          formData={enrollFormData}
          setFormData={setEnrollFormData}
          isButtonDisabled={!checkEnrollFormIsValid(enrollFormData)}
          handleSubmit={handleEnrollStudents}
          validationSchema={enrollSchema}
        />
      </CardContent>
    </Card>
  </motion.div>
  )
}

export default EnrollStudents