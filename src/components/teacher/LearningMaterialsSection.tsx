
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MaterialsStatsCards from "./materials/MaterialsStatsCards";
import MaterialsList from "./materials/MaterialsList";
import CreateMaterialDialog from "./materials/CreateMaterialDialog";
import MaterialDetailsDialog from "./materials/MaterialDetailsDialog";
import { getMockMaterials } from "./materials/materialsUtils";

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

interface LearningMaterialsSectionProps {
  onCreateMaterial?: () => void;
}

const LearningMaterialsSection = ({ onCreateMaterial }: LearningMaterialsSectionProps) => {
  const [materials, setMaterials] = useState<Material[]>(getMockMaterials());
  const [createOpen, setCreateOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const handleCreateMaterial = (materialData: any) => {
    const newMaterial: Material = {
      id: materials.length + 1,
      title: materialData.title,
      type: materialData.type,
      subject: materialData.subject,
      class: materialData.class,
      section: materialData.section,
      uploadDate: new Date().toISOString().split('T')[0],
      size: materialData.size || '2.5 MB',
      description: materialData.description,
      url: materialData.url
    };
    
    setMaterials(prev => [newMaterial, ...prev]);
    setCreateOpen(false);
    console.log("Material created:", newMaterial);
  };

  const handleViewDetails = (material: Material) => {
    setSelectedMaterial(material);
    setDetailsOpen(true);
  };

  const handleDeleteMaterial = (materialId: number) => {
    setMaterials(prev => prev.filter(m => m.id !== materialId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-600">Learning Materials</h2>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload Material
        </Button>
      </div>

      <MaterialsStatsCards materialsList={materials} />
      
      <MaterialsList 
        materialsList={materials}
        onViewDetails={handleViewDetails}
        onDeleteMaterial={handleDeleteMaterial}
      />

      <CreateMaterialDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreateMaterial={handleCreateMaterial}
      />

      {selectedMaterial && (
        <MaterialDetailsDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          material={selectedMaterial}
        />
      )}
    </div>
  );
};

export default LearningMaterialsSection;
