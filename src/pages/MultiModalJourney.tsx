
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  MapPin, Search, ArrowRight, Clock, Train, Bus, Bike, Car, 
  User, Truck, RefreshCw, Navigation, ChevronDown, MapIcon, 
  Locate, Compass, DollarSign
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Mock data for post-destination journey
const nextDestinationRoutes = [
  {
    id: 1,
    segments: [
      { 
        id: 1, 
        mode: "walk", 
        icon: <User size={16} className="text-gray-500" />, 
        description: "350m to nearest bus stop", 
        fare: 0, 
        time: 5,
        color: "bg-blue-100 text-blue-700" 
      },
      { 
        id: 2, 
        mode: "bus", 
        icon: <Bus size={16} className="text-gray-500" />, 
        description: "Bus #27B to Anna Nagar", 
        fare: 15, 
        time: 12,
        color: "bg-green-100 text-green-700"
      },
      { 
        id: 3, 
        mode: "auto", 
        icon: <Car size={16} className="text-gray-500" />, 
        description: "Auto to Final Destination", 
        fare: 35, 
        time: 7,
        color: "bg-orange-100 text-orange-700"
      }
    ],
    totalFare: 50,
    totalTime: 24
  },
  {
    id: 2,
    segments: [
      { 
        id: 1, 
        mode: "walk", 
        icon: <User size={16} className="text-gray-500" />, 
        description: "200m to metro station", 
        fare: 0, 
        time: 3,
        color: "bg-blue-100 text-blue-700" 
      },
      { 
        id: 2, 
        mode: "metro", 
        icon: <Train size={16} className="text-gray-500" />, 
        description: "Metro to Central Station", 
        fare: 30, 
        time: 15,
        color: "bg-purple-100 text-purple-700"
      },
      { 
        id: 3, 
        mode: "walk", 
        icon: <User size={16} className="text-gray-500" />, 
        description: "Walk to Final Destination", 
        fare: 0, 
        time: 8,
        color: "bg-blue-100 text-blue-700" 
      }
    ],
    totalFare: 30,
    totalTime: 26
  }
];

