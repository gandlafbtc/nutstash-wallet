import type { Toast } from 'src/model/toast'
import { writable } from 'svelte/store'



export const notifications = writable<Toast[]>([])

export function toast(level: string, message: string, messageTitle: string) {
    notifications.update((state) => [{ level,message,messageTitle }, ...state])
    setTimeout(removeToast, 4000)
}

function removeToast() {
    notifications.update((state) => {
        return [...state.slice(0, state.length - 1)]
    })
}