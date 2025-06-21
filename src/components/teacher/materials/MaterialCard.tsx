
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, FileText, Video, Image, Link as LinkIcon, Volume2 } from "lucide-react";

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

interface MaterialCardProps {
  material: Material;
  onViewDetails: (material: Material) => void;
  onDeleteMaterial: (materialId: number) => void;
}

const MaterialCard = ({ material, onViewDetails, onDeleteMaterial }: MaterialCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Document':
        return <FileText className="h-4 w-4" />;
      case 'Video':
        return <Video className="h-4 w-4" />;
      case 'Audio':
        return <Volume2 className="h-4 w-4" />;
      case 'Image':
        return <Image className="h-4 w-4" />;
      case 'Link':
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      Document: "bg-blue-100 text-blue-800",
      Video: "bg-green-100 text-green-800",
      Audio: "bg-purple-100 text-purple-800",
      Image: "bg-orange-100 text-orange-800",
      Link: "bg-gray-100 text-gray-800"
    };
    return <Badge className={colors[type as keyof typeof colors] || colors.Document}>{type}</Badge>;
  };

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getTypeIcon(material.type)}
            <h3 className="font-semibold text-gray-900">{material.title}</h3>
          </div>
          <p className="text-sm text-gray-600">{material.subject} • {material.class}-{material.section}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getTypeBadge(material.type)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3 text-sm">
        <div>
          <span className="text-gray-500">Upload Date:</span>
          <p className="font-medium">{new Date(material.uploadDate).toLocaleDateString()}</p>
        </div>
        {material.size && (
          <div>
            <span className="text-gray-500">Size:</span>
            <p className="font-medium">{material.size}</p>
          </div>
        )}
        <div>
          <span className="text-gray-500">Type:</span>
          <p className="font-medium">{material.type}</p>
        </div>
      </div>

      {material.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{material.description}</p>
      )}

      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(material)}
        >
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Button>
        <Button 
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => onDeleteMaterial(material.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MaterialCard;
