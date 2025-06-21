
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Send, Printer } from "lucide-react";

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

interface InvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fee: Fee | null;
}

const InvoiceDialog = ({ open, onOpenChange, fee }: InvoiceDialogProps) => {
  if (!fee) return null;

  const handleDownload = () => {
    console.log("Downloading invoice for fee:", fee.id);
    // Here you would implement actual PDF generation
  };

  const handleEmail = () => {
    console.log("Sending invoice via email for fee:", fee.id);
    // Here you would implement email sending
  };

  const handlePrint = () => {
    window.print();
  };

  const remainingAmount = fee.amount - fee.paidAmount;
  const invoiceDate = new Date().toLocaleDateString();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Fee Invoice</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-bold text-purple-600">Schooldesk School</h2>
            <p className="text-gray-600">123 Education Street, Learning City</p>
            <p className="text-gray-600">Phone: +91 98765 43210 | Email: admin@schooldesk.school</p>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Invoice To:</h3>
              <p className="font-semibold">{fee.studentName}</p>
              <p>Class: {fee.class}</p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-gray-900 mb-2">Invoice Details:</h3>
              <p>Invoice #: INV-{fee.id.toString().padStart(4, '0')}</p>
              <p>Date: {invoiceDate}</p>
              <p>Due Date: {new Date(fee.dueDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Fee Details Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold">Description</th>
                  <th className="text-right p-3 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">{fee.feeType}</td>
                  <td className="p-3 text-right">₹{fee.amount.toLocaleString()}</td>
                </tr>
              </tbody>
              <tfoot className="border-t bg-gray-50">
                <tr>
                  <td className="p-3 font-semibold">Total Amount</td>
                  <td className="p-3 text-right font-semibold">₹{fee.amount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3">Paid Amount</td>
                  <td className="p-3 text-right">₹{fee.paidAmount.toLocaleString()}</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-semibold text-red-600">Balance Due</td>
                  <td className="p-3 text-right font-semibold text-red-600">₹{remainingAmount.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Status</h3>
            <div className="flex justify-between items-center">
              <span>Status:</span>
              <span className={`font-semibold ${
                fee.status === 'paid' ? 'text-green-600' :
                fee.status === 'overdue' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
              </span>
            </div>
            {fee.paymentDate && (
              <div className="flex justify-between items-center mt-1">
                <span>Payment Date:</span>
                <span>{new Date(fee.paymentDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Payment Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Payment Instructions</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Payment can be made at the school office during working hours</li>
              <li>• Online payment available through school portal</li>
              <li>• For queries, contact: fees@schooldesk.school</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2" size={16} />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2" size={16} />
              Download PDF
            </Button>
            <Button onClick={handleEmail} className="bg-blue-600 hover:bg-blue-700">
              <Send className="mr-2" size={16} />
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDialog;
