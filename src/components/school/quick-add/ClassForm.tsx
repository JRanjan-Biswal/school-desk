
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ClassFormData } from "./types";

interface ClassFormProps {
  onClose: () => void;
}

const ClassForm = ({ onClose }: ClassFormProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState<ClassFormData>({
    className: "",
    section: "",
    capacity: "",
    classTeacher: "",
    subjects: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating class:", form);
    toast({
      title: "Class Created",
      description: `${form.className}-${form.section} has been successfully created with capacity of ${form.capacity} students`,
    });
    setForm({ className: "", section: "", capacity: "", classTeacher: "", subjects: "" });
    onClose();
  };

  return (
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
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
        Create Class
      </Button>
    </form>
  );
};

export default ClassForm;
