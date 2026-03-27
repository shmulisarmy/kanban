import { API_BASE_URL } from './settings';


export async function change_task_list(task_id: number, list_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:56
    const res = await fetch(`http://localhost:8001/change_task_list/${task_id}/${list_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function remove_list(board_id: number, list_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:69
    const res = await fetch(`http://localhost:8001/remove_list/${board_id}/${list_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function change_list_title(list_id: number, title: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:76
    const res = await fetch(`http://localhost:8001/change_list_title/${list_id}/${title}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function change_task_title(task_id: number, title: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:81
    const res = await fetch(`http://localhost:8001/change_task_title/${task_id}/${title}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function greeting(name: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:87
    const res = await fetch(`http://localhost:8001/greeting/${name}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function add(a: number, b: number) : Promise<number> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:100
    const res = await fetch(`http://localhost:8001/add/${a}/${b}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function sub(a: number, b: number) : Promise<number> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:104
    const res = await fetch(`http://localhost:8001/sub/${a}/${b}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function board(board_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:139
    const res = await fetch(`http://localhost:8001/board/${board_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function tasks_get_tasks(user_name: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:145
    const res = await fetch(`http://localhost:8001/tasks_get_tasks/${user_name}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function delete_task(list_id: number, task_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:164
    const res = await fetch(`http://localhost:8001/delete_task/${list_id}/${task_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function create_board(title: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:172
    const res = await fetch(`http://localhost:8001/create_board/${title}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function create_list(title: string, board_id: number) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:176
    const res = await fetch(`http://localhost:8001/create_list/${title}/${board_id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}

export async function create_task(list_id: number, title: string) : Promise<undefined> { 
    // LINK /Users/shmuli/repositories/kanban/main.py:182
    const res = await fetch(`http://localhost:8001/create_task/${list_id}/${title}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
})
    return res.json()
}
