
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, MessageSquare, AlertTriangle, Megaphone } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
  status: "sent" | "read" | "unread";
  type: "announcement" | "individual" | "emergency";
  priority: "low" | "medium" | "high";
}

interface MessageDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: Message | null;
}

const MessageDetailsDialog = ({ open, onOpenChange, message }: MessageDetailsDialogProps) => {
  if (!message) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-green-100 text-green-800";
      case "read": return "bg-blue-100 text-blue-800";
      case "unread": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "announcement": return "bg-yellow-100 text-yellow-800";
      case "individual": return "bg-cyan-100 text-cyan-800";
      case "emergency": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "announcement": return <Megaphone className="w-4 h-4" />;
      case "individual": return <User className="w-4 h-4" />;
      case "emergency": return <AlertTriangle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="mr-2" size={20} />
            Message Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Message Header */}
          <div className="border-b pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <h3 className="text-xl font-semibold text-gray-900">{message.subject}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={`${getTypeColor(message.type)} flex items-center gap-1`}>
                  {getTypeIcon(message.type)}
                  {message.type}
                </Badge>
                <Badge className={getStatusColor(message.status)}>
                  {message.status}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span><strong>From:</strong> {message.sender}</span>
              </div>
              <div className="flex items-center sm:col-span-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span><strong>Received:</strong> {formatDate(message.timestamp)}</span>
              </div>
            </div>
          </div>
          
          {/* Message Content */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Message Content</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetailsDialog;
