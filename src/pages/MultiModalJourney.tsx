
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, ArrowRight, Clock, Train, Bus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MultiModalJourney = () => {
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

  // Mock journey options
  const journeyOptions = [
    {
      id: 1,
      segments: [
        { type: "bus", name: "500C", from: "Koramangala", to: "MG Road", duration: "25m" },
        { type: "metro", name: "Purple Line", from: "MG Road", to: "Whitefield", duration: "40m" },
      ],
      totalDuration: "1h 15m",
      totalPrice: 85,
      departureTime: "09:15 AM",
      arrivalTime: "10:30 AM",
    },
    {
      id: 2,
      segments: [
        { type: "bus", name: "300A", from: "Koramangala", to: "Indiranagar", duration: "20m" },
        { type: "metro", name: "Purple Line", from: "Indiranagar", to: "Whitefield", duration: "35m" },
        { type: "bus", name: "401", from: "Whitefield", to: "ITPL", duration: "10m" },
      ],
      totalDuration: "1h 10m",
      totalPrice: 95,
      departureTime: "08:45 AM",
      arrivalTime: "09:55 AM",
    },
  ];

  const getTransportIcon = (type: string) => {
    switch (type) {
      case "bus":
        return <Bus className="h-4 w-4" />;
      case "metro":
        return <Train className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTransportColor = (type: string) => {
    switch (type) {
      case "bus":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "metro":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
      default:
        return "";
    }
  };

  return (
    <div className="go-container space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Multi-Modal Journey</h1>
        <p className="text-muted-foreground">Plan trips using multiple modes of transport</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="from" className="text-sm font-medium">From</label>
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
              <label htmlFor="to" className="text-sm font-medium">To</label>
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
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find Routes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Available Routes</h2>
          
          {journeyOptions.map((journey) => (
            <Card key={journey.id} className="go-card-hover overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{journey.totalDuration}</span>
                  </div>
                  <div className="font-semibold">₹{journey.totalPrice}</div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm">{journey.departureTime}</div>
                    <div className="text-sm">{journey.arrivalTime}</div>
                  </div>
                  
                  <div className="space-y-2">
                    {journey.segments.map((segment, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className={getTransportColor(segment.type)}>
                          {getTransportIcon(segment.type)} {segment.name}
                        </Badge>
                        <div className="text-xs flex-1 flex items-center">
                          <span>{segment.from}</span>
                          <div className="h-px bg-border flex-1 mx-2"></div>
                          <span>{segment.to}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{segment.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button size="sm">Book This Journey</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiModalJourney;
