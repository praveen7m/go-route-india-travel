
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SearchStep } from "@/components/route-book/SearchStep";
import { GenderPreferenceStep } from "@/components/route-book/GenderPreferenceStep";
import { BusListStep } from "@/components/route-book/BusListStep";
import type { BusData } from "@/types/bus-route";
import { busService } from "@/services/busService";
import { useQuery } from "@tanstack/react-query";
import WaitlistModal from "@/components/bus/WaitlistModal";

const RouteBook = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Search parameters
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [genderPreference, setGenderPreference] = useState<string | null>(null);
  
  // Flow control
  const [currentStep, setCurrentStep] = useState("search");
  
  // Waitlist modal
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [selectedBusForWaitlist, setSelectedBusForWaitlist] = useState<{number: string; from: string; to: string;} | null>(null);

  // Query to fetch buses
  const { data: busesData, isLoading, refetch } = useQuery({
    queryKey: ['routeBuses', fromCity, toCity, travelDate, busNumber],
    queryFn: () => busService.getAvailableBuses(fromCity, toCity, travelDate),
    enabled: false, // Don't fetch automatically
  });

  const handleSearch = () => {
    if (fromCity && toCity && travelDate) {
      setCurrentStep("gender");
    }
  };

  const handleGenderSelect = (preference: string | null) => {
    setGenderPreference(preference);
    setCurrentStep("list");
    refetch(); // Now fetch the buses
  };

  const handleBookNow = (bus: BusData) => {
    navigate("/route-overview", { state: { routeData: {
      from: fromCity,
      to: toCity,
      date: travelDate,
      busId: bus.id,
      busNumber: bus.number,
      busType: bus.type,
      departureTime: bus.departure,
      arrivalTime: bus.arrival
    }}});
  };

  const handleJoinWaitlist = (bus: BusData) => {
    setSelectedBusForWaitlist({
      number: bus.number,
      from: fromCity,
      to: toCity
    });
    setWaitlistModalOpen(true);
  };

  const handleViewRoute = (bus: BusData) => {
    // Navigate to route overview with the bus data
    navigate("/route-overview", { state: { routeData: {
      from: fromCity,
      to: toCity,
      isBest: true,
      totalFare: bus.price,
      totalTime: bus.duration,
      segments: [
        {
          type: "bus",
          name: bus.number,
          departureTime: bus.departure,
          arrivalTime: bus.arrival,
          from: fromCity,
          to: toCity,
          duration: bus.duration,
          fare: bus.price,
          status: "on-time"
        }
      ]
    }}});
  };

  const handleBack = () => {
    if (currentStep === "gender") {
      setCurrentStep("search");
    } else if (currentStep === "list") {
      setCurrentStep("gender");
    }
  };

  let currentStepComponent;
  switch (currentStep) {
    case "search":
      currentStepComponent = (
        <SearchStep
          fromCity={fromCity}
          toCity={toCity}
          travelDate={travelDate}
          busNumber={busNumber}
          onFromCityChange={setFromCity}
          onToCityChange={setToCity}
          onTravelDateChange={setTravelDate}
          onBusNumberChange={setBusNumber}
          onSearch={handleSearch}
        />
      );
      break;
    case "gender":
      currentStepComponent = (
        <GenderPreferenceStep
          onSelect={handleGenderSelect}
          onBack={() => setCurrentStep("search")}
        />
      );
      break;
    case "list":
      currentStepComponent = (
        <BusListStep
          fromCity={fromCity}
          toCity={toCity}
          travelDate={travelDate}
          genderPreference={genderPreference}
          onBookNow={handleBookNow}
          onJoinWaitlist={handleJoinWaitlist}
          onViewRoute={handleViewRoute}
          onBack={handleBack}
        />
      );
      break;
    default:
      currentStepComponent = null;
  }

  return (
    <div className="go-container space-y-6 pb-16">
      {currentStep !== "search" && (
        <button
          onClick={handleBack}
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
      )}

      <div>
        <h1 className="text-2xl font-bold">Book a Bus Ticket</h1>
        <p className="text-muted-foreground mt-1">
          Find and book intercity bus tickets
        </p>
      </div>

      {currentStepComponent}

      <WaitlistModal
        open={waitlistModalOpen}
        onClose={() => setWaitlistModalOpen(false)}
        busDetails={selectedBusForWaitlist}
      />
    </div>
  );
};

export default RouteBook;
