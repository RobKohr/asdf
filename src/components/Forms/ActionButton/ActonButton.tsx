import React, { ButtonHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import "./ActionButton.scss";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  to?: string;
}

export default function ActionButton({ children, to, ...htmlProps }: ActionButtonProps) {
  const navigate = useNavigate();
  const passedProps = { ...htmlProps };
  if (to) {
    htmlProps = {
      ...passedProps,
      onClick: () => {
        navigate(to);
      },
    };
  }

  return (
    <button className="action-button" {...htmlProps}>
      {children}
    </button>
  );
}
