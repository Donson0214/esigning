<template>
  <main class="auth-shell">
    <div class="auth-bg" aria-hidden="true">
      <span class="orb orb-one"></span>
      <span class="orb orb-two"></span>
      <span class="orb orb-three"></span>
    </div>
    <div class="auth-grid">
      <section class="auth-left">
        <slot name="left" />
      </section>
      <section class="auth-right">
        <slot name="right" />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  position: relative;
  overflow: hidden;
}

.auth-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(0);
  opacity: 0.6;
  animation: float 8s ease-in-out infinite;
}

.orb-one {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.35), transparent 70%);
  top: -120px;
  right: -120px;
}

.orb-two {
  width: 360px;
  height: 360px;
  background: radial-gradient(circle at 30% 30%, rgba(245, 158, 11, 0.35), transparent 70%);
  bottom: -120px;
  left: -140px;
  animation-delay: 1.5s;
}

.orb-three {
  width: 220px;
  height: 220px;
  background: radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.2), transparent 70%);
  bottom: 20%;
  right: 20%;
  animation-delay: 2.2s;
}

.auth-grid {
  width: min(1120px, 92vw);
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 3rem;
  position: relative;
  z-index: 2;
}

.auth-left {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.auth-right {
  display: flex;
  justify-content: center;
}

@media (max-width: 960px) {
  .auth-grid {
    grid-template-columns: 1fr;
  }
  .auth-right {
    justify-content: stretch;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
</style>
