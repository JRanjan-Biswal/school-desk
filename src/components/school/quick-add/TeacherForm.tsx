
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TeacherFormData } from "./types";

interface TeacherFormProps {
  onClose: () => void;
}

const TeacherForm = ({ onClose }: TeacherFormProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState<TeacherFormData>({
    name: "",
    subject: "",
    qualification: "",
    phoneNumber: "",
    email: "",
    classTeacher: "",
    section: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding teacher:", form);
    const classTeacherText = form.classTeacher && form.classTeacher !== "none" && form.section && form.section !== "none" ? 
      ` as class teacher of ${form.classTeacher}-${form.section}` : "";
    toast({
      title: "Teacher Added",
      description: `${form.name} has been successfully added as ${form.subject} teacher${classTeacherText}`,
    });
    setForm({ name: "", subject: "", qualification: "", phoneNumber: "", email: "", classTeacher: "", section: "" });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="teacherName">Teacher Name</Label>
          <Input
            id="teacherName"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select value={form.subject} onValueChange={(value) => setForm({ ...form, subject: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Social Studies">Social Studies</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="qualification">Qualification</Label>
          <Input
            id="qualification"
            value={form.qualification}
            onChange={(e) => setForm({ ...form, qualification: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="teacherPhone">Phone Number</Label>
          <Input
            id="teacherPhone"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="classTeacher">Class Teacher Of (Optional)</Label>
          <Select value={form.classTeacher} onValueChange={(value) => setForm({ ...form, classTeacher: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="Class 1">Class 1</SelectItem>
              <SelectItem value="Class 2">Class 2</SelectItem>
              <SelectItem value="Class 3">Class 3</SelectItem>
              <SelectItem value="Class 4">Class 4</SelectItem>
              <SelectItem value="Class 5">Class 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="teacherSection">Section (If Class Teacher)</Label>
          <Select value={form.section} onValueChange={(value) => setForm({ ...form, section: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
        Add Teacher
      </Button>
    </form>
  );
};

export default TeacherForm;
