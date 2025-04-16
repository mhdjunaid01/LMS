// schemas.js
import { z } from 'zod';


export const signUpSchema = z.object({
    userName: z.string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must be less than 50 characters"),
    email: z.string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters"),
    password: z.string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters")
  });
  
  export const signIpSchema = z.object({
    email: z.string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters"),
    password: z.string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters")
  });
export const courseSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    category: z.string().min(2, "category must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    // instructorId: z.string().min(1, "Please select an instructor"),
});

export const batchSchema = z.object({
    batchName: z.string().min(5, "Batch name must be at least 5 characters"),
    courseId: z.string().min(1, "Course  must be provided"),
    instructorId: z.string().min(1, "Instructor  must be provided")
})

export const enrollSchema = z.object({
  studentId: z.string().min(5, "Student  must be provided"),
  courseId: z.string().min(1, "Course must be provided"),
  batchId: z.string().min(1, "Batch must be provided")
})

export const liveClassSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  scheduledTime: z.string().nonempty("Scheduled Time is required"),
  meetingLink: z.string().url("Enter a valid meeting link"),
  courseId: z.string().nonempty("Course selection is required"),
});
