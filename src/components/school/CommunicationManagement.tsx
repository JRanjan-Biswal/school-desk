
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MessagesList from "./communication/MessagesList";
import ComposeMessageDialog from "./communication/ComposeMessageDialog";
import CommunicationStats from "./communication/CommunicationStats";
import MessageFilters from "./communication/MessageFilters";

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

const CommunicationManagement = () => {
  const { toast } = useToast();
  const [composeOpen, setComposeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "sent" | "read" | "unread">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "announcement" | "individual" | "emergency">("all");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Admin",
      recipient: "All Teachers",
      subject: "Staff Meeting Tomorrow",
      content: "Please attend the staff meeting scheduled for tomorrow at 2 PM in the conference room.",
      timestamp: "2024-01-15T10:30:00Z",
      status: "sent",
      type: "announcement",
      recipientType: "teacher"
    },
    {
      id: 2,
      sender: "Admin",
      recipient: "Parent of Student 1",
      subject: "Parent-Teacher Conference",
      content: "We would like to schedule a parent-teacher conference to discuss your child's progress.",
      timestamp: "2024-01-14T14:15:00Z",
      status: "read",
      type: "individual",
      recipientType: "parent"
    },
    {
      id: 3,
      sender: "Admin",
      recipient: "All Students",
      subject: "School Closure Alert",
      content: "Due to severe weather conditions, the school will be closed tomorrow. All classes are cancelled.",
      timestamp: "2024-01-13T16:45:00Z",
      status: "sent",
      type: "emergency",
      recipientType: "student"
    },
    {
      id: 4,
      sender: "Admin",
      recipient: "Teacher 1",
      subject: "Class Schedule Update",
      content: "Please note that your Math class has been moved from 9 AM to 10 AM starting next week.",
      timestamp: "2024-01-12T11:20:00Z",
      status: "unread",
      type: "individual",
      recipientType: "teacher"
    }
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    const matchesType = typeFilter === "all" || message.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSendMessage = (newMessage: Omit<Message, "id" | "sender" | "timestamp" | "status">) => {
    const message: Message = {
      ...newMessage,
      id: messages.length + 1,
      sender: "Admin",
      timestamp: new Date().toISOString(),
      status: "sent"
    };
    
    setMessages([message, ...messages]);
    toast({
      title: "Message Sent",
      description: `Message sent successfully to ${message.recipient}`,
    });
  };

  const handleMarkAsRead = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status: "read" as const } : msg
    ));
  };

  const totalMessages = messages.length;
  const unreadMessages = messages.filter(msg => msg.status === "unread").length;
  const sentToday = messages.filter(msg => {
    const today = new Date().toDateString();
    return new Date(msg.timestamp).toDateString() === today;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-600">Communication</h2>
          <p className="text-gray-600">Manage school communications</p>
        </div>
        <Button 
          onClick={() => setComposeOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
        >
          <Plus className="mr-2" size={16} />
          Compose Message
        </Button>
      </div>

      <CommunicationStats 
        totalMessages={totalMessages}
        unreadMessages={unreadMessages}
        sentToday={sentToday}
      />

      <MessageFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
      />

      <MessagesList 
        messages={filteredMessages}
        onMarkAsRead={handleMarkAsRead}
      />

      <ComposeMessageDialog 
        open={composeOpen}
        onOpenChange={setComposeOpen}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default CommunicationManagement;
