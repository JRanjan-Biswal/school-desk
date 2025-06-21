import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateFeeDialog from "./fees/CreateFeeDialog";
import PaymentDialog from "./fees/PaymentDialog";
import InvoiceDialog from "./fees/InvoiceDialog";
import FeeStatsCards from "./fees/FeeStatsCards";
import FeeFilters from "./fees/FeeFilters";
import FeesTable from "./fees/FeesTable";

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

const FeesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [createFeeOpen, setCreateFeeOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);

  const [fees, setFees] = useState<Fee[]>([
    {
      id: 1,
      studentName: "Student 1",
      class: "Class 10A",
      feeType: "Tuition Fee",
      amount: 5000,
      dueDate: "2024-01-15",
      status: "paid",
      paidAmount: 5000,
      paymentDate: "2024-01-10"
    },
    {
      id: 2,
      studentName: "Student 2",
      class: "Class 9B",
      feeType: "Library Fee",
      amount: 500,
      dueDate: "2024-01-20",
      status: "pending",
      paidAmount: 0
    },
    {
      id: 3,
      studentName: "Student 3",
      class: "Class 11A",
      feeType: "Lab Fee",
      amount: 1200,
      dueDate: "2024-01-10",
      status: "overdue",
      paidAmount: 600
    },
    {
      id: 4,
      studentName: "Student 4",
      class: "Class 8C",
      feeType: "Transport Fee",
      amount: 800,
      dueDate: "2024-01-25",
      status: "pending",
      paidAmount: 0
    }
  ]);

  const filteredFees = fees.filter(fee => {
    const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.feeType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || fee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddFee = (newFee: Omit<Fee, "id">) => {
    const fee = {
      ...newFee,
      id: fees.length + 1
    };
    setFees([...fees, fee]);
  };

  const handlePayment = (feeId: number, paymentAmount: number) => {
    setFees(fees.map(fee => {
      if (fee.id === feeId) {
        const newPaidAmount = fee.paidAmount + paymentAmount;
        return {
          ...fee,
          paidAmount: newPaidAmount,
          status: newPaidAmount >= fee.amount ? "paid" as const : fee.status,
          paymentDate: newPaidAmount >= fee.amount ? new Date().toISOString().split('T')[0] : fee.paymentDate
        };
      }
      return fee;
    }));
  };

  const handleRecordPayment = (fee: Fee) => {
    setSelectedFee(fee);
    setPaymentOpen(true);
  };

  const handleSendInvoice = (fee: Fee) => {
    setSelectedFee(fee);
    setInvoiceOpen(true);
  };

  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = fees.reduce((sum, fee) => sum + fee.paidAmount, 0);
  const totalPending = totalFees - totalPaid;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-purple-600">Fees Management</h2>
          <p className="text-gray-600">Track and manage student fees</p>
        </div>
        <Button 
          onClick={() => setCreateFeeOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="mr-2" size={16} />
          Add Fee
        </Button>
      </div>

      <FeeStatsCards 
        totalFees={totalFees}
        totalPaid={totalPaid}
        totalPending={totalPending}
      />

      <FeeFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        fees={fees}
      />

      <FeesTable
        fees={filteredFees}
        onRecordPayment={handleRecordPayment}
        onSendInvoice={handleSendInvoice}
      />

      <CreateFeeDialog 
        open={createFeeOpen} 
        onOpenChange={setCreateFeeOpen}
        onAddFee={handleAddFee}
      />
      
      <PaymentDialog 
        open={paymentOpen} 
        onOpenChange={setPaymentOpen}
        fee={selectedFee}
        onPayment={handlePayment}
      />
      
      <InvoiceDialog 
        open={invoiceOpen} 
        onOpenChange={setInvoiceOpen}
        fee={selectedFee}
      />
    </div>
  );
};

export default FeesManagement;
