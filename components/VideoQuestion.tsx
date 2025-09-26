"use client";

import { useState } from "react";
import { lessonItems } from "@/lib/lessonData";

export default function VideoQuestion() {
  const item = lessonItems[0]; // just one for now
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<"idle" | "correct" | "wrong">("idle");

  const correctId = item.choices.find(c => c.correct)?.id;

  const checkAnswer = () => {
    if (!selected) return;
    setResult(selected === correctId ? "correct" : "wrong");
  };

  return (
    <div className="space-y-6">
      {/* Video */}
      <div className="rounded-2xl overflow-hidden border">
        <video src={item.videoSrc} controls className="w-full h-auto" />
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold">{item.question}</h2>
      <div className="flex flex-col gap-2">
        {item.choices.map(choice => (
          <button
            key={choice.id}
            onClick={() => { setSelected(choice.id); setResult("idle"); }}
            className={[
              "px-4 py-2 rounded-xl border text-left",
              selected === choice.id ? "border-black" : "border-gray-300",
              result === "correct" && choice.id === correctId ? "bg-green-200" : "",
              result === "wrong" && selected === choice.id ? "bg-red-200" : "",
            ].join(" ")}
          >
            {choice.label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div>
        <button
          onClick={checkAnswer}
          disabled={!selected || result !== "idle"}
          className="px-4 py-2 rounded-xl border"
        >
          Check
        </button>
      </div>

      {/* Feedback */}
      {result === "correct" && <p className="text-green-700">Correct! ✔</p>}
      {result === "wrong" && <p className="text-red-700">Try again ❌</p>}
    </div>
  );
}