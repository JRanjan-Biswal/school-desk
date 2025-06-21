
import { MessageSquare, Mail, Clock } from "lucide-react";

interface CommunicationStatsProps {
  totalMessages: number;
  unreadMessages: number;
  sentToday: number;
}

const CommunicationStats = ({ totalMessages, unreadMessages, sentToday }: CommunicationStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Total Messages</h3>
            <p className="text-2xl sm:text-3xl font-bold text-purple-600">{totalMessages}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Unread</h3>
            <p className="text-2xl sm:text-3xl font-bold text-red-600">{unreadMessages}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border sm:col-span-2 lg:col-span-1">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Sent Today</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{sentToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationStats;
