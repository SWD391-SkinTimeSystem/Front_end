
interface CheckboxProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label?: string;
  }
  
  const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange, label }) => {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </label>
    );
  };
  
  export default Checkbox;
