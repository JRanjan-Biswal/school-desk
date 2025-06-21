
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Calendar, 
  CreditCard, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import PayFeesDialog from "./PayFeesDialog";

interface FeesSectionProps {
  currentChild?: { 
    name: string;
    class: string;
    section: string;
  };
}

const FeesSection = ({ currentChild }: FeesSectionProps) => {
  const [payFeesOpen, setPayFeesOpen] = useState(false);

  const feeData = [
    {
      id: "tuition",
      type: "Tuition Fee",
      amount: 15000,
      dueDate: "2024-07-15",
      status: "pending",
      description: "Quarterly tuition fee",
      term: "Q2 2024"
    },
    {
      id: "transport",
      type: "Transport Fee",
      amount: 3000,
      dueDate: "2024-07-10",
      status: "overdue",
      description: "Monthly transport charges",
      term: "June 2024"
    },
    {
      id: "library",
      type: "Library Fee",
      amount: 500,
      dueDate: "2024-07-20",
      status: "pending",
      description: "Annual library membership",
      term: "2024-25"
    },
    {
      id: "exam",
      type: "Examination Fee",
      amount: 2000,
      dueDate: "2024-06-30",
      status: "paid",
      description: "Mid-term examination fee",
      term: "Mid-term 2024",
      paidDate: "2024-06-25"
    },
    {
      id: "sports",
      type: "Sports Fee",
      amount: 1500,
      dueDate: "2024-08-15",
      status: "paid",
      description: "Annual sports activities fee",
      term: "2024-25",
      paidDate: "2024-06-20"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const pendingFees = feeData.filter(fee => fee.status !== "paid");
  const totalPending = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = feeData
    .filter(fee => fee.status === "paid")
    .reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-600">Fee Management</h2>
          <p className="text-gray-600">
            {currentChild ? `${currentChild.name} - ${currentChild.class} ${currentChild.section}` : "Select a child to view fees"}
          </p>
        </div>
        {pendingFees.length > 0 && (
          <Button 
            onClick={() => setPayFeesOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
          >
            <CreditCard className="mr-2" size={16} />
            Pay Fees
          </Button>
        )}
      </div>

      {/* Fee Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">₹{totalPending.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Items</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">{pendingFees.length}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600 flex items-center">
            <DollarSign className="mr-2" size={20} />
            Fee Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeData.map((fee) => (
              <div 
                key={fee.id} 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{fee.type}</h4>
                    <Badge className={`${getStatusColor(fee.status)} text-xs w-fit flex items-center gap-1`}>
                      {getStatusIcon(fee.status)}
                      {fee.status}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">{fee.description}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Term: {fee.term}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Due: {new Date(fee.dueDate).toLocaleDateString()}
                    </p>
                    {fee.paidDate && (
                      <p className="text-xs text-green-600 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Paid: {new Date(fee.paidDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-bold text-sm sm:text-base">₹{fee.amount.toLocaleString()}</p>
                  {fee.status !== "paid" && (
                    <Button 
                      size="sm" 
                      onClick={() => setPayFeesOpen(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white mt-2 w-full sm:w-auto"
                    >
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      {feeData.filter(fee => fee.status === "paid").length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600 flex items-center">
              <CheckCircle className="mr-2" size={20} />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {feeData
                .filter(fee => fee.status === "paid")
                .map((fee) => (
                  <div 
                    key={fee.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border border-green-200 bg-green-50 rounded-lg space-y-2 sm:space-y-0"
                  >
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">{fee.type}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{fee.term}</p>
                      {fee.paidDate && (
                        <p className="text-xs text-green-600">
                          Paid on {new Date(fee.paidDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-green-600 text-sm sm:text-base">₹{fee.amount.toLocaleString()}</p>
                      <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Paid
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pay Fees Dialog */}
      {currentChild && (
        <PayFeesDialog 
          open={payFeesOpen} 
          onOpenChange={setPayFeesOpen}
          childName={currentChild.name}
          className={`${currentChild.class} ${currentChild.section}`}
        />
      )}
    </div>
  );
};

export default FeesSection;
