
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const FloatingChatButton = () => {
  const navigate = useNavigate();

  const handleChatbotClick = () => {
    navigate('/chatbot');
  };

  return (
    <Button
      onClick={handleChatbotClick}
      className="fixed bottom-20 right-4 z-50 rounded-full w-12 h-12 shadow-lg bg-accent hover:bg-accent/90"
      size="icon"
      aria-label="Chat with assistant"
    >
      <MessageSquare className="h-5 w-5" />
    </Button>
  );
};

export default FloatingChatButton;
