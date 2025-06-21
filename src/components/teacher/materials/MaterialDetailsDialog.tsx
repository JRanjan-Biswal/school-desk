
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, Image, Link as LinkIcon, Volume2, ExternalLink } from "lucide-react";

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

interface MaterialDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: Material;
}

const MaterialDetailsDialog = ({ open, onOpenChange, material }: MaterialDetailsDialogProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Document':
        return <FileText className="h-5 w-5" />;
      case 'Video':
        return <Video className="h-5 w-5" />;
      case 'Audio':
        return <Volume2 className="h-5 w-5" />;
      case 'Image':
        return <Image className="h-5 w-5" />;
      case 'Link':
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getTypeIcon(material.type)}
            Material Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{material.title}</h3>
              <div className="flex items-center gap-2">
                {getTypeBadge(material.type)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Subject:</span>
              <p className="font-medium">{material.subject}</p>
            </div>
            <div>
              <span className="text-gray-500">Class:</span>
              <p className="font-medium">{material.class}</p>
            </div>
            <div>
              <span className="text-gray-500">Section:</span>
              <p className="font-medium">{material.section || "All"}</p>
            </div>
            <div>
              <span className="text-gray-500">Upload Date:</span>
              <p className="font-medium">{new Date(material.uploadDate).toLocaleDateString()}</p>
            </div>
            {material.size && (
              <div>
                <span className="text-gray-500">File Size:</span>
                <p className="font-medium">{material.size}</p>
              </div>
            )}
            <div>
              <span className="text-gray-500">Type:</span>
              <p className="font-medium">{material.type}</p>
            </div>
          </div>

          {material.description && (
            <div>
              <span className="text-gray-500 text-sm">Description:</span>
              <p className="mt-1 text-gray-900">{material.description}</p>
            </div>
          )}

          {material.url && material.type === "Link" && (
            <div>
              <span className="text-gray-500 text-sm">URL:</span>
              <div className="mt-1 flex items-center gap-2">
                <a 
                  href={material.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                >
                  {material.url}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {material.url && (
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => window.open(material.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Open Material
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialDetailsDialog;
