import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: IconType;
  name?: string;
  classNameInput?: string;
  classNameDiv?: string;
  classNameIcon?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement>;
}

export const Input = ({ type, placeholder, classNameIcon = '', value, onChange, Icon, name, classNameInput = '', classNameDiv = '', onKeyDown, ref }: Props) => {
  return (
    <div
      className={`my-2 flex bg-neutral-100 dark:bg-neutral-800/80 gap-2.5 border border-neutral-300 dark:border-neutral-700/80 rounded-xl items-center px-3 py-0.5 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${classNameDiv}`}
    >
      {Icon && <Icon size={20} className={`text-neutral-500 dark:text-neutral-400 shrink-0 ${classNameIcon}`} />}
      <input
        name={name}
        type={type}
        ref={ref}
        onKeyDown={onKeyDown}
        className={`w-full py-2.5 bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-sm sm:text-base outline-none ${classNameInput}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
