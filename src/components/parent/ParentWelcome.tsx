
import { Button } from "@/components/ui/button";

interface ParentWelcomeProps {
  selectedChild: string;
  children: Array<{ id: string; name: string; class: string; section: string; rollNo: string }>;
  onChildChange: (childId: string) => void;
  onReportCardOpen: () => void;
  onPayFeesOpen: () => void;
}

const ParentWelcome = ({
  selectedChild,
  children,
  onChildChange,
  onReportCardOpen,
  onPayFeesOpen
}: ParentWelcomeProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-purple-600">Welcome, Parent 1</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-600">Viewing:</span>
          <select 
            value={selectedChild} 
            onChange={(e) => onChildChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-gray-700"
          >
            {children.map(child => (
              <option key={child.id} value={child.id}>
                {child.name} - {child.class} {child.section}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="border-purple-200 text-purple-700 hover:bg-purple-50"
          onClick={onReportCardOpen}
        >
          View Report Card
        </Button>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={onPayFeesOpen}
        >
          Pay Fees
        </Button>
      </div>
    </div>
  );
};

export default ParentWelcome;
