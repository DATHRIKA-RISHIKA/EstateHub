
import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, StopCircle, Waveform } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Add type declarations for the Web Speech API
interface Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

interface VoiceSearchProps {
  onSearchResult: (text: string) => void;
  className?: string;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onSearchResult, className }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    // Initialize the recognition object
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const transcriptValue = result[0].transcript;
      setTranscript(transcriptValue);
      setConfidence(result[0].confidence * 100);
    };

    recognitionRef.current.onend = () => {
      if (transcript && isListening) {
        // Only submit if we actually got some text and the user didn't manually stop
        onSearchResult(transcript);
      }
      setIsListening(false);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      toast({
        title: "Voice recognition error",
        description: `Error: ${event.error}. Please try again.`,
        variant: "destructive"
      });
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [transcript, isListening, onSearchResult, toast]);

  const toggleListening = async () => {
    if (!isSupported) {
      toast({
        title: "Not supported",
        description: "Voice search is not supported in your browser.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        setTranscript("");
        setConfidence(0);
        recognitionRef.current.start();
        setIsListening(true);
        
        toast({
          title: "Listening...",
          description: "Say what you're looking for",
        });
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={toggleListening}
        className={cn(
          "flex items-center justify-center rounded-full w-10 h-10 transition-all duration-300",
          isListening 
            ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-500/30 scale-110" 
            : "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-md shadow-primary/20"
        )}
        disabled={!isSupported}
        title={isSupported ? "Voice search" : "Voice search not supported in this browser"}
      >
        {isListening ? (
          <span className="relative">
            <StopCircle className="h-5 w-5 relative z-10" />
            <span className="absolute inset-0 -m-2 rounded-full bg-red-400/30 animate-ping"></span>
          </span>
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </button>
      
      {isListening && (
        <div className="absolute top-12 right-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-2xl shadow-xl p-4 z-10 w-72 backdrop-blur-sm border border-slate-100 dark:border-slate-800 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">Listening...</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className="w-1 h-5 rounded-full bg-gradient-to-b from-red-500 to-pink-500" 
                  style={{ 
                    animation: `${Math.random() * 0.7 + 0.5}s ease-in-out ${i * 0.1}s infinite alternate bounce`,
                    height: `${Math.random() * 15 + 5}px` 
                  }}
                ></span>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 mb-3 min-h-[60px] text-sm text-slate-700 dark:text-slate-300 shadow-inner border border-slate-100 dark:border-slate-800">
            {transcript || <span className="text-slate-400 dark:text-slate-500">Say something like 'Show me 2 bedroom apartments in Bangalore'</span>}
          </div>
          
          {confidence > 0 && (
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mb-1">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full transition-all duration-300" 
                style={{ width: `${confidence}%` }}
              ></div>
              <p className="text-xs text-right text-slate-500 dark:text-slate-400">Confidence: {Math.round(confidence)}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;
