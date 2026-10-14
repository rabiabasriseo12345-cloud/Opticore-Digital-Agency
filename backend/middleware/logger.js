// ==========================================
// Custom Request Logger Middleware (Course Slide 29)
// ==========================================

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url}`);
  next(); // next() call karna zaroori hai taake request aage jaye (Slide 31)
};

module.exports = requestLogger;
