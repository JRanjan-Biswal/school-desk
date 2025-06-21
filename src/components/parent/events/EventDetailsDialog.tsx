
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Tag, FileText } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'sports' | 'cultural' | 'academic' | 'meeting' | 'holiday';
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface EventDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event;
}

const EventDetailsDialog = ({ open, onOpenChange, event }: EventDetailsDialogProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'ongoing':
        return <Badge className="bg-yellow-100 text-yellow-800">Ongoing</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getEventTypeBadge = (type: string) => {
    const styles = {
      sports: "bg-orange-100 text-orange-800",
      cultural: "bg-purple-100 text-purple-800",
      academic: "bg-blue-100 text-blue-800",
      meeting: "bg-gray-100 text-gray-800",
      holiday: "bg-green-100 text-green-800"
    };
    return <Badge className={styles[type as keyof typeof styles] || "bg-gray-100 text-gray-800"}>{type}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-purple-600 flex items-center justify-between">
            Event Details
            <div className="flex space-x-2">
              {getEventTypeBadge(event.type)}
              {getStatusBadge(event.status)}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-600">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start space-x-2">
                  <FileText className="h-4 w-4 text-gray-500 mt-1" />
                  <div>
                    <span className="text-sm text-gray-600">Description:</span>
                    <p className="font-medium text-gray-900">{event.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Time:</span>
                    <span className="font-medium">{event.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="font-medium">{event.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Event Type:</span>
                  <span className="font-medium capitalize">{event.type}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Please arrive 15 minutes before the scheduled time</li>
                  <li>• Bring any required materials or documents</li>
                  <li>• Contact the school office for any queries</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsDialog;
