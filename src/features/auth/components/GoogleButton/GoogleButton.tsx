import { Button } from '@components/ui/Button';
import { FcGoogle } from 'react-icons/fc';
import './GoogleButton.css';

export interface GoogleButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const GoogleButton = ({
  onClick,
  isLoading = false,
  children = 'Continuar con Google',
}: GoogleButtonProps) => {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      disabled={isLoading}
      className="google-button"
    >
      <FcGoogle className="google-icon" />
      {children}
    </Button>
  );
};

