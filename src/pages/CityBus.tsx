
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

  // Mock city bus data
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Buses from {fromLocation} to {toLocation}</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          {buses.map((bus) => (
            <Card 
              key={bus.id} 
              className={`go-card-hover overflow-hidden ${
                bus.crowdLevel === "low" 
                  ? "border-green-200 bg-green-50/30 dark:bg-green-950/10" 
                  : bus.crowdLevel === "medium" 
                  ? "border-orange-200 bg-orange-50/30 dark:bg-orange-950/10" 
                  : "border-red-200 bg-red-50/30 dark:bg-red-950/10"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="px-2 py-1 bg-accent text-white">
                        {bus.number}
                      </Badge>
                      <h3 className="font-medium">{bus.route}</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Cost:</span>
                        <div className="font-medium">{bus.cost}</div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Distance:</span>
                        <div className="font-medium">{bus.distance}</div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Time:</span>
                        <div className="font-medium">{bus.estimatedTime}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Next: {bus.nextBus}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-semibold text-green-600">
                      <Clock className="h-4 w-4" />
                      {bus.arrivalTime}
                    </div>
                    {getCrowdBadge(bus.crowdLevel)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div className="h-2 bg-muted rounded-full w-32 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getCrowdBarColor(bus.crowdLevel)}`}
                        style={{ width: getCrowdBarWidth(bus.crowdLevel) }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{bus.crowdLevel} crowd</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <label htmlFor={`wake-me-${bus.id}`} className="text-sm">
                        Wake Me Up
                      </label>
                      <Switch
                        id={`wake-me-${bus.id}`}
                        onCheckedChange={() => handleWakeMeUp(bus.number)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Journey Planner</h3>
              <div className="flex items-center gap-2 text-sm mb-4">
                <div className="bg-accent/10 text-accent p-1 rounded">Current Stop</div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="bg-muted p-1 rounded">Set destination</div>
              </div>
              <Button className="w-full" variant="outline">
                <Bus className="mr-2 h-4 w-4" />
                Plan Multi-Modal Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CityBus;
