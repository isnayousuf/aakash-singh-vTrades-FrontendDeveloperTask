import React from 'react'
interface PrimaryButtonProps {
  label: string;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const PrimaryButton = ({ label, onClick, disabled=false }: PrimaryButtonProps) => {
   return (
    <button type="button" className={`primary-cta mt-24 ${disabled ? 'disabled-cta' : ''}`}onClick={onClick} disabled={disabled}>{label}</button>

  )
}

export default PrimaryButton