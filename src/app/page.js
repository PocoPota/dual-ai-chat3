"use client"

import { useState } from "react";
import styles from "./page.module.scss";

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
      <div className={styles.apiKey}>
        <label>Gemini APIキー: </label>
        <input type="password" placeholder="Gemini API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </div>
      <div className={styles.sysP}>
        <div>
          <label>AI1のシステムプロンプト(個別情報): </label>
          <textarea placeholder="AI1のシステムプロンプト"></textarea>
        </div>
        <div>
          <label>AI2のシステムプロンプト(個別情報): </label>
          <textarea placeholder="AI2のシステムプロンプト"></textarea>
        </div>
        <div>
          <label>全体のシステムプロンプト(状況情報): </label>
          <textarea placeholder="全体のシステムプロンプト"></textarea>
        </div>
      </div>
      <div className={styles.control}>
        <button onClick={callGeminiAPI}>Start</button>
        <button>Stop</button>
        <button>Memory Reset</button>
      </div>
      <section className={styles.chatSpace}>
        <p>{responseText}</p>
      </section>
    </main>
  );
}