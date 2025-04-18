import React from 'react'
interface PrimaryButtonProps {
  label: string;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isFullWidth?: boolean
}

const PrimaryButton = ({ label, onClick, disabled=false,  isFullWidth=true }: PrimaryButtonProps) => {
   return (
    <button type="button" className={`primary-cta mt-24 ${isFullWidth ? 'w-100': ''} ${disabled ? 'disabled-cta' : ''}`}onClick={onClick} disabled={disabled}>{label}</button>

  )
}

export default PrimaryButton