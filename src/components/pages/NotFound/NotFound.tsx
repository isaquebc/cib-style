import { Button } from '@atoms/Button';
import {
  NotFoundContainer,
  ErrorCodeContainer,
  ErrorCode,
  FloatingIcon,
  SpinningIcon,
  Title,
  Description,
  Suggestions,
  SuggestionItem,
  ButtonsContainer,
  Illustration,
} from './NotFound.style';

export interface NotFoundProps {
  /**
   * Callback when "Go Home" button is clicked
   */
  handleGoHome?: () => void;

  /**
   * Callback when "Go Back" button is clicked
   */
  handleGoBack?: () => void;

  /**
   * Custom title (default: "Oops! Page Not Found")
   */
  title?: string;

  /**
   * Custom description
   */
  description?: string;

  /**
   * Show suggestions section
   */
  showSuggestions?: boolean;

  /**
   * Show illustration
   */
  showIllustration?: boolean;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * NotFound component - A fun 404 error page
 *
 * @example
 * ```tsx
 * <NotFound
 *   handleGoHome={() => navigate('/')}
 *   handleGoBack={() => navigate(-1)}
 * />
 * ```
 */
export const NotFound = ({
  handleGoHome,
  handleGoBack,
  title = 'Oops! Page Not Found',
  description = "The page you're looking for seems to have wandered off into the digital wilderness. Don't worry, it happens to the best of us!",
  showSuggestions = true,
  showIllustration = true,
  className,
}: NotFoundProps) => {
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

  return (
    <NotFoundContainer className={className}>
      {showIllustration && <Illustration>🔍</Illustration>}

      <ErrorCodeContainer>
        <FloatingIcon delay={0}>✨</FloatingIcon>
        <FloatingIcon delay={0.5}>🌟</FloatingIcon>
        <FloatingIcon delay={1}>⭐</FloatingIcon>
        <FloatingIcon delay={1.5}>💫</FloatingIcon>
        <ErrorCode>404</ErrorCode>
      </ErrorCodeContainer>

      <Title>
        {title}
        <SpinningIcon>🌀</SpinningIcon>
      </Title>

      <Description>{description}</Description>

      {showSuggestions && (
        <Suggestions>
          <SuggestionItem>
            <span>🏠</span>
            <span>Check if the URL is correct</span>
          </SuggestionItem>
          <SuggestionItem>
            <span>🔙</span>
            <span>Go back to the previous page</span>
          </SuggestionItem>
          <SuggestionItem>
            <span>🏡</span>
            <span>Return to the homepage</span>
          </SuggestionItem>
          <SuggestionItem>
            <span>🔍</span>
            <span>Try searching for what you need</span>
          </SuggestionItem>
        </Suggestions>
      )}

      <ButtonsContainer>
        <Button
          variant="primary"
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
    </NotFoundContainer>
  );
};
