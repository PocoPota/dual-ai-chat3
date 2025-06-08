"use client"

import { useEffect, useRef, useState } from "react";
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
  const historyRef = useRef([]);

  const [isFirstChat1, setIsFirstChat1] = useState(true);
  const [isFirstChat2, setIsFirstChat2] = useState(true);
  const isFirstChat1Ref = useRef(true);
  const isFirstChat2Ref = useRef(true);

  const [isChatting, setIsChatting] = useState(false);
  const isChattingRef = useRef(false);

  useEffect(()=>{
    isChattingRef.current = isChatting;
  }, [isChatting]);

  useEffect(()=>{
    historyRef.current = history;
  }, [history]);

  useEffect(()=>{
    isFirstChat1Ref.current = isFirstChat1;
    isFirstChat2Ref.current = isFirstChat2;
  }, [isFirstChat1, isFirstChat2]);

  const callGeminiAPI1 = async (message) => {
    const res = await fetch('/api/gemini/ai1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey, message, sysP1: `${sysP1} / ${sysPAll}`, isFirstChat1: isFirstChat1Ref.current }),
    });

    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", data);
    if (res.ok) {
      setIsFirstChat1(false);
      isFirstChat1Ref.current = false;
      return data.reply;
    } else {
      console.log('エラーーだよ！！');
      return 'エラーです。ごめんね。';
    }
  };

  const callGeminiAPI2 = async (message) => {
    const res = await fetch('/api/gemini/ai2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey, message, sysP2: `${sysP2} / ${sysPAll}`, isFirstChat2: isFirstChat2Ref.current }),
    });

    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", data);
    if (res.ok) {
      setIsFirstChat2(false);
      isFirstChat2Ref.current = false;
      return data.reply;
    } else {
      console.log('エラーーだよ！！');
      return 'エラーです。ごめんね。';
    }
  };

  const startChat = async() => {
    if (!apiKey) {
      alert("APIキーが設定されていません。");
    }

    setIsChatting(true);
    isChattingRef.current = true;
    let isAI1Turn = true;

    while(isChattingRef.current){
      const currentSender = isAI1Turn ? callGeminiAPI1 : callGeminiAPI2;
      const currentSenderName = isAI1Turn ? 'AI1' : 'AI2';

      const latestMessage = historyRef.current.length > 0
      ? historyRef.current[historyRef.current.length - 1].text
      : "";
      console.log(latestMessage);

      const reply = await currentSender(latestMessage);
      setHistory(prev => [...prev, { role: currentSenderName, text: reply }]);

      isAI1Turn = !isAI1Turn;

      await new Promise(resolve => setTimeout(resolve, 3000)); // 3秒待機
    }
    setIsChatting(false);
    isChattingRef.current = false;
  }

  const stopChat = () =>{
    setIsChatting(false);
    isChattingRef.current = false;
  }

  const reset = async() => {
    stopChat;
    setIsFirstChat1(true);
    setIsFirstChat2(true);
    isFirstChat1Ref.current = true;
    isFirstChat2Ref.current = true;
    setHistory([]);
    historyRef.current = [];
  }

  useEffect(()=>{
    console.log(history);
  }, [history]);

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
          <textarea placeholder="AI1のシステムプロンプト" value={sysP1} onChange={(e)=>setSysP1(e.target.value)}></textarea>
        </div>
        <div>
          <label>AI2のシステムプロンプト(個別情報): </label>
          <textarea placeholder="AI2のシステムプロンプト" value={sysP2} onChange={(e)=>setSysP2(e.target.value)}></textarea>
        </div>
        <div>
          <label>全体のシステムプロンプト(状況情報): </label>
          <textarea placeholder="全体のシステムプロンプト" value={sysPAll} onChange={(e)=>setSysPAll(e.target.value)}></textarea>
        </div>
      </div>
      <div className={styles.control}>
        <button onClick={startChat}>Start</button>
        <button onClick={stopChat}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
      <section className={styles.chatSpace}>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              {entry.role}: {entry.text}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}