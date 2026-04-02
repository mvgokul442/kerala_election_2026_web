import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="rounded-md px-4 py-2 text-white bg-gradient-to-tr from-primary to-primaryContainer"
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="rounded-md px-4 py-2 text-primary border border-outlineVariant/20"
  >
    {children}
  </button>
);
