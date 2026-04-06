<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore, type AuthDetails } from './auth_store';
import { API_BASE_URL } from './settings';
import { me, sign_out } from './generated';

const router = useRouter();
const showProfileMenu = ref(false);

function signOut() {
  sign_out().then(() => {
    authStore.user = null;
    router.push('/sign-in');
  });
}

(me() as unknown as Promise<{ auth?: AuthDetails["user"]; message?: string }>).then((data) => {
  console.log('me response:', data);
  if (data.auth) {
    authStore.user = data.auth;
  }
});


</script>

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
    <div class="navbar__spacer"></div>
    <div v-if="authStore.user" class="navbar__profile">
      <img
        :src="`${API_BASE_URL}/get_user_avatar/${authStore.user?.id}`"
        alt=""
        class="navbar__avatar"
        @click="showProfileMenu = !showProfileMenu"
      >
      <div v-if="showProfileMenu" class="profile-menu">
        <div class="profile-menu__info">
          <div class="profile-menu__name">{{ authStore.user.name }}</div>
          <div class="profile-menu__id">ID: {{ authStore.user.id }}</div>
        </div>
        <button class="profile-menu__signout" @click="signOut">Sign out</button>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
}

.navbar__spacer {
  flex: 1;
}

.navbar__profile {
  margin-left: auto;
}

.navbar__avatar {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-hover);
  transition: border-color var(--dur-fast), box-shadow var(--dur-fast);
  cursor: pointer;
}

.navbar__avatar:hover {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.navbar__profile {
  position: relative;
}

.profile-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 200px;
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 0.75rem;
  z-index: 100;
}

.profile-menu__info {
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0.6rem;
}

.profile-menu__name {
  font-weight: 600;
  color: var(--text);
  font-size: 0.875rem;
}

.profile-menu__id {
  color: var(--text-muted);
  font-size: 0.75rem;
  margin-top: 0.15rem;
}

.profile-menu__signout {
  width: 100%;
  padding: 0.45rem 0.75rem;
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--danger);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: background var(--dur-fast);
}

.profile-menu__signout:hover {
  background: var(--danger-subtle);
}
</style>
