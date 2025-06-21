
import { Card } from "@/components/ui/card";

interface ChildInfoCardProps {
  child: { id: string; name: string; class: string; section: string; rollNo: string };
}

const ChildInfoCard = ({ child }: ChildInfoCardProps) => {
  return (
    <Card className="p-6 bg-white border border-gray-200 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
          {child.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-purple-600">{child.name}</h3>
          <p className="text-gray-600">{child.class} - Section {child.section}</p>
          <p className="text-gray-600">Roll No: {child.rollNo}</p>
        </div>
      </div>
    </Card>
  );
};

export default ChildInfoCard;
