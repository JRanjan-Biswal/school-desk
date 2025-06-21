
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";

interface Message {
  recipient: string;
  subject: string;
  content: string;
  type: "announcement" | "individual" | "emergency";
  recipientType: "teacher" | "parent" | "student" | "all";
}

interface ComposeMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendMessage: (message: Omit<Message, "id" | "sender" | "timestamp" | "status">) => void;
}

const ComposeMessageDialog = ({ open, onOpenChange, onSendMessage }: ComposeMessageDialogProps) => {
  const [formData, setFormData] = useState<Message>({
    recipient: "",
    subject: "",
    content: "",
    type: "individual",
    recipientType: "all"
  });

  const recipients = [
    { value: "all", label: "All Users", type: "all" },
    { value: "all-teachers", label: "All Teachers", type: "teacher" },
    { value: "all-parents", label: "All Parents", type: "parent" },
    { value: "all-students", label: "All Students", type: "student" },
    { value: "teacher-1", label: "Teacher 1", type: "teacher" },
    { value: "teacher-2", label: "Teacher 2", type: "teacher" },
    { value: "teacher-3", label: "Teacher 3", type: "teacher" },
    { value: "parent-student-1", label: "Parent of Student 1", type: "parent" },
    { value: "parent-student-2", label: "Parent of Student 2", type: "parent" },
    { value: "parent-student-3", label: "Parent of Student 3", type: "parent" },
    { value: "student-1", label: "Student 1", type: "student" },
    { value: "student-2", label: "Student 2", type: "student" },
    { value: "student-3", label: "Student 3", type: "student" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipient || !formData.subject || !formData.content) {
      return;
    }

    const selectedRecipient = recipients.find(r => r.value === formData.recipient);
    
    onSendMessage({
      recipient: selectedRecipient?.label || formData.recipient,
      subject: formData.subject,
      content: formData.content,
      type: formData.type,
      recipientType: selectedRecipient?.type as any || "all"
    });

    setFormData({
      recipient: "",
      subject: "",
      content: "",
      type: "individual",
      recipientType: "all"
    });
    onOpenChange(false);
  };

  const handleRecipientChange = (value: string) => {
    const selectedRecipient = recipients.find(r => r.value === value);
    setFormData({
      ...formData,
      recipient: value,
      recipientType: selectedRecipient?.type as any || "all"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Send className="mr-2" size={20} />
            Compose Message
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Select value={formData.recipient} onValueChange={handleRecipientChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="all-teachers">All Teachers</SelectItem>
                  <SelectItem value="all-parents">All Parents</SelectItem>
                  <SelectItem value="all-students">All Students</SelectItem>
                  <SelectItem value="teacher-1">Teacher 1</SelectItem>
                  <SelectItem value="teacher-2">Teacher 2</SelectItem>
                  <SelectItem value="teacher-3">Teacher 3</SelectItem>
                  <SelectItem value="parent-student-1">Parent of Student 1</SelectItem>
                  <SelectItem value="parent-student-2">Parent of Student 2</SelectItem>
                  <SelectItem value="parent-student-3">Parent of Student 3</SelectItem>
                  <SelectItem value="student-1">Student 1</SelectItem>
                  <SelectItem value="student-2">Student 2</SelectItem>
                  <SelectItem value="student-3">Student 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Message Type</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="Enter message subject"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Message Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Type your message here..."
              className="min-h-[120px] resize-none"
              required
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
            >
              <Send className="mr-2" size={16} />
              Send Message
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeMessageDialog;
