// ==========================================
// Error Handling Middleware (Course Slide 35 & 36)
// ==========================================

// Catch-All 404 Route Not Found Handler (Slide 36)
const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
};

// Global Error Handler - 4 arguments zaroori hain: (err, req, res, next) (Slide 35)
const globalErrorHandler = (err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({
    error: 'Something went wrong on the server'
  });
};

module.exports = {
  notFoundHandler,
  globalErrorHandler
};
