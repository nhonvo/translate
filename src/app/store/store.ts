import { createContext, useContext } from "react"
import TranslateStore from "./translateStore"

interface Store {
    translateStore: TranslateStore,

}
export const store: Store = {
    translateStore: new TranslateStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}