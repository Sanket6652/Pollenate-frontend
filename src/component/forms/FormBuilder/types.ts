export interface FormField {
  id: string;
  type: "Short Answer" | "Text" | "Date" | "Heading1" | "Heading2" | "Heading3" | "Image" | "Divider" | "Checkbox" | "PhoneNumber" | "Rating" | "Dropdown" | "FileUpload";
  label: string;
 
  options?: string[]; 
}
