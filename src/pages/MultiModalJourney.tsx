
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, RefreshCw, ArrowLeft, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const nextDestinationRoutes = [
  {
    id: 1,
    segments: [
      { 
        id: 1, 
        mode: "walk", 
        description: "350m to nearest bus stop", 
        fare: 0, 
        time: 5,
        color: "bg-blue-100 text-blue-700" 
      },
      { 
        id: 2, 
        mode: "bus", 
        description: "Bus #27B to Anna Nagar", 
        fare: 15, 
        time: 12,
        color: "bg-green-100 text-green-700"
      },
      { 
        id: 3, 
        mode: "auto", 
        description: "Auto to Final Destination", 
        fare: 35, 
        time: 7,
        color: "bg-orange-100 text-orange-700"
      }
    ],
    totalFare: 50,
    totalTime: 24,
    isBest: false,
    isSuggested: true
  },
  {
    id: 2,
    segments: [
      { 
        id: 1, 
        mode: "walk", 
        description: "200m to metro station", 
        fare: 0, 
        time: 3,
        color: "bg-blue-100 text-blue-700" 
      },
      { 
        id: 2, 
        mode: "metro", 
        description: "Metro to Central Station", 
        fare: 30, 
        time: 15,
        color: "bg-purple-100 text-purple-700"
      },
      { 
        id: 3, 
        mode: "walk", 
        description: "Walk to Final Destination", 
        fare: 0, 
        time: 8,
        color: "bg-blue-100 text-blue-700" 
      }
    ],
    totalFare: 30,
    totalTime: 26,
    isBest: true,
    isSuggested: false
  }
];

const MultiModalJourney = () => {
  const { t } = useLanguage();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchResults, setSearchResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const navigate = useNavigate();

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

  const handleStartJourney = (routeId: number) => {
    const selectedRouteData = nextDestinationRoutes.find(r => r.id === routeId);
    if (selectedRouteData) {
      navigate('/route-overview', { 
        state: { 
          routeData: {
            from,
            to,
            segments: selectedRouteData.segments,
            totalFare: selectedRouteData.totalFare,
            totalTime: selectedRouteData.totalTime,
            isBest: selectedRouteData.isBest,
            isSuggested: selectedRouteData.isSuggested,
            onStartJourney: () => {
              toast({
                title: "Journey Started",
                description: "Follow the navigation instructions to reach your destination"
              });
            }
          }
        }
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="go-container space-y-6 pb-20">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold mb-2">Plan Your Journey</h1>
          <p className="text-muted-foreground">Find the best route to your destination</p>
        </div>
      </div>

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
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Available Routes</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Journey</TableHead>
                  <TableHead>Fare</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nextDestinationRoutes.map(route => (
                  <TableRow key={route.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {route.isBest && (
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                            Best Route
                          </Badge>
                        )}
                        {route.isSuggested && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                            Suggested
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {route.segments.map((segment, idx) => (
                          <span key={segment.id} className="flex items-center">
                            <Badge variant="outline" className={segment.color}>
                              {segment.mode}
                            </Badge>
                            {idx < route.segments.length - 1 && (
                              <span className="px-1">→</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>₹{route.totalFare}</TableCell>
                    <TableCell>{route.totalTime} mins</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          onClick={() => handleStartJourney(route.id)}
                        >
                          Start Journey
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            toast.success("Route saved to favorites");
                          }}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MultiModalJourney;
