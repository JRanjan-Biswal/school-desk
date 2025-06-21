import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, Filter, Eye, Clock, CheckCircle, User, Calendar, Megaphone, AlertTriangle, Plus, Send } from "lucide-react";
import MessageDetailsDialog from "./MessageDetailsDialog";
import MessageFilters from "./MessageFilters";
import ComposeMessageDialog from "./ComposeMessageDialog";

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

interface MessagesSectionProps {
  currentChild: any;
}

const MessagesSection = ({ currentChild }: MessagesSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "sent" | "read" | "unread">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "announcement" | "individual" | "emergency">("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  // Mock data - in real app, this would come from API
  const messages: Message[] = [
    {
      id: 1,
      sender: "Teacher 1",
      subject: "Homework Reminder",
      content: "Dear Parent,\n\nThis is a reminder that your child has pending homework in Mathematics. Please ensure it's completed by tomorrow.\n\nThank you.",
      timestamp: "2024-06-14T10:30:00Z",
      status: "unread",
      type: "individual",
      priority: "medium"
    },
    {
      id: 2,
      sender: "School Principal",
      subject: "Parent-Teacher Meeting",
      content: "Dear Parents,\n\nWe are organizing a parent-teacher meeting next Friday at 3:00 PM. Please confirm your attendance.\n\nBest regards,\nSchool Administration",
      timestamp: "2024-06-13T15:45:00Z",
      status: "read",
      type: "announcement",
      priority: "high"
    },
    {
      id: 3,
      sender: "Teacher 2",
      subject: "Excellent Performance",
      content: "Congratulations! Your child has shown excellent performance in the recent Science test. Keep up the good work!\n\nWarm regards,\nTeacher 2",
      timestamp: "2024-06-12T11:20:00Z",
      status: "read",
      type: "individual",
      priority: "low"
    },
    {
      id: 4,
      sender: "School Office",
      subject: "Emergency: Early Dismissal",
      content: "URGENT: Due to unexpected circumstances, school will be dismissed early today at 2:00 PM. Please arrange for pickup.\n\nSchool Office",
      timestamp: "2024-06-11T13:15:00Z",
      status: "read",
      type: "emergency",
      priority: "high"
    },
    {
      id: 5,
      sender: "Teacher 3",
      subject: "Field Trip Permission",
      content: "Dear Parent,\n\nWe have an upcoming field trip to the Science Museum next week. Please sign and return the permission slip.\n\nThank you,\nTeacher 3",
      timestamp: "2024-06-10T09:00:00Z",
      status: "unread",
      type: "individual",
      priority: "medium"
    }
  ];

  const handleMarkAsRead = (messageId: number) => {
    // In real app, this would update the message status via API
    console.log('Marking message as read:', messageId);
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setDetailsOpen(true);
    if (message.status === "unread") {
      handleMarkAsRead(message.id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-green-100 text-green-800";
      case "read": return "bg-blue-100 text-blue-800";
      case "unread": return "bg-red-100 text-red-800";
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "announcement": return "bg-yellow-100 text-yellow-800";
      case "individual": return "bg-cyan-100 text-cyan-800";
      case "emergency": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    const matchesType = typeFilter === "all" || message.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const unreadCount = messages.filter(m => m.status === "unread").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="mr-2" />
            Messages
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-500 text-white">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-gray-600">
            Messages for {currentChild?.name} - {currentChild?.class} {currentChild?.section}
          </p>
        </div>
        <Button
          onClick={() => setComposeOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
        >
          <Send className="w-4 h-4 mr-2" />
          Message
        </Button>
      </div>

      {/* Filters */}
      <MessageFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
      />

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <Card key={message.id} className={`hover:shadow-md transition-shadow cursor-pointer ${message.status === 'unread' ? 'border-l-4 border-l-purple-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.subject}
                      </h3>
                      {message.status === 'unread' && (
                        <Badge className="bg-purple-100 text-purple-800 text-xs">NEW</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <User className="w-4 h-4" />
                      <span>From: {message.sender}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(message.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {message.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Badge className={`${getTypeColor(message.type)} flex items-center gap-1`}>
                      {getTypeIcon(message.type)}
                      {message.type}
                    </Badge>
                    <Badge className={getStatusColor(message.status)}>
                      {message.status === "sent" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {message.status === "read" && <Eye className="w-3 h-3 mr-1" />}
                      {message.status === "unread" && <Clock className="w-3 h-3 mr-1" />}
                      {message.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleViewMessage(message)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "No messages have been received yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{messages.length}</div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {messages.filter(m => m.status === 'unread').length}
            </div>
            <div className="text-sm text-gray-600">Unread</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {messages.filter(m => m.type === 'announcement').length}
            </div>
            <div className="text-sm text-gray-600">Announcements</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {messages.filter(m => m.type === 'emergency').length}
            </div>
            <div className="text-sm text-gray-600">Emergency</div>
          </CardContent>
        </Card>
      </div>

      <MessageDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        message={selectedMessage}
      />

      <ComposeMessageDialog
        open={composeOpen}
        onOpenChange={setComposeOpen}
        currentChild={currentChild}
      />
    </div>
  );
};

export default MessagesSection;
