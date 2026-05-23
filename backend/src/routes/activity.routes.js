const router = require('express').Router();
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');

function localize(item, lang = 'fr') {
  if (!item) return item;
  const L = lang.toUpperCase().charAt(0) + lang.slice(1).toLowerCase();
  return { ...item, title: item[`title${L}`] || item.titleFr, description: item[`description${L}`] || item.descriptionFr };
}

router.get('/', async (req, res, next) => {
  try {
    const { category, featured, lang = 'fr', limit } = req.query;
    const where = { active: true };
    if (category) where.category = category;
    if (featured) where.featured = true;
    const items = await prisma.activity.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit ? +limit : undefined });
    res.json(items.map((i) => localize(i, lang)));
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const item = await prisma.activity.findUnique({ where: { slug: req.params.slug } });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(localize(item, req.query.lang || 'fr'));
  } catch (e) { next(e); }
});

router.post('/', auth, async (req, res, next) => { try { res.json(await prisma.activity.create({ data: req.body })); } catch (e) { next(e); } });
router.put('/:id', auth, async (req, res, next) => { try { res.json(await prisma.activity.update({ where: { id: +req.params.id }, data: req.body })); } catch (e) { next(e); } });
router.delete('/:id', auth, async (req, res, next) => { try { res.json(await prisma.activity.delete({ where: { id: +req.params.id } })); } catch (e) { next(e); } });

module.exports = router;
