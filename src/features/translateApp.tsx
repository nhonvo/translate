import { useEffect } from 'react';

import { useStore } from '../app/store/store';
import ListFromLanguage from '../app/components/ListFromLanguage';
import ListToLanguage from '../app/components/ListToLanguage';
import InputOutputLanguage from '../app/components/InputLanguage';

function TranslateApp() {
    const { translateStore } = useStore();

    useEffect(() => {
        translateStore.loadHistoryFromLocalStorage();
    }, [translateStore]);

    return (
        <>
            <h1>Google Translate Clone</h1>
            <ListFromLanguage />
            <ListToLanguage />
            <InputOutputLanguage />
        </>
    );
}
export default TranslateApp;