
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, MapPin, Users, Eye } from "lucide-react";
import ExamDetailsDialog from "./exams/ExamDetailsDialog";
import EventDetailsDialog from "./events/EventDetailsDialog";

interface Child {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
}

interface Exam {
  id: number;
  name: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  totalMarks: number;
  status: 'upcoming' | 'completed';
  syllabus?: string;
  instructions?: string;
}

interface ExamResult {
  id: number;
  examId: number;
  examName: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  date: string;
  remarks?: string;
}

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

interface ExamsEventsSectionProps {
  currentChild: Child | undefined;
}

const ExamsEventsSection = ({ currentChild }: ExamsEventsSectionProps) => {
  const [activeTab, setActiveTab] = useState("upcoming-exams");
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [examDetailsOpen, setExamDetailsOpen] = useState(false);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);

  // Mock data for exams
  const upcomingExams: Exam[] = [
    {
      id: 1,
      name: "Mid Term Mathematics",
      subject: "Mathematics",
      date: "2025-06-15",
      time: "10:00 AM",
      duration: 120,
      totalMarks: 100,
      status: 'upcoming',
      syllabus: "Chapters 1-5: Algebra, Geometry, Statistics",
      instructions: "Bring calculator, ruler, and extra pen"
    },
    {
      id: 2,
      name: "Science Unit Test",
      subject: "Science",
      date: "2025-06-12",
      time: "09:00 AM",
      duration: 90,
      totalMarks: 50,
      status: 'upcoming',
      syllabus: "Plants and Animals, Solar System",
      instructions: "Study diagrams carefully"
    },
    {
      id: 3,
      name: "English Grammar Test",
      subject: "English",
      date: "2025-06-18",
      time: "11:00 AM",
      duration: 60,
      totalMarks: 40,
      status: 'upcoming'
    }
  ];

  const examResults: ExamResult[] = [
    {
      id: 1,
      examId: 10,
      examName: "Mathematics Quiz",
      subject: "Mathematics",
      marksObtained: 45,
      totalMarks: 50,
      grade: "A",
      date: "2025-05-28",
      remarks: "Excellent performance"
    },
    {
      id: 2,
      examId: 11,
      examName: "Science Test",
      subject: "Science",
      marksObtained: 38,
      totalMarks: 40,
      grade: "A+",
      date: "2025-05-25",
      remarks: "Outstanding work"
    },
    {
      id: 3,
      examId: 12,
      examName: "English Essay",
      subject: "English",
      marksObtained: 28,
      totalMarks: 35,
      grade: "B+",
      date: "2025-05-22",
      remarks: "Good effort, improve grammar"
    }
  ];

  const events: Event[] = [
    {
      id: 1,
      title: "Annual Sports Day",
      description: "Inter-house sports competition with various athletic events",
      date: "2025-06-20",
      time: "08:00 AM",
      location: "School Ground",
      type: 'sports',
      status: 'upcoming'
    },
    {
      id: 2,
      title: "Science Exhibition",
      description: "Students will showcase their science projects and experiments",
      date: "2025-06-25",
      time: "10:00 AM",
      location: "Science Lab",
      type: 'academic',
      status: 'upcoming'
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      description: "Discussion about student progress and academic performance",
      date: "2025-06-30",
      time: "02:00 PM",
      location: "Classroom",
      type: 'meeting',
      status: 'upcoming'
    },
    {
      id: 4,
      title: "Cultural Program",
      description: "Annual cultural fest with dance, music and drama performances",
      date: "2025-07-05",
      time: "06:00 PM",
      location: "School Auditorium",
      type: 'cultural',
      status: 'upcoming'
    }
  ];

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

  const getGradeBadge = (grade: string) => {
    const styles = {
      'A+': "bg-green-100 text-green-800",
      'A': "bg-green-100 text-green-800",
      'B+': "bg-blue-100 text-blue-800",
      'B': "bg-blue-100 text-blue-800",
      'C+': "bg-yellow-100 text-yellow-800",
      'C': "bg-yellow-100 text-yellow-800",
      'D': "bg-red-100 text-red-800",
      'F': "bg-red-100 text-red-800"
    };
    return <Badge className={styles[grade as keyof typeof styles] || "bg-gray-100 text-gray-800"}>{grade}</Badge>;
  };

  const handleViewExam = (exam: Exam) => {
    setSelectedExam(exam);
    setExamDetailsOpen(true);
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setEventDetailsOpen(true);
  };

  if (!currentChild) {
    return (
      <div className="text-center py-8 text-gray-500">
        Please select a child to view exams and events.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-purple-600">Exams & Events</h2>
        <p className="text-gray-600">View upcoming exams, results, and school events for {currentChild.name}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming-exams">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="results">Exam Results</TabsTrigger>
          <TabsTrigger value="events">School Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming-exams" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {upcomingExams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-purple-600">{exam.name}</h3>
                        {getStatusBadge(exam.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>{exam.subject}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(exam.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{exam.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{exam.totalMarks} marks</span>
                        </div>
                      </div>
                      {exam.syllabus && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-700"><strong>Syllabus:</strong> {exam.syllabus}</p>
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewExam(exam)}
                      className="ml-4"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {examResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-purple-600">{result.examName}</h3>
                        {getGradeBadge(result.grade)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>{result.subject}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(result.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{result.marksObtained}/{result.totalMarks}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">
                            {((result.marksObtained / result.totalMarks) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      {result.remarks && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-700"><strong>Remarks:</strong> {result.remarks}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-purple-600">{event.title}</h3>
                        <div className="flex space-x-2">
                          {getEventTypeBadge(event.type)}
                          {getStatusBadge(event.status)}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{event.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewEvent(event)}
                      className="ml-4"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedExam && (
        <ExamDetailsDialog
          open={examDetailsOpen}
          onOpenChange={setExamDetailsOpen}
          exam={selectedExam}
        />
      )}

      {selectedEvent && (
        <EventDetailsDialog
          open={eventDetailsOpen}
          onOpenChange={setEventDetailsOpen}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default ExamsEventsSection;
