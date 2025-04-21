
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { SearchStep } from "@/components/route-book/SearchStep";
import { GenderPreferenceStep } from "@/components/route-book/GenderPreferenceStep";
import { BusListStep } from "@/components/route-book/BusListStep";
import { toast } from "sonner";
import type { BusData } from "@/types/bus-route";
import { busStops } from "@/types/bus-route";
import WaitlistModal from "@/components/bus/WaitlistModal";
import WakeMeUpModal from "@/components/bus/WakeMeUpModal";
import BusTrackingView from "@/components/bus/BusTrackingView";
import BusSeatSelector from "@/components/bus/BusSeatSelector";
import BookedTicketModal from "@/components/bus/BookedTicketModal";

const RouteBook = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [busNumber, setBusNumber] = useState(""); // NEW
  const [genderPreference, setGenderPreference] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<BusData | null>(null);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showWakeMeUpModal, setShowWakeMeUpModal] = useState(false);
  const [showTrackingView, setShowTrackingView] = useState(false);
  const [wakeMeUpBus, setWakeMeUpBus] = useState<BusData | null>(null);

  const [showSeatSelector, setShowSeatSelector] = useState(false); // NEW
  const [bookedTicket, setBookedTicket] = useState<{ bus: BusData; seats: string[]; amount: number } | null>(null); // NEW

  const handleSearch = () => {
    if (!fromCity || !toCity || !travelDate) return;
    setStep(2);
  };

  const handleGenderSubmit = () => {
    if (!genderPreference) {
      toast("Gender preference is required for your safety and comfort.");
      return;
    }
    setStep(3);
    if (genderPreference === "womens_only") {
      toast("Showing women's special buses and regular buses.");
    } else {
      toast("Showing all available buses.");
    }
  };

  const handleBookNow = (bus: BusData) => {
    setSelectedBus(bus);
    setShowSeatSelector(true);
  };

  const handleJoinWaitlist = (bus: BusData) => {
    setSelectedBus(bus);
    setShowWaitlistModal(true);
  };

  const handleWakeMeUp = (bus: BusData) => {
    setWakeMeUpBus(bus);
    setShowWakeMeUpModal(true);
  };

  const handleViewRoute = (bus: BusData) => {
    setSelectedBus(bus);
    setShowTrackingView(true);
  };

  const handleCloseTracking = () => {
    setShowTrackingView(false);
  };

  // When seats are selected and paid
  const handleSeatsBooked = (bus: BusData, seats: string[], amount: number) => {
    setShowSeatSelector(false);
    setBookedTicket({ bus, seats, amount });
    toast.success("Booking confirmed! You can now view your ticket.");
  };

  const handleCloseTicket = () => setBookedTicket(null);

  return (
    <div className="go-container space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t("routeBus.title")}</h1>
        <p className="text-muted-foreground">
          Book tickets for interstate and long-distance travel
        </p>
      </div>

      {step === 1 && (
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
      )}

      {step === 2 && (
        <GenderPreferenceStep
          genderPreference={genderPreference}
          onGenderPreferenceChange={setGenderPreference}
          onSubmit={handleGenderSubmit}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <BusListStep
          fromCity={fromCity}
          toCity={toCity}
          travelDate={travelDate}
          genderPreference={genderPreference}
          onBookNow={handleBookNow}
          onJoinWaitlist={handleJoinWaitlist}
          onViewRoute={handleViewRoute}
          onBack={() => setStep(1)}
        />
      )}

      {/* Seat Layout Modal */}
      {showSeatSelector && selectedBus && (
        <BusSeatSelector
          open={showSeatSelector}
          onOpenChange={setShowSeatSelector}
          busInfo={{
            name: selectedBus.type,
            from: selectedBus.from,
            to: selectedBus.to,
            departureTime: selectedBus.departure,
            arrivalTime: selectedBus.arrival,
            duration: selectedBus.duration,
            date: travelDate,
          }}
          // Custom prop for when booking is complete - overload onOpenChange
          onBookComplete={(seats: string[], amount: number) =>
            handleSeatsBooked(selectedBus, seats, amount)
          }
        />
      )}

      {/* Booked Ticket Modal */}
      {bookedTicket && (
        <BookedTicketModal
          open={!!bookedTicket}
          onClose={handleCloseTicket}
          ticket={{
            ...bookedTicket,
            travelDate
          }}
          onWakeMeUp={() => setShowWakeMeUpModal(true)}
        />
      )}

      {showWaitlistModal && selectedBus && (
        <WaitlistModal
          open={showWaitlistModal}
          onClose={() => setShowWaitlistModal(false)}
          busDetails={{
            number: selectedBus.number,
            from: selectedBus.from,
            to: selectedBus.to
          }}
        />
      )}

      {showWakeMeUpModal && (wakeMeUpBus || (bookedTicket && bookedTicket.bus)) && (
        <WakeMeUpModal
          open={showWakeMeUpModal}
          onClose={() => setShowWakeMeUpModal(false)}
          busDetails={{
            number: wakeMeUpBus?.number || bookedTicket?.bus.number || "",
            destination: wakeMeUpBus?.to || bookedTicket?.bus.to || "",
            arrivalTime: wakeMeUpBus?.arrival || bookedTicket?.bus.arrival || ""
          }}
        />
      )}

      {showTrackingView && selectedBus && (
        <BusTrackingView
          busName={selectedBus.type}
          busNumber={selectedBus.number}
          fromTo={`${selectedBus.from} to ${selectedBus.to}`}
          currentDate={travelDate}
          stops={busStops}
          onClose={handleCloseTracking}
        />
      )}
    </div>
  );
};

export default RouteBook;
