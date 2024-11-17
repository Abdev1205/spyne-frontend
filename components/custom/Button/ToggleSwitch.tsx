import React from "react";

interface ToggleSwitchProps {
  switchOn?: boolean;
  setSwitchOn?: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  labelStyle?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  switchOn = true,
  setSwitchOn = () => {},
  label = "Switch",
  disabled = false,
  labelStyle = "",
}) => {
  return (
    <label className="relative inline-flex items-center text-black cursor-pointer">
      <input
        type="checkbox"
        checked={switchOn}
        onChange={
          disabled ? () => setSwitchOn(true) : () => setSwitchOn(!switchOn)
        }
        className="sr-only peer"
        disabled={disabled}
      />
      <div
        className={`w-9 h-5 rounded-full flex items-center transition-colors duration-300 ease-in-out ${
          switchOn
            ? "bg-gradient-to-r from-[#144EE3] to-[#F42A8B]"
            : "bg-gray-500"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            switchOn ? "translate-x-[1.1rem]" : "translate-x-0"
          }`}
        />
      </div>
      <span className={`ms-3 text-black ${labelStyle}`}>{label}</span>
    </label>
  );
};

export default ToggleSwitch;
