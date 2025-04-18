
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Search, ArrowRight, Users, Clock, RefreshCw, Bus, Star, Route, Calendar, Female } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BusSeatSelector from "@/components/bus/BusSeatSelector";
import BusTrackingView from "@/components/bus/BusTrackingView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

const RouteBook = () => {
  const { t } = useLanguage();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchResults, setSearchResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }));
  const [genderPreference, setGenderPreference] = useState<string>("");
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [showGenderForm, setShowGenderForm] = useState(false);
  
  // State for seat selector
  const [seatSelectorOpen, setSeatSelectorOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState<any>(null);
  
  // State for bus tracking view
  const [trackingViewOpen, setTrackingViewOpen] = useState(false);
  const [selectedBusForTracking, setSelectedBusForTracking] = useState<any>(null);
  
  // Waitlist state
  const [isWaitlisted, setIsWaitlisted] = useState(false);

  const handleSearch = () => {
    if (!from || !to) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setShowSearchForm(false);
      setShowGenderForm(true);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleGenderSubmit = () => {
    if (!genderPreference) {
      toast({
        title: "Please select a preference",
        description: "Gender preference is required for your safety and comfort.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setShowGenderForm(false);
      setSearchResults(true);
      setIsLoading(false);
      
      // Show a confirmation toast
      toast({
        title: "Preference applied",
        description: genderPreference === "womens_only" 
          ? "Showing women's special buses and regular buses." 
          : "Showing all available buses.",
      });
    }, 1000);
  };
  
  const handleBackToSearch = () => {
    setShowSearchForm(true);
    setShowGenderForm(false);
    setSearchResults(false);
  };

  const handleBookNow = (bus: any) => {
    // Check if bus is full
    if (bus.available === 0) {
      toast({
        title: "Bus is full",
        description: "Would you like to join the waitlist?",
      });
      setIsWaitlisted(true);
      return;
    }
    
    setSelectedBus({
      ...bus,
      date: selectedDate
    });
    setSeatSelectorOpen(true);
  };
  
  const handleJoinWaitlist = (bus: any) => {
    toast({
      title: "Added to waitlist",
      description: "We'll notify you if a seat becomes available.",
    });
    setIsWaitlisted(true);
  };
  
  const handleViewRoute = (bus: any) => {
    setSelectedBusForTracking(bus);
    setTrackingViewOpen(true);
  };
  
  // Enhanced bus data with color and waitlist info
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
      busNumber: "KA-01-F-7771",
      color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
      accentColor: "text-blue-600 dark:text-blue-400",
      stops: [
        { name: "Bangalore", arrivalTime: "08:30 AM", departureTime: "08:30 AM", distance: "0 km", isPassed: true, isNext: false },
        { name: "Electronic City", arrivalTime: "09:00 AM", departureTime: "09:05 AM", distance: "27 km", isPassed: true, isNext: false },
        { name: "Hosur", arrivalTime: "09:45 AM", departureTime: "09:50 AM", distance: "60 km", isPassed: true, isNext: false },
        { name: "Krishnagiri", arrivalTime: "10:30 AM", departureTime: "10:40 AM", distance: "95 km", isPassed: false, isNext: true, platform: "2" },
        { name: "Vellore", arrivalTime: "12:00 PM", departureTime: "12:10 PM", distance: "190 km", isPassed: false, isNext: false, status: "delayed" },
        { name: "Kanchipuram", arrivalTime: "01:30 PM", departureTime: "01:35 PM", distance: "270 km", isPassed: false, isNext: false },
        { name: "Chennai", arrivalTime: "02:30 PM", departureTime: "02:30 PM", distance: "350 km", isPassed: false, isNext: false },
      ]
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
      color: "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800",
      accentColor: "text-purple-600 dark:text-purple-400",
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
      available: 0,
      total: 36,
      isWomensSpecial: false,
      crowdLevel: "high",
      color: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
      accentColor: "text-green-600 dark:text-green-400",
      waitlist: 3,
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

      <Tabs defaultValue="search">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">
            <Search className="mr-2 h-4 w-4" />
            Search Buses
          </TabsTrigger>
          <TabsTrigger value="track">
            <Route className="mr-2 h-4 w-4" />
            Track Bus
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="space-y-4 mt-4">
          {showSearchForm && (
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Travel Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        placeholder="Select date"
                        className="pl-9"
                        value={selectedDate}
                        readOnly
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
          )}
          
          {showGenderForm && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Gender Preference</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      For your safety and comfort, please select a preference.
                    </p>
                  </div>
                  
                  <RadioGroup 
                    value={genderPreference}
                    onValueChange={setGenderPreference}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent/10">
                      <RadioGroupItem value="womens_only" id="womens_only" />
                      <Label htmlFor="womens_only" className="flex items-center cursor-pointer">
                        <Female className="h-4 w-4 mr-2 text-pink-500" />
                        Women's Special Buses (Recommended for women travellers)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent/10">
                      <RadioGroupItem value="all_buses" id="all_buses" />
                      <Label htmlFor="all_buses" className="cursor-pointer">Show all available buses</Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={handleBackToSearch}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={handleGenderSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>Continue</>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {searchResults && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Available Buses</h2>
                <Button variant="outline" size="sm" onClick={handleBackToSearch}>
                  Change Search
                </Button>
              </div>

              {buses
                .filter(bus => genderPreference !== "womens_only" || bus.isWomensSpecial || !bus.isWomensSpecial)
                .map((bus) => (
                <Card key={bus.id} className={`go-card-hover overflow-hidden border ${bus.color}`}>
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className={`font-semibold flex items-center ${bus.accentColor}`}>
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
                          <p className="text-xs text-muted-foreground">
                            {bus.available > 0 ? `${bus.available} seats left` : "Full"}
                            {bus.waitlist > 0 && ` (${bus.waitlist} in waitlist)`}
                          </p>
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
                      <Button 
                        variant="ghost" 
                        className="rounded-none h-12"
                        onClick={() => handleViewRoute(bus)}
                      >
                        <Route className="mr-2 h-4 w-4" />
                        View Route
                      </Button>
                      {bus.available > 0 ? (
                        <Button 
                          variant="ghost" 
                          className={`rounded-none h-12 ${bus.accentColor}`}
                          onClick={() => handleBookNow(bus)}
                        >
                          <Bus className="mr-2 h-4 w-4" />
                          Book Now
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          className="rounded-none h-12 text-amber-600"
                          onClick={() => handleJoinWaitlist(bus)}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          Join Waitlist
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="track" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="busNumber">Bus Number</Label>
                  <div className="relative">
                    <Bus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="busNumber"
                      placeholder="Enter bus number (e.g., KA-01-F-7771)"
                      className="pl-9"
                    />
                  </div>
                </div>

                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Track Bus
                </Button>
                
                <div className="text-center text-sm text-muted-foreground pt-2">
                  <p>Or scan QR code on the bus ticket to track your bus</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center p-6">
            <p className="text-muted-foreground mb-2">Demo: Click "View Route" on any bus to see the tracking interface</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Seat Selector Dialog */}
      {selectedBus && (
        <BusSeatSelector 
          open={seatSelectorOpen} 
          onOpenChange={setSeatSelectorOpen}
          busInfo={{
            name: selectedBus.name,
            from: selectedBus.from,
            to: selectedBus.to,
            departureTime: selectedBus.departureTime,
            arrivalTime: selectedBus.arrivalTime,
            duration: selectedBus.duration,
            date: selectedDate
          }}
        />
      )}
      
      {/* Bus Tracking View */}
      {trackingViewOpen && selectedBusForTracking && (
        <BusTrackingView
          busName={selectedBusForTracking.name}
          busNumber={selectedBusForTracking.busNumber || "KA-01-F-7771"}
          fromTo={`${selectedBusForTracking.from} to ${selectedBusForTracking.to}`}
          currentDate={`Day 1 - ${new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', weekday: 'short' })}`}
          stops={selectedBusForTracking.stops || []}
          onClose={() => setTrackingViewOpen(false)}
        />
      )}
    </div>
  );
};

export default RouteBook;
