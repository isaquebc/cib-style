import { Button } from '@atoms/Button';
import {
  NotAuthorizedContainer,
  ErrorCodeContainer,
  ErrorCode,
  LockIcon,
  ShieldContainer,
  Shield,
  FloatingIcon,
  Title,
  Description,
  WarningBox,
  Suggestions,
  SuggestionItem,
  ButtonsContainer,
} from './NotAuthorized.style';

export interface NotAuthorizedProps {
  /**
   * Callback when "Go Home" button is clicked
   */
  handleGoHome?: () => void;

  /**
   * Callback when "Go Back" button is clicked
   */
  handleGoBack?: () => void;

  /**
   * Callback when "Login" button is clicked
   */
  handleLogin?: () => void;

  /**
   * Custom title (default: "Access Denied")
   */
  title?: string;

  /**
   * Custom description
   */
  description?: string;

  /**
   * Show warning box
   */
  showWarning?: boolean;

  /**
   * Custom warning message
   */
  warningMessage?: string;

  /**
   * Show suggestions section
   */
  showSuggestions?: boolean;

  /**
   * Show login button
   */
  showLoginButton?: boolean;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * NotAuthorized component - A 403 Forbidden error page
 *
 * @example
 * ```tsx
 * <NotAuthorized
 *   handleGoHome={() => navigate('/')}
 *   handleLogin={() => navigate('/login')}
 * />
 * ```
 */
export const NotAuthorized = ({
  handleGoHome,
  handleGoBack,
  handleLogin,
  title = 'Access Denied',
  description = "You don't have permission to access this resource. This area is restricted and requires special authorization.",
  showWarning = true,
  warningMessage = 'This action has been logged for security purposes.',
  showSuggestions = true,
  showLoginButton = true,
  className,
}: NotAuthorizedProps) => {
  const defaultGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const defaultGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const defaultLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  return (
    <NotAuthorizedContainer className={className}>
      <ShieldContainer>
        <FloatingIcon delay={0}>🔒</FloatingIcon>
        <FloatingIcon delay={0.5}>🚫</FloatingIcon>
        <FloatingIcon delay={1}>⛔</FloatingIcon>
        <FloatingIcon delay={1.5}>🔐</FloatingIcon>
        <Shield>🛡️</Shield>
      </ShieldContainer>

      <LockIcon>🔒</LockIcon>

      <ErrorCodeContainer>
        <ErrorCode>403</ErrorCode>
      </ErrorCodeContainer>

      <Title>{title}</Title>

      <Description>{description}</Description>

      {showWarning && (
        <WarningBox>
          <span>⚠️</span>
          <p>{warningMessage}</p>
        </WarningBox>
      )}

      {showSuggestions && (
        <Suggestions>
          <SuggestionItem>
            <span>🔑</span>
            <span>Login with an authorized account</span>
          </SuggestionItem>
          <SuggestionItem>
            <span>👤</span>
            <span>Contact an administrator for access</span>
          </SuggestionItem>
          <SuggestionItem>
            <span>📧</span>
            <span>Request permission from the resource owner</span>
          </SuggestionItem>
          <SuggestionItem>
            <span>🏠</span>
            <span>Return to a page you have access to</span>
          </SuggestionItem>
        </Suggestions>
      )}

      <ButtonsContainer>
        {showLoginButton && (
          <Button
            variant="primary"
            size="large"
            handleClick={handleLogin || defaultLogin}
          >
            Login
          </Button>
        )}
        <Button
          variant={showLoginButton ? 'outline' : 'primary'}
          size="large"
          handleClick={handleGoHome || defaultGoHome}
        >
          Go Home
        </Button>
        <Button
          variant="outline"
          size="large"
          handleClick={handleGoBack || defaultGoBack}
        >
          Go Back
        </Button>
      </ButtonsContainer>
    </NotAuthorizedContainer>
  );
};
