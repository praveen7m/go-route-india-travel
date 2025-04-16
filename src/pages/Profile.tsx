
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  LogOut,
  Moon,
  Sun,
  User,
  Mail,
  Phone,
  Users,
  Settings,
  Shield,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  // Mock user data
  const user = {
    id: "GO98765432",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 98765 43210",
    guardian: {
      name: "Rajesh Kumar",
      relation: "Father",
      phone: "+91 87654 32109",
    },
  };

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(newTheme === "dark");
    toast({
      title: `${newTheme === "dark" ? "Dark" : "Light"} mode activated`,
      description: `App theme has been changed to ${newTheme} mode.`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out from your account.",
    });
    navigate("/login");
  };

  return (
    <div className="go-container space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("profile.title")}</h1>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      <div className="go-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="bg-accent/10 text-accent p-4 rounded-full">
            <User className="h-12 w-12" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{t("profile.id")}: {user.id}</p>
          </div>
          <Button variant="outline" size={isMobile ? "sm" : "default"}>
            Edit Profile
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-2">Contact Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t("profile.email")}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t("profile.phone")}</p>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-2">{t("profile.guardian")}</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Name & Relation</p>
                <p className="text-sm text-muted-foreground">
                  {user.guardian.name} ({user.guardian.relation})
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Emergency Phone</p>
                <p className="text-sm text-muted-foreground">{user.guardian.phone}</p>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Update Emergency Contact
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t("profile.theme")}</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isDarkMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <Label htmlFor="dark-mode">
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Label>
            </div>
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={handleThemeChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button variant="outline" className="w-full" size="lg">
          <Settings className="mr-2 h-5 w-5" />
          App Settings
        </Button>
        
        <Button variant="destructive" className="w-full" onClick={handleLogout} size="lg">
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
