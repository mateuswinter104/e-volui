import React from "react";
import { Spinner as LoadingSpinner } from "react-bootstrap";
import "./styles.scss";

interface SpinnerProps {
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <LoadingSpinner className={`spinnerContainer ${className}`} />
    </div>
  );
};

export default Spinner;
