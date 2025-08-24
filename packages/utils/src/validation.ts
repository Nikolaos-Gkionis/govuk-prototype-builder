// Validation helper functions

/**
 * Validate email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate UK postcode
 */
export function validatePostcode(postcode: string): boolean {
  const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
  return postcodeRegex.test(postcode.trim());
}

/**
 * Validate UK phone number
 */
export function validatePhoneNumber(phone: string): boolean {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // UK phone numbers should be 10 or 11 digits
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return false;
  }
  
  // Should start with 0 if 11 digits, or be a mobile number
  if (cleanPhone.length === 11 && !cleanPhone.startsWith('0')) {
    return false;
  }
  
  return true;
}

/**
 * Validate date in DD/MM/YYYY format
 */
export function validateDate(dateString: string): boolean {
  const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = dateString.match(dateRegex);
  
  if (!match) return false;
  
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  
  // Basic range checks
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > 2100) return false;
  
  // Create date and check if it's valid
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && 
         date.getMonth() === month - 1 && 
         date.getDate() === day;
}

/**
 * Validate National Insurance number
 */
export function validateNiNumber(nino: string): boolean {
  const ninoRegex = /^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{1}$/i;
  return ninoRegex.test(nino.replace(/\s/g, ''));
}

/**
 * Generic required field validation
 */
export function validateRequired(value: any): boolean {
  if (value == null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}
