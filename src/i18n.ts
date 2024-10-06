// src/i18n.ts
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

// Configuración de i18n
i18n
  .use(HttpApi) // Permite cargar las traducciones desde un backend o archivos
  .use(LanguageDetector) // Detecta el idioma preferido del usuario (navegador, cookies, etc.)
  .use(initReactI18next) // Inicializa react-i18next con la configuración de i18n
  .init({
    debug: true, // Habilita los mensajes de debug en la consola (útil para desarrollo)
    fallbackLng: 'es', // Idioma por defecto si no se encuentra traducción
    supportedLngs: ['es', 'en'], // Idiomas soportados en la aplicación
    preload: ['es'], // Carga de antemano los idiomas inglés y español
    ns: ['common', 'forms', 'task', 'schedules', 'user', 'navigation', 'validation', 'dialog'],// Define los namespaces que vas a usar
    defaultNS: 'common', // Namespace por defecto si no se especifica
    interpolation: {
      escapeValue: false, // React ya hace escaping de las variables para prevenir XSS
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Ruta para cargar los archivos de traducción
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'], // Orden de detección de idioma
      caches: ['cookie'], // Dónde almacenar la información del idioma detectado
    },
    react: {
      useSuspense: false, // Deshabilita el uso de React.Suspense para la carga de traducciones
    },
  });

export default i18n;

