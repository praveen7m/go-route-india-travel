import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Calendar, Clock, Map, MapPin, Bus, ChevronRight, User, Users, 
  Bell, BellOff, Star, Wifi, Coffee, Phone, MessageSquare, AlertTriangle
} from "lucide-react";
import WaitlistModal from "@/components/bus/WaitlistModal";
import WakeMeUpModal from "@/components/bus/WakeMeUpModal";

const RouteBook = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [isLoading, setIsLoading] = useState(false);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [step, setStep] = useState(1);
  const [genderPreference, setGenderPreference] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<any | null>(null);
  const [isWaitlisted, setIsWaitlisted] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showWakeMeUpModal, setShowWakeMeUpModal] = useState(false);
  const [wakeMeUpBus, setWakeMeUpBus] = useState<any | null>(null);
  
  const handleGenderSubmit = () => {
    if (!genderPreference) {
      toast("Gender preference is required for your safety and comfort.");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setStep(3);
      setIsLoading(false);
      
      // Show a confirmation toast
      if (genderPreference === "womens_only") {
        toast("Showing women's special buses and regular buses.");
      } else {
        toast("Showing all available buses.");
      }
    }, 1000);
  };
  
  const handleSearch = () => {
    if (!fromCity || !toCity || !travelDate) return;
    setStep(2);
  };
  
  const handleBookNow = (bus: any) => {
    // Check if bus is full
    if (bus.available === 0) {
      toast("Bus is full. Would you like to join the waitlist?");
      setSelectedBus(bus);
      setShowWaitlistModal(true);
      return;
    }
    
    // Otherwise, proceed with booking
    setSelectedBus(bus);
    toast("Proceeding to seat selection");
    navigate(`/bus-seat-selection?bus=${bus.number}&from=${fromCity}&to=${toCity}`);
  };
  
  const handleJoinWaitlist = (bus: any) => {
    setSelectedBus(bus);
    setShowWaitlistModal(true);
  };

  const handleWakeMeUp = (bus: any) => {
    setWakeMeUpBus(bus);
    setShowWakeMeUpModal(true);
  };
  
  // Mock bus data
  const buses = [
    {
      id: 1,
      number: "VLV123",
      type: "Volvo A/C Sleeper",
      from: "Bengaluru",
      to: "Chennai",
      departure: "21:00",
      arrival: "05:30",
      duration: "8h 30m",
      price: 1200,
      available: 23,
      totalSeats: 40,
      amenities: ["wifi", "usb", "water", "blanket"],
      rating: 4.5,
      womensOnly: false
    },
    {
      id: 2,
      number: "MRC456",
      type: "Mercedes Non-A/C Seater",
      from: "Bengaluru",
      to: "Chennai",
      departure: "22:15",
      arrival: "07:00",
      duration: "8h 45m",
      price: 850,
      available: 0,
      totalSeats: 35,
      amenities: ["water"],
      rating: 4.1,
      womensOnly: false
    },
    {
      id: 3,
      number: "TTA789",
      type: "TATA A/C Sleeper",
      from: "Bengaluru",
      to: "Chennai",
      departure: "23:00",
      arrival: "06:30",
      duration: "7h 30m",
      price: 999,
      available: 5,
      totalSeats: 30,
      amenities: ["wifi", "usb", "water", "blanket", "coffee"],
      rating: 4.7,
      womensOnly: true
    },
  ];
  
  return (
    <div className="go-container space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t("routeBus.title")}</h1>
        <p className="text-muted-foreground">
          Book tickets for interstate and long-distance travel
        </p>
      </div>
      
      {step === 1 && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="from">{t("routeBus.from")}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="from"
                    placeholder="From city"
                    className="pl-9"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="to">{t("routeBus.to")}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="to"
                    placeholder="To city"
                    className="pl-9"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">{t("routeBus.date")}</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    placeholder="Travel date"
                    className="pl-9"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleSearch}
                disabled={!fromCity || !toCity || !travelDate}
              >
                <Map className="mr-2 h-4 w-4" />
                {t("routeBus.search")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {step === 2 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Seating Preference</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-200 p-4 rounded-md flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Women's Safety Feature</p>
                  <p className="text-sm">
                    We offer women's only sections and buses for enhanced safety. 
                    Select your preference below.
                  </p>
                </div>
              </div>
              
              <RadioGroup 
                value={genderPreference || ""} 
                onValueChange={setGenderPreference}
                className="gap-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-accent/5">
                  <RadioGroupItem value="womens_only" id="womens_only" />
                  <Label htmlFor="womens_only" className="flex-1 cursor-pointer">
                    <div className="font-medium">Women's Only Section/Bus</div>
                    <div className="text-sm text-muted-foreground">
                      Exclusively for women travelers for enhanced safety
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-accent/5">
                  <RadioGroupItem value="general" id="general" />
                  <Label htmlFor="general" className="flex-1 cursor-pointer">
                    <div className="font-medium">General Seating</div>
                    <div className="text-sm text-muted-foreground">
                      Standard seating arrangement for all travelers
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleGenderSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {step === 3 && (
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
            <Button variant="outline" size="sm" onClick={() => setStep(1)}>
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
              {buses
                .filter(bus => genderPreference !== "womens_only" || bus.womensOnly || !bus.womensOnly)
                .map((bus) => (
                  <Card key={bus.id} className="go-card-hover overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{bus.type}</h3>
                            <div className="text-sm text-muted-foreground">
                              Bus number: {bus.number}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">₹{bus.price}</div>
                            <div className="text-sm text-muted-foreground">
                              per person
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <div>
                            <div className="text-lg font-semibold">{bus.departure}</div>
                            <div className="text-sm text-muted-foreground">{bus.from}</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-sm text-muted-foreground">{bus.duration}</div>
                            <div className="h-[2px] w-16 bg-muted my-1"></div>
                            <div className="text-xs text-muted-foreground">Direct</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold">{bus.arrival}</div>
                            <div className="text-sm text-muted-foreground">{bus.to}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4 gap-2">
                          {bus.amenities.includes("wifi") && (
                            <Wifi className="h-4 w-4 text-accent" aria-label="Wi-Fi" />
                          )}
                          {bus.amenities.includes("usb") && (
                            <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">USB</div>
                          )}
                          {bus.amenities.includes("coffee") && (
                            <Coffee className="h-4 w-4 text-accent" aria-label="Refreshments" />
                          )}
                          {bus.womensOnly && (
                            <Badge variant="outline" className="bg-pink-50 text-pink-600 border-pink-200">
                              Women's Special
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">
                              {bus.available}/{bus.totalSeats} seats
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{bus.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleWakeMeUp(bus)}
                            title="Set reminder for this bus"
                          >
                            <Bell className="h-4 w-4 mr-1" />
                            Wake Me Up
                          </Button>
                          
                          {bus.available > 0 ? (
                            <Button size="sm" onClick={() => handleBookNow(bus)}>
                              Book Now
                            </Button>
                          ) : (
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleJoinWaitlist(bus)}
                              className={isWaitlisted ? "bg-green-100 text-green-700" : ""}
                            >
                              {isWaitlisted ? "On Waitlist" : "Join Waitlist"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
            <CardContent className="p-4">
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
            </CardContent>
          </Card>
        </div>
      )}
      
      {showWaitlistModal && selectedBus && (
        <WaitlistModal
          open={showWaitlistModal}
          onClose={() => setShowWaitlistModal(false)}
          busDetails={{
            number: selectedBus.number,
            from: selectedBus.from,
            to: selectedBus.to
          }}
        />
      )}
      
      {showWakeMeUpModal && wakeMeUpBus && (
        <WakeMeUpModal
          open={showWakeMeUpModal}
          onClose={() => setShowWakeMeUpModal(false)}
          busDetails={{
            number: wakeMeUpBus.number,
            destination: wakeMeUpBus.to,
            arrivalTime: wakeMeUpBus.arrival
          }}
        />
      )}
    </div>
  );
};

export default RouteBook;
