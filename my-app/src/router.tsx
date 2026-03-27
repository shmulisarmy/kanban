import { createRouter, createRootRoute, createRoute, Outlet, Link } from '@tanstack/react-router'
import ShowTasks from './components/ShowTasks'
import Boards from './components/Boards'
import Board from './components/Board'

// Create the root route
const rootRoute = createRootRoute({
  component: () => (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '20px' }}>Tasks</Link>
        <Link to="/boards">Boards</Link>
      </div>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  ),
})

// Create the tasks route
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

// Create the router
const router = createRouter({
  routeTree: rootRoute.addChildren(all_routes),
})

export default router
