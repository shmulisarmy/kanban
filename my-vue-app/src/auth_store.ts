import { reactive, ref } from 'vue'


export type AuthDetails = {
    user: {
        id: string;
        name: string;
    } | null
}

export const authStore = reactive<AuthDetails>({ 
    user: null
 })