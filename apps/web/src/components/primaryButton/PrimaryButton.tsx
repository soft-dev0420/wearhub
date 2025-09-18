import styles from "./primaryButton.module.css"
import { ReactNode } from "react"

interface PrimaryButtonProps {
  children: ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({children}) => {
  return (
    <button
      className={styles.btn}
    >
      {children}
    </button>
  );
}

export default PrimaryButton