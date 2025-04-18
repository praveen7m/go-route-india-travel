
import React, { useState } from "react";
import { toast } from "sonner";
import { Bell, BellOff, Clock, MapPin, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface WakeMeUpModalProps {
  open: boolean;
  onClose: () => void;
  busDetails: {
    number: string;
    destination: string;
    arrivalTime: string;
  } | null;
}

const WakeMeUpModal = ({ open, onClose, busDetails }: WakeMeUpModalProps) => {
  const [minutesBefore, setMinutesBefore] = useState(5);
  const [notifyNearDestination, setNotifyNearDestination] = useState(true);
  const [notifyOnArrival, setNotifyOnArrival] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast("Wake Me Up alert set successfully", {
        description: `You'll be notified ${minutesBefore} minutes before arrival`,
      });
      
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Wake Me Up Alert</DialogTitle>
          <DialogDescription>
            Set up alerts for bus {busDetails?.number} to {busDetails?.destination}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Minutes Before Arrival</Label>
                <div className="text-sm text-muted-foreground">
                  Alert me {minutesBefore} minutes before reaching my stop
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">{minutesBefore}</span>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Slider
              value={[minutesBefore]}
              onValueChange={(value) => setMinutesBefore(value[0])}
              min={2}
              max={15}
              step={1}
              className="my-4"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="cursor-pointer">Notify Near Destination</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when approaching destination
                </p>
              </div>
              <Switch
                checked={notifyNearDestination}
                onCheckedChange={setNotifyNearDestination}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="cursor-pointer">Notify On Arrival</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when the bus arrives at the destination
                </p>
              </div>
              <Switch
                checked={notifyOnArrival}
                onCheckedChange={setNotifyOnArrival}
              />
            </div>
          </div>
          
          <div className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200 p-3 rounded-md flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">
              Make sure your device volume is turned up to hear alerts
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <BellOff className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" /> Setting...
              </>
            ) : (
              <>
                <Bell className="mr-2 h-4 w-4" /> Set Alert
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WakeMeUpModal;
