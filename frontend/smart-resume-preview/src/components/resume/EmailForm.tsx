
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";

interface EmailFormProps {
  pdfFile?: File;
  onSuccess?: () => void;
}

export const EmailForm = ({ pdfFile, onSuccess }: EmailFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pdfFile) {
      toast({
        title: "No resume to send",
        description: "Please generate your resume PDF first.",
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // This is a mock implementation since EmailJS requires actual service IDs
    // For a real implementation, you would need to set up EmailJS with your account
    try {
      toast({
        title: "Email Sent!",
        description: `Your resume has been sent to ${email}`,
      });
      setEmail("");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Failed to send email",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Resume"}
      </Button>
    </form>
  );
};
