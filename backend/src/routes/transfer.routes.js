const router = require('express').Router();
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try { res.json(await prisma.transferRoute.findMany({ where: { active: true }, orderBy: { createdAt: 'asc' } })); } catch (e) { next(e); }
});

router.post('/', auth, async (req, res, next) => { try { res.json(await prisma.transferRoute.create({ data: req.body })); } catch (e) { next(e); } });
router.put('/:id', auth, async (req, res, next) => { try { res.json(await prisma.transferRoute.update({ where: { id: +req.params.id }, data: req.body })); } catch (e) { next(e); } });
router.delete('/:id', auth, async (req, res, next) => { try { res.json(await prisma.transferRoute.delete({ where: { id: +req.params.id } })); } catch (e) { next(e); } });

module.exports = router;