const MultiModalJourney = () => {
  const { t } = useLanguage();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchResults, setSearchResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("search");
  const [showNextDestination, setShowNextDestination] = useState(false);
  const [nextDestination, setNextDestination] = useState("");
  const [currentLocation, setCurrentLocation] = useState("Current Location");
  const [routeOptions, setRouteOptions] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  // Simulate getting current location when component mounts
  useEffect(() => {
    // This would be a real geolocation API call in a production app
    setTimeout(() => {
      setCurrentLocation("T.Nagar Bus Terminal");
    }, 1000);
  }, []);

  const handleSearch = () => {
    if (!from || !to) {
      toast({
        title: "Missing Information",
        description: "Please enter both starting location and destination",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleNextDestinationSearch = () => {
    if (!nextDestination) {
      toast({
        title: "Missing Information",
        description: "Please enter your next destination",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to get route options
    setTimeout(() => {
      setRouteOptions(nextDestinationRoutes);
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectOption = (routeId: number) => {
    setSelectedRoute(routeId);
    toast({
      title: "Route Selected",
      description: "Journey details are ready"
    });
  };

  const handleArrivalConfirmation = () => {
    setShowNextDestination(true);
    setActiveTab("nextDestination");
    toast({
      title: "Arrival Confirmed",
      description: "Where would you like to go next?"
    });
  };

  // Mock transport mode options
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
  
  // Mock journey options
  const journeyOptions = [
    {
      id: 1,
      routes: [
        { number: "10 / 100 / 131", type: "bus" }
      ],
      price: "₹1.19",
      duration: "14",
      infoLine: "in 0, 1, 6 mins from Opp Customs Port Br Hq",
      backgroundColor: "bg-green-50 dark:bg-green-950/10",
      borderColor: "border-green-200 dark:border-green-900"
    },
    {
      id: 2,
      routes: [
        { type: "walk", icon: <User size={16} className="text-gray-600" /> },
        { number: "166 / 61", type: "bus" }
      ],
      price: "₹1.19",
      duration: "28",
      infoLine: "in 2, 5, 13 mins from Bef The Pinnacle@Duxton",
      backgroundColor: "bg-blue-50 dark:bg-blue-950/10",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    {
      id: 3,
      routes: [
        { number: "145 / 80", type: "bus" },
        { number: "166 / 61", type: "bus" }
      ],
      price: "₹1.29",
      duration: "28",
      infoLine: "in 6, 7, 18 mins from Opp Fuji Xerox Twrs",
      backgroundColor: "bg-purple-50 dark:bg-purple-950/10",
      borderColor: "border-purple-200 dark:border-purple-900"
    },
    {
      id: 4,
      routes: [
        { number: "196 / 167", type: "bus" },
        { number: "166 / 61 / 143", type: "bus" }
      ],
      price: "₹1.29",
      duration: "28",
      infoLine: "in 10, 15, 23 mins from Opp Mas Bldg",
      backgroundColor: "bg-amber-50 dark:bg-amber-950/10",
      borderColor: "border-amber-200 dark:border-amber-900"
    },
    {
      id: 5,
      routes: [
        { number: "196 / 167", type: "bus" },
        { number: "166 / 61", type: "bus" }
      ],
      price: "₹1.29",
      duration: "28",
      infoLine: "in 10, 15, 23 mins from Opp Mas Bldg",
      backgroundColor: "bg-cyan-50 dark:bg-cyan-950/10",
      borderColor: "border-cyan-200 dark:border-cyan-900"
    }
  ];

  return (
    <div className="go-container space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold mb-2">Multi-Modal Journey</h1>
        <p className="text-muted-foreground">Plan trips using multiple modes of transport</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Plan Journey</TabsTrigger>
          <TabsTrigger value="nextDestination" disabled={!showNextDestination}>Next Destination</TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="space-y-4 mt-4">
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
                      <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
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
              {/* Transport Mode Options */}
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
              
              <h2 className="text-lg font-semibold">Suggested Routes</h2>
              
              {/* Journey Options */}
              {journeyOptions.map((journey) => (
                <Card 
                  key={journey.id} 
                  className={`overflow-hidden hover:shadow-md transition-shadow ${journey.backgroundColor} ${journey.borderColor}`}
                >
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
                    <div className="mt-3 flex justify-end">
                      <Button 
                        size="sm" 
                        onClick={() => handleSelectOption(journey.id)}
                        className="bg-accent hover:bg-accent/90"
                      >
                        Select Route
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleArrivalConfirmation()}
                >
                  I've Arrived at My Destination
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="nextDestination" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Navigation className="mr-2 h-5 w-5 text-blue-500" />
                Where would you like to go next?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="nextFrom" className="text-sm font-medium">From</label>
                  <div className="relative">
                    <Locate className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                    <Input
                      id="nextFrom"
                      value={currentLocation}
                      className="pl-9 bg-blue-50"
                      readOnly
                    />
                    <Badge className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-100 text-blue-700 hover:bg-blue-200">
                      <MapPin className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-6 w-6 rounded-full flex items-center justify-center border border-blue-300 bg-blue-50">
                    <ArrowRight className="h-3 w-3 text-blue-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="nextTo" className="text-sm font-medium">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nextTo"
                      placeholder="Enter your next destination"
                      className="pl-9"
                      value={nextDestination}
                      onChange={(e) => setNextDestination(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleNextDestinationSearch}
                  disabled={!nextDestination || isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Searching...
                    </span>
                  ) : (
                    <>
                      <Compass className="mr-2 h-4 w-4" />
                      Find Next Routes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {routeOptions.length > 0 && (
            <div className="space-y-4">
              <Card className="bg-slate-50 border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MapIcon className="mr-2 h-5 w-5 text-slate-600" />
                    Route Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="bg-slate-100 rounded-lg border border-slate-200 h-48 flex items-center justify-center">
                    <div className="text-center text-slate-500">
                      <MapIcon className="h-10 w-10 mx-auto mb-2 text-slate-400" />
                      <p>Interactive map would display here</p>
                      <p className="text-xs">Route from {currentLocation} to {nextDestination}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-lg font-semibold">Travel Options</h2>
              
              {routeOptions.map((route) => (
                <Card 
                  key={route.id} 
                  className={`overflow-hidden hover:shadow-md transition-shadow ${selectedRoute === route.id ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-yellow-600" />
                        <span className="font-bold">{route.totalTime}</span>
                        <span className="text-sm ml-1">mins total</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                        <span className="font-bold">₹{route.totalFare}</span>
                        <span className="text-sm ml-1">total</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="py-2 px-2 text-left">#</th>
                            <th className="py-2 px-2 text-left">Mode</th>
                            <th className="py-2 px-2 text-left">Details</th>
                            <th className="py-2 px-2 text-right">Fare</th>
                            <th className="py-2 px-2 text-right">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {route.segments.map((segment) => (
                            <tr key={segment.id} className="border-b border-slate-100">
                              <td className="py-2 px-2">{segment.id}</td>
                              <td className="py-2 px-2">
                                <Badge className={segment.color}>
                                  {segment.icon}
                                  <span className="ml-1 capitalize">{segment.mode}</span>
                                </Badge>
                              </td>
                              <td className="py-2 px-2">{segment.description}</td>
                              <td className="py-2 px-2 text-right">₹{segment.fare}</td>
                              <td className="py-2 px-2 text-right">{segment.time} mins</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50 py-3 px-4 flex justify-between">
                    <div>
                      <span className="text-sm font-medium">Total:</span>
                      <span className="ml-2 font-bold">₹{route.totalFare}</span>
                      <span className="ml-4 text-sm font-medium">Time:</span>
                      <span className="ml-2 font-bold">{route.totalTime} mins</span>
                    </div>
                    <Button 
                      onClick={() => handleSelectOption(route.id)}
                      size="sm"
                      className={selectedRoute === route.id ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {selectedRoute === route.id ? "Selected" : "Select Route"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiModalJourney;
