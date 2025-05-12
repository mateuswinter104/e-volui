"use client";
import colors from "@/styles/colors.module.scss";
import "./styles.scss";

interface TextProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  truncate?: boolean;
  link?: string;
  color?: string;
}

export default function Text(props: TextProps): JSX.Element {
  const { children, onClick, className, truncate, link, color } = props;

  const combinedClassName = `${className || ""} ${onClick ? "clickable" : ""} ${
    truncate ? "truncate" : ""
  }`.trim();

  return (
    <p
      className={combinedClassName}
      onClick={onClick}
      color={color ? color : colors.primary}
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        children
      )}
    </p>
  );
}
