import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, Search, RefreshCw, Bus, Clock, BellRing, Users, ArrowRight, 
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { CityBusBusList } from "./CityBusBusList";

const CityBus = () => {
  const { t } = useLanguage();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [searchResults, setSearchResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!fromLocation || !toLocation) {
      toast("Please enter both from and to locations");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleWakeMeUp = (busNumber: string) => {
    toast.success("Wake Me Up Activated", {
      description: `You'll be notified before ${busNumber} arrives at your stop.`
    });
  };

  const handleTrackBus = (busNumber: string) => {
    toast.success("Tracking Activated", {
      description: `You are now tracking Bus ${busNumber}.`
    });
  };

  const getCrowdBadge = (level: string) => {
    switch (level) {
      case "low":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Low Crowd</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">Medium Crowd</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">High Crowd</Badge>;
      default:
        return null;
    }
  };

  const getCrowdBarColor = (level: string) => {
    switch (level) {
      case "low": 
        return "bg-green-500";
      case "medium": 
        return "bg-orange-500";
      case "high": 
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCrowdBarWidth = (level: string) => {
    switch (level) {
      case "low": 
        return "30%";
      case "medium": 
        return "60%";
      case "high": 
        return "90%";
      default:
        return "0%";
    }
  };

  const buses = [
    {
      id: 1,
      number: "500A",
      route: "Indiranagar to Majestic",
      arrivalTime: "5 mins",
      nextBus: "15 mins",
      crowdLevel: "low",
      cost: "₹35",
      distance: "7.2 km",
      estimatedTime: "25 mins"
    },
    {
      id: 2,
      number: "401M",
      route: "Whitefield to Majestic",
      arrivalTime: "12 mins",
      nextBus: "25 mins",
      crowdLevel: "medium",
      cost: "₹45",
      distance: "12.5 km",
      estimatedTime: "40 mins"
    },
    {
      id: 3,
      number: "300K",
      route: "Electronic City to Shivajinagar",
      arrivalTime: "20 mins",
      nextBus: "40 mins",
      crowdLevel: "high",
      cost: "₹50",
      distance: "15.8 km",
      estimatedTime: "55 mins"
    },
  ];

  return (
    <div className="go-container space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t("cityBus.title")}</h1>
        <p className="text-muted-foreground">Find and track city buses in real-time</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from">From Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="from"
                  placeholder="Enter your starting point"
                  className="pl-9"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="to"
                  placeholder="Enter your destination"
                  className="pl-9"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handleSearch}
              disabled={!fromLocation || !toLocation || isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  {t("cityBus.findBuses")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults && (
        <CityBusBusList
          buses={buses}
          fromLocation={fromLocation}
          toLocation={toLocation}
          onWakeMeUp={handleWakeMeUp}
          onTrackBus={handleTrackBus}
          getCrowdBadge={getCrowdBadge}
          getCrowdBarColor={getCrowdBarColor}
          getCrowdBarWidth={getCrowdBarWidth}
        />
      )}
    </div>
  );
};

export default CityBus;
