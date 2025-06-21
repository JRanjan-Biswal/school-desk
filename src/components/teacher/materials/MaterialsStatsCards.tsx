
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Video, Image, Link } from "lucide-react";

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

interface MaterialsStatsCardsProps {
  materialsList: Material[];
}

const MaterialsStatsCards = ({ materialsList }: MaterialsStatsCardsProps) => {
  const documents = materialsList.filter(m => m.type === 'Document');
  const videos = materialsList.filter(m => m.type === 'Video');
  const images = materialsList.filter(m => m.type === 'Image');
  const links = materialsList.filter(m => m.type === 'Link');

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Materials</CardTitle>
          <FileText className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{materialsList.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Documents</CardTitle>
          <FileText className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Videos</CardTitle>
          <Video className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{videos.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Images & Links</CardTitle>
          <Image className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{images.length + links.length}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialsStatsCards;
