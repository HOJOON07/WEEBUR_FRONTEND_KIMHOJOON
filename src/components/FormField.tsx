interface FormFieldProps {
  label: React.ReactNode;
  input: React.ReactNode;
  errorText?: React.ReactNode;
  helpText?: React.ReactNode;
  required?: boolean;
  id?: string;
}

export function FormField({
  label,
  input,
  errorText,
  helpText,
  required,
  id,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {input}
      {errorText && <p className="text-red-500 text-sm">{errorText}</p>}
      {helpText && <p className="text-gray-500 text-xs">{helpText}</p>}
    </div>
  );
}
