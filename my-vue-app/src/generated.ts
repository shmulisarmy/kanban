import { API_BASE_URL } from './settings';


export async function me() : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:56
    const res = await fetch(`http://localhost:8080/me`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function sign_up(name: string, password: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:63
    const res = await fetch(`http://localhost:8080/sign_up/${name}/${password}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function sign_in(name: string, password: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:70
    const res = await fetch(`http://localhost:8080/sign_in/${name}/${password}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function change_task_list(task_id: number, old_list_id: number, new_list_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:86
    const res = await fetch(`http://localhost:8080/change_task_list/${task_id}/${old_list_id}/${new_list_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function remove_list(board_id: number, list_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:101
    const res = await fetch(`http://localhost:8080/remove_list/${board_id}/${list_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function change_list_title(list_id: number, title: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:108
    const res = await fetch(`http://localhost:8080/change_list_title/${list_id}/${title}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function change_task_title(task_id: number, title: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:117
    const res = await fetch(`http://localhost:8080/change_task_title/${task_id}/${title}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function greeting(name: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:125
    const res = await fetch(`http://localhost:8080/greeting/${name}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function add(a: number, b: number) : Promise<number> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:138
    const res = await fetch(`http://localhost:8080/add/${a}/${b}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function sub(a: number, b: number) : Promise<number> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:142
    const res = await fetch(`http://localhost:8080/sub/${a}/${b}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function board(board_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:177
    const res = await fetch(`http://localhost:8080/board/${board_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function tasks_get_tasks(user_name: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:183
    const res = await fetch(`http://localhost:8080/tasks_get_tasks/${user_name}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function get_user_boards(user_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:189
    const res = await fetch(`http://localhost:8080/get_user_boards/${user_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function delete_task(list_id: number, task_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:203
    const res = await fetch(`http://localhost:8080/delete_task/${list_id}/${task_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function create_board(title: string, user_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:211
    const res = await fetch(`http://localhost:8080/create_board/${title}/${user_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function create_list(title: string, board_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:216
    const res = await fetch(`http://localhost:8080/create_list/${title}/${board_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function create_task(list_id: number, title: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:222
    const res = await fetch(`http://localhost:8080/create_task/${list_id}/${title}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}
