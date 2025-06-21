
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Fee {
  id: number;
  studentName: string;
  class: string;
  feeType: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  paidAmount: number;
  paymentDate?: string;
}

interface FeeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "paid" | "pending" | "overdue";
  onStatusFilterChange: (status: "all" | "paid" | "pending" | "overdue") => void;
  fees: Fee[];
}

const FeeFilters = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange, 
  fees 
}: FeeFiltersProps) => {
  const getFilteredCount = (status: "paid" | "pending" | "overdue") => {
    return fees.filter(fee => fee.status === status).length;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Search by student name, class, or fee type..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Status Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("all")}
          className="text-sm"
          style={{
            backgroundColor: statusFilter === "all" ? "#9333ea" : "transparent",
            color: statusFilter === "all" ? "white" : "#9333ea",
            borderColor: "#9333ea"
          }}
        >
          All ({fees.length})
        </Button>
        <Button
          variant={statusFilter === "paid" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("paid")}
          className="text-sm"
          style={{
            backgroundColor: statusFilter === "paid" ? "#16a34a" : "transparent",
            color: statusFilter === "paid" ? "white" : "#16a34a",
            borderColor: "#16a34a"
          }}
        >
          Paid ({getFilteredCount("paid")})
        </Button>
        <Button
          variant={statusFilter === "pending" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("pending")}
          className="text-sm"
          style={{
            backgroundColor: statusFilter === "pending" ? "#eab308" : "transparent",
            color: statusFilter === "pending" ? "white" : "#eab308",
            borderColor: "#eab308"
          }}
        >
          Pending ({getFilteredCount("pending")})
        </Button>
        <Button
          variant={statusFilter === "overdue" ? "default" : "outline"}
          onClick={() => onStatusFilterChange("overdue")}
          className="text-sm"
          style={{
            backgroundColor: statusFilter === "overdue" ? "#dc2626" : "transparent",
            color: statusFilter === "overdue" ? "white" : "#dc2626",
            borderColor: "#dc2626"
          }}
        >
          Overdue ({getFilteredCount("overdue")})
        </Button>
      </div>
    </div>
  );
};

export default FeeFilters;
