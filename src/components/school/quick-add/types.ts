
export interface StudentFormData {
  name: string;
  class: string;
  section: string;
  rollNo: string;
  parentName: string;
  phoneNumber: string;
}

export interface TeacherFormData {
  name: string;
  subject: string;
  qualification: string;
  phoneNumber: string;
  email: string;
  classTeacher: string;
  section: string;
}

export interface ClassFormData {
  className: string;
  section: string;
  capacity: string;
  classTeacher: string;
  subjects: string;
}

export interface ExamFormData {
  examName: string;
  examType: string;
  class: string;
  section: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  totalMarks: string;
  description: string;
}
