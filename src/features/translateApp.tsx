import React, { useState, useEffect } from 'react';

import { useStore } from '../app/store/store';

function TranslateApp() {
    const { translateStore } = useStore();
    const [fromLanguage, setFromLanguage] = useState('en');
    const [toLanguage, setToLanguage] = useState('vi');
    const [inputText, setInputText] = useState('');

    const handleTranslate = () => {
        const creds = {
            Text: inputText,
            From: fromLanguage,
            To: toLanguage,
        };

        translateStore.translateText(creds);
    };

    const handleDeleteItem = (index: number) => {
        translateStore.deleteItemFromHistory(index);
    };

    const handleDeleteAll = () => {
        translateStore.deleteAllHistory();
    };

    useEffect(() => {
        translateStore.loadHistoryFromLocalStorage();
    }, [translateStore]);

    return (
        <>
            <h1>Google Translate Clone</h1>
            <div className="language-select-container">
                <div className="language-select">
                    <label htmlFor="fromLanguage">From:</label>
                    <select
                        id="fromLanguage"
                        defaultValue={fromLanguage}
                        onChange={e => setFromLanguage(e.target.value)}
                    >
                        <option value="en">English</option>
                        <option value="vi">French</option>
                        {/* Add other language options here */}
                    </select>
                </div>
                <div className="translate-button-container">
                    <button onClick={handleTranslate}>Translate</button>
                </div>
            </div>
            <div className="language-select-container">
                <label htmlFor="toLanguage">To:</label>
                <select
                    id="toLanguage"
                    defaultValue={toLanguage}
                    onChange={e => setToLanguage(e.target.value)}
                >
                    <option value="vi">Vietnamese</option>
                    <option value="en">Spanish</option>
                    {/* Add other language options here */}
                </select>
            </div>
            <div className="input-container">
                <textarea
                    id="inputText"
                    placeholder="Enter text to translate..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                />
            </div>
            <div
                className={`translated-text-container ${translateStore.translates ? 'show' : ''
                    }`}
            >
                {translateStore.translates && (
                    <>
                        <h3>Translated Text:</h3>
                        <p>{translateStore.translates}</p>
                    </>
                )}
            </div>
        </>
    );
}
export default TranslateApp;