<script setup lang="ts">
import type { DropdownItem } from "~/types/ui";

const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

// 1. Khai báo type rõ ràng cho items: Mảng 2 chiều của DropdownItem
const items = computed<DropdownItem[][]>(() => [
  [
    {
      label: user.value?.email || "",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Đăng xuất",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
      onSelect: async () => {
        await client.auth.signOut();
        router.push("/login");
      },
    },
  ],
]);
</script>

<template>
  <header
    class="bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50"
  >
    <UContainer>
      <div class="flex justify-between items-center h-16">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <UIcon name="i-heroicons-bolt" class="w-6 h-6" />
          SPEED AI
        </NuxtLink>

        <div class="flex items-center gap-2">
          <ThemeToggle />

          <UDropdownMenu
            :items="items"
            :content="{ align: 'end', side: 'bottom' }"
          >
            <UAvatar
              :alt="user?.email?.charAt(0).toUpperCase()"
              size="sm"
              class="bg-primary-50 dark:bg-primary-950 text-primary cursor-pointer ring-2 ring-transparent hover:ring-primary-500 transition-all"
            />

            <template #account="{ item }: { item: DropdownItem }">
              <div class="text-left w-full min-w-37.5">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Đang đăng nhập
                </p>
                <p class="font-medium text-gray-900 dark:text-white truncate">
                  {{ item.label }}
                </p>
              </div>
            </template>

            <template #item="{ item }: { item: DropdownItem }">
              <span class="truncate">{{ item.label }}</span>
              <UIcon
                v-if="item.icon"
                :name="item.icon"
                class="shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
              />
            </template>
          </UDropdownMenu>
        </div>
      </div>
    </UContainer>
  </header>
</template>
