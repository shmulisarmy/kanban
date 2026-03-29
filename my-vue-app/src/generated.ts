import { API_BASE_URL } from './settings';


export async function change_task_list(task_id: number, old_list_id: number, new_list_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:62
    const res = await fetch(`http://localhost:8080/change_task_list/${task_id}/${old_list_id}/${new_list_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function me() : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:76
    const res = await fetch(`http://localhost:8080/me`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function sign_in() : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:83
    const res = await fetch(`http://localhost:8080/sign_in`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function remove_list(board_id: number, list_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:90
    const res = await fetch(`http://localhost:8080/remove_list/${board_id}/${list_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function change_list_title(list_id: number, title: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:97
    const res = await fetch(`http://localhost:8080/change_list_title/${list_id}/${title}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function change_task_title(task_id: number, title: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:106
    const res = await fetch(`http://localhost:8080/change_task_title/${task_id}/${title}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function greeting(name: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:114
    const res = await fetch(`http://localhost:8080/greeting/${name}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function add(a: number, b: number) : Promise<number> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:127
    const res = await fetch(`http://localhost:8080/add/${a}/${b}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function sub(a: number, b: number) : Promise<number> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:131
    const res = await fetch(`http://localhost:8080/sub/${a}/${b}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function board(board_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:166
    const res = await fetch(`http://localhost:8080/board/${board_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function tasks_get_tasks(user_name: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:172
    const res = await fetch(`http://localhost:8080/tasks_get_tasks/${user_name}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function get_user_boards(user_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:178
    const res = await fetch(`http://localhost:8080/get_user_boards/${user_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function delete_task(list_id: number, task_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:192
    const res = await fetch(`http://localhost:8080/delete_task/${list_id}/${task_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function create_board(title: string, user_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:200
    const res = await fetch(`http://localhost:8080/create_board/${title}/${user_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function create_list(title: string, board_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:205
    const res = await fetch(`http://localhost:8080/create_list/${title}/${board_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function create_task(list_id: number, title: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:211
    const res = await fetch(`http://localhost:8080/create_task/${list_id}/${title}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}
