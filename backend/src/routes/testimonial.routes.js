const router = require('express').Router();
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const { lang, featured } = req.query;
    const where = { active: true };
    if (featured) where.featured = true;
    if (lang) where.language = lang;
    res.json(await prisma.testimonial.findMany({ where, orderBy: { createdAt: 'desc' } }));
  } catch (e) { next(e); }
});

router.post('/', auth, async (req, res, next) => { try { res.json(await prisma.testimonial.create({ data: req.body })); } catch (e) { next(e); } });
router.put('/:id', auth, async (req, res, next) => { try { res.json(await prisma.testimonial.update({ where: { id: +req.params.id }, data: req.body })); } catch (e) { next(e); } });
router.delete('/:id', auth, async (req, res, next) => { try { res.json(await prisma.testimonial.delete({ where: { id: +req.params.id } })); } catch (e) { next(e); } });

module.exports = router;
