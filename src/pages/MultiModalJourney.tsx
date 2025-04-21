
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Calendar, Clock, DollarSign, MapPin, Train, Bus, Navigation2, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MultiModalJourney = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [results, setResults] = useState<boolean>(false);

  const routes = [
    {
      id: 1,
      isBest: true,
      isSuggested: false,
      from: 'Koramangala',
      to: 'Whitefield',
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
      from: 'Koramangala',
      to: 'Whitefield',
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

  const handleSearch = () => {
    if (!from || !to) {
      toast({
        title: "Error",
        description: "Please enter both source and destination",
        variant: "destructive"
      });
      return;
    }
    
    setResults(true);
  };

  const handleReset = () => {
    setFrom('');
    setTo('');
    setResults(false);
  };

  const handleStartJourney = (route: any) => {
    navigate('/route-overview', { state: { routeData: route } });
  };

  return (
    <div className="go-container space-y-6 pb-16">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Multi-Modal Journey</h1>
        <p className="text-muted-foreground">Plan your journey using different modes of transport</p>
      </div>
      
      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="from" className="text-sm font-medium">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="from"
                  placeholder="Enter starting point"
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
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleSearch}>
              Search Routes
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {results && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Available Routes</h2>
          
          <div className="space-y-4">
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
                      <Button onClick={() => handleStartJourney(route)}>
                        Start Journey
                      </Button>
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
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {segment.type === 'bus' ? (
                                <div className="bg-blue-100 p-1 rounded-full">
                                  <Bus className="h-4 w-4 text-blue-600" />
                                </div>
                              ) : segment.type === 'metro' ? (
                                <div className="bg-purple-100 p-1 rounded-full">
                                  <Train className="h-4 w-4 text-purple-600" />
                                </div>
                              ) : (
                                <div className="bg-green-100 p-1 rounded-full">
                                  <Navigation2 className="h-4 w-4 text-green-600" />
                                </div>
                              )}
                              {segment.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {segment.from} <ArrowRight className="h-3 w-3 mx-1" /> {segment.to}
                            </div>
                          </TableCell>
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
      )}
    </div>
  );
};

export default MultiModalJourney;
