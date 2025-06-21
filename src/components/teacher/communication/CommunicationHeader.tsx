
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface CommunicationHeaderProps {
  onComposeClick: () => void;
}

const CommunicationHeader = ({ onComposeClick }: CommunicationHeaderProps) => {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-600">Communication</h2>
        <p className="text-sm md:text-base text-gray-600 mt-1">Send and receive messages with students, parents, and staff</p>
      </div>
      <Button 
        onClick={onComposeClick}
        className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
        size="sm"
      >
        <Send className="mr-2 h-4 w-4" />
        <span className="hidden xs:inline">Compose Message</span>
        <span className="xs:hidden">Compose</span>
      </Button>
    </div>
  );
};

export default CommunicationHeader;
