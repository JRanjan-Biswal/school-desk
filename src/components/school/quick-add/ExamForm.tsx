
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ExamFormData } from "./types";

interface ExamFormProps {
  onClose: () => void;
}

const ExamForm = ({ onClose }: ExamFormProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState<ExamFormData>({
    examName: "",
    examType: "",
    class: "",
    section: "",
    subject: "",
    date: "",
    time: "",
    duration: "",
    totalMarks: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Scheduling exam:", form);
    toast({
      title: "Exam Scheduled",
      description: `${form.examName} has been scheduled for ${form.class}-${form.section} on ${form.date}`,
    });
    setForm({ examName: "", examType: "", class: "", section: "", subject: "", date: "", time: "", duration: "", totalMarks: "", description: "" });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="examName">Exam Name</Label>
          <Input
            id="examName"
            value={form.examName}
            onChange={(e) => setForm({ ...form, examName: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="examType">Exam Type</Label>
          <Select value={form.examType} onValueChange={(value) => setForm({ ...form, examType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select exam type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Unit Test">Unit Test</SelectItem>
              <SelectItem value="Mid Term">Mid Term</SelectItem>
              <SelectItem value="Final Exam">Final Exam</SelectItem>
              <SelectItem value="Monthly Test">Monthly Test</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="examClass">Class</Label>
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
          <Label htmlFor="examSection">Section</Label>
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
          <Label htmlFor="examSubject">Subject</Label>
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
          <Label htmlFor="examDate">Date</Label>
          <Input
            id="examDate"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="examTime">Time</Label>
          <Input
            id="examTime"
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="totalMarks">Total Marks</Label>
          <Input
            id="totalMarks"
            type="number"
            value={form.totalMarks}
            onChange={(e) => setForm({ ...form, totalMarks: e.target.value })}
            required
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="examDescription">Description (Optional)</Label>
          <Textarea
            id="examDescription"
            placeholder="Additional instructions or notes about the exam"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
      </div>
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
        Schedule Exam
      </Button>
    </form>
  );
};

export default ExamForm;
