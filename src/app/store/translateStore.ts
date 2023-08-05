import { makeAutoObservable } from 'mobx';
import { TranslateFormValues } from '../models/translate';
import agent from '../api/agent';

interface TranslationItem {
    from?: string;
    originalText: string;
    translatedText: string[];
}

export default class TranslateStore {
    translates: string[] = [];
    translationHistory: TranslationItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    translateText = async (creds: TranslateFormValues, from?: string, to?: string) => {
        try {
            const result = await agent.Translate.translateText(creds, from, to);
            this.translates = result;
            
            this.addToHistory({
                from: creds.From,
                originalText: creds.Text,
                translatedText: this.translates,
            });
        } catch (error) {
            console.error('Error translating text:', error);
        }
    };

    setTranslatedText = (text: string[]) => {
        this.translates = text;
    };

    addToHistory = (translationItem: TranslationItem) => {
        this.translationHistory.push(translationItem);
        this.saveHistoryToLocalStorage();
    };

    deleteItemFromHistory = (index: number) => {
        this.translationHistory.splice(index, 1);
        this.saveHistoryToLocalStorage();
    };

    deleteAllHistory = () => {
        this.translationHistory = [];
        this.saveHistoryToLocalStorage();
    };

    loadHistoryFromLocalStorage = () => {
        const storedHistory = localStorage.getItem('translationHistory');
        if (storedHistory) {
            this.translationHistory = JSON.parse(storedHistory);
        }
    };

    saveHistoryToLocalStorage = () => {
        localStorage.setItem(
            'translationHistory',
            JSON.stringify(this.translationHistory)
        );
    };
}
