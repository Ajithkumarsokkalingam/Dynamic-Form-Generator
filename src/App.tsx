import React, { useState } from 'react';
import JSONEditor from './components/JSONEditor';
import FormPreview from './components/FormPreview';
import { FormSchema } from './types/schema';

const App: React.FC = () => {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <JSONEditor onChange={(schema) => setFormSchema(schema)} />
      </div>
      <div className="w-1/2 p-4">
        {formSchema && <FormPreview schema={formSchema} />}
      </div>
    </div>
  );
};

export default App;
