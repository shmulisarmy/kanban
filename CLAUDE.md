# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack Kanban board application with a Python FastAPI backend (root directory) and a React TypeScript frontend (`my-app/`).

## Commands

### Backend (run from repo root)
```bash
# Start backend server (port 8001)
python main.py

# Activate virtualenv
source venv/bin/activate
```

### Frontend (run from my-app/)
```bash
cd my-app
npm run dev      # Start dev server (port 5173)
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

### Code Generation
When backend routes are modified, run `python generator.py` to regenerate `my-app/src/generated.ts` (the auto-generated TypeScript API client). Do not edit `generated.ts` by hand.

## Architecture

### Backend (Python, root directory)

**Route system:** The `@route` decorator in `route_plugin.py` registers FastAPI endpoints and feeds function signatures to `generator.py`, which auto-generates corresponding TypeScript fetch functions in `my-app/src/generated.ts`. All API endpoints use GET with path parameters (e.g., `/change_task_list/{task_id}/{list_id}`).

**Real-time updates:** `DataChannel` (`data_channel.py`) manages WebSocket channels per resource (`/board/{id}`, `/list/{id}`). Clients receive `initial-data` on connect, then `create`, `update`, `delete` messages as state changes. The backend broadcasts to all connected clients on a channel after any mutation.

**Database:** SQLite via `database.db`. All queries are in `db_interactions.py`, wrapped with the `@sqlite_cursor` decorator from `decorators.py` which handles connection/cursor lifecycle and commits. Tables: `board`, `list`, `tasks`, `board_members`.

**Key files:**
- `main.py` — FastAPI app, all route handlers, WebSocket endpoints, CORS config
- `db_interactions.py` — All database CRUD operations
- `data_channel.py` — WebSocket channel management and broadcasting

### Frontend (React + TypeScript + Vite, `my-app/`)

**Routing:** TanStack React Router (`router.tsx`). Routes are defined as a tree with `createRoute`/`createRootRoute`.

**Real-time state:** The `UseChannelHook` custom hook (`hooks/ChannelHook.tsx`) manages WebSocket connections. It maintains state as `Record<number, T>` and handles `initial-data`, `create`, `update`, `delete` message types. Components subscribe to channels (e.g., a Board subscribes to `/board/{id}` for list updates, a TaskList subscribes to `/list/{id}` for task updates).

**Drag-and-drop flow:** Task drag events in `List.tsx` use a module-level `tracking_task_id` variable. On `dragOver`, if the task enters a new list, `change_task_list()` is called, which hits the backend, updates the DB, and broadcasts via WebSocket to all clients.

**TypeScript:** Strict mode enabled (`tsconfig.app.json`) with `noUnusedLocals` and `noUnusedParameters`.

## Configuration

- Backend port: `settings.py` → `port = 8001`
- Frontend dev server: `localhost:5173` (Vite default)
- CORS allows: `localhost:5173`, `localhost:5001`
- Frontend API URL: `my-app/src/settings.ts`
