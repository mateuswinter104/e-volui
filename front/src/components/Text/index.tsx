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
  styles?: any;
}

export default function Text(props: TextProps): JSX.Element {
  const { children, onClick, className, truncate, link, color, styles } = props;

  const combinedClassName = `${className || ""} ${onClick ? "clickable" : ""} ${truncate ? "truncate" : ""
    }`.trim();

  const appliedColor = color ? color : colors.gray1;

  return (
    <p
      className={combinedClassName}
      onClick={onClick}
      style={{ ...styles, color: appliedColor }}
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
