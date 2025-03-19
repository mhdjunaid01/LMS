import React from 'react'

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
const CourseManagement = () => {

  return (
    <Card>
    <CardHeader className="flex justify-between flex-row items-center">
      <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">React js Full Course 2025</TableCell>
              <TableCell>100</TableCell>
              <TableCell>$5000</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Edit className="h6 w-6"/>
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash className="h6 w-6"/>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
  )
}

export default CourseManagement