
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Fee {
  studentName: string;
  class: string;
  feeType: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  paidAmount: number;
  paymentDate?: string;
}

interface CreateFeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFee: (fee: Omit<Fee, "id">) => void;
}

const CreateFeeDialog = ({ open, onOpenChange, onAddFee }: CreateFeeDialogProps) => {
  const [formData, setFormData] = useState({
    studentName: "",
    class: "",
    feeType: "",
    amount: "",
    dueDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFee: Omit<Fee, "id"> = {
      studentName: formData.studentName,
      class: formData.class,
      feeType: formData.feeType,
      amount: Number(formData.amount),
      dueDate: formData.dueDate,
      status: "pending",
      paidAmount: 0
    };

    onAddFee(newFee);
    onOpenChange(false);
    setFormData({
      studentName: "",
      class: "",
      feeType: "",
      amount: "",
      dueDate: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle>Create New Fee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              placeholder="Enter student name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select
              value={formData.class}
              onValueChange={(value) => setFormData({ ...formData, class: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Class 8A">Class 8A</SelectItem>
                <SelectItem value="Class 8B">Class 8B</SelectItem>
                <SelectItem value="Class 9A">Class 9A</SelectItem>
                <SelectItem value="Class 9B">Class 9B</SelectItem>
                <SelectItem value="Class 10A">Class 10A</SelectItem>
                <SelectItem value="Class 10B">Class 10B</SelectItem>
                <SelectItem value="Class 11A">Class 11A</SelectItem>
                <SelectItem value="Class 11B">Class 11B</SelectItem>
                <SelectItem value="Class 12A">Class 12A</SelectItem>
                <SelectItem value="Class 12B">Class 12B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feeType">Fee Type</Label>
            <Select
              value={formData.feeType}
              onValueChange={(value) => setFormData({ ...formData, feeType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fee type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                <SelectItem value="Library Fee">Library Fee</SelectItem>
                <SelectItem value="Lab Fee">Lab Fee</SelectItem>
                <SelectItem value="Transport Fee">Transport Fee</SelectItem>
                <SelectItem value="Sports Fee">Sports Fee</SelectItem>
                <SelectItem value="Examination Fee">Examination Fee</SelectItem>
                <SelectItem value="Activity Fee">Activity Fee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
              Create Fee
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFeeDialog;
