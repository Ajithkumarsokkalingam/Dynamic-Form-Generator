import React from 'react';
import { Field as FieldType } from '../types/schema';
import { useFormContext } from 'react-hook-form';

type FieldProps = {
  field: FieldType;
};

const Field: React.FC<FieldProps> = ({ field }) => {
  const { register, formState: { errors } } = useFormContext();
  
  switch (field.type) {
    case 'text':
    case 'email':
      return (
        <div>
          <label htmlFor={field.id}>{field.label}</label>
          <input
            type={field.type}
            id={field.id}
            {...register(field.id, { required: field.required })}
            placeholder={field.placeholder}
            className="border p-2"
          />
          {errors[field.id] && <span>{field.required ? `${field.label} is required` : ''}</span>}
        </div>
      );
    
    case 'select':
      return (
        <div>
          <label htmlFor={field.id}>{field.label}</label>
          <select
            id={field.id}
            {...register(field.id, { required: field.required })}
            className="border p-2"
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    
    case 'radio':
      return (
        <div>
          <label>{field.label}</label>
          {field.options?.map(option => (
            <div key={option.value}>
              <input
                type="radio"
                value={option.value}
                {...register(field.id, { required: field.required })}
                id={option.value}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      );

    case 'textarea':
      return (
        <div>
          <label htmlFor={field.id}>{field.label}</label>
          <textarea
            id={field.id}
            {...register(field.id, { required: field.required })}
            placeholder={field.placeholder}
            className="border p-2"
          />
        </div>
      );
    
    default:
      return null;
  }
};

export default Field;
