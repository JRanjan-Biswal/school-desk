
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";

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

interface FeesTableProps {
  fees: Fee[];
  onRecordPayment: (fee: Fee) => void;
  onSendInvoice: (fee: Fee) => void;
}

const FeesTable = ({ fees, onRecordPayment, onSendInvoice }: FeesTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Fee Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fees.map((fee) => (
            <TableRow key={fee.id}>
              <TableCell className="font-medium">{fee.studentName}</TableCell>
              <TableCell>{fee.class}</TableCell>
              <TableCell>{fee.feeType}</TableCell>
              <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
              <TableCell>₹{fee.paidAmount.toLocaleString()}</TableCell>
              <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>{getStatusBadge(fee.status)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {fee.status !== "paid" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onRecordPayment(fee)}
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      Pay
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSendInvoice(fee)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Send size={14} className="mr-1" />
                    Invoice
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeesTable;
