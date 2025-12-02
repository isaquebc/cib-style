import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.default} 0%,
    ${({ theme }) => theme.colors.background.paper} 100%
  );
  text-align: center;
`;

export const ErrorCodeContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ErrorCode = styled.h1`
  font-size: clamp(80px, 15vw, 200px);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin: 0;
  line-height: 1;
  animation: ${bounce} 2s ease-in-out infinite;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FloatingIcon = styled.div<{ delay?: number }>`
  position: absolute;
  font-size: 40px;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || 0}s;

  &:nth-child(1) {
    top: -20px;
    left: -40px;
  }

  &:nth-child(2) {
    top: -30px;
    right: -40px;
  }

  &:nth-child(3) {
    bottom: -20px;
    left: -30px;
  }

  &:nth-child(4) {
    bottom: -30px;
    right: -30px;
  }
`;

export const SpinningIcon = styled.div`
  display: inline-block;
  animation: ${rotate} 3s linear infinite;
  margin: 0 ${({ theme }) => theme.spacing.sm};
`;

export const Title = styled.h2`
  font-size: clamp(24px, 4vw, 48px);
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.foreground.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

export const Description = styled.p`
  font-size: clamp(16px, 2vw, 20px);
  color: ${({ theme }) => theme.colors.foreground.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  max-width: 600px;
  line-height: 1.6;
`;

export const Suggestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: left;
  max-width: 500px;
`;

export const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.foreground.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.elevated};
    transform: translateX(4px);
  }

  svg, span:first-child {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 20px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;

export const Illustration = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 120px;
  filter: grayscale(0%);
  opacity: 0.9;
  animation: ${float} 4s ease-in-out infinite;
`;
