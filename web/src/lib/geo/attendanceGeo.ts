import type { AttendanceGeoPoint } from '@/types/attendanceSession';

const EARTH_RADIUS_M = 6371000;

function toRad(degrees: number) {
  return (degrees * Math.PI) / 180;
}

/** Haversine distance in meters between two GPS points */
export function distanceMeters(a: AttendanceGeoPoint, b: AttendanceGeoPoint): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function isWithinRadius(
  center: AttendanceGeoPoint,
  point: AttendanceGeoPoint,
  radiusMeters: number
): boolean {
  return distanceMeters(center, point) <= radiusMeters;
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

export async function getCurrentPosition(
  fallback: AttendanceGeoPoint
): Promise<{ point: AttendanceGeoPoint; usedFallback: boolean; error?: string }> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return { point: fallback, usedFallback: true, error: 'Geolocation not available' };
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });

    return {
      point: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracyMeters: position.coords.accuracy ?? null,
      },
      usedFallback: false,
    };
  } catch (err) {
    const message =
      err && typeof err === 'object' && 'code' in err
        ? geolocationErrorMessage(err as GeolocationPositionError)
        : 'Unable to read location';
    return { point: fallback, usedFallback: true, error: message };
  }
}

function geolocationErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'Location permission denied';
    case error.POSITION_UNAVAILABLE:
      return 'Location unavailable';
    case error.TIMEOUT:
      return 'Location request timed out';
    default:
      return 'Unable to read location';
  }
}

/** Offset a point by roughly N meters (demo helper for student outside/inside radius) */
export function offsetPoint(
  origin: AttendanceGeoPoint,
  metersNorth: number,
  metersEast: number
): AttendanceGeoPoint {
  const latOffset = metersNorth / 111_320;
  const lngOffset = metersEast / (111_320 * Math.cos(toRad(origin.lat)));
  return {
    lat: origin.lat + latOffset,
    lng: origin.lng + lngOffset,
    accuracyMeters: 8,
  };
}
