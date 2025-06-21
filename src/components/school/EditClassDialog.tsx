
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Class {
  id: number;
  name: string;
  section: string;
  capacity: number;
  currentStudents: number;
  classTeacher: string;
  subjects: string[];
}

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: Class | null;
}

const EditClassDialog = ({ open, onOpenChange, classData }: EditClassDialogProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    className: "",
    section: "",
    capacity: "",
    classTeacher: "",
    subjects: ""
  });

  useEffect(() => {
    if (classData) {
      setForm({
        className: classData.name,
        section: classData.section,
        capacity: classData.capacity.toString(),
        classTeacher: classData.classTeacher,
        subjects: classData.subjects.join(", ")
      });
    }
  }, [classData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating class:", form);
    toast({
      title: "Class Updated",
      description: `${form.className}-${form.section} has been successfully updated`,
    });
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  if (!classData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-purple-600">
            Edit Class: {classData.name}-{classData.section}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="className">Class Name</Label>
              <Select value={form.className} onValueChange={(value) => setForm({ ...form, className: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 1">Class 1</SelectItem>
                  <SelectItem value="Class 2">Class 2</SelectItem>
                  <SelectItem value="Class 3">Class 3</SelectItem>
                  <SelectItem value="Class 4">Class 4</SelectItem>
                  <SelectItem value="Class 5">Class 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="classSection">Section</Label>
              <Select value={form.section} onValueChange={(value) => setForm({ ...form, section: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="capacity">Student Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="classTeacherSelect">Class Teacher</Label>
              <Input
                id="classTeacherSelect"
                placeholder="Enter teacher name"
                value={form.classTeacher}
                onChange={(e) => setForm({ ...form, classTeacher: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="subjects">Subjects (comma separated)</Label>
              <Textarea
                id="subjects"
                placeholder="Mathematics, Science, English, Hindi, Social Studies"
                value={form.subjects}
                onChange={(e) => setForm({ ...form, subjects: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Update Class
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClassDialog;
