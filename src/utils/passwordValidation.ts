/**
 * Password validation utilities for user registration
 */

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
}

export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSymbol: boolean;
}

/**
 * Default password requirements for Anbu Gynaecare
 */
export const DEFAULT_PASSWORD_REQUIREMENTS: PasswordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: true,
};

/**
 * Validates a password against the given requirements
 */
export function validatePassword(
  password: string,
  requirements: PasswordRequirements = DEFAULT_PASSWORD_REQUIREMENTS
): PasswordValidationResult {
  const errors: string[] = [];
  let strengthScore = 0;

  // Check minimum length
  if (password.length < requirements.minLength) {
    errors.push(`At least ${requirements.minLength} characters long`);
  } else {
    strengthScore += 1;
  }

  // Check for uppercase letter
  if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('One uppercase letter (A-Z)');
  } else if (requirements.requireUppercase) {
    strengthScore += 1;
  }

  // Check for lowercase letter
  if (requirements.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('One lowercase letter (a-z)');
  } else if (requirements.requireLowercase) {
    strengthScore += 1;
  }

  // Check for number
  if (requirements.requireNumber && !/\d/.test(password)) {
    errors.push('One number (0-9)');
  } else if (requirements.requireNumber) {
    strengthScore += 1;
  }

  // Check for symbol
  if (requirements.requireSymbol && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('One symbol (!@#$%^&*)');
  } else if (requirements.requireSymbol) {
    strengthScore += 1;
  }

  // Determine strength
  let strength: 'weak' | 'medium' | 'strong';
  if (strengthScore <= 2) {
    strength = 'weak';
  } else if (strengthScore <= 4) {
    strength = 'medium';
  } else {
    strength = 'strong';
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * Generates a user-friendly error message for password validation
 */
export function getPasswordErrorMessage(validation: PasswordValidationResult): string {
  if (validation.isValid) {
    return '';
  }

  if (validation.errors.length === 1) {
    return `Password must contain ${validation.errors[0].toLowerCase()}`;
  }

  const lastError = validation.errors.pop();
  const errorList = validation.errors.join(', ');
  return `Password must contain: ${errorList} and ${lastError?.toLowerCase()}`;
}

/**
 * Gets a strength indicator message
 */
export function getPasswordStrengthMessage(strength: 'weak' | 'medium' | 'strong'): string {
  switch (strength) {
    case 'weak':
      return 'Weak password - consider adding more requirements';
    case 'medium':
      return 'Medium strength - good, but could be stronger';
    case 'strong':
      return 'Strong password - excellent security!';
    default:
      return '';
  }
}