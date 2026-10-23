import { useState, useEffect, useRef } from 'react';

export const SUPPORTED_VOICE_LANGS = [
  { code: 'en-IN', name: 'English (India)' },
  { code: 'hi-IN', name: 'हिन्दी (Hindi)' },
  { code: 'ta-IN', name: 'தமிழ் (Tamil)' },
  { code: 'bn-IN', name: 'বাংলা (Bengali)' },
  { code: 'mr-IN', name: 'मराठी (Marathi)' },
];

export function useVoice({ onResult, lang = 'hi-IN' } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        if (onResult && event.results[0].isFinal) {
          onResult(currentTranscript);
        }
      };

      recognition.onerror = (event) => {
        setError(event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [lang, onResult]);

  const startListening = () => {
    if (!isSupported) {
      // Graceful fallback simulation
      setIsListening(true);
      setTimeout(() => {
        const demoPhrase = 'Maroon velvet bridal lehenga with heavy zardozi and sweetheart neck';
        setTranscript(demoPhrase);
        if (onResult) onResult(demoPhrase);
        setIsListening(false);
      }, 2500);
      return;
    }

    try {
      recognitionRef.current?.start();
    } catch {
      recognitionRef.current?.stop();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening
  };
}
