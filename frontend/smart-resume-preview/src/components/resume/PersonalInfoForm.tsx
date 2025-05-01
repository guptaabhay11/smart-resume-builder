import { PersonalInfo } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
          placeholder="John Doe"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Professional Title</Label>
        <Input
          id="title"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Software Engineer"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="+91 123 456 7890"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={data.location}
          onChange={handleChange}
          placeholder="Mohali, Chandigarh, India"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={data.summary}
          onChange={handleChange}
          placeholder="Experienced software engineer with a passion for creating efficient and user-friendly applications..."
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (optional)</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={data.linkedin || ""}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="github">GitHub (optional)</Label>
          <Input
            id="github"
            name="github"
            value={data.github || ""}
            onChange={handleChange}
            placeholder="github.com/johndoe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            name="website"
            value={data.website || ""}
            onChange={handleChange}
            placeholder="johndoe.com"
          />
        </div>
      </div>
    </div>
  );
};
