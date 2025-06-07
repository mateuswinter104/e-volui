import {
  Button as ButtonBootstrap,
  ButtonProps as BootstrapButtonProps,
} from "react-bootstrap";
import "./styles.scss";
import Spinner from "../Spinner";
import Icon from "../Icon";

interface ButtonProps extends BootstrapButtonProps {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  fill?: string;
  iconSize?: number;
  fluid?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  children,
  disabled,
  icon,
  fill,
  iconSize,
  fluid,
  ...rest
}) => {
  return (
    <ButtonBootstrap
      {...rest}
      className={`${className} ${icon && !children ? "icon-button" : ""}`}
      disabled={disabled || loading}
      style={{
        boxShadow: "none",
        backgroundColor: "none",
        padding: 0,
        width: fluid ? "100%" : "fit-content",
      }}
    >
      {loading ? (
        <div style={{ padding: "0 9px" }}>
          <Spinner />
        </div>
      ) : icon ? (
        children ? (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <Icon
                fill={fill}
                size={iconSize || 14}
                name={icon}
                className="gray-3"
              />
            </div>
            {children}
          </>
        ) : (
          <Icon
            fill={fill}
            size={iconSize || 25}
            name={icon}
            className="gray-3"
          />
        )
      ) : (
        children
      )}
    </ButtonBootstrap>
  );
};

export default Button;
