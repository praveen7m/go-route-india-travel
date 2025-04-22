
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Search,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

const MultiModalJourney = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const recentSearches = [
    { from: 'Indiranagar', to: 'Whitefield', time: '2 hours ago' },
    { from: 'MG Road', to: 'Electronic City', time: 'Yesterday' },
    { from: 'Koramangala', to: 'Airport', time: '3 days ago' }
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
    
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      navigate('/multi-modal-results', { state: { from, to } });
    }, 1000);
  };

  const handleRecentSearch = (recent: { from: string, to: string }) => {
    setFrom(recent.from);
    setTo(recent.to);
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
          
          <div className="flex justify-end">
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Searching...' : <><Search className="mr-2 h-4 w-4" /> Search Routes</>}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Recent Searches</h2>
        {recentSearches.map((recent, index) => (
          <Card key={index} className="cursor-pointer hover:bg-accent/10 transition-colors" 
                onClick={() => handleRecentSearch(recent)}>
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{recent.from} → {recent.to}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{recent.time}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-muted/50">Tap to use</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MultiModalJourney;
