
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Eye, Send, Clock } from "lucide-react";
import MessagesList from "@/components/school/communication/MessagesList";

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

interface CommunicationTabsProps {
  messages: Message[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onMarkAsRead: (messageId: number) => void;
  unreadCount: number;
}

const CommunicationTabs = ({ 
  messages, 
  activeTab, 
  onTabChange, 
  onMarkAsRead, 
  unreadCount 
}: CommunicationTabsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="flex items-center text-lg md:text-xl">
          <MessageSquare className="mr-2" size={20} />
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10 gap-1 sm:gap-0">
            <TabsTrigger 
              value="inbox" 
              className="flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm py-2 sm:py-1.5"
            >
              <Eye className="h-3 w-3 md:h-4 md:w-4" />
              <span>Inbox</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="sent" 
              className="flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm py-2 sm:py-1.5"
            >
              <Send className="h-3 w-3 md:h-4 md:w-4" />
              <span>Sent</span>
            </TabsTrigger>
            <TabsTrigger 
              value="unread" 
              className="flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm py-2 sm:py-1.5"
            >
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              <span>Unread</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 md:mt-6">
            <MessagesList 
              messages={messages}
              onMarkAsRead={onMarkAsRead}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunicationTabs;
