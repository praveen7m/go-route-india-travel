
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Send, Mic, Bot, User, Map, RefreshCw
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type MessageType = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const Chatbot = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      text: "Hello! I'm your GoRoute assistant. How can I help you with your journey today?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: MessageType = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      let responseText = "";

      // Simple response logic based on keywords
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
        responseText = "Hello! How can I assist you with your travel needs today?";
      } else if (lowerCaseMessage.includes("bus") && lowerCaseMessage.includes("time")) {
        responseText = "I can help you check bus timings. Could you specify which route or bus number you're interested in?";
      } else if (lowerCaseMessage.includes("route")) {
        responseText = "I can help you plan a route. Please let me know your starting point and destination.";
      } else if (lowerCaseMessage.includes("ticket") || lowerCaseMessage.includes("booking")) {
        responseText = "You can book tickets through the Route Bus section of the app. Would you like me to guide you there?";
      } else {
        responseText = "I'm still learning! Could you please rephrase your question, or try asking about bus routes, timings, or ticket bookings?";
      }

      const botMessage: MessageType = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="go-container h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t("chatbot.title")}</h1>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>

      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[75%] ${
                    msg.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      msg.sender === "user"
                        ? "bg-accent text-white"
                        : "bg-muted"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-accent text-white rounded-tr-none"
                        : "bg-muted rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[75%]">
                  <div className="p-2 rounded-full bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border pt-4 mt-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Mic className="h-5 w-5" />
              </Button>
              <div className="relative flex-1">
                <Input
                  placeholder={t("chatbot.placeholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-10"
                />
                <Button
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="icon">
                <Map className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              You can ask questions about routes, timings, or nearest stops
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
