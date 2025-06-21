import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, X } from "lucide-react";

interface ComposeMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentChild: any;
}

const ComposeMessageDialog = ({ open, onOpenChange, currentChild }: ComposeMessageDialogProps) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isLoading, setIsLoading] = useState(false);

  const recipients = [
    { value: "class-teacher", label: "Class Teacher" },
    { value: "subject-teacher", label: "Subject Teacher" },
    { value: "principal", label: "Principal" },
    { value: "vice-principal", label: "Vice Principal" },
    { value: "school-admin", label: "School Administrator" },
    { value: "librarian", label: "Librarian" },
    { value: "counselor", label: "School Counselor" }
  ];

  const handleSend = async () => {
    if (!recipient || !subject.trim() || !message.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Message sent:', {
        to: recipient,
        subject,
        message,
        priority,
        from: `Parent of ${currentChild?.name}`,
        childId: currentChild?.id,
        timestamp: new Date().toISOString()
      });
      
      // Reset form
      setRecipient("");
      setSubject("");
      setMessage("");
      setPriority("medium");
      setIsLoading(false);
      
      // Close dialog
      onOpenChange(false);
      
      // In a real app, you would show a success toast here
      alert("Message sent successfully!");
    }, 1000);
  };

  const handleClose = () => {
    if (!isLoading) {
      setRecipient("");
      setSubject("");
      setMessage("");
      setPriority("medium");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg sm:text-xl">
            <Send className="mr-2" size={20} />
            Compose Message
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 px-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-sm font-medium">To</Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  {recipients.map((rec) => (
                    <SelectItem key={rec.value} value={rec.value}>
                      {rec.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter message subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              disabled={isLoading}
              className="w-full resize-none"
            />
          </div>

          {currentChild && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Regarding:</strong> {currentChild.name} - {currentChild.class} {currentChild.section}
              </p>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!recipient || !subject.trim() || !message.trim() || isLoading}
              className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
            >
              <Send className="w-4 h-4 mr-1" />
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeMessageDialog;
