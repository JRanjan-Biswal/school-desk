
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MessageFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "sent" | "read" | "unread";
  onStatusFilterChange: (status: "all" | "sent" | "read" | "unread") => void;
  typeFilter: "all" | "announcement" | "individual" | "emergency";
  onTypeFilterChange: (type: "all" | "announcement" | "individual" | "emergency") => void;
}

const MessageFilters = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange
}: MessageFiltersProps) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Search messages by subject, recipient, or content..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => onStatusFilterChange("all")}
              className="text-xs sm:text-sm"
              style={{
                backgroundColor: statusFilter === "all" ? "#9333ea" : "transparent",
                color: statusFilter === "all" ? "white" : "#9333ea",
                borderColor: "#9333ea"
              }}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "sent" ? "default" : "outline"}
              onClick={() => onStatusFilterChange("sent")}
              className="text-xs sm:text-sm"
              style={{
                backgroundColor: statusFilter === "sent" ? "#16a34a" : "transparent",
                color: statusFilter === "sent" ? "white" : "#16a34a",
                borderColor: "#16a34a"
              }}
            >
              Sent
            </Button>
            <Button
              variant={statusFilter === "read" ? "default" : "outline"}
              onClick={() => onStatusFilterChange("read")}
              className="text-xs sm:text-sm"
              style={{
                backgroundColor: statusFilter === "read" ? "#3b82f6" : "transparent",
                color: statusFilter === "read" ? "white" : "#3b82f6",
                borderColor: "#3b82f6"
              }}
            >
              Read
            </Button>
            <Button
              variant={statusFilter === "unread" ? "default" : "outline"}
              onClick={() => onStatusFilterChange("unread")}
              className="text-xs sm:text-sm"
              style={{
                backgroundColor: statusFilter === "unread" ? "#dc2626" : "transparent",
                color: statusFilter === "unread" ? "white" : "#dc2626",
                borderColor: "#dc2626"
              }}
            >
              Unread
            </Button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Message Type</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={typeFilter === "all" ? "default" : "outline"}
              onClick={() => onTypeFilterChange("all")}
              className="text-xs sm:text-sm"
              style={{
                backgroundColor: typeFilter === "all" ? "#9333ea" : "transparent",
                color: typeFilter === "all" ? "white" : "#9333ea",
                borderColor: "#9333ea"
              }}
            >
              All Types
            </Button>
            <Button
              variant={typeFilter === "announcement" ? "default" : "outline"}
              onClick={() => onTypeFilterChange("announcement")}
              className="text-xs sm:text-sm"
              style={{
                backgroundColor: typeFilter === "announcement" ? "#f59e0b" : "transparent",
                color: typeFilter === "announcement" ? "white" : "#f59e0b",
                borderColor: "#f59e0b"
              }}
            >
              Announcement
            </Button>
            <Button
              variant={typeFilter === "individual" ? "default" : "outline"}
              onClick={() => onTypeFilterChange("individual")}
              className="text-xs sm:text-sm"
              style={{
                backgroundColor: typeFilter === "individual" ? "#06b6d4" : "transparent",
                color: typeFilter === "individual" ? "white" : "#06b6d4",
                borderColor: "#06b6d4"
              }}
            >
              Individual
            </Button>
            <Button
              variant={typeFilter === "emergency" ? "default" : "outline"}
              onClick={() => onTypeFilterChange("emergency")}
              className="text-xs sm:text-sm"
              style={{
                backgroundColor: typeFilter === "emergency" ? "#dc2626" : "transparent",
                color: typeFilter === "emergency" ? "white" : "#dc2626",
                borderColor: "#dc2626"
              }}
            >
              Emergency
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageFilters;
