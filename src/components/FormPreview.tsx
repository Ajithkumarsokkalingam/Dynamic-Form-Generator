import React from 'react';
import { FormSchema } from '../types/schema';
import Field from './Field';
import { useForm, FormProvider } from 'react-hook-form';

type FormPreviewProps = {
  schema: FormSchema;
};

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const methods = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="p-4">
      <h2>{schema.formTitle}</h2>
      <p>{schema.formDescription}</p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {schema.fields.map(field => (
            <Field key={field.id} field={field} />
          ))}
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormPreview;
