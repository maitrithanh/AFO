import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import dataLangVN from "@/data/languages/dataLangVN.json"
import dataLangEN from "@/data/languages/dataLangEN.json"

i18n.use(initReactI18next).init({
    resources: {
        VN: {
            translation: dataLangVN
        },
        EN: {
            translation: dataLangEN
        }
    },
    fallbackLng: "VN",
    interpolation: {
        escapeValue: false
    }
})

export default i18n;
