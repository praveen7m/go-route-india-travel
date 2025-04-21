import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { 
  User, Mail, Phone, ShieldAlert, Moon, Sun, Globe, Bell, 
  Info, HeadphonesIcon, LogOut, Settings, AlertTriangle, Heart, Edit
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import GoRouteLogo from "@/components/GoRouteLogo";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
  const [userData, setUserData] = useState({
    name: "Raj Sharma",
    email: "raj.sharma@example.com",
    phone: "+91 98765 43210",
    guardianName: "Priya Sharma",
    guardianRelation: "Wife",
    emergencyContact: "+91 98765 12345"
  });
  
  const [notifications, setNotifications] = useState({
    busArrival: true,
    seatAvailability: true,
    bookingConfirmations: true,
    promotionalUpdates: false
  });
  
  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    toast.success("You have been logged out");
    setShowLogoutDialog(false);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setShowLanguageSelector(false);
    toast.success(`Language changed to ${lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'தமிழ்'}`);
  };
  
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast(`${notifications[key] ? 'Disabled' : 'Enabled'} ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} notifications`);
  };

  // MOCK: Generate unique User ID (in real app, should come from backend/auth)
  const userId = "USR123456";

  // State for profile image
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Profile image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="go-container space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("profile.title")}</h1>
        <div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsEditing(!isEditing)}
            className="text-accent"
          >
            <Edit className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative group mb-2">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileImage || "/lovable-uploads/goroute-logo.png"} alt={userData.name} />
            <AvatarFallback>{userData.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <>
              <label htmlFor="profile-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer">
                Change
                <input id="profile-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </>
          )}
        </div>
        <div className="text-sm text-muted-foreground">User ID: <span className="font-mono">{userId}</span></div>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing && (
                  <Badge variant="outline" className="bg-accent/10 text-accent">
                    Verified
                  </Badge>
                )}
              </div>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("profile.name")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className="pl-9"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t("profile.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="pl-9"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">{t("profile.phone")}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    className="pl-9"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
            
            {isEditing && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)} 
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateProfile}>
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>
                Guardian or family member to contact in case of emergency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guardianName">Guardian Name</Label>
                <Input
                  id="guardianName"
                  value={userData.guardianName}
                  onChange={(e) => setUserData({...userData, guardianName: e.target.value})}
                  readOnly={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guardianRelation">Relationship</Label>
                <Input
                  id="guardianRelation"
                  value={userData.guardianRelation}
                  onChange={(e) => setUserData({...userData, guardianRelation: e.target.value})}
                  readOnly={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="emergencyContact"
                    value={userData.emergencyContact}
                    onChange={(e) => setUserData({...userData, emergencyContact: e.target.value})}
                    className="pl-9"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
            
            {isEditing && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)} 
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateProfile}>
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <Card className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency SOS
              </CardTitle>
              <CardDescription>
                Quick access to emergency services and trusted contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => navigate("/sos")}>
                <ShieldAlert className="mr-2 h-5 w-5" />
                Access SOS Features
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout Confirmation</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to re-login with OTP.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="space-x-2">
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showLanguageSelector} onOpenChange={setShowLanguageSelector}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Language</DialogTitle>
            <DialogDescription>
              Choose your preferred language for the application
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <div 
              className={`flex items-center p-3 rounded-md cursor-pointer ${language === 'en' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
              onClick={() => handleLanguageChange('en')}
            >
              <div className="font-medium">English (Default)</div>
              {language === 'en' && <Check className="ml-auto h-4 w-4" />}
            </div>
            <div 
              className={`flex items-center p-3 rounded-md cursor-pointer ${language === 'hi' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
              onClick={() => handleLanguageChange('hi')}
            >
              <div className="font-medium">हिंदी (Hindi)</div>
              {language === 'hi' && <Check className="ml-auto h-4 w-4" />}
            </div>
            <div 
              className={`flex items-center p-3 rounded-md cursor-pointer ${language === 'ta' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
              onClick={() => handleLanguageChange('ta')}
            >
              <div className="font-medium">தமிழ் (Tamil)</div>
              {language === 'ta' && <Check className="ml-auto h-4 w-4" />}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <FloatingChatButton />
    </div>
  );
};

export default Profile;
