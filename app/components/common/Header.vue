<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { LogOut } from 'lucide-vue-next';

const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

const userEmail = ref('');
const userInitial = ref('');
const isDropdownOpen = ref(false);

onMounted(() => {
  if (user.value) {
    userEmail.value = user.value.email || '';
    userInitial.value = userEmail.value.charAt(0).toUpperCase();
  }
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleSignOut = async () => {
  await client.auth.signOut();
  router.push('/login');
};
</script>

<template>
  <header class="bg-card border-b border-border shadow-sm sticky top-0 z-50">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <NuxtLink to="/" class="text-2xl font-bold text-primary">
          SPEED AI
        </NuxtLink>

        <div class="flex gap-2">
          <ThemeToggle />

          <div class="relative">
          <button @click="toggleDropdown" class="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold text-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            {{ userInitial }}
          </button>

          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div v-if="isDropdownOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card ring-1 ring-border focus:outline-none">
              <div class="py-1">
                <div class="px-4 py-2 border-b border-border">
                  <p class="text-sm text-foreground font-medium truncate">{{ userEmail }}</p>
                </div>
                <button @click="handleSignOut" class="w-full text-left flex items-center px-4 py-2 text-sm text-foreground hover:bg-secondary/80 transition-colors">
                  <LogOut class="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </transition>
        </div>
        </div>
      </div>
    </div>
  </header>
</template>
