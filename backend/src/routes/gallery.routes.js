const router = require('express').Router();
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = { active: true };
    if (category) where.category = category;
    res.json(await prisma.gallery.findMany({ where, orderBy: [{ ord: 'asc' }, { createdAt: 'desc' }] }));
  } catch (e) { next(e); }
});

router.post('/', auth, async (req, res, next) => { try { res.json(await prisma.gallery.create({ data: req.body })); } catch (e) { next(e); } });
router.put('/:id', auth, async (req, res, next) => { try { res.json(await prisma.gallery.update({ where: { id: +req.params.id }, data: req.body })); } catch (e) { next(e); } });
router.delete('/:id', auth, async (req, res, next) => { try { res.json(await prisma.gallery.delete({ where: { id: +req.params.id } })); } catch (e) { next(e); } });

module.exports = router;
