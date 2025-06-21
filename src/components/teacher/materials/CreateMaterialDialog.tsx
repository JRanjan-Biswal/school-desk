
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface CreateMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateMaterial: (materialData: any) => void;
}

const CreateMaterialDialog = ({ open, onOpenChange, onCreateMaterial }: CreateMaterialDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    subject: "",
    class: "",
    section: "",
    description: "",
    url: ""
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.type || !formData.subject || !formData.class) {
      return;
    }
    
    onCreateMaterial({
      ...formData,
      uploadedFile: uploadedFile
    });
    setFormData({
      title: "",
      type: "",
      subject: "",
      class: "",
      section: "",
      description: "",
      url: ""
    });
    setUploadedFile(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      console.log("File uploaded:", file.name);
    }
  };

  const shouldShowUpload = formData.type && formData.type !== "Link";
  const shouldShowUrl = formData.type === "Link";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Learning Material</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Material Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter material title"
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Material Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select material type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Document">Document</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
                <SelectItem value="Image">Image</SelectItem>
                <SelectItem value="Link">Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {shouldShowUpload && (
            <div>
              <Label htmlFor="file-upload">Upload File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  accept={
                    formData.type === "Document" ? ".pdf,.doc,.docx,.txt" :
                    formData.type === "Video" ? ".mp4,.avi,.mov,.wmv" :
                    formData.type === "Audio" ? ".mp3,.wav,.aac" :
                    formData.type === "Image" ? ".jpg,.jpeg,.png,.gif" :
                    "*"
                  }
                  className="flex-1"
                />
                <Button type="button" size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {uploadedFile && (
                <p className="text-sm text-green-600 mt-1">
                  File selected: {uploadedFile.name}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="class">Class</Label>
              <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 1">Class 1</SelectItem>
                  <SelectItem value="Class 2">Class 2</SelectItem>
                  <SelectItem value="Class 3">Class 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="section">Section (Optional)</Label>
            <Input
              id="section"
              value={formData.section}
              onChange={(e) => handleInputChange("section", e.target.value)}
              placeholder="Enter section (A, B, C)"
            />
          </div>

          {shouldShowUrl && (
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                placeholder="Enter material URL"
                type="url"
              />
            </div>
          )}

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter material description"
              rows={3}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
              Upload Material
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMaterialDialog;
