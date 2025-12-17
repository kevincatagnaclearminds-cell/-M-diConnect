/**
 * Helpers compartidos
 */

/**
 * Valida si un email es válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Genera un ID único
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Detecta si un email es de un servicio de correo temporal
 */
export const isTemporaryEmail = (email: string): boolean => {
  const temporaryEmailDomains = [
    'laupe.org',
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'msn.com',
    'aol.com',
    'icloud.com',
    'zoho.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'msn.com',
    'aol.com',
    'icloud.com',
    'zoho.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'msn.com',
    'aol.com',
    'icloud.com',
    'zoho.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'msn.com',
    'aol.com',
    'icloud.com',
    'zoho.com',
    '10minutemail.com',
    '10minutemail.net',
    '10minutemail.org',
    'guerrillamail.com',
    'guerrillamail.net',
    'guerrillamail.org',
    'guerrillamailblock.com',
    'pokemail.net',
    'spam4.me',
    'temp-mail.org',
    'temp-mail.io',
    'tempail.com',
    'tempmail.com',
    'tempmail.net',
    'tempmail.org',
    'throwaway.email',
    'mailinator.com',
    'mohmal.com',
    'yopmail.com',
    'getnada.com',
    'maildrop.cc',
    'sharklasers.com',
    'grr.la',
    'getairmail.com',
    'tmpmail.org',
    'mail.tm',
    'emailondeck.com',
    'fakeinbox.com',
    'mintemail.com',
    'mytrashmail.com',
    'trashmail.com',
    'trashmail.net',
    'dispostable.com',
    'mailcatch.com',
    'meltmail.com',
    'melt.li',
    'inboxkitten.com',
    'emailfake.com',
    'fakemail.net',
    'fakemailgenerator.com',
    'mailnesia.com',
    'mintemail.com',
    'mohmal.com',
    'mytrashmail.com',
    'nada.email',
    'nada.ltd',
    'nada.pro',
    'nadaemail.com',
    'nadaemail.net',
    'nadaemail.org',
    'nadaemail.tk',
    'nadaemail.xyz',
    'nadaemails.com',
    'nadaemails.net',
    'nadaemails.org',
    'nadaemails.tk',
    'nadaemails.xyz',
    'nadaemails.info',
    'nadaemails.ml',
    'nadaemails.gq',
    'nadaemails.cf',
    'nadaemails.ga',
    'nadaemails.tk',
    'nadaemails.ml',
    'nadaemails.gq',
    'nadaemails.cf',
    'nadaemails.ga',
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  // Verificar dominio exacto
  if (temporaryEmailDomains.includes(domain)) {
    return true;
  }

  // Verificar patrones comunes de correos temporales
  const temporaryPatterns = [
    /^temp/i,
    /^tmp/i,
    /^fake/i,
    /^throwaway/i,
    /^trash/i,
    /^disposable/i,
    /^nada/i,
    /^mohmal/i,
    /^guerrilla/i,
    /^10min/i,
  ];

  return temporaryPatterns.some(pattern => pattern.test(domain));
};

