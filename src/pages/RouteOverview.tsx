
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import RouteMap from "@/components/journey/RouteMap";
import RouteDetails from "@/components/journey/RouteDetails";

const RouteOverview = () => {
  const location = useLocation();
  const routeData = location.state?.routeData;

  if (!routeData) {
    return (
      <div className="go-container py-6">
        <h1 className="text-2xl font-bold mb-4">No route selected</h1>
        <p className="text-muted-foreground">Please select a route from the journey planner.</p>
      </div>
    );
  }

  return (
    <div className="go-container space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold mb-2">Route Overview</h1>
        <p className="text-muted-foreground">Review your journey details</p>
      </div>

      <Card className="w-full h-[300px] overflow-hidden">
        <RouteMap from={routeData.from} to={routeData.to} segments={routeData.segments} />
      </Card>

      <RouteDetails 
        segments={routeData.segments}
        totalFare={routeData.totalFare}
        totalTime={routeData.totalTime}
        onStartJourney={routeData.onStartJourney}
      />
    </div>
  );
};

export default RouteOverview;
