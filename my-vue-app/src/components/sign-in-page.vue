<script setup lang="ts">
import { useRouter } from 'vue-router';
import  { sign_in } from '../generated';
import { authStore, type AuthDetails } from '../auth_store';

const router = useRouter();

function handleLogin(e: Event) {
  const form = e.target as HTMLFormElement
  const username: string = form.username.value
  const password: string = form.password.value
  sign_in(username, password).then((data) => {
    authStore.user = data.auth ?? null
    if (data.auth) {
      if (authStore.redirectAfterLogin) {
        router.push(authStore.redirectAfterLogin);
        authStore.redirectAfterLogin = null;
      } else {
        router.push('/boards')
      }
    } else {
      alert(data.message)
    }
  })
}
</script>


<template>
  <div class="sign-in-page">
    <div class="sign-in-card">
      <div class="sign-in-header">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sign-in-icon">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        <h1 class="sign-in-title">Sign in to Kanban</h1>
        <p class="sign-in-subtitle">Enter your credentials to continue</p>
      </div>
      <form class="sign-in-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label" for="username">Username</label>
          <input id="username" type="text" name="username" class="form-input" placeholder="Enter your username" />
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input id="password" type="password" name="password" class="form-input" placeholder="Enter your password" />
        </div>
        <button type="submit" class="sign-in-btn">Sign in</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.sign-in-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  background: var(--bg-app);
}

.sign-in-card {
  width: 100%;
  max-width: 400px;
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.5rem 2rem;
  box-shadow: var(--shadow-xl);
  animation: scaleIn var(--dur-slow) var(--ease-out);
}

.sign-in-header {
  text-align: center;
  margin-bottom: 2rem;
}

.sign-in-icon {
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.sign-in-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 0.35rem;
}

.sign-in-subtitle {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
}

.sign-in-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-input {
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--text);
  background: var(--bg-app);
  outline: none;
  transition: border-color var(--dur-fast), box-shadow var(--dur-fast);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.sign-in-btn {
  padding: 0.7rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--dur-fast), box-shadow var(--dur-fast);
  margin-top: 0.5rem;
}

.sign-in-btn:hover {
  background: var(--accent-hover);
  box-shadow: var(--shadow-glow);
}

.sign-in-btn:active {
  background: var(--accent-muted);
}
</style>

