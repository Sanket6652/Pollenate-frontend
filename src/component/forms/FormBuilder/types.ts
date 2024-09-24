// Define the FormField interface
export interface FormField {
  type: "Short Answer"|"Text" | "Date" | "Heading1" | "Heading2" | "Heading3" | "Image" | "Divider" | "Checkbox" | "PhoneNumber" | "Rating" | "Dropdown" | "FileUpload";
  label: string;
  options?: string[]; // For Dropdown
}
