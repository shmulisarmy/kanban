import { createRouter, createRootRoute, createRoute, Outlet, Link } from '@tanstack/react-router'
import ShowTasks from './components/ShowTasks'
import Boards from './components/Boards'
import Board from './components/Board'

const rootRoute = createRootRoute({
  component: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav className="navbar">
        <div className="navbar__brand">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Kanban
        </div>
        <div className="navbar__links">
          <Link to="/" className="nav-link">Tasks</Link>
          <Link to="/boards" className="nav-link">Boards</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  ),
})

const all_routes = [
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: ShowTasks,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/boards',
    component: Boards,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/board/$boardId',
    component: Board,
  })
]

const router = createRouter({
  routeTree: rootRoute.addChildren(all_routes),
})

export default router
