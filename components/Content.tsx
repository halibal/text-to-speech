"use client";

import { useEffect, useState } from "react";
import { HiMiniPlay, HiMiniPause } from "react-icons/hi2";
import { BsChevronDown } from "react-icons/bs";
import { useSpeech } from "@/hooks/useSpeech";

const Content = () => {
    const {
        voices,
        play,
        isPlaying,
        pause,
        resume,
        currentWordIndex,
        setCurrentWordIndex,
        isPaused,
    } = useSpeech();
    const [text, setText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState(voices[0]);
    const [startIndex, setStartIndex] = useState(0);

    const handlePlay = () => {
        if (isPlaying) {
            pause();
        } else if (isPaused) {
            resume();
        } else {
            play(text, selectedVoice, startIndex);
            setStartIndex(0);
        }
    };

    // handling the change of the voice selection dropdown menu by finding the voice that matches the name of the selected option
    const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // find the voice that matches the name of the selected option
        // set the selected voice to the new voice if it exists
        const newVoice =
            voices.find((voice) => voice.name === e.target.value) || null;
        if (newVoice) setSelectedVoice(newVoice);
    };

    useEffect(() => {
        // get the browser language by taking only the first part of the language code in the format of "en-US"
        // find the voice that matches the browser language
        // in the case of no matching voice, find the first voice that starts with "en"
        // set the selected voice to the matching voice, or the default voice, or the first voice in the list
        const browserLanguage = navigator.language.split("-")[0];
        const matchingVoice = voices.find((voice) =>
            voice.lang.startsWith(browserLanguage)
        );
        const defaultLanguage = voices.find((voice) =>
            voice.lang.startsWith("en")
        );
        setSelectedVoice(matchingVoice || defaultLanguage || voices[0]);
    }, [voices]);

    const words = text.split(" ");

    // split text into sentences
    // const sentences = text.split(/[.!?]/);

    useEffect(() => {
        // if the text changes while the speech is playing, play the new text
        if (isPlaying) {
            play(text, selectedVoice, currentWordIndex);
        }
    }, [text]);

    return (
        <div className="w-full">
            {text && (
                <div className="mb-5 px-8 text-justify text-xl text-textColor ">
                    {words.map((word, index) => (
                        <span
                            key={index}
                            className={
                                index === currentWordIndex
                                    ? "text-tertiary"
                                    : ""
                            }>
                            {word}{" "}
                        </span>
                    ))}
                </div>
            )}
            <textarea
                className="h-72 w-full resize-none rounded-xl border-0 bg-inputBg p-8 font-mono text-xl leading-8 text-textColor outline-none placeholder:text-textColor"
                placeholder="Write anything.."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-5 flex h-12 gap-10">
                <div className="relative h-full flex-1">
                    <select
                        value={selectedVoice?.name || ""}
                        onChange={handleVoiceChange}
                        className="h-full w-full cursor-pointer appearance-none rounded-full border-none bg-inputBg px-10 text-textColor outline-none">
                        {voices.map((voice) => (
                            <option key={voice.name}>{voice.name}</option>
                        ))}
                    </select>
                    <BsChevronDown className="pointer-events-none absolute right-4 top-4 text-xl text-textColor" />
                </div>
                <button
                    onClick={handlePlay}
                    className="flex items-center justify-center gap-3 rounded-full bg-tertiary px-5 text-xl text-textColor hover:opacity-90">
                    {isPlaying ? <HiMiniPause /> : <HiMiniPlay />}
                    Listen
                </button>
            </div>
        </div>
    );
};

export default Content;
