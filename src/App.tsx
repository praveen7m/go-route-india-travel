
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/hooks/useLanguage";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import RouteBook from "@/pages/RouteBook";
import CityBus from "@/pages/CityBus";
import Chatbot from "@/pages/Chatbot";
import SOS from "@/pages/SOS";
import IndoorNavigation from "@/pages/IndoorNavigation";
import MultiModalJourney from "@/pages/MultiModalJourney";
import MultiModalResults from "@/pages/MultiModalResults";
import NotFound from "@/pages/NotFound";
import SavedRoutes from "@/pages/SavedRoutes";
import RouteOverview from "@/pages/RouteOverview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <LanguageProvider>
        <TooltipProvider>
          <ShadcnToaster />
          <SonnerToaster />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="route-bus" element={<RouteBook />} />
                <Route path="city-bus" element={<CityBus />} />
                <Route path="indoor-navigation" element={<IndoorNavigation />} />
                <Route path="multi-modal" element={<MultiModalJourney />} />
                <Route path="multi-modal-results" element={<MultiModalResults />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route path="sos" element={<SOS />} />
                <Route path="saved-routes" element={<SavedRoutes />} />
                <Route path="route-overview" element={<RouteOverview />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
