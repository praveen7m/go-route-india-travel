
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, MessageSquare, MapPin, Shield, AlertTriangle, X, AlertCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SOS = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSosActive, setIsSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const guardianInfo = {
    name: "Rajesh Kumar",
    relation: "Father",
    phone: "+91 87654 32109",
  };

  const emergencyNumbers = [
    { name: "Police", number: "100" },
    { name: "Ambulance", number: "108" },
    { name: "Women Helpline", number: "1091" },
    { name: "GoRoute Support", number: "1800-123-4567" },
  ];

  const handleSOS = () => {
    setIsSosActive(true);
    
    // Simulate countdown
    let count = 5;
    const countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count <= 0) {
        clearInterval(countdownInterval);
        activateSOS();
      }
    }, 1000);
  };

  const cancelSOS = () => {
    setIsSosActive(false);
    setCountdown(5);
    toast({
      title: "SOS Cancelled",
      description: "Emergency alert has been cancelled.",
    });
  };

  const activateSOS = () => {
    toast({
      title: "SOS Activated",
      description: "Emergency contacts have been notified with your location.",
      variant: "destructive",
    });
    
    // In a real app, this would trigger calls, SMS, and location sharing
    console.log("SOS activated - would contact emergency services");
  };

  const callNumber = (name: string, number: string) => {
    toast({
      title: `Calling ${name}`,
      description: `Dialing ${number}...`,
    });
    // In a real app, this would use the device's phone capabilities
    console.log(`Calling ${number}`);
  };

  return (
    <div className="go-container space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t("sos.title")}</h1>
        <p className="text-muted-foreground">
          Emergency contact options and quick access to help
        </p>
      </div>

      {isSosActive ? (
        <Card className="border-destructive bg-destructive/10 animate-pulse-slow">
          <CardContent className="p-6 text-center space-y-4">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
            <h2 className="text-xl font-bold text-destructive">
              Emergency SOS Activated
            </h2>
            <p>
              Sending your location and alert in <span className="font-bold">{countdown}</span> seconds
            </p>
            <Button
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive/20 hover:text-destructive"
              onClick={cancelSOS}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel SOS
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden border-2 border-destructive">
          <CardContent className="p-0">
            <div className="bg-destructive text-white p-4 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6" />
              <div>
                <h2 className="font-semibold">Emergency SOS</h2>
                <p className="text-sm text-white/80">
                  Press in case of emergency
                </p>
              </div>
            </div>
            <div className="p-6">
              <Button
                variant="destructive"
                size="lg"
                className="w-full py-8 text-lg font-bold"
                onClick={handleSOS}
              >
                <Shield className="mr-2 h-6 w-6" />
                Activate SOS
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                This will notify your emergency contacts and share your location
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Guardian Contact</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{guardianInfo.name}</p>
              <p className="text-sm text-muted-foreground">
                {guardianInfo.relation} • {guardianInfo.phone}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => callNumber(guardianInfo.name, guardianInfo.phone)}
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button variant="outline" className="w-full" size="sm">
            <MapPin className="mr-2 h-4 w-4" />
            Share Current Location
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Emergency Numbers</h2>
          <div className="space-y-3">
            {emergencyNumbers.map((emergency, index) => (
              <div key={emergency.number}>
                <div className="flex items-center justify-between py-1">
                  <div>
                    <p className="font-medium">{emergency.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {emergency.number}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => callNumber(emergency.name, emergency.number)}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                </div>
                {index < emergencyNumbers.length - 1 && (
                  <Separator className="mt-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOS;
