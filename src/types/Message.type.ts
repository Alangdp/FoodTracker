export type FlashMessage = {
  type: "Success" | "Warning" | "Normal" | "Error";
  content: string;
}