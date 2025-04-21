
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket, MapPin, ArrowRight, Bell } from "lucide-react";

interface BookedTicketModalProps {
  open: boolean;
  onClose: () => void;
  ticket: {
    bus: {
      number: string;
      type: string;
      from: string;
      to: string;
      departure: string;
      arrival: string;
    };
    seats: string[];
    amount: number;
    travelDate: string;
  };
  onWakeMeUp: () => void;
}

const BookedTicketModal = ({
  open,
  onClose,
  ticket,
  onWakeMeUp
}: BookedTicketModalProps) => {
  const { bus, seats, amount, travelDate } = ticket;
  return (
    <Dialog open={open} onOpenChange={v => { if(!v) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-2 items-center">
              <Ticket className="h-5 w-5" /> Bus Ticket - {bus.type}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="my-2 space-y-2">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-accent" />
            <span>{bus.from}</span>
            <ArrowRight className="h-4 w-4 mx-1" />
            <span>{bus.to}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Date:</span> <Badge variant="outline">{travelDate}</Badge>
            <span>Departs:</span> <Badge variant="outline">{bus.departure}</Badge>
            <span>Arrives:</span> <Badge variant="outline">{bus.arrival}</Badge>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Coach #:</span>{" "}
            <Badge className="mr-2">{bus.number}</Badge>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Seats:</span>{" "}
            <Badge variant="outline">{seats.join(", ")}</Badge>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Paid:</span>{" "}
            <span className="font-bold">₹{amount}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onWakeMeUp}>
            <Bell className="h-4 w-4 mr-1" /> Wake Me Up
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookedTicketModal;
