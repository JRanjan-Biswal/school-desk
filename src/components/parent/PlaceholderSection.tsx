
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlaceholderSectionProps {
  title: string;
}

const PlaceholderSection = ({ title }: PlaceholderSectionProps) => {
  return (
    <div className="text-center py-20">
      <Card className="p-12 mx-auto max-w-lg bg-white border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">{title}</h2>
        <p className="text-gray-600 mb-6">This section is under development</p>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          Coming Soon
        </Button>
      </Card>
    </div>
  );
};

export default PlaceholderSection;
