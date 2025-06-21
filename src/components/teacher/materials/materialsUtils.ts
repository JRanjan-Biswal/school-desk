
interface Material {
  id: number;
  title: string;
  type: 'Document' | 'Video' | 'Audio' | 'Image' | 'Link';
  subject: string;
  class: string;
  section: string;
  uploadDate: string;
  size?: string;
  description?: string;
  url?: string;
}

export const getMockMaterials = (): Material[] => {
  return [
    {
      id: 1,
      title: "Algebra Basics - Chapter 1",
      type: "Document",
      subject: "Mathematics",
      class: "Class 1",
      section: "A",
      uploadDate: "2024-01-20",
      size: "2.3 MB",
      description: "Introduction to algebraic expressions and basic operations"
    },
    {
      id: 2,
      title: "Geometry Tutorial Video",
      type: "Video",
      subject: "Mathematics",
      class: "Class 2",
      section: "B",
      uploadDate: "2024-01-18",
      size: "45.2 MB",
      description: "Comprehensive video tutorial covering basic geometric shapes and properties"
    },
    {
      id: 3,
      title: "Math Formula Reference",
      type: "Image",
      subject: "Mathematics",
      class: "Class 1",
      section: "A",
      uploadDate: "2024-01-15",
      size: "1.8 MB",
      description: "Quick reference sheet for important mathematical formulas"
    },
    {
      id: 4,
      title: "Khan Academy - Fractions",
      type: "Link",
      subject: "Mathematics",
      class: "Class 1",
      section: "A",
      uploadDate: "2024-01-12",
      description: "External resource for understanding fractions",
      url: "https://www.khanacademy.org/math/arithmetic/fractions"
    },
    {
      id: 5,
      title: "Problem Solving Audio Guide",
      type: "Audio",
      subject: "Mathematics",
      class: "Class 2",
      section: "B",
      uploadDate: "2024-01-10",
      size: "12.5 MB",
      description: "Audio guide for step-by-step problem solving techniques"
    }
  ];
};
