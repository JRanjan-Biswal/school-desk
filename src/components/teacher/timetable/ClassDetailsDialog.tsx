
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, BookOpen, Calendar } from "lucide-react";

interface TimetableEntry {
  day: string;
  time: string;
  class: string;
  section: string;
  subject: string;
  room: string;
  students: number;
}

interface ClassDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: TimetableEntry | null;
}

const ClassDetailsDialog = ({ open, onOpenChange, classData }: ClassDetailsDialogProps) => {
  if (!classData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-purple-600 flex items-center">
            <BookOpen className="mr-2" size={20} />
            Class Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {classData.class} - Section {classData.section}
                  </h3>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    {classData.subject}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">{classData.day}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{classData.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">{classData.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">{classData.students} students</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Class Information</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subject:</span>
                  <span className="font-medium">{classData.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span>Class & Section:</span>
                  <span className="font-medium">{classData.class} - {classData.section}</span>
                </div>
                <div className="flex justify-between">
                  <span>Schedule:</span>
                  <span className="font-medium">{classData.day}, {classData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Classroom:</span>
                  <span className="font-medium">{classData.room}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Students:</span>
                  <span className="font-medium">{classData.students}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassDetailsDialog;
