
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentForm from "./quick-add/StudentForm";
import TeacherForm from "./quick-add/TeacherForm";
import ClassForm from "./quick-add/ClassForm";
import ExamForm from "./quick-add/ExamForm";

interface QuickAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickAddDialog = ({ open, onOpenChange }: QuickAddDialogProps) => {
  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-600">Quick Add</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
            <TabsTrigger value="class">Class</TabsTrigger>
            <TabsTrigger value="exam">Exam</TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="space-y-4">
            <StudentForm onClose={handleClose} />
          </TabsContent>

          <TabsContent value="teacher" className="space-y-4">
            <TeacherForm onClose={handleClose} />
          </TabsContent>

          <TabsContent value="class" className="space-y-4">
            <ClassForm onClose={handleClose} />
          </TabsContent>

          <TabsContent value="exam" className="space-y-4">
            <ExamForm onClose={handleClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuickAddDialog;
