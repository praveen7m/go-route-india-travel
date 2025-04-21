import React, { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Navigation,
  Building2, 
  Compass, 
  Search, 
  MapPin,
  Wifi, 
  Users, 
  Clock, 
  Accessibility, 
  ArrowRight
} from 'lucide-react';
import { toast } from "sonner";
import type { StopDetails } from '@/types/bus-route';

import LocationDetection from "@/components/indoor-navigation/LocationDetection";
import QRScanner from "@/components/indoor-navigation/QRScanner";
import NavigationComplete from "@/components/indoor-navigation/NavigationComplete";
import NavigationProgress from "@/components/indoor-navigation/NavigationProgress";
import ARNavigationView from "@/components/indoor-navigation/ARNavigationView";

const IndoorNavigation = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
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
  const [isOffRoute, setIsOffRoute] = useState(false);
  const [currentDirection, setCurrentDirection] = useState("Walk straight 10m, then turn left");
  
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

  // NEW: Allow "From" and "To" fields to be editable after terminal selection
  const [fromField, setFromField] = useState("");  // Editable From
  const [toField, setToField] = useState("");      // Editable To

  useEffect(() => {
    const detectLocation = () => {
      const randomLocation = indoorLocations[Math.floor(Math.random() * indoorLocations.length)];
      const gates = ["A", "B", "C", "D", "E"];
      const randomGate = gates[Math.floor(Math.random() * gates.length)];
      
      setDetectedLocation(`${randomLocation.name} – Gate ${randomGate}`);
      setFromField(`${randomLocation.name} – Gate ${randomGate}`); // Set as default for editable From
      
      toast.info("Location detected", {
        description: `You are at: ${randomLocation.name} – Gate ${randomGate}`
      });

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
    
    setTimeout(detectLocation, 1000);
  }, []);

  const stops: StopDetails[] = [
    {
      name: "Entry Gate A",
      platform: "Ground Floor",
      status: "on-time",
      isPassed: true,
      arrivalTime: "10:30 AM",
      departureTime: "10:35 AM",
      distance: "0m",
      isNext: false
    },
    {
      name: "Security Checkpoint 3",
      platform: "Ground Floor",
      status: "on-time",
      isPassed: false,
      arrivalTime: "10:40 AM",
      departureTime: "10:42 AM",
      distance: "50m",
      isNext: true
    },
    {
      name: "Final Stretch",
      platform: "Platform 2",
      status: "on-time",
      isPassed: false,
      arrivalTime: "10:45 AM",
      departureTime: "10:47 AM",
      distance: "100m",
      isNext: false
    },
    {
      name: destinationBay,
      platform: "Platform 2",
      status: "on-time",
      isPassed: false,
      arrivalTime: "10:50 AM",
      departureTime: "10:55 AM",
      distance: "150m",
      isNext: false
    }
  ];

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
    
    setTimeout(() => {
      setIsScanning(false);
      setShowQrScanner(false);
      
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
    
    setTimeout(() => {
      setIsScanning(false);
      setShowQrScanner(false);
      setNavigationProgress(75);
      
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

  const handleScanComplete = () => {
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
  };

  const handleOpenARView = () => {
    setShowARNavigation(true);
  };

  const handleRecalculateRoute = () => {
    setIsOffRoute(false);
    setCurrentDirection("Continue straight 15m to Security Checkpoint");
    toast.success("Route recalculated", {
      description: "We've found a new path to your destination."
    });
  };

  const handleToggleOffRoute = () => {
    setIsOffRoute(!isOffRoute);
    toast(isOffRoute ? "Back on route" : "Simulating off-route scenario");
  };

  // --- Updated Step Content Render ---
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <LocationDetection
              detectedLocation={detectedLocation}
              busInfo={busInfo}
              destinationBay={destinationBay}
              onChangeLocation={handleChangeLocation}
              onStartNavigation={handleStartNavigation}
            />
            
            {/* Inputs for editing From/To fields */}
            <div className="flex gap-4 mb-4 mt-4">
              <Input
                value={fromField}
                onChange={e => setFromField(e.target.value)}
                placeholder="From"
                className="flex-1"
              />
              <Input
                value={toField}
                onChange={e => setToField(e.target.value)}
                placeholder="To"
                className="flex-1"
              />
            </div>
            
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
        );
        
      case 1:
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
                    Scan Entry QR <QrCode className="h-4 w-4" />
                  </span>
                )}
              </Button>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <QrCode className="h-4 w-4 inline-block mr-1" />
                The QR code helps confirm your precise location inside the terminal
              </div>
            </CardContent>
          </Card>
        );
        
      case 2:
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
        
      case 3:
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
        
      case 4:
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
              
              <div className="w-full h-12 flex items-center justify-center mb-4">
                <div className="w-16 h-16 border-4 border-t-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                This will only take a moment...
              </div>
            </CardContent>
          </Card>
        );
        
      case 5:
        return (
          <>
            <NavigationProgress
              currentCheckpoint={currentCheckpoint}
              navigationProgress={navigationProgress}
              onScanCheckpoint={() => {
                setShowQrScanner(true);
                setIsScanning(true);
                setTimeout(() => {
                  setIsScanning(false);
                }, 2000);
              }}
              onComplete={handleCompleteNavigation}
              stops={stops}
            />
            
            <div className="flex gap-3 mb-6">
              <Button 
                className="flex-1 bg-accent hover:bg-accent/90" 
                onClick={handleOpenARView}
              >
                Start AR Navigation
              </Button>
              <Button 
                className="flex-1"
                variant="outline"
                onClick={handleToggleOffRoute}
              >
                {isOffRoute ? "Reset Route" : "Simulate Off-Route"}
              </Button>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

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
      
      {renderStepContent()}
      
      <QRScanner
        isOpen={showQrScanner}
        isScanning={isScanning}
        onOpenChange={setShowQrScanner}
        onScanComplete={handleScanComplete}
        title={currentStep === 5 ? "Scan Checkpoint QR" : "Scan QR Code"}
        description={currentStep === 5 ? "Scan the checkpoint QR to confirm you're on the right track" : "Position the QR code in the frame to scan"}
        isCheckpoint={currentStep === 5}
      />
      
      <ARNavigationView
        isOpen={showARNavigation}
        onOpenChange={setShowARNavigation}
        currentDirection={currentDirection}
        onScanQR={() => {
          setShowARNavigation(false);
          setShowQrScanner(true);
          setIsScanning(true);
        }}
        onViewMap={() => {
          setShowARNavigation(false);
        }}
        isOffRoute={isOffRoute}
        onRecalculate={handleRecalculateRoute}
        fromLocation="Entry Gate A"
        toLocation={destinationBay}
      />
      
      <NavigationComplete
        isOpen={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
        busInfo={busInfo}
        onReset={() => setCurrentStep(0)}
      />
      
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
    </div>
  );
};

export default IndoorNavigation;
