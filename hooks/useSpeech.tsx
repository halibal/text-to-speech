import { useEffect, useState } from "react";

export const useSpeech = () => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const play = (
        text: string,
        voice: SpeechSynthesisVoice,
        startIndex: number = 0
    ) => {
        stop(); // stop any current speech
        // create a new utterance

        // get the text to be spoken by removing the words before the startIndex
        const textToSpeech = text.split(" ").slice(startIndex).join(" ");
        const utterance = new SpeechSynthesisUtterance(textToSpeech);
        // set the voice
        utterance.voice = voice;
        // set the event handlers for when the speech starts and ends
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => {
            setIsPlaying(false);
            setCurrentWordIndex(0);
        };

        // set the event handler for when the speech is paused
        utterance.onpause = () => {
            setIsPlaying(false);
            setIsPaused(true);
        };
        // set the event handler for when the speech is resumed
        utterance.onresume = () => {
            setIsPlaying(true);
            setIsPaused(false);
        };
        // set the event handler for when the speech is interrupted
        utterance.onboundary = (event) => {
            if (event.name === "word") {
                // Get the text up to the boundary
                const textUpToBoundary = text.slice(0, event.charIndex);
                // Split the text into words and get the length of the resulting array
                const wordIndex =
                    textUpToBoundary.split(/\s+/).length - 1 + startIndex;
                setCurrentWordIndex(wordIndex);
            }
        };

        setSpeech(utterance);
        // play the speech
        window.speechSynthesis.speak(utterance);
    };

    // pause, resume, and stop are all functions that call the corresponding functions in the speechSynthesis API
    const pause = () => {
        window.speechSynthesis.pause();
    };

    const resume = () => {
        window.speechSynthesis.resume();
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setSpeech(null);
    };

    // updateVoices is a function that updates the voices state with the voices from the speechSynthesis API
    const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
    };

    // before window is loaded, window.speechSynthesis is undefined, so we need to wait for it to be defined, then we can set the voices
    useEffect(() => {
        updateVoices();
        window.speechSynthesis.addEventListener("voiceschanged", updateVoices);

        return () => {
            window.speechSynthesis.removeEventListener(
                "voiceschanged",
                updateVoices
            );
        };
    }, []);

    return {
        currentWordIndex,
        isPlaying,
        isPaused,
        pause,
        play,
        resume,
        setCurrentWordIndex,
        speech,
        stop,
        voices,
    };
};
