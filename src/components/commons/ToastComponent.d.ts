export type ToastComponentType = {
  type?: "primary" | "secondary" | "info" | "warning" | "danger" | "dark" | "light" | "success";
  message: string;
};

export type ToastComponentFullType = ToastComponentType & {
  id: string;
  isOpened: boolean;
};
