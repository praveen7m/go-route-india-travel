
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, ArrowRight, Users, Clock, RefreshCw, Bus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RouteBook = () => {
  const { t } = useLanguage();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchResults, setSearchResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!from || !to) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(true);
      setIsLoading(false);
    }, 1500);
  };

  // Mock bus data
  const buses = [
    {
      id: 1,
      name: "KSRTC Airavat",
      type: "AC Sleeper",
      from: "Bangalore",
      to: "Chennai",
      departureTime: "08:30 AM",
      arrivalTime: "02:30 PM",
      duration: "6h",
      price: 750,
      available: 12,
      total: 40,
      isWomensSpecial: false,
      crowdLevel: "low",
    },
    {
      id: 2,
      name: "Tamil Nadu Express",
      type: "AC Seater",
      from: "Bangalore",
      to: "Chennai",
      departureTime: "09:45 AM",
      arrivalTime: "03:15 PM",
      duration: "5h 30m",
      price: 650,
      available: 5,
      total: 38,
      isWomensSpecial: true,
      crowdLevel: "medium",
    },
    {
      id: 3,
      name: "VRL Travels",
      type: "Non-AC Sleeper",
      from: "Bangalore",
      to: "Chennai",
      departureTime: "10:30 PM",
      arrivalTime: "04:30 AM",
      duration: "6h",
      price: 550,
      available: 20,
      total: 36,
      isWomensSpecial: false,
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
        <h1 className="text-2xl font-bold mb-2">{t("routeBus.title")}</h1>
        <p className="text-muted-foreground">Book long-distance route buses</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from">{t("routeBus.from")}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="from"
                  placeholder="Enter starting location"
                  className="pl-9"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-6 w-6 rounded-full flex items-center justify-center border">
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">{t("routeBus.to")}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="to"
                  placeholder="Enter destination"
                  className="pl-9"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handleSearch}
              disabled={!from || !to || isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  {t("routeBus.findBuses")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Available Buses</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          {buses.map((bus) => (
            <Card key={bus.id} className="go-card-hover overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold flex items-center">
                        {bus.name}
                        {bus.isWomensSpecial && (
                          <Badge variant="secondary" className="ml-2 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100">
                            Women's Special
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">{bus.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{bus.price}</p>
                      <p className="text-xs text-muted-foreground">{bus.available} seats left</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Departs</p>
                      <p className="font-medium">{bus.departureTime}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium">{bus.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Arrives</p>
                      <p className="font-medium">{bus.arrivalTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
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
                            style={{ width: `${((bus.total - bus.available) / bus.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      {getCrowdBadge(bus.crowdLevel)}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border grid grid-cols-2 divide-x divide-border">
                  <Button variant="ghost" className="rounded-none h-12">
                    <Star className="mr-2 h-4 w-4" />
                    View Route
                  </Button>
                  <Button variant="ghost" className="rounded-none h-12 text-accent">
                    <Bus className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RouteBook;
