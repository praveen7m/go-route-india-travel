
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

const RouteBook = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [genderPreference, setGenderPreference] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<BusData | null>(null);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showWakeMeUpModal, setShowWakeMeUpModal] = useState(false);
  const [showTrackingView, setShowTrackingView] = useState(false);
  const [wakeMeUpBus, setWakeMeUpBus] = useState<BusData | null>(null);

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
    if (bus.available === 0) {
      toast("Bus is full. Would you like to join the waitlist?");
      setSelectedBus(bus);
      setShowWaitlistModal(true);
      return;
    }
    setSelectedBus(bus);
    toast.success("Booking confirmed! You can now track your bus.");
    setShowTrackingView(true);
  };

  const handleJoinWaitlist = (bus: BusData) => {
    setSelectedBus(bus);
    setShowWaitlistModal(true);
  };

  const handleWakeMeUp = (bus: BusData) => {
    setWakeMeUpBus(bus);
    setShowWakeMeUpModal(true);
  };

  const handleCloseTracking = () => {
    setShowTrackingView(false);
  };

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
          onFromCityChange={setFromCity}
          onToCityChange={setToCity}
          onTravelDateChange={setTravelDate}
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
          onWakeMeUp={handleWakeMeUp}
          onBack={() => setStep(1)}
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

      {showWakeMeUpModal && wakeMeUpBus && (
        <WakeMeUpModal
          open={showWakeMeUpModal}
          onClose={() => setShowWakeMeUpModal(false)}
          busDetails={{
            number: wakeMeUpBus.number,
            destination: wakeMeUpBus.to,
            arrivalTime: wakeMeUpBus.arrival
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
