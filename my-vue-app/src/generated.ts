import { API_BASE_URL } from './settings';


export async function me() : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:74
    const res = await fetch(`${API_BASE_URL}/me`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function sign_up(name: string, password: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:80
    const res = await fetch(`${API_BASE_URL}/sign_up/${name}/${password}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function sign_in(name: string, password: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:89
    const res = await fetch(`${API_BASE_URL}/sign_in/${name}/${password}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function get_board_title(board_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:102
    const res = await fetch(`${API_BASE_URL}/get_board_title/${board_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function get_user_avatar(user_id: number) : Promise<any> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:106
    const res = await fetch(`${API_BASE_URL}/get_user_avatar/${user_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function sign_out() : Promise<any> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:111
    const res = await fetch(`${API_BASE_URL}/sign_out`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function change_task_list(task_id: number, old_list_id: number, new_list_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:125
    const res = await fetch(`${API_BASE_URL}/change_task_list/${task_id}/${old_list_id}/${new_list_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function remove_list(board_id: number, list_id: number, auth: object) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:140
    const res = await fetch(`${API_BASE_URL}/remove_list/${board_id}/${list_id}/${auth}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function change_list_title(list_id: number, title: string, auth: object) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:147
    const res = await fetch(`${API_BASE_URL}/change_list_title/${list_id}/${title}/${auth}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function change_task_title(task_id: number, title: string, auth: object) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:156
    const res = await fetch(`${API_BASE_URL}/change_task_title/${task_id}/${title}/${auth}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function get_tasks(auth: object) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:197
    const res = await fetch(`${API_BASE_URL}/get_tasks/${auth}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function get_user_boards(user_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:203
    const res = await fetch(`${API_BASE_URL}/get_user_boards/${user_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function delete_task(list_id: number, task_id: number, auth: object) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:208
    const res = await fetch(`${API_BASE_URL}/delete_task/${list_id}/${task_id}/${auth}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function create_board(title: string, user_id: number, auth: object) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:216
    const res = await fetch(`${API_BASE_URL}/create_board/${title}/${user_id}/${auth}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function create_list(title: string, board_id: number, auth: object) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:221
    const res = await fetch(`${API_BASE_URL}/create_list/${title}/${board_id}/${auth}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}

export async function create_task(list_id: number, title: string, auth: object) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:227
    const res = await fetch(`${API_BASE_URL}/create_task/${list_id}/${title}/${auth}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return res.json()
}
