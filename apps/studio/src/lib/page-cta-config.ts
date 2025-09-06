import { PageType, PageCTA } from '../types/prototype';

/**
 * Default CTA configurations for each page type
 */
export const DEFAULT_CTA_CONFIG: Record<PageType, PageCTA> = {
  start: {
    text: 'Start now',
    type: 'start',
    action: 'start',
    nextPageId: undefined
  },
  content: {
    text: 'Continue',
    type: 'primary',
    action: 'continue',
    nextPageId: undefined
  },
  question: {
    text: 'Save and continue',
    type: 'primary',
    action: 'continue',
    nextPageId: undefined
  },
  'check-answers': {
    text: 'Accept and send',
    type: 'primary',
    action: 'submit',
    nextPageId: undefined
  },
  confirmation: {
    text: 'Start again',
    type: 'secondary',
    action: 'custom',
    nextPageId: undefined
  },
  'service-navigation': {
    text: 'Continue',
    type: 'primary',
    action: 'continue',
    nextPageId: undefined
  }
};

/**
 * Get the default CTA for a page type
 */
export function getDefaultCTA(pageType: PageType): PageCTA {
  return { ...DEFAULT_CTA_CONFIG[pageType] };
}

/**
 * Get CTA configuration for a page, using defaults if not specified
 */
export function getPageCTA(pageType: PageType, customCTA?: PageCTA): PageCTA {
  if (customCTA) {
    return customCTA;
  }
  return getDefaultCTA(pageType);
}

/**
 * CTA button styling based on type
 */
export const CTA_STYLES = {
  start: {
    backgroundColor: '#00703c',
    color: 'white',
    border: 'none',
    borderRadius: '0',
    padding: '8px 10px 7px',
    fontSize: '19px',
    fontWeight: '400',
    cursor: 'pointer',
    boxShadow: '0 2px 0 #002d18',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },
  primary: {
    backgroundColor: '#00703c',
    color: 'white',
    border: 'none',
    borderRadius: '0',
    padding: '8px 10px 7px',
    fontSize: '19px',
    fontWeight: '400',
    cursor: 'pointer',
    boxShadow: '0 2px 0 #002d18',
    textDecoration: 'none',
    display: 'inline-block'
  },
  secondary: {
    backgroundColor: '#f3f2f1',
    color: '#0b0c0c',
    border: '2px solid #0b0c0c',
    borderRadius: '0',
    padding: '6px 8px 5px',
    fontSize: '19px',
    fontWeight: '400',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block'
  },
  warning: {
    backgroundColor: '#d4351c',
    color: 'white',
    border: 'none',
    borderRadius: '0',
    padding: '8px 10px 7px',
    fontSize: '19px',
    fontWeight: '400',
    cursor: 'pointer',
    boxShadow: '0 2px 0 #55150b',
    textDecoration: 'none',
    display: 'inline-block'
  }
};

/**
 * Get hover styles for CTA buttons
 */
export const CTA_HOVER_STYLES = {
  start: {
    backgroundColor: '#005a30'
  },
  primary: {
    backgroundColor: '#005a30'
  },
  secondary: {
    backgroundColor: '#0b0c0c',
    color: '#f3f2f1'
  },
  warning: {
    backgroundColor: '#aa2a16'
  }
};
