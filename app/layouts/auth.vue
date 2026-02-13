<template>
  <div
    class="min-h-screen flex items-center justify-center bg-background text-foreground transition-colors duration-300 relative overflow-hidden"
  >
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none"
    ></div>

    <div class="absolute top-4 right-4 z-50">
      <ThemeToggle />
    </div>

    <div class="w-full max-w-md relative z-10">
      <slot />
    </div>
  </div>
</template>
