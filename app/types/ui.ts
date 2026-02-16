// app/types/ui.ts

export interface DropdownItem {
  label: string;
  icon?: string;
  slot?: string;
  disabled?: boolean;
  to?: string;
  href?: string;
  target?: string;
  // Callback khi chọn item
  onSelect?: () => void | Promise<void>;
  // Hỗ trợ thêm avatar nếu cần thiết kế sau này
  avatar?: {
    src: string;
    alt?: string;
  };
}
