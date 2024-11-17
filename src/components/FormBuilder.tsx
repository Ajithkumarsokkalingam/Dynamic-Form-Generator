import React from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';

interface FormFieldOption {
  value: string;
  label: string;
}

interface FormField {
  id: string;
  type: 'text' | 'email' | 'select' | 'radio' | 'textarea';
  label: string;
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern?: string;
    message?: string;
  };
  options?: FormFieldOption[];
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}

const FormBuilder: React.FC<{ schema: FormSchema }> = ({ schema }) => {
  const { formTitle, formDescription, fields } = schema;
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log('Form Data Submitted:', data);
    alert('Form submitted successfully!');
  };

  const renderField = (field: FormField) => {
    const { id, type, label, required, placeholder, options, validation } = field;

    switch (type) {
      case 'text':
      case 'email':
        return (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium">{label}</label>
            <Controller
              name={id}
              control={control}
              rules={{ required, pattern: validation?.pattern ? new RegExp(validation.pattern) : undefined }}
              render={({ field }) => (
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                />
              )}
            />
            {errors[id] && <p className="text-red-500 text-xs">{String(errors[id]?.message) || 'This field is required'}</p>}
          </div>
        );
      case 'select':
        return (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium">{label}</label>
            <Controller
              name={id}
              control={control}
              rules={{ required }}
              render={({ field }) => (
                <select id={id} {...field} className="mt-2 p-2 border border-gray-300 rounded-md w-full">
                  {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors[id] && <p className="text-red-500 text-xs">{String(errors[id]?.message) || 'This field is required'}</p>}
          </div>
        );
      case 'radio':
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium">{label}</label>
            <div className="mt-2">
              {options?.map((option) => (
                <label key={option.value} className="inline-flex items-center mr-4">
                  <Controller
                    name={id}
                    control={control}
                    rules={{ required }}
                    render={({ field }) => (
                      <>
                        <input
                          type="radio"
                          value={option.value}
                          checked={field.value === option.value}
                          onChange={() => field.onChange(option.value)}
                          className="mr-2"
                        />
                        <span>{option.label}</span>
                      </>
                    )}
                  />
                </label>
              ))}
            </div>
            {errors[id] && <p className="text-red-500 text-xs">{String(errors[id]?.message) || 'This field is required'}</p>}
          </div>
        );
      case 'textarea':
        return (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium">{label}</label>
            <Controller
              name={id}
              control={control}
              rules={{ required }}
              render={({ field }) => (
                <textarea
                  id={id}
                  placeholder={placeholder}
                  {...field}
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                />
              )}
            />
            {errors[id] && <p className="text-red-500 text-xs">{String(errors[id]?.message) || 'This field is required'}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{formTitle}</h1>
      <p className="text-lg mb-6">{formDescription}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => renderField(field))}
        
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormBuilder;
