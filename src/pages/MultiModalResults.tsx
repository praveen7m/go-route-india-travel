
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHeader, 
  TableHead, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, DollarSign, Navigation, Star } from 'lucide-react';
import { toast } from 'sonner';

const MultiModalResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to } = location.state || {};

  // These would come from an API in a real application
  const routes = [
    {
      id: 1,
      isBest: true,
      isSuggested: false,
      from: from || 'Koramangala',
      to: to || 'Whitefield',
      totalTime: '55 min',
      totalFare: '₹120',
      segments: [
        {
          type: 'bus',
          name: 'Bus 500C',
          from: 'Koramangala',
          to: 'Indiranagar',
          duration: 20,
          departureTime: '10:15 AM',
          arrivalTime: '10:35 AM',
          stops: ['Forum Mall', 'Sony World Signal', '100ft Road'],
          fare: 30
        },
        {
          type: 'metro',
          name: 'Purple Line',
          from: 'Indiranagar',
          to: 'Byappanahalli',
          duration: 15,
          departureTime: '10:45 AM',
          arrivalTime: '11:00 AM',
          stops: ['MG Road', 'Trinity', 'Halasuru'],
          fare: 40
        },
        {
          type: 'bus',
          name: 'Bus 335E',
          from: 'Byappanahalli',
          to: 'Whitefield',
          duration: 20,
          departureTime: '11:10 AM',
          arrivalTime: '11:30 AM',
          stops: ['KR Puram', 'Mahadevapura', 'Hoodi'],
          fare: 50
        }
      ]
    },
    {
      id: 2,
      isBest: false,
      isSuggested: true,
      from: from || 'Koramangala',
      to: to || 'Whitefield',
      totalTime: '65 min',
      totalFare: '₹90',
      segments: [
        {
          type: 'bus',
          name: 'Bus 500D',
          from: 'Koramangala',
          to: 'Marathahalli',
          duration: 35,
          departureTime: '10:15 AM',
          arrivalTime: '10:50 AM',
          stops: ['Domlur', 'HAL', 'Kundalahalli Gate'],
          fare: 40
        },
        {
          type: 'bus',
          name: 'Bus 320',
          from: 'Marathahalli',
          to: 'Whitefield',
          duration: 30,
          departureTime: '11:00 AM',
          arrivalTime: '11:30 AM',
          stops: ['ITPL', 'Hope Farm', 'Phoenix Mall'],
          fare: 50
        }
      ]
    }
  ];

  const handleStartJourney = (route: any) => {
    navigate('/route-overview', { state: { routeData: route } });
  };

  const handleSaveRoute = (route: any) => {
    toast.success("Route saved successfully");
  };

  const handleBack = () => {
    navigate('/multi-modal');
  };

  return (
    <div className="go-container space-y-6 pb-16">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Journey Results</h1>
          <p className="text-muted-foreground">From {from} to {to}</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Badge className="bg-green-100 text-green-700 border-green-200">
            Best Route
          </Badge>
          Suggested Journey
        </h2>
        
        {routes.map((route) => (
          <Card key={route.id} className="overflow-hidden border-2 hover:shadow-md transition-all duration-200 relative">
            {route.isBest && (
              <div className="absolute top-0 right-0">
                <Badge variant="outline" className="m-2 bg-green-100 text-green-700 border-green-200">
                  Best Route
                </Badge>
              </div>
            )}
            {route.isSuggested && (
              <div className="absolute top-0 right-0">
                <Badge variant="outline" className="m-2 bg-blue-100 text-blue-700 border-blue-200">
                  Suggested
                </Badge>
              </div>
            )}
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{route.from} to {route.to}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {route.totalTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {route.totalFare}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Today
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleSaveRoute(route)}>
                      <Star className="h-4 w-4" />
                      Save
                    </Button>
                    <Button size="sm" onClick={() => handleStartJourney(route)}>
                      Start Journey
                    </Button>
                  </div>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mode</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Fare</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {route.segments.map((segment, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{segment.type}</TableCell>
                      <TableCell>{segment.from} → {segment.to}</TableCell>
                      <TableCell>{segment.duration} min</TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>{segment.departureTime}</div>
                          <div>{segment.arrivalTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>₹{segment.fare}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MultiModalResults;
