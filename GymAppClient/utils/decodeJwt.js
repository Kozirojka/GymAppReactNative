
export function decodeJwt(token) {
    if (!token) return null;
  
    try {
      const payloadBase64 = token.split('.')[1];
  
      if (!payloadBase64) {
        throw new Error('Invalid token format');
      }
  
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
  
      const decoded = JSON.parse(jsonPayload);
      return decoded;
    } catch (e) {
      console.error("⛔️ Failed to decode JWT:", e);
      return null;
    }
  }
  
  export function getUserRoleFromJwt(token) {
    const decoded = decodeJwt(token);
    return decoded?.role || null;
  }

  export function getUserLastNameFromJwt(token) {
    const decoded = decodeJwt(token);
    return decoded?.FirstName || null;
  }

  export function getUserFirstNameFromJwt(token) {
    const decoded = decodeJwt(token);
    return decoded?.LastName || null;
  }