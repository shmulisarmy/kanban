import { reactive, ref } from 'vue'


export type AuthDetails = {
    redirectAfterLogin: string | null;
    user: {
        id: string;
        name: string;
    } | null
}

export const authStore = reactive<AuthDetails>({ 
    redirectAfterLogin: null,
    user: null
 })

