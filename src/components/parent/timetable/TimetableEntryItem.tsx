
import { Badge } from "@/components/ui/badge";
import { TimetableEntry } from "./types";

interface TimetableEntryItemProps {
  entry: TimetableEntry;
}

const TimetableEntryItem = ({ entry }: TimetableEntryItemProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "break":
        return "bg-green-100 text-green-700 border-green-300";
      case "lunch":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "activity":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
      <div className="flex-1 min-w-0 mb-3 sm:mb-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <span className="text-lg font-medium text-purple-600">{entry.time}</span>
          <Badge variant="outline" className={`text-xs w-fit ${getTypeColor(entry.type)}`}>
            {entry.type}
          </Badge>
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-1">{entry.subject}</h4>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
          {entry.teacher && (
            <span className="font-medium">{entry.teacher}</span>
          )}
          {entry.room && entry.teacher && (
            <span className="hidden sm:inline">•</span>
          )}
          {entry.room && (
            <span>{entry.room}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimetableEntryItem;
