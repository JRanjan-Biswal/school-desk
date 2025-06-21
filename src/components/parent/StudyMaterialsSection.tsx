
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Video, Image, Link as LinkIcon, Volume2, Search, Filter, Download, ExternalLink } from "lucide-react";

interface Material {
  id: number;
  title: string;
  type: 'Document' | 'Video' | 'Audio' | 'Image' | 'Link';
  subject: string;
  teacher: string;
  uploadDate: string;
  size?: string;
  description?: string;
  url?: string;
}

interface StudyMaterialsSectionProps {
  currentChild: any;
}

const StudyMaterialsSection = ({ currentChild }: StudyMaterialsSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Mock data - in real app, this would come from API
  const materials: Material[] = [
    {
      id: 1,
      title: "Mathematics Chapter 5 - Algebra Basics",
      type: "Document",
      subject: "Mathematics",
      teacher: "Teacher 1",
      uploadDate: "2024-06-10",
      size: "2.3 MB",
      description: "Introduction to algebraic expressions and basic operations",
      url: "#"
    },
    {
      id: 2,
      title: "Science Lab Safety Video",
      type: "Video",
      subject: "Science",
      teacher: "Teacher 2",
      uploadDate: "2024-06-08",
      size: "45.2 MB",
      description: "Important safety guidelines for laboratory work",
      url: "#"
    },
    {
      id: 3,
      title: "English Grammar Reference Sheet",
      type: "Image",
      subject: "English",
      teacher: "Teacher 3",
      uploadDate: "2024-06-05",
      size: "1.8 MB",
      description: "Quick reference for common grammar rules",
      url: "#"
    },
    {
      id: 4,
      title: "History Timeline Interactive",
      type: "Link",
      subject: "History",
      teacher: "Teacher 4",
      uploadDate: "2024-06-03",
      description: "Interactive timeline of historical events",
      url: "https://example.com/history-timeline"
    },
    {
      id: 5,
      title: "Pronunciation Guide",
      type: "Audio",
      subject: "English",
      teacher: "Teacher 3",
      uploadDate: "2024-06-01",
      size: "12.5 MB",
      description: "Audio guide for proper pronunciation",
      url: "#"
    }
  ];

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

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || material.subject === filterSubject;
    const matchesType = filterType === "all" || material.type === filterType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const subjects = [...new Set(materials.map(m => m.subject))];
  const types = ['Document', 'Video', 'Audio', 'Image', 'Link'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Study Materials</h1>
          <p className="text-gray-600">
            Learning materials for {currentChild?.name} - {currentChild?.class} {currentChild?.section}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materials List */}
      <div className="grid gap-4">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(material.type)}
                      <h3 className="font-semibold text-gray-900">{material.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{material.subject}</span>
                      <span>•</span>
                      <span>by {material.teacher}</span>
                      <span>•</span>
                      <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
                      {material.size && (
                        <>
                          <span>•</span>
                          <span>{material.size}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeBadge(material.type)}
                  </div>
                </div>

                {material.description && (
                  <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                )}

                <div className="flex justify-end gap-2">
                  {material.type === "Link" ? (
                    <Button 
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => window.open(material.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open Link
                    </Button>
                  ) : (
                    <Button 
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => {
                        // In real app, this would download the file
                        console.log('Downloading:', material.title);
                      }}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
              <p className="text-gray-600">
                {searchTerm || filterSubject !== "all" || filterType !== "all"
                  ? "Try adjusting your search or filters"
                  : "No study materials have been shared yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{materials.length}</div>
            <div className="text-sm text-gray-600">Total Materials</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {materials.filter(m => m.type === 'Document').length}
            </div>
            <div className="text-sm text-gray-600">Documents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {materials.filter(m => m.type === 'Video').length}
            </div>
            <div className="text-sm text-gray-600">Videos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {subjects.length}
            </div>
            <div className="text-sm text-gray-600">Subjects</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyMaterialsSection;
