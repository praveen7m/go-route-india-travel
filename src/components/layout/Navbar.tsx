
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="GoRoute" className="h-8" />
        </Link>

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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
