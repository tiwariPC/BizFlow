import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock fetch
global.fetch = vi.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mocked-url');

// Mock URL.revokeObjectURL
global.URL.revokeObjectURL = vi.fn();

// Mock FileReader
global.FileReader = vi.fn().mockImplementation(() => ({
  readAsDataURL: vi.fn(),
  readAsText: vi.fn(),
  readAsArrayBuffer: vi.fn(),
  onload: null,
  onerror: null,
  result: null,
}));

// Mock crypto.randomUUID
global.crypto = {
  ...global.crypto,
  randomUUID: vi.fn(() => 'mocked-uuid'),
};

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 0));
global.cancelAnimationFrame = vi.fn();

// Mock performance.now
global.performance = {
  ...global.performance,
  now: vi.fn(() => Date.now()),
};

// Mock scrollTo
global.scrollTo = vi.fn();

// Mock getComputedStyle
global.getComputedStyle = vi.fn(() => ({
  getPropertyValue: vi.fn(() => ''),
}));

// Mock Element.prototype methods
Element.prototype.scrollIntoView = vi.fn();
Element.prototype.scrollTo = vi.fn();

// Mock HTMLElement.prototype methods
HTMLElement.prototype.focus = vi.fn();
HTMLElement.prototype.blur = vi.fn();
HTMLElement.prototype.click = vi.fn();

// Mock window.location
delete (window as any).location;
window.location = {
  ...window.location,
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  href: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/',
  search: '',
  hash: '',
} as any;

// Mock window.history
window.history = {
  ...window.history,
  pushState: vi.fn(),
  replaceState: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
} as any;

// Mock window.navigator
Object.defineProperty(window, 'navigator', {
  value: {
    ...window.navigator,
    userAgent: 'test-user-agent',
    language: 'en-US',
    languages: ['en-US', 'en'],
    onLine: true,
    geolocation: {
      getCurrentPosition: vi.fn(),
      watchPosition: vi.fn(),
      clearWatch: vi.fn(),
    },
  },
  writable: true,
});

// Mock window.document methods
document.createRange = vi.fn(() => ({
  setStart: vi.fn(),
  setEnd: vi.fn(),
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
}));

// Mock window.getSelection
window.getSelection = vi.fn(() => ({
  removeAllRanges: vi.fn(),
  addRange: vi.fn(),
  toString: vi.fn(() => ''),
}));

// Mock window.URLSearchParams
global.URLSearchParams = vi.fn().mockImplementation((init) => ({
  get: vi.fn(),
  set: vi.fn(),
  append: vi.fn(),
  delete: vi.fn(),
  has: vi.fn(),
  forEach: vi.fn(),
  toString: vi.fn(() => ''),
  ...init,
}));

// Mock window.Headers
global.Headers = vi.fn().mockImplementation((init) => ({
  get: vi.fn(),
  set: vi.fn(),
  append: vi.fn(),
  delete: vi.fn(),
  has: vi.fn(),
  forEach: vi.fn(),
  ...init,
}));

// Mock window.Request
global.Request = vi.fn().mockImplementation((input, init) => ({
  url: typeof input === 'string' ? input : input.url,
  method: 'GET',
  headers: new Headers(),
  body: null,
  ...init,
}));

// Mock window.Response
global.Response = vi.fn().mockImplementation((body, init) => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  headers: new Headers(),
  json: vi.fn(() => Promise.resolve(body)),
  text: vi.fn(() => Promise.resolve(body)),
  ...init,
}));

// Setup test environment variables
process.env.NODE_ENV = 'test';
process.env.VITE_API_URL = 'http://localhost:3000/api';
process.env.VITE_APP_NAME = 'BizFlow Test';

// Mock environment variables
vi.stubEnv('NODE_ENV', 'test');
vi.stubEnv('VITE_API_URL', 'http://localhost:3000/api');
vi.stubEnv('VITE_APP_NAME', 'BizFlow Test');

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
  localStorageMock.clear();
  sessionStorageMock.clear();
});
