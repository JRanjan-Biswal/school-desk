
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TimetableLegend = () => {
  return (
    <Card className="p-4 bg-white border border-gray-200 shadow-sm">
      <h4 className="font-semibold text-gray-700 mb-3">Legend</h4>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">Class</Badge>
          <span className="text-sm text-gray-600">Regular Classes</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">Break</Badge>
          <span className="text-sm text-gray-600">Break Time</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">Lunch</Badge>
          <span className="text-sm text-gray-600">Lunch Break</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">Activity</Badge>
          <span className="text-sm text-gray-600">Activities & Sports</span>
        </div>
      </div>
    </Card>
  );
};

export default TimetableLegend;
