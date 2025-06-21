
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { StudentFormData } from "./types";

interface StudentFormProps {
  onClose: () => void;
}

const StudentForm = ({ onClose }: StudentFormProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState<StudentFormData>({
    name: "",
    class: "",
    section: "",
    rollNo: "",
    parentName: "",
    phoneNumber: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding student:", form);
    toast({
      title: "Student Added",
      description: `${form.name} has been successfully added to ${form.class}-${form.section}`,
    });
    setForm({ name: "", class: "", section: "", rollNo: "", parentName: "", phoneNumber: "" });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="studentName">Student Name</Label>
          <Input
            id="studentName"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="rollNo">Roll Number</Label>
          <Input
            id="rollNo"
            value={form.rollNo}
            onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="class">Class</Label>
          <Select value={form.class} onValueChange={(value) => setForm({ ...form, class: value })}>
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
          <Label htmlFor="section">Section</Label>
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
          <Label htmlFor="parentName">Parent Name</Label>
          <Input
            id="parentName"
            value={form.parentName}
            onChange={(e) => setForm({ ...form, parentName: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
        Add Student
      </Button>
    </form>
  );
};

export default StudentForm;
