const isTauri = '__TAURI__' in window;
export default isTauri; // running on a desktop app or a mobile app - but not in the browser
export const isWeb = !isTauri; // running on the browser on either desktop or mobile - but not as a tauri app

export const isMobile = navigator.maxTouchPoints > 0; // running in mobile either in the browser or as a tauri app
export const isDesktop = !isMobile; // running in desktop either in the browser or as a tauri app

export const isTauriMobile = isTauri && isMobile; // running on mobile as a tauri app - but not on the browser
export const isTauriDesktop = isTauri && isDesktop; // running on desktop as a tauri app - but not on the browser

export const isWebMobile = isWeb && isMobile; // running on mobile in the browser - but not as a tauri app
export const isWebDesktop = isWeb && isDesktop; // running on desktop in the browser - but not as a tauri app