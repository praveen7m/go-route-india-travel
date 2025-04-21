
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, ArrowLeft, LogOut } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoutDialog from "./LogoutDialog"; // NEW

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false); // NEW
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

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link to="/profile">
            <Button variant="outline" size="sm">Profile</Button>
          </Link>
          {/* Logout Button */}
          <Button
            variant="outline"
            size="icon"
            aria-label="Logout"
            onClick={() => setLogoutOpen(true)}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

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

      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <LanguageSwitcher />
            <Link to="/profile" onClick={toggleMenu}>
              <Button variant="outline" className="w-full justify-start">Profile</Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                toggleMenu();
              }}
            >
              {theme === "dark" ? (
                <><Sun className="h-5 w-5 mr-2" /> Light Mode</>
              ) : (
                <><Moon className="h-5 w-5 mr-2" /> Dark Mode</>
              )}
            </Button>
            {/* Mobile Logout Button */}
            <Button variant="outline" className="mt-2" onClick={() => {
              setLogoutOpen(true);
              toggleMenu();
            }}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </nav>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      <LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />
    </header>
  );
};

export default Navbar;
