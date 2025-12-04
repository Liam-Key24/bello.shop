export function showNotification(message: string, type: "success" | "error" = "error") {
  if (type === "error") {
    alert(message);
  }
}

