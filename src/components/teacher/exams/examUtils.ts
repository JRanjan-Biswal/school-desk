
interface Result {
  id: number;
  examId: number;
  studentId: number;
  studentName: string;
  rollNo: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  remarks?: string;
}

export const generateMockResults = (examId: number, totalStudents: number = 40): Result[] => {
  const results: Result[] = [];
  for (let i = 1; i <= totalStudents; i++) {
    const marksObtained = Math.floor(Math.random() * 40) + 10; // 10-50 marks
    const percentage = (marksObtained / 40) * 100;
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    else if (percentage >= 40) grade = 'E';

    results.push({
      id: i,
      examId,
      studentId: i,
      studentName: `Student ${i}`,
      rollNo: `${String(i).padStart(3, '0')}`,
      marksObtained,
      totalMarks: 40,
      grade,
      remarks: Math.random() > 0.7 ? "Good performance" : undefined
    });
  }
  return results;
};

export const getMockExams = () => {
  return [
    {
      id: 1,
      name: "Mathematics Unit Test 1",
      type: "Unit Test",
      class: "Class 1",
      section: "A",
      subject: "Mathematics",
      date: "2024-01-25",
      time: "10:00",
      duration: 60,
      totalMarks: 50,
      status: "upcoming" as const,
      description: "Covers chapters 1-3"
    },
    {
      id: 2,
      name: "Mathematics Mid Term",
      type: "Mid Term",
      class: "Class 2",
      section: "B",
      subject: "Mathematics",
      date: "2024-01-20",
      time: "09:00",
      duration: 90,
      totalMarks: 100,
      status: "ongoing" as const,
      description: "Mid-term examination"
    },
    {
      id: 3,
      name: "Mathematics Chapter 4 Test",
      type: "Unit Test",
      class: "Class 1",
      section: "A",
      subject: "Mathematics",
      date: "2024-01-15",
      time: "11:00",
      duration: 45,
      totalMarks: 40,
      status: "completed" as const,
      description: "Chapter 4 assessment"
    }
  ];
};
