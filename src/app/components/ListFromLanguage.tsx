import { useEffect, useState } from "react";
import { useStore } from "../store/store";

const languageOptions = [
    { code: 'auto', name: 'Auto Detect' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'en', name: 'English' },
    // Add more languages here
];

function ListFromLanguage() {
    const { translateStore } = useStore();
    const [fromLanguage, setFromLanguage] = useState('auto');

    useEffect(() => {
        translateStore.loadHistoryFromLocalStorage();
    }, [translateStore]);

    return (
        <>
            <div className="language-select-container">
                <div className="language-select">
                    <label htmlFor="fromLanguage">From:</label>
                    <select
                        id="fromLanguage"
                        defaultValue={fromLanguage}
                        onChange={e => setFromLanguage(e.target.value)}
                    >
                        {languageOptions.map(option => (
                            <option key={option.code} value={option.code}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

        </>
    );
}
export default ListFromLanguage;