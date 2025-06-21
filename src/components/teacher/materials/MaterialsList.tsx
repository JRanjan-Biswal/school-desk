
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import MaterialCard from "./MaterialCard";

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

interface MaterialsListProps {
  materialsList: Material[];
  onViewDetails: (material: Material) => void;
  onDeleteMaterial: (materialId: number) => void;
}

const MaterialsList = ({ materialsList, onViewDetails, onDeleteMaterial }: MaterialsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-purple-600">My Learning Materials</CardTitle>
      </CardHeader>
      <CardContent>
        {materialsList.length > 0 ? (
          <div className="space-y-4">
            {materialsList.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onViewDetails={onViewDetails}
                onDeleteMaterial={onDeleteMaterial}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No learning materials uploaded yet.</p>
            <p className="text-sm">Start by uploading your first material.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialsList;
