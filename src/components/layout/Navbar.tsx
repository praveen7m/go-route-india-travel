
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, ArrowLeft, Settings } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoutDialog from "./LogoutDialog";
import SettingsMenu from "./SettingsMenu";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Show back button on all pages except Home '/'
  const shouldShowBack = location.pathname !== "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {shouldShowBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/goroute-logo.png" 
              alt="GoRoute Logo" 
              className="h-10 w-auto" 
            />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Settings"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link to="/profile" onClick={toggleMenu}>
              <Button variant="outline" className="w-full justify-start">Profile</Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setSettingsOpen(true);
                toggleMenu();
              }}
            >
              <Settings className="h-5 w-5 mr-2" /> Settings
            </Button>
          </nav>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      <LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />
      
      {/* Settings Menu */}
      <SettingsMenu open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  );
};

export default Navbar;
