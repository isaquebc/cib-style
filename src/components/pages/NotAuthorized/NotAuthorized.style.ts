import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(220, 38, 38, 0.6);
  }
`;

export const NotAuthorizedContainer = styled.div`
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
  color: ${({ theme }) => theme.colors.status.error};
  margin: 0;
  line-height: 1;
  animation: ${pulse} 2s ease-in-out infinite;
  text-shadow: 4px 4px 8px rgba(220, 38, 38, 0.2);
`;

export const LockIcon = styled.div`
  font-size: 100px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  animation: ${shake} 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(220, 38, 38, 0.3));
`;

export const ShieldContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Shield = styled.div`
  font-size: 120px;
  animation: ${float} 4s ease-in-out infinite, ${glow} 3s ease-in-out infinite;
`;

export const FloatingIcon = styled.div<{ delay?: number }>`
  position: absolute;
  font-size: 30px;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || 0}s;
  opacity: 0.8;

  &:nth-child(1) {
    top: -10px;
    left: -40px;
  }

  &:nth-child(2) {
    top: -20px;
    right: -40px;
  }

  &:nth-child(3) {
    bottom: -10px;
    left: -30px;
  }

  &:nth-child(4) {
    bottom: -20px;
    right: -30px;
  }
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

export const WarningBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: ${({ theme }) => `${theme.colors.status.warning}15`};
  border-left: 4px solid ${({ theme }) => theme.colors.status.warning};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;

  svg, span:first-child {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.status.warning};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.foreground.primary};
    text-align: left;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  }
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
    color: ${({ theme }) => theme.colors.status.error};
    font-size: 20px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;
