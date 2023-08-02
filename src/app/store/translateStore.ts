import { makeAutoObservable } from 'mobx';
import { TranslateFormValues } from '../models/translate';
import agent from '../api/agent';

export default class TranslateStore {
    translates = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadTranslates = async (creds: TranslateFormValues) => {
        try {
            const result = await agent.Translate.translateText(creds);
            this.translates = result.resultObj;
        } catch (error) {
            console.log(error);
        }
    };
}
