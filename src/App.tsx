import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Define the interface for each translation history item
interface TranslationItem {
  from: string;
  originalText: string;
  translatedText: string;
}

function App() {
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('vi');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translationHistory, setTranslationHistory] = useState<TranslationItem[]>([]);

  const handleTranslate = () => {
    const apiUrl = 'http://localhost:5025/translate';

    axios
      .post(apiUrl, {
        text: inputText,
        from: fromLanguage,
        to: toLanguage,
      })
      .then(response => {
        const translatedText = response.data;
        setTranslatedText(translatedText);

        // Save the translation to history
        const newHistory = [
          ...translationHistory,
          {
            from: fromLanguage,
            originalText: inputText,
            translatedText: translatedText,
          },
        ];
        setTranslationHistory(newHistory);
        // Save history to local storage
        localStorage.setItem('translationHistory', JSON.stringify(newHistory));
      })
      .catch(error => {
        console.error('Error translating text:', error);
      });
  };

  const handleDeleteItem = (index: number) => {
    const newHistory = [...translationHistory];
    newHistory.splice(index, 1);
    setTranslationHistory(newHistory);
    // Save updated history to local storage
    localStorage.setItem('translationHistory', JSON.stringify(newHistory));
  };

  const handleDeleteAll = () => {
    setTranslationHistory([]);
    // Save empty history to local storage
    localStorage.removeItem('translationHistory');
  };

  // Load history from local storage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem('translationHistory');
    if (storedHistory) {
      setTranslationHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
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
              <option value="fr">French</option>
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
            <option value="es">Spanish</option>
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
          className={`translated-text-container ${translatedText ? 'show' : ''
            }`}
        >
          {translatedText && (
            <>
              <h3>Translated Text:</h3>
              <p>{translatedText}</p>
            </>
          )}
        </div>
        <div className="translation-history">
          <h2>Translation History</h2>
          {translationHistory.length > 0 ? (
            <>
              <button onClick={handleDeleteAll} className="delete-all-btn">
                Delete All History
              </button>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>Original Text</th>
                    <th>Translated Text</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {translationHistory.map((item, index) => (
                    <tr key={index}>
                      <td>{item.from}</td>
                      <td>{item.originalText}</td>
                      <td>{item.translatedText}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteItem(index)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No translation history available.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
