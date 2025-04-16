
import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Navigation, ArrowRight, Building2, Compass } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "@/components/ui/sonner";

const IndoorNavigation = () => {
  const { t } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  
  const indoorLocations = [
    {
      id: 1,
      name: "Kempegowda Bus Station",
      floors: 3,
      entrances: 4,
      hasAccessibility: true,
    },
    {
      id: 2,
      name: "MG Road Metro Station",
      floors: 2,
      entrances: 2,
      hasAccessibility: true,
    },
    {
      id: 3,
      name: "Bangalore City Railway Station",
      floors: 4,
      entrances: 6,
      hasAccessibility: true,
    }
  ];

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
        <CardContent className="p-6 flex flex-col gap-4">
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
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Building2 className="h-5 w-5 text-goroute-green" />
          Supported Locations
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {indoorLocations.map((location) => (
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
                          <span className="text-goroute-green">Wheelchair accessible</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span className="text-xs">View Map</span>
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
