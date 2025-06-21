
import { useState } from "react";
import CommunicationHeader from "./communication/CommunicationHeader";
import CommunicationStatsCards from "./communication/CommunicationStatsCards";
import CommunicationTabs from "./communication/CommunicationTabs";
import ComposeMessageDialog from "@/components/school/communication/ComposeMessageDialog";
import { useToast } from "@/hooks/use-toast";

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

const TeacherCommunicationSection = () => {
  const [composeOpen, setComposeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Teacher 1",
      recipient: "Parent of Student 1",
      subject: "Math Homework Update",
      content: "I wanted to inform you about your child's progress in mathematics. They have been doing exceptionally well in recent assignments.",
      timestamp: "2024-06-14T10:30:00Z",
      status: "sent",
      type: "individual",
      recipientType: "parent"
    },
    {
      id: 2,
      sender: "Principal",
      recipient: "All Teachers",
      subject: "Staff Meeting Tomorrow",
      content: "Please remember our monthly staff meeting tomorrow at 3:00 PM in the conference room.",
      timestamp: "2024-06-13T14:15:00Z",
      status: "read",
      type: "announcement",
      recipientType: "teacher"
    },
    {
      id: 3,
      sender: "Teacher 1",
      recipient: "Student 2",
      subject: "Assignment Reminder",
      content: "Don't forget to submit your science project by Friday. If you need any help, please let me know.",
      timestamp: "2024-06-13T09:20:00Z",
      status: "sent",
      type: "individual",
      recipientType: "student"
    },
    {
      id: 4,
      sender: "Parent of Student 3",
      recipient: "Teacher 1",
      subject: "Question about Exam Schedule",
      content: "Could you please clarify the exam schedule for next week? I want to make sure my child is prepared.",
      timestamp: "2024-06-12T16:45:00Z",
      status: "unread",
      type: "individual",
      recipientType: "teacher"
    }
  ]);

  const { toast } = useToast();

  const handleSendMessage = (messageData: Omit<Message, "id" | "sender" | "timestamp" | "status">) => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "Teacher 1",
      subject: messageData.subject,
      recipient: messageData.recipient,
      content: messageData.content,
      type: messageData.type,
      recipientType: messageData.recipientType,
      timestamp: new Date().toISOString(),
      status: "sent"
    };

    setMessages(prev => [newMessage, ...prev]);
    
    toast({
      title: "Message Sent Successfully",
      description: `Your message "${messageData.subject}" has been sent to ${messageData.recipient}`,
    });
  };

  const handleMarkAsRead = (messageId: number) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, status: "read" as const } : msg
      )
    );
  };

  const getFilteredMessages = (tab: string) => {
    switch (tab) {
      case "sent":
        return messages.filter(msg => msg.sender === "Teacher 1");
      case "inbox":
        return messages.filter(msg => msg.sender !== "Teacher 1");
      case "unread":
        return messages.filter(msg => msg.status === "unread" && msg.sender !== "Teacher 1");
      default:
        return messages;
    }
  };

  const filteredMessages = getFilteredMessages(activeTab);

  const stats = {
    total: messages.length,
    unread: messages.filter(msg => msg.status === "unread" && msg.sender !== "Teacher 1").length,
    sent: messages.filter(msg => msg.sender === "Teacher 1").length,
    received: messages.filter(msg => msg.sender !== "Teacher 1").length
  };

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <CommunicationHeader onComposeClick={() => setComposeOpen(true)} />
      
      <CommunicationStatsCards stats={stats} />
      
      <CommunicationTabs
        messages={filteredMessages}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onMarkAsRead={handleMarkAsRead}
        unreadCount={stats.unread}
      />

      <ComposeMessageDialog
        open={composeOpen}
        onOpenChange={setComposeOpen}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default TeacherCommunicationSection;
