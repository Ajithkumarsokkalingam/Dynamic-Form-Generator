export interface Field {
    id: string;
    type: 'text' | 'email' | 'select' | 'radio' | 'textarea';
    label: string;
    required: boolean;
    placeholder?: string;
    validation?: {
      pattern: string;
      message: string;
    };
    options?: { value: string; label: string }[];
  }
  
  export interface FormSchema {
    formTitle: string;
    formDescription: string;
    fields: Field[];
  }
  