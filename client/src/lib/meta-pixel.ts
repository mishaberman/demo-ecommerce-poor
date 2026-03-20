/**
 * Meta Pixel Helper — POOR Implementation
 * 
 * Basic pixel with many gaps, NO CAPI at all.
 * - No advanced matching
 * - No noscript fallback
 * - Events fire with minimal parameters
 * - No event_id
 * - No Search event
 * - No PII capture from forms
 * - NO CAPI — completely absent
 */

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

const PIXEL_ID = '1684145446350033';

// ============================================================
// PIXEL EVENTS — minimal parameters
// ============================================================

export function trackPixelEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
    console.log(`[Meta Pixel] Tracked: ${eventName}`, params);
  }
}

export function trackCustomEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
    console.log(`[Meta Pixel] Custom tracked: ${eventName}`, params);
  }
}

export function trackViewContent(productId: string, _productName: string, value: number, currency: string) {
  // Only content_ids, value, currency — missing content_type, content_name, content_category
  trackPixelEvent('ViewContent', {
    content_ids: [productId],
    value,
    currency,
  });
}

export function trackAddToCart(_productId: string, _productName: string, value: number, currency: string, _quantity: number) {
  // Only value and currency — MISSING content_ids, content_type, content_name, num_items
  trackPixelEvent('AddToCart', {
    value,
    currency,
  });
}

export function trackInitiateCheckout(value: number, currency: string, _numItems: number) {
  // Only value and currency — missing everything else
  trackPixelEvent('InitiateCheckout', {
    value,
    currency,
  });
}

export function trackPurchase(value: number, currency: string, _contentIds?: string[]) {
  // Only value and currency — MISSING content_ids (critical for dynamic ads!), content_type, num_items
  trackPixelEvent('Purchase', {
    value,
    currency,
  });
}

export function trackLead(_formType?: string) {
  // No params at all
  trackPixelEvent('Lead', {});
}

export function trackCompleteRegistration(_method?: string) {
  // No params at all
  trackPixelEvent('CompleteRegistration', {});
}

export function trackContact() {
  // No params at all
  trackPixelEvent('Contact', {});
}

// NO CAPI implementation at all
// NO trackSearch
// NO setUserData
// NO event_id generation
// NO hashing
// NO cookie helpers
