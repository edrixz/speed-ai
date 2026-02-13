<template>
  <div
    class="min-h-screen bg-background text-foreground transition-colors duration-300"
  >
    <header
      class="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-md"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <div class="font-bold text-xl tracking-tight flex items-center gap-2">
          <div
            class="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground"
          >
            W
          </div>
          <span
            class="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          >
            SPEED AI
          </span>
        </div>

        <div class="flex items-center gap-4">
          <div class="text-sm text-muted-foreground hidden sm:block">
            Logged In
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>
