import { useEffect, useState } from "react";
import { useStore } from "../store/store";

function InputOutputLanguage() {
    const { translateStore } = useStore();
    const [inputText, setInputText] = useState('');
    const [characterLimit] = useState(100);
    const [fromLanguage] = useState('en');
    const [toLanguage] = useState('vi');

    const handleTranslate = () => {
        const creds = {
            Text: inputText,
            From: fromLanguage,
            To: toLanguage,
        };

        translateStore.translateText(creds, fromLanguage, toLanguage);
    };

    useEffect(() => {
        translateStore.loadHistoryFromLocalStorage();
    }, [translateStore]);
    return (
        <>
            <div className="input-container">
                <textarea
                    id="inputText"
                    placeholder="Enter text to translate..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                />
                <div className="input-controls">
                    <div className="character-limit">
                        {inputText.length}/{characterLimit}
                    </div>
                    <div className="translate-button-container">
                        <button onClick={handleTranslate}>Translate</button>
                    </div>
                </div>
            </div>
            <div
                className={`translated-text-container ${translateStore.translates ? 'show' : ''
                    }`}
            >
                {translateStore.translates && (
                    <>
                        <textarea
                            id="outText"
                            placeholder="Translated Text ..."
                            value={translateStore.translates} />
                        <p>{translateStore.translates}</p>
                    </>
                )}
            </div>
        </>
    );
}
export default InputOutputLanguage;