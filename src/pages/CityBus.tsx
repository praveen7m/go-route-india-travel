
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Search, 
  ArrowRight, 
  AlertCircle, 
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { CityBusBusList } from "./CityBusBusList";
import WakeMeUpModal from "@/components/bus/WakeMeUpModal";
import { busService, CityBus as CityBusType } from "@/services/busService";
import { useQuery, useMutation } from "@tanstack/react-query";
import BusTrackingView from "@/components/bus/BusTrackingView";

const CityBus = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showWakeMeUpModal, setShowWakeMeUpModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState<{number: string; destination: string; arrivalTime: string} | null>(null);
  const [showTrackingView, setShowTrackingView] = useState(false);
  const [busToTrack, setBusToTrack] = useState<string | null>(null);

  // Query to fetch city buses
  const { data: buses, isLoading, error, refetch } = useQuery({
    queryKey: ['cityBuses', fromLocation, toLocation],
    queryFn: () => busService.getCityBuses(fromLocation, toLocation),
    enabled: false, // Don't fetch on component mount
  });

  // Mutation for wake me up
  const wakeMeUpMutation = useMutation({
    mutationFn: (params: { busNumber: string, minutesBefore: number, notifyOptions: any }) => 
      busService.setWakeMeUp(params.busNumber, params.minutesBefore, params.notifyOptions),
    onSuccess: () => {
      toast.success("Wake Me Up alert set successfully");
    },
    onError: (error) => {
      toast.error("Failed to set alert");
    }
  });

  const handleSearch = () => {
    if (!fromLocation || !toLocation) {
      toast.error("Please enter both from and to locations");
      return;
    }
    refetch();
  };

  const handleWakeMeUp = (busNumber: string) => {
    const bus = buses?.data?.find((b) => b.number === busNumber);
    if (bus) {
      setSelectedBus({
        number: bus.number,
        destination: toLocation,
        arrivalTime: bus.arrivalTime
      });
      setShowWakeMeUpModal(true);
    }
  };

  const handleTrackBus = (busNumber: string) => {
    setBusToTrack(busNumber);
    setShowTrackingView(true);
  };

  const getCrowdBadge = (level: string) => {
    if (level === "low") {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
          <Users className="h-3 w-3 mr-1" /> Low Crowd
        </Badge>
      );
    } else if (level === "medium") {
      return (
        <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
          <Users className="h-3 w-3 mr-1" /> Medium Crowd
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
          <Users className="h-3 w-3 mr-1" /> Heavy Crowd
        </Badge>
      );
    }
  };

  const getCrowdBarColor = (level: string) => {
    if (level === "low") return "bg-green-500";
    if (level === "medium") return "bg-orange-500";
    return "bg-red-500";
  };

  const getCrowdBarWidth = (level: string) => {
    if (level === "low") return "30%";
    if (level === "medium") return "60%";
    return "90%";
  };

  if (showTrackingView && busToTrack) {
    return (
      <BusTrackingView
        busNumber={busToTrack}
        onBack={() => {
          setShowTrackingView(false);
          setBusToTrack(null);
        }}
      />
    );
  }

  return (
    <div className="go-container space-y-6 pb-16">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">City Bus</h1>
        <p className="text-muted-foreground">Find and track city buses in real-time</p>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="from"
                  placeholder="Enter starting point"
                  className="pl-9"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="to"
                  placeholder="Enter destination"
                  className="pl-9"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Buses
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading buses</p>
            <p className="text-sm">Please try again or check your connection</p>
          </div>
        </div>
      )}

      {buses && buses.data && buses.data.length > 0 ? (
        <CityBusBusList
          buses={buses.data}
          fromLocation={fromLocation}
          toLocation={toLocation}
          onWakeMeUp={handleWakeMeUp}
          onTrackBus={handleTrackBus}
          getCrowdBadge={getCrowdBadge}
          getCrowdBarColor={getCrowdBarColor}
          getCrowdBarWidth={getCrowdBarWidth}
          trackButtonLabel="Live Track" // Use "Live Track" instead of "Track"
        />
      ) : buses?.data && buses.data.length === 0 ? (
        <div className="text-center p-8 bg-muted/30 rounded-lg">
          <h3 className="font-medium text-lg">No buses found</h3>
          <p className="text-muted-foreground mt-1">Try different locations or check back later</p>
        </div>
      ) : null}

      <WakeMeUpModal
        open={showWakeMeUpModal}
        onClose={() => setShowWakeMeUpModal(false)}
        busDetails={selectedBus}
      />
    </div>
  );
};

export default CityBus;
