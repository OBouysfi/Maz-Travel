const router = require('express').Router();
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');

function localize(item, lang = 'fr') {
  if (!item) return item;
  const L = lang.toUpperCase().charAt(0) + lang.slice(1).toLowerCase();
  return {
    ...item,
    title: item[`title${L}`] || item.titleFr,
    description: item[`description${L}`] || item.descriptionFr,
    program: item[`program${L}`] || item.programFr,
    badges: item.badges ? JSON.parse(item.badges) : [],
    gallery: item.gallery ? JSON.parse(item.gallery) : [],
  };
}

router.get('/', async (req, res, next) => {
  try {
    const { featured, lang = 'fr', limit, search, sort, minPrice, maxPrice } = req.query;
    const isAdmin = req.query.admin === 'true';
    const where = isAdmin ? {} : { active: true };
    if (!isAdmin && featured) where.featured = true;
    if (!isAdmin && search) where.OR = [
      { titleFr: { contains: search } }, { titleEn: { contains: search } }, { titleEs: { contains: search } },
    ];
    if (!isAdmin && (minPrice || maxPrice)) {
      where.priceMad = {};
      if (minPrice) where.priceMad.gte = +minPrice;
      if (maxPrice) where.priceMad.lte = +maxPrice;
    }
    const orderBy = sort === 'price_asc' ? { priceMad: 'asc' } : sort === 'price_desc' ? { priceMad: 'desc' } : { createdAt: 'desc' };
    const items = await prisma.excursion.findMany({ where, orderBy, take: limit ? +limit : undefined });
    res.json(isAdmin ? items : items.map((i) => localize(i, lang)));
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const item = await prisma.excursion.findUnique({ where: { slug: req.params.slug } });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(localize(item, req.query.lang || 'fr'));
  } catch (e) { next(e); }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const { id, createdAt, updatedAt, title, description, program, badges: rawBadges, gallery: rawGallery, ...data } = req.body;
    
    Object.keys(data).forEach(k => { if (data[k] === null || data[k] === '') delete data[k]; });
    
    if (rawGallery !== undefined) data.gallery = Array.isArray(rawGallery) ? JSON.stringify(rawGallery) : typeof rawGallery === 'string' ? rawGallery : '[]';
    if (rawBadges !== undefined) data.badges = Array.isArray(rawBadges) ? JSON.stringify(rawBadges) : typeof rawBadges === 'string' ? rawBadges : '[]';

    res.json(await prisma.excursion.create({ data }));
  } catch (e) { next(e); }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const { id, createdAt, updatedAt, title, description, program, badges: rawBadges, gallery: rawGallery, ...data } = req.body;
    
    Object.keys(data).forEach(k => { if (data[k] === null || data[k] === '') delete data[k]; });
    
    if (rawGallery !== undefined) data.gallery = Array.isArray(rawGallery) ? JSON.stringify(rawGallery) : typeof rawGallery === 'string' ? rawGallery : '[]';
    if (rawBadges !== undefined) data.badges = Array.isArray(rawBadges) ? JSON.stringify(rawBadges) : typeof rawBadges === 'string' ? rawBadges : '[]';

    res.json(await prisma.excursion.update({ where: { id: +req.params.id }, data }));
  } catch (e) { 
    console.error('ERROR:', e.message);
    next(e); 
  }
});

router.delete('/:id', auth, async (req, res, next) => { try { res.json(await prisma.excursion.delete({ where: { id: +req.params.id } })); } catch (e) { next(e); } });

module.exports = router;
