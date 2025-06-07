"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function Home() {
  // api key
  const [apiKey, setApiKey] = useState('');

  // システムプロンプト
  const [sysP1, setSysP1] = useState('');
  const [sysP2, setSysP2] = useState('');
  const [sysPAll, setSysPAll] = useState('');

  // 会話履歴HTML
  const [history, setHistory] = useState([]);

  // for dev
  const [message, setMessage] = useState('');

  const callGeminiAPI = async () => {
    const res = await fetch('/api/gemini/ai1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey, message }),
    });

    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", data);
    if (res.ok) {
      return data.reply;
    } else {
      console.log('エラーーだよ！！');
      return 'エラーです。ごめんね。';
    }
  };

  const startChat = () => {
    if (!apiKey) {
      alert("APIキーが設定されていません。");
    }
  }

  useEffect(() => {
    console.log("会話履歴更新:", history);
  }, [history]);

  const sendMessage = async () => {
    // ユーザーのメッセージをhistoryに追加
    setHistory(prev => [...prev, { role: "user", text: message }]);
    // AIに話す
    const aiMessage = await callGeminiAPI();
    // AIのメッセージをhistoryに追加
    setHistory(prev => [...prev, { role: "model", text: aiMessage }]);
  }

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
        <button onClick={startChat}>Start</button>
        <button>Stop</button>
      </div>
      <section className={styles.chatSpace}>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              {entry.role === 'user' ? 'あなた' : 'AI'}: {entry.text}
            </li>
          ))}
        </ul>
      </section>
      <div>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>送信</button>
      </div>
    </main>
  );
}