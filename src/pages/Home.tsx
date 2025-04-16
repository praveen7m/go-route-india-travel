
import { Link } from "react-router-dom";
import { Bus, MapPin, MessageSquare, Phone, Star, Calendar, User, Navigation, Radio } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const { t } = useLanguage();

  const mainFeatures = [
    {
      icon: <Bus size={24} className="text-goroute-blue" />,
      title: t("home.routeBus"),
      description: "Book tickets for long-distance travel",
      link: "/route-bus",
      color: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: <MapPin size={24} className="text-goroute-green" />,
      title: t("home.cityBus"),
      description: "Track city buses in real-time",
      link: "/city-bus",
      color: "bg-green-50 dark:bg-green-950/30",
    },
    {
      icon: <Navigation size={24} className="text-accent" />,
      title: "Indoor Navigation",
      description: "Navigate inside bus & metro stations",
      link: "/indoor-navigation",
      color: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      icon: <Radio size={24} className="text-goroute-orange" />,
      title: "Multi-Modal Journey",
      description: "Plan trips using multiple transports",
      link: "/multi-modal",
      color: "bg-yellow-50 dark:bg-yellow-950/30",
    },
    {
      icon: <MessageSquare size={24} className="text-goroute-orange" />,
      title: t("home.chatbot"),
      description: "Get instant assistance",
      link: "/chatbot",
      color: "bg-orange-50 dark:bg-orange-950/30",
    },
    {
      icon: <Phone size={24} className="text-goroute-red" />,
      title: t("home.sos"),
      description: "Emergency contact & support",
      link: "/sos",
      color: "bg-red-50 dark:bg-red-950/30",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "The bus tracking is so accurate! Makes my daily commute stress-free.",
      city: "Mumbai",
    },
    {
      id: 2,
      name: "Rahul Verma",
      rating: 4,
      comment: "Love the multi-language support. Finally an app that works in Hindi too!",
      city: "Delhi",
    },
    {
      id: 3,
      name: "Lakshmi Narayanan",
      rating: 5,
      comment: "The SOS feature helped me during a late night journey. Highly recommended!",
      city: "Chennai",
    },
  ];

  return (
    <div className="go-container space-y-8 pb-10">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-center md:text-left">
          Welcome to <span className="text-accent">Go</span>
          <span className="text-goroute-orange">Route</span>
        </h1>
        <p className="text-center md:text-left text-muted-foreground">
          Your one-stop solution for public transport in India
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mainFeatures.map((feature) => (
          <Link to={feature.link} key={feature.title}>
            <Card className={`transition-all duration-200 hover:shadow-md overflow-hidden border border-border ${feature.color}`}>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-full bg-background/80 backdrop-blur">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-goroute-orange" />
            {t("home.savedRoutes")}
          </h2>
          <Button variant="link" size="sm">View All</Button>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-max">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="w-72 go-card-hover bg-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="go-badge go-badge-blue">Daily Route</div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Star className="h-4 w-4 fill-goroute-orange text-goroute-orange" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Koramangala</span>
                      <span className="text-sm">→</span>
                      <span className="text-sm font-medium">Electronic City</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Bus: 500C</span>
                      <span>~35 mins</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            {t("home.bookingHistory")}
          </h2>
          <Button variant="link" size="sm">View All</Button>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-max">
            {[1, 2].map((i) => (
              <Card key={i} className="w-72 go-card-hover">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="go-badge go-badge-green">Completed</div>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Bangalore</span>
                      <span className="text-sm">→</span>
                      <span className="text-sm font-medium">Mysore</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>KSRTC Volvo</span>
                      <span>Seat: A4</span>
                      <span>₹450</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <User className="h-5 w-5 text-goroute-orange" />
          {t("home.testimonials")}
        </h2>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-max">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="w-72 go-card-hover">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-goroute-orange text-goroute-orange" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
