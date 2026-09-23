export function geolocationErrorMessage(error?: GeolocationPositionError) {
  if (!window.isSecureContext) {
    return "El GPS del navegador requiere una conexión segura (HTTPS). Puedes usar el modo Manual o marcar el punto en el mapa.";
  }
  if (!error) {
    return "Este dispositivo no ofrece ubicación GPS. Puedes usar el modo Manual o marcar el punto en el mapa.";
  }
  if (error.code === error.PERMISSION_DENIED) {
    return "El permiso de ubicación está bloqueado. Actívalo en los permisos del navegador o usa el modo Manual / mapa.";
  }
  if (error.code === error.TIMEOUT) {
    return "El teléfono tardó demasiado en obtener la ubicación. Intenta otra vez o marca el punto en el mapa.";
  }
  return "No pudimos obtener la ubicación. Revisa que la ubicación del teléfono esté activa o usa el modo Manual / mapa.";
}
