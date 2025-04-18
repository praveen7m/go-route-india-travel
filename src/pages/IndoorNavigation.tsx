
import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Navigation, ArrowRight, Building2, Compass, Search, MapPin, Check, Wifi, Users, Clock, Accessibility } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const IndoorNavigation = () => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
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
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      toast.success("QR code scanned successfully. Indoor map loaded.", {
        description: "Navigate to your destination using the indoor map."
      });
    }, 2000);
  };

  const handleNavigateTo = (location: any) => {
    toast.success(`Starting navigation to ${location.name}`, {
      description: "Indoor map and directions are being loaded..."
    });
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
      
      <Card className="bg-accent/10 border-accent/20">
        <CardContent className="p-6">
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
                      <Button onClick={() => handleNavigateTo(location)} className="gap-1">
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
                  <Button variant="outline" size="sm" onClick={() => handleNavigateTo(location)} className="gap-1">
                    <span className="text-xs">Navigate</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
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
