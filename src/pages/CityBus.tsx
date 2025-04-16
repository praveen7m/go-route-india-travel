
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, Search, RefreshCw, Bus, Clock, BellRing, Users, ArrowRight 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const CityBus = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [stopName, setStopName] = useState("");
  const [searchResults, setSearchResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!stopName) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleWakeMeUp = (busNumber: string) => {
    toast({
      title: "Wake Me Up Activated",
      description: `You'll be notified before ${busNumber} arrives at your stop.`,
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
    },
    {
      id: 2,
      number: "401M",
      route: "Whitefield to Majestic",
      arrivalTime: "12 mins",
      nextBus: "25 mins",
      crowdLevel: "medium",
    },
    {
      id: 3,
      number: "300K",
      route: "Electronic City to Shivajinagar",
      arrivalTime: "20 mins",
      nextBus: "40 mins",
      crowdLevel: "high",
    },
  ];

  const getCrowdBadge = (level: string) => {
    switch (level) {
      case "low":
        return <Badge variant="outline" className="go-badge-green">Low Crowd</Badge>;
      case "medium":
        return <Badge variant="outline" className="go-badge-orange">Medium Crowd</Badge>;
      case "high":
        return <Badge variant="outline" className="go-badge-red">High Crowd</Badge>;
      default:
        return null;
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
              <Label htmlFor="stop">{t("routeBus.from")}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="stop"
                  placeholder="Enter bus stop or area"
                  className="pl-9"
                  value={stopName}
                  onChange={(e) => setStopName(e.target.value)}
                />
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handleSearch}
              disabled={!stopName || isLoading}
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
            <h2 className="text-lg font-semibold">Buses at {stopName}</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          {buses.map((bus) => (
            <Card key={bus.id} className="go-card-hover overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="px-2 py-1 bg-accent text-white">
                        {bus.number}
                      </Badge>
                      <h3 className="font-medium">{bus.route}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Next: {bus.nextBus}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-semibold text-goroute-green">
                      <Clock className="h-4 w-4" />
                      {bus.arrivalTime}
                    </div>
                    {getCrowdBadge(bus.crowdLevel)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-muted-foreground mr-1" />
                    <div className="h-2 bg-muted rounded-full w-16 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          bus.crowdLevel === "low" 
                            ? "bg-goroute-green" 
                            : bus.crowdLevel === "medium" 
                            ? "bg-goroute-orange" 
                            : "bg-goroute-red"
                        }`}
                        style={{ width: `${
                          bus.crowdLevel === "low" 
                            ? "30%" 
                            : bus.crowdLevel === "medium" 
                            ? "60%" 
                            : "90%"
                        }` }}
                      />
                    </div>
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
