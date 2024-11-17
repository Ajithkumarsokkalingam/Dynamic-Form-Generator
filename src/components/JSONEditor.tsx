import React, { useState } from 'react';
import { validateJSON } from '../utils/validateJSON';
import { FormSchema } from '../types/schema';

type JSONEditorProps = {
  onChange: (formSchema: FormSchema) => void;
};

const JSONEditor: React.FC<JSONEditorProps> = ({ onChange }) => {
  const [json, setJson] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setJson(input);

    const parsed = validateJSON(input);
    if (parsed) {
      onChange(parsed);
    }
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full h-60 p-2 border"
        value={json}
        onChange={handleChange}
        placeholder="Enter JSON schema here..."
      />
    </div>
  );
};

export default JSONEditor;
