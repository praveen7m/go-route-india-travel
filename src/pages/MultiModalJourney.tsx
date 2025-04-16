
import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bus, Train, Car, Bicycle, WalkIcon, Clock, ArrowRight, Calendar, Radio, BanknoteIcon, InfoIcon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "@/components/ui/sonner";

const MultiModalJourney = () => {
  const { t } = useLanguage();
  const [activeJourneyIndex, setActiveJourneyIndex] = useState(0);
  
  const journeyOptions = [
    {
      id: 1,
      modes: ["bus", "metro", "walk"],
      duration: 45,
      cost: 60,
      departsIn: 5,
      carbonFootprint: "Low",
    },
    {
      id: 2,
      modes: ["auto", "metro"],
      duration: 35,
      cost: 120,
      departsIn: 10,
      carbonFootprint: "Medium",
    },
    {
      id: 3,
      modes: ["bus", "bus"],
      duration: 55,
      cost: 40,
      departsIn: 3,
      carbonFootprint: "Low",
    },
  ];

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "bus":
        return <Bus className="h-4 w-4" />;
      case "metro":
      case "train":
        return <Train className="h-4 w-4" />;
      case "auto":
      case "taxi":
      case "car":
        return <Car className="h-4 w-4" />;
      case "bicycle":
        return <Bicycle className="h-4 w-4" />;
      case "walk":
        return <WalkIcon className="h-4 w-4" />;
      default:
        return <Bus className="h-4 w-4" />;
    }
  };

  const handleSelectJourney = (index: number) => {
    setActiveJourneyIndex(index);
    toast.success("Journey option selected", {
      description: "View detailed route information below."
    });
  };

  const handleBookJourney = () => {
    toast.success("Journey booked successfully", {
      description: "Check your upcoming trips for details."
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
            <BreadcrumbPage>Multi-Modal Journey</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="space-y-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Radio className="text-goroute-orange h-6 w-6" />
          Multi-Modal Journey Planner
        </h1>
        
        <p className="text-muted-foreground">
          Plan your journey using multiple modes of transport for the most efficient travel.
        </p>
      </div>
      
      <Card className="bg-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-medium">Indiranagar</h3>
              <p className="text-xs text-muted-foreground">Current Location</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div>
              <h3 className="font-medium">Whitefield</h3>
              <p className="text-xs text-muted-foreground">Destination</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <span>Today</span>
            <span className="mx-1">•</span>
            <Clock className="h-4 w-4" />
            <span>Depart now</span>
          </div>
          
          <Button variant="link" size="sm" className="px-0 h-7">Change journey details</Button>
        </CardContent>
      </Card>
      
      <div className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-goroute-blue" />
          Journey Options
        </h2>
        
        <div className="space-y-4">
          {journeyOptions.map((journey, index) => (
            <Card 
              key={journey.id} 
              className={`go-card-hover relative overflow-hidden ${
                activeJourneyIndex === index ? "border-accent" : ""
              }`}
            >
              {activeJourneyIndex === index && (
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
              )}
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {journey.modes.map((mode, i) => (
                        <React.Fragment key={i}>
                          <div className={`p-1.5 rounded-full ${
                            mode === "bus" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                            mode === "metro" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" :
                            mode === "walk" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                            mode === "auto" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" :
                            "bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-400"
                          }`}>
                            {getModeIcon(mode)}
                          </div>
                          {i < journey.modes.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{journey.duration} mins</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <BanknoteIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>₹{journey.cost}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <InfoIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className={
                          journey.carbonFootprint === "Low" ? "text-goroute-green" :
                          journey.carbonFootprint === "Medium" ? "text-goroute-orange" :
                          "text-goroute-red"
                        }>
                          {journey.carbonFootprint} CO₂
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm font-medium">
                      In {journey.departsIn} mins
                    </div>
                    <Button 
                      variant={activeJourneyIndex === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSelectJourney(index)}
                    >
                      {activeJourneyIndex === index ? "Selected" : "Select"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Journey Details</h2>
        
        <Card className="bg-card">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Bus className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">Bus 500C</h4>
                  <p className="text-xs text-muted-foreground">Indiranagar Bus Stop → Domlur</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm">15 mins</p>
                  <p className="text-xs text-muted-foreground">Departs in 5 mins</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Train className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">Purple Line Metro</h4>
                  <p className="text-xs text-muted-foreground">Domlur → Whitefield</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm">25 mins</p>
                  <p className="text-xs text-muted-foreground">Every 10 mins</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <WalkIcon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">Walk</h4>
                  <p className="text-xs text-muted-foreground">Whitefield Metro → Destination</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm">5 mins</p>
                  <p className="text-xs text-muted-foreground">300m</p>
                </div>
              </div>
            </div>
            
            <Button onClick={handleBookJourney} className="w-full">
              Book This Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiModalJourney;
