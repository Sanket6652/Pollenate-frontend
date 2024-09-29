export interface FormField {
  id: string;
  type:
    | "Short Answer"
    | "Text"
    | "Date"
    | "Heading1"
    | "Heading2"
    | "Heading3"
    | "Image"
    | "Divider"
    | "Checkbox"
    | "PhoneNumber"
    | "Rating"
    | "Dropdown"
    | "File Upload"
    | "Long Answer"
    | "Image";
  label: string;

  options?: string[];
}
