<script setup lang="ts">
const props = defineProps<{
  modelValue: string[];
  max?: number;
}>();

const emit = defineEmits(["update:modelValue"]);

const client = useSupabaseClient();
const toast = useToast();
const isUploading = ref(false);
const dragActive = ref(false);

// Mở dialog chọn file
const fileInput = ref<HTMLInputElement | null>(null);
const triggerSelect = () => fileInput.value?.click();

// Xử lý Upload file lên Supabase Storage
const uploadFiles = async (files: FileList | null) => {
  if (!files || files.length === 0) return;

  isUploading.value = true;
  const newUrls: string[] = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;

      // Validate: Chỉ nhận ảnh
      if (!file.type.startsWith("image/")) {
        toast.add({
          title: "Lỗi định dạng",
          description: `${file.name} không phải là ảnh.`,
          color: "error",
        });
        continue;
      }

      // Validate: Size < 5MB
      if (file.size > 5 * 1024 * 1024) {
        toast.add({
          title: "File quá lớn",
          description: `${file.name} vượt quá 5MB.`,
          color: "error",
        });
        continue;
      }

      // Tạo tên file unique
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload lên Bucket 'images' (Bạn cần tạo bucket này trên Supabase)
      const { error: uploadError } = await client.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Lấy Public URL
      const { data } = client.storage.from("images").getPublicUrl(filePath);
      if (data?.publicUrl) {
        newUrls.push(data.publicUrl);
      }
    }

    // Cập nhật v-model
    // Lọc bỏ các string rỗng ban đầu nếu có
    const currentUrls = props.modelValue.filter((url) => url.trim() !== "");
    emit("update:modelValue", [...currentUrls, ...newUrls]);

    toast.add({
      title: "Thành công",
      description: `Đã tải lên ${newUrls.length} ảnh.`,
      color: "success",
    });
  } catch (error: any) {
    console.error(error);
    toast.add({
      title: "Lỗi upload",
      description: error.message || "Không thể tải ảnh lên.",
      color: "error",
    });
  } finally {
    isUploading.value = false;
    dragActive.value = false;
    // Reset input để chọn lại file cũ được
    if (fileInput.value) fileInput.value.value = "";
  }
};

// Xử lý Drag & Drop
const onDragOver = (e: DragEvent) => {
  e.preventDefault();
  dragActive.value = true;
};
const onDragLeave = () => {
  dragActive.value = false;
};
const onDrop = (e: DragEvent) => {
  e.preventDefault();
  dragActive.value = false;
  uploadFiles(e.dataTransfer?.files || null);
};

// Xóa ảnh
const removeImage = (index: number) => {
  const newUrls = [...props.modelValue];
  newUrls.splice(index, 1);
  // Nếu xóa hết thì để lại 1 chuỗi rỗng (tuỳ logic form, ở đây ta để mảng rỗng thì tốt hơn)
  emit("update:modelValue", newUrls);
};
</script>

<template>
  <div class="space-y-3">
    <div
      class="border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer relative overflow-hidden"
      :class="[
        dragActive
          ? 'border-primary bg-primary-50 dark:bg-primary-950/30'
          : 'border-gray-300 dark:border-gray-700 hover:border-primary-400',
        isUploading ? 'opacity-50 pointer-events-none' : '',
      ]"
      @click="triggerSelect"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        class="hidden"
        @change="(e) => uploadFiles((e.target as HTMLInputElement).files)"
      />

      <div class="flex flex-col items-center justify-center space-y-2">
        <div v-if="isUploading" class="animate-spin text-primary">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8" />
        </div>
        <div v-else class="text-gray-500 dark:text-gray-400">
          <UIcon
            name="i-heroicons-cloud-arrow-up"
            class="w-10 h-10 mb-2 mx-auto"
          />
          <p class="font-medium">Kéo thả ảnh vào đây</p>
          <p class="text-xs">hoặc nhấn để chọn file (Max 5MB)</p>
        </div>
      </div>
    </div>

    <div
      v-if="modelValue.length > 0 && modelValue.some((url) => url)"
      class="grid grid-cols-2 md:grid-cols-4 gap-3"
    >
      <div
        v-for="(url, index) in modelValue"
        :key="index"
        class="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900"
      >
        <img
          v-if="url"
          :src="url"
          class="w-full h-full object-cover transition-transform group-hover:scale-105"
          alt="Uploaded image"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center text-xs text-gray-400"
        >
          Link hỏng
        </div>

        <button
          @click.stop="removeImage(index)"
          class="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          title="Xóa ảnh này"
        >
          <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
