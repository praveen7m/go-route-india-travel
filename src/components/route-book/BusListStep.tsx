
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, ChevronRight, Calendar, Bus, Phone, MessageSquare, Route } from "lucide-react";
import { BusCard } from "./BusCard";
import type { BusData } from "@/types/bus-route";
import { mockBuses } from "@/types/bus-route";

interface BusListStepProps {
  fromCity: string;
  toCity: string;
  travelDate: string;
  genderPreference: string | null;
  onBookNow: (bus: BusData) => void;
  onJoinWaitlist: (bus: BusData) => void;
  onViewRoute: (bus: BusData) => void; // NEW
  onBack: () => void;
}

export const BusListStep = ({
  fromCity,
  toCity,
  travelDate,
  genderPreference,
  onBookNow,
  onJoinWaitlist,
  onViewRoute,
  onBack
}: BusListStepProps) => {
  const filteredBuses = mockBuses.filter(
    bus => genderPreference !== "womens_only" || bus.womensOnly || !bus.womensOnly
  );

  return (
    <div className="space-y-4">
      <div className="bg-card p-4 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center mb-1">
            <MapPin className="h-4 w-4 mr-1 text-accent" />
            <span>{fromCity}</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <MapPin className="h-4 w-4 mr-1 text-accent" />
            <span>{toCity}</span>
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{travelDate}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onBack}>
          Modify
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="all">All Buses</TabsTrigger>
          <TabsTrigger value="ac">AC Buses</TabsTrigger>
          <TabsTrigger value="sleeper">Sleepers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredBuses.map((bus) => (
            <BusCard
              key={bus.id}
              bus={bus}
              onBookNow={onBookNow}
              onJoinWaitlist={onJoinWaitlist}
              // Replace Wake Me Up with View Route
              extraAction={{
                label: "View Route",
                icon: <Route className="h-4 w-4 mr-1" />,
                onClick: () => onViewRoute(bus)
              }}
            />
          ))}
        </TabsContent>

        <TabsContent value="ac" className="mt-4">
          <div className="p-8 text-center">
            <Bus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Filter applied: AC Buses</h3>
            <p className="text-muted-foreground mt-2">
              Additional bus options will appear here when available
            </p>
          </div>
        </TabsContent>

        <TabsContent value="sleeper" className="mt-4">
          <div className="p-8 text-center">
            <Bus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Filter applied: Sleeper Buses</h3>
            <p className="text-muted-foreground mt-2">
              Additional bus options will appear here when available
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <div className="p-4">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <div className="text-sm text-muted-foreground mb-4">
            Contact our customer support for assistance with bookings
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
