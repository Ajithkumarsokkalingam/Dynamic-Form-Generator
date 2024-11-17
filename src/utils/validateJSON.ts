import { FormSchema } from '../types/schema';

export const validateJSON = (json: string): FormSchema | null => {
  try {
    const parsed = JSON.parse(json);
    return parsed as FormSchema;
  } catch (error) {
    return null;
  }
};
