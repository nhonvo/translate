import { useEffect, useState } from "react";
import { useStore } from "../store/store";

function ListToLanguage() {
    const { translateStore } = useStore();
    const [toLanguage, setToLanguage] = useState('vi');

    useEffect(() => {
        translateStore.loadHistoryFromLocalStorage();
    }, [translateStore]);
    return (
        <>
            <div className="language-select-container">
                <label htmlFor="toLanguage">To:</label>
                <select
                    id="toLanguage"
                    defaultValue={toLanguage}
                    onChange={e => setToLanguage(e.target.value)}
                >
                    <option value="vi">Vietnamese</option>
                    <option value="en">English</option>
                    {/* Add other language options here */}
                </select>
            </div>
        </>
    );
}
export default ListToLanguage;