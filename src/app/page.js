"use client"

import { useState } from "react";

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [responseText, setResponseText] = useState('');

  const callGeminiAPI = async () => {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });

    const data = await res.json();
    if (res.ok) {
      setResponseText(data.text);
    } else {
      setResponseText(`Error: ${data.error}`);
    }
  };

  return (
    <main>
      <h1>Hello World!</h1>
      <div>
        <input type="password" placeholder="Enter your Gemini API Key..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </div>
      <div>
        <button onClick={callGeminiAPI}>Start</button>
      </div>
      <div>
        <p>{responseText}</p>
      </div>
    </main>
  );
}