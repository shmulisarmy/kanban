<template>
  <nav class="navbar">
    <router-link to="/boards" class="navbar__brand">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
      Kanban
    </router-link>
    <div class="navbar__links">
      <router-link to="/boards" class="nav-link">Boards</router-link>
    </div>
  </nav>
  <router-view />
</template>
