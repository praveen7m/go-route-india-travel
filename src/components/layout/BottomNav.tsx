
import { Link, useLocation } from "react-router-dom";
import { Bus, MapPin, MessageSquare, Phone, Home, Navigation, Radio } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const BottomNav = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    {
      icon: <Home size={20} />,
      label: "Home",
      path: "/",
    },
    {
      icon: <Bus size={20} />,
      label: t("home.routeBus"),
      path: "/route-bus",
    },
    {
      icon: <MapPin size={20} />,
      label: t("home.cityBus"),
      path: "/city-bus",
    },
    {
      icon: <Navigation size={20} />,
      label: "Indoor",
      path: "/indoor-navigation",
    },
    {
      icon: <Radio size={20} />,
      label: "Multi",
      path: "/multi-modal",
    },
    {
      icon: <MessageSquare size={20} />,
      label: t("home.chatbot"),
      path: "/chatbot",
    },
    {
      icon: <Phone size={20} />,
      label: t("home.sos"),
      path: "/sos",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border">
      <div className="h-16 grid grid-cols-7">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center transition-colors ${
              isActive(item.path)
                ? "text-accent"
                : "text-foreground/60 hover:text-foreground/80"
            }`}
          >
            <div className="mb-1">{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
