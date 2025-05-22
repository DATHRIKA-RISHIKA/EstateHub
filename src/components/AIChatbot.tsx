
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Maximize, Minimize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const mockResponses = [
  {
    triggers: ["hi", "hello", "hey", "greetings"],
    responses: [
      "Hello! I'm your AI rental assistant. How can I help you find your ideal home today?",
      "Hi there! Looking for a new place to live? I'm here to help you find the perfect rental.",
      "Hello! I'm SmartRent AI. I can help you search for properties, answer questions, or guide you through our platform."
    ]
  },
  {
    triggers: ["apartment", "flat", "condo"],
    responses: [
      "I can help you find apartments! What area are you interested in? And do you have a budget in mind?",
      "Apartments are our specialty! What features are you looking for? Number of bedrooms? Preferred location?"
    ]
  },
  {
    triggers: ["budget", "price", "afford", "cost"],
    responses: [
      "Our platform offers rentals at various price points. What's your monthly budget range?",
      "I can filter properties by your budget. What price range are you comfortable with?"
    ]
  },
  {
    triggers: ["location", "area", "neighborhood", "where"],
    responses: [
      "Location is key! We have properties in many neighborhoods. Any specific area you're interested in?",
      "We can search by location. Which area or neighborhood would you prefer to live in?"
    ]
  },
  {
    triggers: ["bedroom", "bhk", "bed"],
    responses: [
      "How many bedrooms are you looking for in your new home?",
      "I can filter by bedroom count. What size property do you need?"
    ]
  },
  {
    triggers: ["thanks", "thank you", "thx"],
    responses: [
      "You're welcome! Let me know if you need anything else.",
      "Happy to help! Is there anything else you'd like to know about our rental properties?"
    ]
  }
];

// This function simulates AI processing to find responses
const getAIResponse = (message: string): Promise<string> => {
  const lowercaseMsg = message.toLowerCase();
  
  // Check against our mock responses
  for (const item of mockResponses) {
    if (item.triggers.some(trigger => lowercaseMsg.includes(trigger))) {
      const randomIndex = Math.floor(Math.random() * item.responses.length);
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(item.responses[randomIndex]);
        }, 1000); // Simulate processing time
      });
    }
  }
  
  // Default responses if no triggers matched
  const defaultResponses = [
    "I'm sorry, I'm not sure I understand. Could you rephrase your question about rental properties?",
    "I'd love to help with that. Could you provide more details about what you're looking for in a rental?",
    "I'm still learning about specific properties. Would you like me to help you use our search filters instead?",
    "Interesting question! Let me suggest checking our properties page with filters that might help you find what you need."
  ];
  
  const randomIndex = Math.floor(Math.random() * defaultResponses.length);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(defaultResponses[randomIndex]);
    }, 1200);
  });
};

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi, I'm your AI rental assistant! How can I help you find your perfect home today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleToggleOpen = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      toast({
        title: "AI Assistant Activated",
        description: "Ask me anything about finding your ideal rental property!",
        duration: 3000
      });
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    try {
      // Get AI response (simulated)
      const response = await getAIResponse(userMessage.text);
      
      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble processing your request right now. Please try again later.",
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={handleToggleOpen}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all z-50"
        aria-label="Open AI assistant"
      >
        <Bot className="h-6 w-6" />
      </button>
      
      {/* Chatbot interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed ${
              isExpanded ? "top-4 right-4 left-4 bottom-4" : "bottom-20 right-6"
            } bg-white rounded-lg shadow-xl border border-border z-50 flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
            style={{ 
              width: isExpanded ? "auto" : "350px",
              height: isExpanded ? "auto" : "500px" 
            }}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between bg-primary text-white p-3">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <h3 className="font-medium">SmartRent AI Assistant</h3>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleToggleExpand}
                  className="p-1 hover:bg-primary-foreground/20 rounded"
                >
                  {isExpanded ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </button>
                <button
                  onClick={handleToggleOpen}
                  className="p-1 hover:bg-primary-foreground/20 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto p-4 bg-secondary/30">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-white border border-border"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg" alt="AI" />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">AI</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">Smart Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <div className="mt-1 text-right">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-border rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" alt="AI" />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">AI</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">Smart Assistant</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input area */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about properties, neighborhoods, etc."
                  value={inputValue}
                  onChange={handleInputChange}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-muted-foreground">Powered by SmartRent AI</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
