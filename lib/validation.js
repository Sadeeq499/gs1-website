// lib/validation.js
// Pure validation logic — no React, works in any context.

/**
 * Validates a search query against a tab's validation rules.
 * Returns { valid: boolean, error: string | null, successMsg: string | null, progress: number }
 */
export function validateQuery(raw, validation) {
  // No validation rules → always valid (members free-text search)
  if (!validation) return { valid: true, error: null, successMsg: null, progress: 100 };

  const value = raw.trim();

  // Empty
  if (!value) {
    return { valid: false, error: null, successMsg: null, progress: 0 };
  }

  const { onlyDigits, allowedLengths, minLength, messages } = validation;

  // Digits-only check
  if (onlyDigits && /\D/.test(value)) {
    return { valid: false, error: messages.nonDigits, successMsg: null, progress: 10 };
  }

  // Numeric types → length validation
  if (onlyDigits && allowedLengths) {
    const len = value.length;
    const max = Math.max(...allowedLengths);
    const min = Math.min(...allowedLengths);
    const progress = Math.min(Math.round((len / max) * 100), 95);

    if (len < min) {
      return { valid: false, error: messages.tooShort(len), successMsg: null, progress };
    }
    if (len > max) {
      return { valid: false, error: messages.tooLong(len), successMsg: null, progress: 95 };
    }
    if (!allowedLengths.includes(len)) {
      return { valid: false, error: messages.invalidLength(len), successMsg: null, progress };
    }

    return { valid: true, error: null, successMsg: messages.valid, progress: 100 };
  }

  // Free-text with minLength (members)
  if (minLength && value.length < minLength) {
    const progress = Math.round((value.length / minLength) * 60);
    return { valid: false, error: messages.tooShort(value.length), successMsg: null, progress };
  }

  return { valid: true, error: null, successMsg: messages.valid || null, progress: 100 };
}