import React from "react";

const ToggleSwitch = ({ checked, onChange }) => {
    return (
        <div className="flex gap-3">
            <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <div
                    className={`relative w-[48px] h-[24px] rounded-full transition-all duration-300 ease-in-out
                    ${checked ? 'bg-accent shadow-[0_0_10px_2px_rgba(255,107,26,0.45)]' : 'bg-border shadow-[inset_0_0_4px_rgba(0,0,0,0.12)]'}`}
                >
                    <div
                        className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-card shadow-md transform transition-all duration-300 ease-in-out
                        ${checked ? 'left-[26px]' : 'left-[4px]'}`}
                    ></div>
                </div>
            </label>
        </div>
    );
};

export default ToggleSwitch;