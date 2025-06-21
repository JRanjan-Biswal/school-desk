
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Clock, CheckCircle, AlertTriangle, Megaphone, User } from "lucide-react";
import MessageDetailsDialog from "./MessageDetailsDialog";

interface Message {
  id: number;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  status: "sent" | "read" | "unread";
  type: "announcement" | "individual" | "emergency";
  recipientType: "teacher" | "parent" | "student" | "all";
}

interface MessagesListProps {
  messages: Message[];
  onMarkAsRead: (messageId: number) => void;
}

const MessagesList = ({ messages, onMarkAsRead }: MessagesListProps) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "text-green-600 bg-green-100";
      case "read": return "text-blue-600 bg-blue-100";
      case "unread": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "announcement": return <Megaphone className="w-4 h-4" />;
      case "individual": return <User className="w-4 h-4" />;
      case "emergency": return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "announcement": return "text-yellow-600 bg-yellow-100";
      case "individual": return "text-cyan-600 bg-cyan-100";
      case "emergency": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setDetailsOpen(true);
    if (message.status === "unread") {
      onMarkAsRead(message.id);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="text-gray-400 mb-2">
          <Clock className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No messages found</h3>
        <p className="text-gray-500">Try adjusting your filters or compose a new message.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header - Hidden on mobile, shown as cards instead */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
              <div className="col-span-3">Subject</div>
              <div className="col-span-2">Recipient</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-3">Actions</div>
            </div>

            {/* Messages */}
            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div key={message.id} className="p-4 hover:bg-gray-50 transition-colors">
                  {/* Mobile Layout - Card Style */}
                  <div className="block md:hidden space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 text-sm">{message.subject}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(message.type)}`}>
                          {getTypeIcon(message.type)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>To: {message.recipient}</div>
                      <div>{formatDate(message.timestamp)}</div>
                    </div>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMessage(message)}
                        className="w-full"
                      >
                        <Eye className="mr-2" size={14} />
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Desktop Layout - Grid */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                    <div className="col-span-3">
                      <h4 className="font-medium text-gray-900 truncate">{message.subject}</h4>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gray-600 truncate">{message.recipient}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gray-500">{formatDate(message.timestamp)}</span>
                    </div>
                    <div className="col-span-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(message.type)}`}>
                        {getTypeIcon(message.type)}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                        {message.status === "sent" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {message.status === "read" && <Eye className="w-3 h-3 mr-1" />}
                        {message.status === "unread" && <Clock className="w-3 h-3 mr-1" />}
                        {message.status}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="mr-2" size={14} />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MessageDetailsDialog 
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        message={selectedMessage}
      />
    </>
  );
};

export default MessagesList;
