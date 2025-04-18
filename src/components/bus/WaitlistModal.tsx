
import React from "react";
import { toast } from "sonner";
import { Clock, CheckCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  busDetails: {
    number: string;
    from: string;
    to: string;
  } | null;
}

const WaitlistModal = ({ open, onClose, busDetails }: WaitlistModalProps) => {
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !phone) {
      toast("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after showing success state
      setTimeout(() => {
        toast("You've been added to the waitlist successfully");
        onClose();
        setIsSuccess(false);
        setEmail("");
        setPhone("");
      }, 1500);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Join the Waitlist</DialogTitle>
              <DialogDescription>
                We'll notify you when a seat becomes available for{" "}
                {busDetails?.number} from {busDetails?.from} to {busDetails?.to}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <DialogFooter className="mt-6">
                <Button variant="outline" type="button" onClick={onClose}>
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>Join Waitlist</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle className="h-16 w-16 text-goroute-green animate-pulse" />
            <h3 className="text-xl font-semibold text-center">
              Added to Waitlist!
            </h3>
            <p className="text-sm text-center text-muted-foreground">
              We'll notify you as soon as a seat becomes available.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
