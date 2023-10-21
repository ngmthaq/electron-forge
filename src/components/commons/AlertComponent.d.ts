export type AlertComponentType = {
  message: string;
  type: "alert" | "confirm";
  variant?: "primary" | "success" | "error";
  onAccept?: () => Promise<void> | void;
  onDeny?: () => Promise<void> | void;
};
