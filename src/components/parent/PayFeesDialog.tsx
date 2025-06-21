
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Calendar, DollarSign, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PayFeesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  childName: string;
  className: string;
}

const PayFeesDialog = ({ open, onOpenChange, childName, className }: PayFeesDialogProps) => {
  const { toast } = useToast();
  const [selectedFee, setSelectedFee] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const feeData = [
    {
      id: "tuition",
      type: "Tuition Fee",
      amount: 15000,
      dueDate: "2024-07-15",
      status: "pending",
      description: "Quarterly tuition fee"
    },
    {
      id: "transport",
      type: "Transport Fee",
      amount: 3000,
      dueDate: "2024-07-10",
      status: "overdue",
      description: "Monthly transport charges"
    },
    {
      id: "library",
      type: "Library Fee",
      amount: 500,
      dueDate: "2024-07-20",
      status: "pending",
      description: "Annual library membership"
    },
    {
      id: "exam",
      type: "Examination Fee",
      amount: 2000,
      dueDate: "2024-06-30",
      status: "paid",
      description: "Mid-term examination fee"
    }
  ];

  const pendingFees = feeData.filter(fee => fee.status !== "paid");
  const selectedFeeData = feeData.find(fee => fee.id === selectedFee);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePayment = () => {
    if (!selectedFee || !paymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please select a fee and payment method.",
        variant: "destructive"
      });
      return;
    }

    if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) {
      toast({
        title: "Card Details Required",
        description: "Please fill in all card details.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Successful",
      description: `₹${selectedFeeData?.amount} payment processed successfully for ${selectedFeeData?.type}.`,
    });

    // Reset form
    setSelectedFee("");
    setPaymentMethod("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    onOpenChange(false);
  };

  const totalPendingAmount = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl h-[95vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-4 sm:p-6 border-b flex-shrink-0">
          <DialogTitle className="text-purple-600 text-lg sm:text-xl">
            Pay Fees - {childName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Student Info */}
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{childName}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{className}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs sm:text-sm text-gray-600">Total Pending</p>
                    <p className="text-lg sm:text-xl font-bold text-red-600">₹{totalPendingAmount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fee Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-600 flex items-center text-base sm:text-lg">
                  <DollarSign className="mr-2" size={18} />
                  Fee Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {feeData.map((fee) => (
                    <div key={fee.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-1 sm:space-y-0">
                          <h4 className="font-medium text-sm sm:text-base">{fee.type}</h4>
                          <Badge className={`${getStatusColor(fee.status)} text-xs w-fit`}>
                            {fee.status}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">{fee.description}</p>
                        <p className="text-xs text-gray-500">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-left sm:text-right sm:ml-4">
                        <p className="font-bold text-sm sm:text-base">₹{fee.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-600 flex items-center text-base sm:text-lg">
                  <CreditCard className="mr-2" size={18} />
                  Make Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feeSelect">Select Fee to Pay</Label>
                  <Select value={selectedFee} onValueChange={setSelectedFee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a fee to pay" />
                    </SelectTrigger>
                    <SelectContent>
                      {pendingFees.map((fee) => (
                        <SelectItem key={fee.id} value={fee.id}>
                          {fee.type} - ₹{fee.amount.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedFeeData && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0">
                      <span className="font-medium text-sm sm:text-base">{selectedFeeData.type}</span>
                      <span className="font-bold text-purple-600 text-sm sm:text-base">₹{selectedFeeData.amount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{selectedFeeData.description}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                      <SelectItem value="wallet">Digital Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 p-3 sm:p-4 border rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="p-3 sm:p-4 border rounded-lg">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@upi"
                      className="mt-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions - Fixed at bottom */}
        <div className="border-t p-4 sm:p-6 flex-shrink-0 bg-white">
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button 
              onClick={handlePayment}
              className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
              disabled={!selectedFee || !paymentMethod}
            >
              <CheckCircle className="mr-2" size={16} />
              Pay ₹{selectedFeeData?.amount.toLocaleString() || 0}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayFeesDialog;
