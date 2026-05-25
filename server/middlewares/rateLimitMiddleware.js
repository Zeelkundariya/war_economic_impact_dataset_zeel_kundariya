const createRateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 60000; // 1 minute default
  const max = options.max || 10; // 10 requests default
  const message = options.message || 'Too many requests, please try again later.';
  const rateLimitStore = {}; // Isolated store per limiter instance

  return (req, res, next) => {
    // Get client IP address
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const now = Date.now();

    if (!rateLimitStore[ip]) {
      rateLimitStore[ip] = [];
    }

    // Filter out request timestamps older than the window
    rateLimitStore[ip] = rateLimitStore[ip].filter(timestamp => now - timestamp < windowMs);

    if (rateLimitStore[ip].length >= max) {
      return res.status(429).json({ message });
    }

    // Add current request timestamp
    rateLimitStore[ip].push(now);

    // Set standard rate-limiting response headers
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - rateLimitStore[ip].length));

    next();
  };
};

// 1. Conflicts Rate Limiter (Limit requests per minute)
const conflictsLimiter = createRateLimiter({
  windowMs: 60000,
  max: 5, // Set to 5 for easy testing in Postman
  message: 'Too many requests to conflicts, please try again after a minute.',
});

// 2. Login Rate Limiter (Prevent brute force attacks)
const loginLimiter = createRateLimiter({
  windowMs: 60000,
  max: 3, // Set to 3 for brute force protection
  message: 'Too many login attempts, brute force protection active. Try again in a minute.',
});

// 3. Register Rate Limiter (Limit registration requests)
const registerLimiter = createRateLimiter({
  windowMs: 60000,
  max: 2, // Set to 2 to limit registrations
  message: 'Too many registration requests from this IP. Try again in a minute.',
});

// 4. Search Rate Limiter (Limit excessive searches)
const searchLimiter = createRateLimiter({
  windowMs: 60000,
  max: 4, // Set to 4 to limit excessive searches
  message: 'Too many search requests, please slow down.',
});

// 5. Admin Dashboard Rate Limiter (Strict admin rate limiting)
const adminDashboardLimiter = createRateLimiter({
  windowMs: 60000,
  max: 2, // Set to 2 for strict admin limiting
  message: 'Strict admin rate limit exceeded. Try again in a minute.',
});

// 6. Create Conflict Rate Limiter (Prevent spam submissions)
const createConflictLimiter = createRateLimiter({
  windowMs: 60000,
  max: 3, // Set to 3 to prevent spam submissions
  message: 'Too many conflicts created from this IP. Please try again after a minute.',
});

// 7. Delete Conflict Rate Limiter (Limit delete requests)
const deleteConflictLimiter = createRateLimiter({
  windowMs: 60000,
  max: 2, // Set to 2 to limit delete requests
  message: 'Too many delete requests from this IP. Please try again after a minute.',
});

// 8. Import JSON Rate Limiter (Limit bulk uploads)
const importJsonLimiter = createRateLimiter({
  windowMs: 60000,
  max: 2, // Set to 2 to limit bulk uploads
  message: 'Too many bulk uploads from this IP. Please try again after a minute.',
});

module.exports = {
  conflictsLimiter,
  loginLimiter,
  registerLimiter,
  searchLimiter,
  adminDashboardLimiter,
  createConflictLimiter,
  deleteConflictLimiter,
  importJsonLimiter,
};
