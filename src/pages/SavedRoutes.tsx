import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star, StarOff, MapPin, Clock, Bus, Calendar, ChevronRight,
  ArrowRight, Bell, CheckCircle, AlertCircle, Trash2
} from "lucide-react";

const SavedRoutes = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("saved");

  const savedRoutes = [
    {
      id: 1,
      name: "Daily Commute",
      from: "Koramangala",
      to: "Electronic City",
      busNumber: "500C",
      duration: "35 mins",
      lastUsed: "Today",
      type: "daily",
      isFavorite: true,
      hasAlerts: true,
    },
    {
      id: 2,
      name: "Weekend Trip",
      from: "Bangalore",
      to: "Mysore",
      busNumber: "VLV123",
      duration: "3h 15m",
      lastUsed: "Last week",
      type: "occasional",
      isFavorite: true,
      hasAlerts: false,
    },
    {
      id: 3,
      name: "Office Route",
      from: "HSR Layout",
      to: "Whitefield",
      busNumber: "401M",
      duration: "55 mins",
      lastUsed: "Yesterday",
      type: "daily",
      isFavorite: false,
      hasAlerts: true,
    },
  ];

  const recentRoutes = [
    {
      id: 101,
      from: "Indiranagar",
      to: "MG Road",
      busNumber: "300K",
      date: "Yesterday, 9:15 AM",
      isSaved: false,
    },
    {
      id: 102,
      from: "JP Nagar",
      to: "Majestic",
      busNumber: "KS-9",
      date: "2 days ago, 5:30 PM",
      isSaved: false,
    },
  ];

  const toggleFavorite = (routeId: number) => {
    // In a real app, update this in your state management / backend
    toast("Route favorite status updated");
  };

  const toggleAlert = (routeId: number) => {
    // In a real app, update this in your state management / backend
    toast("Route alerts updated");
  };

  const deleteRoute = (routeId: number) => {
    // In a real app, remove from your state management / backend
    toast("Route removed from saved routes");
  };

  const saveRoute = (routeId: number) => {
    // In a real app, add to saved routes in your state management / backend
    toast("Route added to saved routes");
  };

  return (
    <div className="go-container space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t("savedRoutes.title") || "Saved Routes"}</h1>
        <p className="text-muted-foreground">
          Quickly access your favorite and frequently used routes
        </p>
      </div>

      <Tabs defaultValue="saved" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="saved">Saved Routes</TabsTrigger>
          <TabsTrigger value="recent">Recent Routes</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-4">
          {savedRoutes.length > 0 ? (
            <>
              {savedRoutes.map((route) => (
                <Card key={route.id} className="go-card-hover">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{route.name}</h3>
                          <Badge variant="outline" className={route.type === "daily" ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-purple-50 text-purple-600 border-purple-200"}>
                            {route.type === "daily" ? "Daily" : "Occasional"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Last used: {route.lastUsed}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => toggleFavorite(route.id)}
                        >
                          {route.isFavorite ? (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          ) : (
                            <Star className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => toggleAlert(route.id)}
                        >
                          {route.hasAlerts ? (
                            <Bell className="h-4 w-4 text-accent" />
                          ) : (
                            <Bell className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => deleteRoute(route.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-3">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-accent mr-1" />
                          <span className="text-sm font-medium">{route.from}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-accent mr-1" />
                          <span className="text-sm font-medium">{route.to}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Bus className="h-3 w-3 mr-1" />
                          <span>Bus: {route.busNumber}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{route.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to={`/city-bus?from=${route.from}&to=${route.to}`}>
                          <Bus className="mr-1 h-3 w-3" /> Track
                        </Link>
                      </Button>
                      <Button size="sm" className="w-full" asChild>
                        <Link to={`/route-bus?from=${route.from}&to=${route.to}`}>
                          Book <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full">
                <MapPin className="mr-2 h-4 w-4" />
                Add New Route
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No saved routes yet</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                Save your frequently used routes for quick access
              </p>
              <Button>
                Add Your First Route
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {recentRoutes.length > 0 ? (
            <>
              {recentRoutes.map((route) => (
                <Card key={route.id} className="go-card-hover">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-accent mr-1" />
                            <span className="font-medium">{route.from}</span>
                          </div>
                          <ArrowRight className="mx-2 h-3 w-3 text-muted-foreground" />
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-accent mr-1" />
                            <span className="font-medium">{route.to}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{route.date}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => saveRoute(route.id)}
                      >
                        <Star className="mr-1 h-4 w-4" />
                        Save
                      </Button>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Bus className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm">Bus: {route.busNumber}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/city-bus?from=${route.from}&to=${route.to}`}>
                            Track
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to={`/route-bus?from=${route.from}&to=${route.to}`}>
                            Book Again
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No recent routes</h3>
              <p className="text-muted-foreground mt-2">
                Your recently searched and booked routes will appear here
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedRoutes;
