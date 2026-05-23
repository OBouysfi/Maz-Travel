const router = require('express').Router();
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');

router.get('/stats', auth, async (req, res, next) => {
  try {
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
    const [totalQuotes, pendingQuotes, quotedQuotes, confirmedQuotes, monthQuotes, contacts, excursions, activities, recentQuotes, revenue] = await Promise.all([
      prisma.quote.count(),
      prisma.quote.count({ where: { status: 'PENDING' } }),
      prisma.quote.count({ where: { status: 'QUOTED' } }),
      prisma.quote.count({ where: { status: 'CONFIRMED' } }),
      prisma.quote.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.contact.count({ where: { read: false } }),
      prisma.excursion.count({ where: { active: true } }),
      prisma.activity.count({ where: { active: true } }),
      prisma.quote.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { excursion: true, activity: true } }),
      prisma.quote.aggregate({ where: { status: 'CONFIRMED', confirmedAt: { gte: monthStart } }, _sum: { adminPrice: true } }),
    ]);
    res.json({
      totals: { totalQuotes, pendingQuotes, quotedQuotes, confirmedQuotes, monthQuotes, contacts, excursions, activities },
      monthRevenue: revenue._sum.adminPrice || 0,
      recentQuotes,
    });
  } catch (e) { next(e); }
});

module.exports = router;
