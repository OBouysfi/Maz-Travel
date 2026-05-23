require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date() }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/excursions', require('./routes/excursion.routes'));
app.use('/api/activities', require('./routes/activity.routes'));
app.use('/api/transfers', require('./routes/transfer.routes'));
app.use('/api/vehicles', require('./routes/vehicle.routes'));
app.use('/api/quotes', require('./routes/quote.routes'));
app.use('/api/contacts', require('./routes/contact.routes'));
app.use('/api/testimonials', require('./routes/testimonial.routes'));
app.use('/api/gallery', require('./routes/gallery.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/settings', require('./routes/settings.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => logger.info(`🚀 Maz Travel API on port ${PORT}`));
