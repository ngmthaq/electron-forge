export type AlertComponentType = {
  message: string;
  type: "alert" | "confirm";
  variant?: "primary" | "success" | "error";
  onAccept?: () => Promise<void>;
  onDeny?: () => Promise<void>;
};
