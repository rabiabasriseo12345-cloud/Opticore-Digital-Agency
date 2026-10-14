// ==========================================
// Input Validation Middleware (Course Slide 27 & 41)
// Never trust client input!
// ==========================================

const validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Name, email, and message are required'
    });
  }
  next();
};

const validateQuote = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    });
  }
  next();
};

module.exports = {
  validateContact,
  validateQuote
};
