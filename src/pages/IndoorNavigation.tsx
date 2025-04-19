
import React, { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Navigation, 
  ArrowRight, 
  Building2, 
  Compass, 
  Search, 
  MapPin, 
  Check, 
  Wifi, 
  Users, 
  Clock, 
  Accessibility, 
  Camera, 
  Locate, 
  MapPinOff,
  Bell,
  ChevronRight,
  Bus,
  ArrowUp,
  ArrowDown,
  CircleCheck,
  AlertCircle,
  Info
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";

const IndoorNavigation = () => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // New state for indoor navigation workflow
  const [currentStep, setCurrentStep] = useState(0);
  const [detectedLocation, setDetectedLocation] = useState("");
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [showARNavigation, setShowARNavigation] = useState(false);
  const [destinationBay, setDestinationBay] = useState("");
  const [busInfo, setBusInfo] = useState<{number: string; destination: string; time: string} | null>(null);
  const [navigationProgress, setNavigationProgress] = useState(0);
  const [calculatingPath, setCalculatingPath] = useState(false);
  const [currentCheckpoint, setCurrentCheckpoint] = useState("");
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  
  // Terminal locations (same as before)
  const indoorLocations = [
    {
      id: 1,
      name: "Kempegowda Bus Station",
      floors: 3,
      entrances: 4,
      hasAccessibility: true,
      city: "Bangalore",
      type: "Bus Terminal"
    },
    {
      id: 2,
      name: "MG Road Metro Station",
      floors: 2,
      entrances: 2,
      hasAccessibility: true,
      city: "Bangalore",
      type: "Metro Station"
    },
    {
      id: 3,
      name: "Bangalore City Railway Station",
      floors: 4,
      entrances: 6,
      hasAccessibility: true,
      city: "Bangalore",
      type: "Railway Station"
    },
    {
      id: 4,
      name: "Chennai Central Bus Terminal",
      floors: 2,
      entrances: 4,
      hasAccessibility: true,
      city: "Chennai",
      type: "Bus Terminal"
    },
    {
      id: 5,
      name: "Egmore Railway Station",
      floors: 3,
      entrances: 5,
      hasAccessibility: true,
      city: "Chennai",
      type: "Railway Station"
    },
    {
      id: 6,
      name: "Tambaram Bus Terminal",
      floors: 2,
      entrances: 3,
      hasAccessibility: false,
      city: "Chennai",
      type: "Bus Terminal"
    },
    {
      id: 7,
      name: "Trichy Central Bus Stand",
      floors: 2,
      entrances: 5,
      hasAccessibility: true,
      city: "Trichy",
      type: "Bus Terminal"
    }
  ];

  // Simulate auto-detecting location on component mount
  useEffect(() => {
    const detectLocation = () => {
      // Simulate location detection with a random location
      const randomLocation = indoorLocations[Math.floor(Math.random() * indoorLocations.length)];
      const gates = ["A", "B", "C", "D", "E"];
      const randomGate = gates[Math.floor(Math.random() * gates.length)];
      
      setDetectedLocation(`${randomLocation.name} – Gate ${randomGate}`);
      
      toast.info("Location detected", {
        description: `You are at: ${randomLocation.name} – Gate ${randomGate}`
      });

      // Simulate having a bus booking
      const destinations = ["Chennai", "Bangalore", "Coimbatore", "Madurai"];
      const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
      const randomBayNumber = Math.floor(Math.random() * 20) + 1;
      const hours = Math.floor(Math.random() * 12) + 1;
      const minutes = Math.floor(Math.random() * 60);
      const ampm = Math.random() > 0.5 ? "AM" : "PM";
      
      setDestinationBay(`Bay ${randomBayNumber}`);
      setBusInfo({
        number: `TN${Math.floor(Math.random() * 99) + 1}K${Math.floor(Math.random() * 9999) + 1000}`,
        destination: randomDestination,
        time: `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
      });
    };
    
    // Simulate delay in detection
    setTimeout(detectLocation, 1000);
  }, []);

  const handleSearch = () => {
    setHasSearched(true);
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = indoorLocations.filter(location => 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const handleScanQR = () => {
    setIsScanning(true);
    setShowQrScanner(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setShowQrScanner(false);
      
      // Start the navigation workflow
      setCurrentStep(1);
      
      toast.success("QR code scanned successfully", {
        description: "Location confirmed: You are at Trichy Central Bus Stand – Gate A"
      });
    }, 2000);
  };

  const handleStartNavigation = () => {
    setCurrentStep(2);
  };

  const handleScanEntryQR = () => {
    setIsScanning(true);
    setShowQrScanner(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setShowQrScanner(false);
      setCurrentStep(3);
      
      toast.success("Entry QR code scanned", {
        description: "Precise location confirmed. Ready to navigate."
      });
    }, 2000);
  };

  const handleCalculatePath = () => {
    setCurrentStep(4);
    setCalculatingPath(true);
    
    // Simulate path calculation
    setTimeout(() => {
      setCalculatingPath(false);
      setCurrentStep(5);
      setNavigationProgress(0);
      setCurrentCheckpoint("Security Checkpoint 3");
      
      toast.success("Path calculated", {
        description: "Fastest route has been calculated for you."
      });
    }, 2500);
  };

  const handleScanCheckpointQR = () => {
    setIsScanning(true);
    setShowQrScanner(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setShowQrScanner(false);
      setNavigationProgress(75);
      
      // Update checkpoint
      setCurrentCheckpoint("Final Stretch");
      
      toast.success("Checkpoint confirmed", {
        description: "You're on the right track! Continue following directions."
      });
    }, 2000);
  };

  const handleCompleteNavigation = () => {
    setNavigationProgress(100);
    setShowARNavigation(false);
    setShowCompletionDialog(true);
  };

  const handleChangeLocation = () => {
    setCurrentStep(0);
    setShowQrScanner(false);
    setShowARNavigation(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Auto Detect Location
        return (
          <Card className="bg-accent/10 border-accent/20 mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-accent/20 rounded-full mr-3">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Current Location</h3>
                    <p className="text-sm text-muted-foreground">Auto-detected based on device</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleChangeLocation}>
                  Change
                </Button>
              </div>
              
              <div className="bg-background/80 border rounded-lg p-4">
                <div className="flex items-center">
                  <Locate className="h-4 w-4 text-accent mr-2" />
                  <span className="font-medium">{detectedLocation}</span>
                </div>
              </div>
              
              {busInfo && (
                <div className="mt-6 bg-accent/5 border border-accent/10 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-green-100 rounded-full mr-2">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <h3 className="font-medium">Bus Booking Detected</h3>
                  </div>
                  
                  <div className="text-sm mb-3">
                    Your bus departs from this terminal. Need help getting to your bus bay?
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Bus Number</span>
                      <span className="font-medium">{busInfo.number}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Destination</span>
                      <span className="font-medium">{busInfo.destination}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Departure Time</span>
                      <span className="font-medium">{busInfo.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Departure Bay</span>
                      <span className="font-medium">{destinationBay}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1" onClick={() => toast("Enjoy your journey!")}>
                      No, I know the way
                    </Button>
                    <Button 
                      className="flex-1 bg-accent hover:bg-accent/90" 
                      onClick={handleStartNavigation}
                    >
                      Yes, guide me
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 1: // Scan Entry QR Code
        return (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-accent/20 rounded-full mr-3">
                  <QrCode className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Scan QR Code for Precision</h3>
                  <p className="text-sm text-muted-foreground">
                    Scan the QR code at the terminal entrance to begin accurate navigation
                  </p>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleScanEntryQR}
                disabled={isScanning}
              >
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-pulse">Scanning...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Scan Entry QR <Camera className="h-4 w-4" />
                  </span>
                )}
              </Button>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <Info className="h-4 w-4 inline-block mr-1" />
                The QR code helps confirm your precise location inside the terminal
              </div>
            </CardContent>
          </Card>
        );
        
      case 2: // Destination Auto-Set
        return (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-accent/20 rounded-full mr-3">
                  <Navigation className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Ready to Navigate</h3>
                  <p className="text-sm text-muted-foreground">
                    We've set your destination based on your ticket
                  </p>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-accent mr-2" />
                    <span>From: Entry Gate A</span>
                  </div>
                </div>
                
                <div className="h-6 border-l-2 border-dashed border-accent/50 ml-[7px]"></div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-green-600 mr-2" />
                  <span>To: {destinationBay} ({busInfo?.destination}, {busInfo?.time})</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleCalculatePath}
              >
                <span className="flex items-center gap-2">
                  Calculate Best Path <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </CardContent>
          </Card>
        );
        
      case 3: // Path Calculation
        return (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-accent/20 rounded-full mr-3">
                  <Navigation className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Ready to Navigate</h3>
                  <p className="text-sm text-muted-foreground">
                    We've set your destination based on your ticket
                  </p>
                </div>
              </div>
              
              <div className="bg-background p-4 rounded-lg border mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-accent mr-2" />
                    <span>From: Entry Gate A</span>
                  </div>
                </div>
                
                <div className="h-6 border-l-2 border-dashed border-accent/50 ml-[7px]"></div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-green-600 mr-2" />
                  <span>To: {destinationBay} ({busInfo?.destination}, {busInfo?.time})</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleCalculatePath}
              >
                <span className="flex items-center gap-2">
                  Calculate Best Path <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </CardContent>
          </Card>
        );
          
      case 4: // Calculating path
        return (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center mb-4">
                <div className="p-3 bg-accent/20 rounded-full mb-3">
                  <Compass className="h-6 w-6 text-accent animate-pulse" />
                </div>
                <div>
                  <h3 className="font-medium">Calculating Best Path</h3>
                  <p className="text-sm text-muted-foreground">
                    Finding the quickest route with accessibility options
                  </p>
                </div>
              </div>
              
              <Progress value={45} className="mb-4" />
              
              <div className="text-sm text-muted-foreground">
                This will only take a moment...
              </div>
            </CardContent>
          </Card>
        );
          
      case 5: // AR Navigation
        return (
          <div className="relative">
            <Card className="mb-6">
              <CardContent className="p-0">
                {/* AR Navigation View */}
                <div className="relative h-[70vh] bg-black overflow-hidden rounded-t-lg">
                  <img 
                    src="public/lovable-uploads/6f09daf1-ca8d-41d1-b418-5459a0b3726c.png" 
                    alt="AR Navigation"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation progress */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 rounded-full px-4 py-1 text-white text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Step {navigationProgress < 50 ? "1" : "2"} of 3</span>
                    </div>
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute bottom-20 left-4 text-white">
                    <div className="text-2xl font-bold">22</div>
                    <div className="text-xs text-white/70">meters away</div>
                  </div>
                  
                  <div className="absolute bottom-20 right-4 text-white">
                    <div className="text-2xl font-bold">123</div>
                    <div className="text-xs text-white/70">meters traveled</div>
                  </div>
                  
                  <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 text-white text-xs">
                    <div className="text-center">5 of 8</div>
                    <div className="text-white/70">checkpoints</div>
                  </div>
                  
                  {/* Direction card */}
                  <div className="absolute bottom-4 left-0 right-0 mx-4">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs uppercase font-semibold text-muted-foreground">WALK TO</div>
                            <div className="font-medium">{currentCheckpoint}</div>
                            <div className="text-xs mt-1 bg-red-100 text-red-600 rounded-full inline-block px-2 py-0.5">
                              <Clock className="h-3 w-3 inline mr-1" />
                              12 MIN WAIT
                            </div>
                          </div>
                          <div className="bg-red-500 text-white p-2 rounded-md">
                            <QrCode className="h-6 w-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Controls */}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm">{navigationProgress}%</span>
                  </div>
                  <Progress value={navigationProgress} className="mb-2" />
                  
                  <div className="flex gap-2">
                    {navigationProgress < 99 ? (
                      <>
                        <Button variant="outline" className="flex-1" onClick={handleScanCheckpointQR}>
                          <QrCode className="h-4 w-4 mr-2" />
                          Scan Checkpoint
                        </Button>
                        <Button 
                          className="flex-1 bg-accent hover:bg-accent/90" 
                          onClick={handleCompleteNavigation}
                        >
                          Skip to End
                        </Button>
                      </>
                    ) : (
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700" 
                        onClick={handleCompleteNavigation}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Complete Navigation
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Navigation completion dialog
  const NavigationCompleteDialog = () => (
    <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CircleCheck className="h-5 w-5 text-green-600" />
            You've Arrived!
          </DialogTitle>
          <DialogDescription>
            You've successfully reached {destinationBay}
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-4 bg-accent/5 rounded-lg mb-4">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Bus Number</span>
              <span className="font-medium">{busInfo?.number}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Destination</span>
              <span className="font-medium">{busInfo?.destination}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Departure</span>
              <span className="font-medium">{busInfo?.time}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => {
              setShowCompletionDialog(false);
              toast.success("We'll alert you before your bus arrives");
            }}
          >
            <Bell className="h-4 w-4 mr-2" />
            Wake Me Up Before Bus Arrives
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => {
              setShowCompletionDialog(false);
              setCurrentStep(0);
              toast("Starting a new navigation session");
            }}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Start New Navigation
          </Button>
          
          <Button 
            className="w-full" 
            onClick={() => {
              setShowCompletionDialog(false);
              setCurrentStep(0);
              toast("Have a safe journey!");
            }}
          >
            <Check className="h-4 w-4 mr-2" />
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // QR Scanner dialog
  const QRScannerDialog = () => (
    <Dialog open={showQrScanner} onOpenChange={setShowQrScanner}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <DialogDescription>
            Position the QR code in the frame to scan
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-dashed border-accent/50 rounded-lg flex items-center justify-center bg-black/5">
            <div className="text-center">
              {isScanning ? (
                <div className="flex flex-col items-center">
                  <QrCode className="h-12 w-12 text-accent animate-pulse mb-2" />
                  <div className="text-sm text-muted-foreground">Scanning...</div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <QrCode className="h-12 w-12 text-muted-foreground mb-2" />
                  <div className="text-sm text-muted-foreground">Camera preview would appear here</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setShowQrScanner(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              // Simulate successful QR scan
              setTimeout(() => {
                setIsScanning(false);
                setShowQrScanner(false);
                if (currentStep === 1) {
                  setCurrentStep(2);
                  toast.success("QR Code scanned successfully");
                } else if (currentStep === 5) {
                  setNavigationProgress(navigationProgress + 25);
                  toast.success("Checkpoint confirmed");
                  if (navigationProgress >= 75) {
                    handleCompleteNavigation();
                  }
                }
              }, 1000);
              setIsScanning(true);
            }}
          >
            {isScanning ? "Scanning..." : "Scan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="go-container space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Indoor Navigation</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="space-y-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Navigation className="text-accent h-6 w-6" />
          Indoor Navigation
        </h1>
        
        <p className="text-muted-foreground">
          Navigate inside bus stations, metro stations, and large transit hubs with ease.
        </p>
      </div>
      
      {/* Navigation Progress Steps */}
      {currentStep > 0 && (
        <div className="flex items-center justify-between px-2 py-3 bg-accent/5 rounded-lg mb-2">
          <div 
            className={`flex flex-col items-center ${currentStep >= 1 ? "text-accent" : "text-muted-foreground"}`}
            onClick={() => currentStep > 1 && setCurrentStep(1)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-accent text-white" : "bg-muted"}`}>
              <QrCode className="h-4 w-4" />
            </div>
            <span className="text-xs mt-1">Scan QR</span>
          </div>
          
          <div className={`w-12 h-0.5 ${currentStep >= 2 ? "bg-accent" : "bg-muted"}`}></div>
          
          <div 
            className={`flex flex-col items-center ${currentStep >= 2 ? "text-accent" : "text-muted-foreground"}`}
            onClick={() => currentStep > 2 && setCurrentStep(2)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-accent text-white" : "bg-muted"}`}>
              <MapPin className="h-4 w-4" />
            </div>
            <span className="text-xs mt-1">Set Route</span>
          </div>
          
          <div className={`w-12 h-0.5 ${currentStep >= 4 ? "bg-accent" : "bg-muted"}`}></div>
          
          <div 
            className={`flex flex-col items-center ${currentStep >= 4 ? "text-accent" : "text-muted-foreground"}`}
            onClick={() => currentStep > 4 && setCurrentStep(4)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? "bg-accent text-white" : "bg-muted"}`}>
              <Compass className="h-4 w-4" />
            </div>
            <span className="text-xs mt-1">Calculate</span>
          </div>
          
          <div className={`w-12 h-0.5 ${currentStep >= 5 ? "bg-accent" : "bg-muted"}`}></div>
          
          <div 
            className={`flex flex-col items-center ${currentStep >= 5 ? "text-accent" : "text-muted-foreground"}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 5 ? "bg-accent text-white" : "bg-muted"}`}>
              <Navigation className="h-4 w-4" />
            </div>
            <span className="text-xs mt-1">Navigate</span>
          </div>
        </div>
      )}
      
      {/* Current Step Content */}
      {renderStepContent()}
      
      {currentStep === 0 && (
        <>
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <QrCode className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Scan QR Code</h3>
                    <p className="text-sm text-muted-foreground">Scan a QR code to start navigation</p>
                  </div>
                </div>
                <Button 
                  onClick={handleScanQR} 
                  disabled={isScanning}
                  className="relative overflow-hidden"
                >
                  {isScanning ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-pulse">Scanning...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Scan QR <QrCode className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for bus terminals, railway stations, etc."
              className="pl-9 pr-16"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              className="absolute right-0 top-0 h-full rounded-l-none"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          
          {hasSearched && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent" />
                Search Results {searchResults.length > 0 ? `(${searchResults.length})` : ''}
              </h2>
              
              {searchResults.length === 0 ? (
                <Card className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No locations found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try different search terms or browse supported locations below
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {searchResults.map((location) => (
                    <Card key={location.id} className="go-card-hover bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{location.name}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              <span>{location.city}</span>
                              <span className="mx-2">•</span>
                              <span>{location.type}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                <Building2 className="h-3 w-3 mr-1" /> {location.floors} floors
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Users className="h-3 w-3 mr-1" /> {location.entrances} entrances
                              </Badge>
                              {location.hasAccessibility && (
                                <Badge variant="outline" className="text-xs text-green-600 bg-green-50 border-green-200">
                                  <Accessibility className="h-3 w-3 mr-1" /> Accessible
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                <Wifi className="h-3 w-3 mr-1" /> Free Wi-Fi
                              </Badge>
                            </div>
                          </div>
                          <Button onClick={() => {
                            setDetectedLocation(`${location.name} – Gate A`);
                            setCurrentStep(1);
                            toast.success(`Location set to ${location.name}`);
                          }} className="gap-1">
                            <span>Navigate</span>
                            <Navigation className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-accent" />
              Popular Locations
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {indoorLocations.slice(0, 3).map((location) => (
                <Card key={location.id} className="go-card-hover">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{location.name}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span>{location.floors} floors</span>
                          <span className="mx-2">•</span>
                          <span>{location.entrances} entrances</span>
                          {location.hasAccessibility && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="text-green-600">Wheelchair accessible</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => {
                        setDetectedLocation(`${location.name} – Gate A`);
                        setCurrentStep(1);
                        toast.success(`Location set to ${location.name}`);
                      }} className="gap-1">
                        <span className="text-xs">Navigate</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
      
      <div className="py-4 px-6 bg-secondary rounded-lg">
        <div className="flex items-start gap-4">
          <Compass className="h-8 w-8 text-accent shrink-0 mt-1" />
          <div>
            <h3 className="font-medium">How Indoor Navigation Works</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Scan QR codes placed throughout the station to get your current location.
              Our app will then guide you to your destination with step-by-step directions,
              including accessibility options and the fastest routes.
            </p>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <QRScannerDialog />
      <NavigationCompleteDialog />
    </div>
  );
};

export default IndoorNavigation;
