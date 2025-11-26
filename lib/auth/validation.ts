/**
 * Input validation and sanitization for authentication
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];

  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
    return { valid: false, errors };
  }

  const trimmed = email.trim().toLowerCase();
  
  if (trimmed.length === 0) {
    errors.push('Email cannot be empty');
  }

  if (trimmed.length > 254) {
    errors.push('Email is too long');
  }

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    errors.push('Invalid email format');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
    return { valid: false, errors };
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (password.length > 128) {
    errors.push('Password is too long');
  }

  // Check for at least one letter and one number
  if (!/[a-zA-Z]/.test(password)) {
    errors.push('Password must contain at least one letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate name fields
 */
export function validateName(name: string, fieldName: string = 'Name'): ValidationResult {
  const errors: string[] = [];

  if (!name || typeof name !== 'string') {
    errors.push(`${fieldName} is required`);
    return { valid: false, errors };
  }

  const trimmed = name.trim();

  if (trimmed.length === 0) {
    errors.push(`${fieldName} cannot be empty`);
  }

  if (trimmed.length > 50) {
    errors.push(`${fieldName} is too long`);
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    errors.push(`${fieldName} contains invalid characters`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 500); // Limit length
}

