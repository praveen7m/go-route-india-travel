
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, ArrowRight, Clock, Train, Bus, Bike, Car, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const MultiModalJourney = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
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

  // Mock journey options structured similarly to Citymapper
  const transportModes = [
    {
      id: 1,
      type: "walk",
      icon: <User size={16} className="text-gray-500" />,
      duration: "26",
      info: "106 cal",
      label: "Walk"
    },
    {
      id: 2,
      type: "cycle",
      icon: <Bike size={16} className="text-gray-500" />,
      duration: "24", 
      info: "₹1.00",
      label: "Cycle"
    },
    {
      id: 3,
      type: "cab",
      icon: <Car size={16} className="text-gray-500" />,
      duration: "9",
      info: "",
      label: "Cab"
    }
  ];
  
  const journeyOptions = [
    {
      id: 1,
      routes: [
        { number: "10 / 100 / 131", type: "bus" }
      ],
      price: "₹1.19",
      duration: "14",
      infoLine: "in 0, 1, 6 mins from Opp Customs Port Br Hq"
    },
    {
      id: 2,
      routes: [
        { type: "walk", icon: <User size={16} className="text-gray-600" /> },
        { number: "166 / 61", type: "bus" }
      ],
      price: "₹1.19",
      duration: "28",
      infoLine: "in 2, 5, 13 mins from Bef The Pinnacle@Duxton"
    },
    {
      id: 3,
      routes: [
        { number: "145 / 80", type: "bus" },
        { number: "166 / 61", type: "bus" }
      ],
      price: "₹1.29",
      duration: "28",
      infoLine: "in 6, 7, 18 mins from Opp Fuji Xerox Twrs"
    },
    {
      id: 4,
      routes: [
        { number: "196 / 167", type: "bus" },
        { number: "166 / 61 / 143", type: "bus" }
      ],
      price: "₹1.29",
      duration: "28",
      infoLine: "in 10, 15, 23 mins from Opp Mas Bldg"
    },
    {
      id: 5,
      routes: [
        { number: "196 / 167", type: "bus" },
        { number: "166 / 61", type: "bus" }
      ],
      price: "₹1.29",
      duration: "28",
      infoLine: "in 10, 15, 23 mins from Opp Mas Bldg"
    }
  ];

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
          {/* Transport Mode Options - Similar to Citymapper Top Section */}
          <Card className="bg-green-500 text-white overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-3">
                {transportModes.map((mode) => (
                  <div key={mode.id} className="flex flex-col items-center justify-center py-3">
                    <div className="flex items-center mb-1">
                      {mode.icon}
                      <span className="text-xl font-bold ml-1">{mode.duration}</span>
                    </div>
                    <div className="text-xs">{mode.label}</div>
                    <div className={`text-xs ${mode.type === "cycle" ? "text-green-200" : "text-white/70"}`}>
                      {mode.info}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-lg font-semibold">Suggested</h2>
          
          {/* Journey Options - Similar to Citymapper List */}
          {journeyOptions.map((journey) => (
            <Card key={journey.id} className="bg-white overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    {journey.routes.map((route, idx) => (
                      <div key={idx} className="flex items-center">
                        {idx > 0 && <span className="text-gray-500 mx-1">•</span>}
                        {route.type === "walk" ? (
                          route.icon
                        ) : (
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            <Bus size={14} className="inline mr-1" />
                            {route.number}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 font-medium">{journey.price}</span>
                    <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="font-bold">{journey.duration}</span>
                      <span className="text-xs">min</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-yellow-600">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {journey.infoLine}
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => {
                toast({
                  title: "More routes loading",
                  description: "Fetching additional journey options...",
                });
              }}
            >
              Show More Routes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiModalJourney;
