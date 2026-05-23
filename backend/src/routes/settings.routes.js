const router = require('express').Router();
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const items = await prisma.setting.findMany();
    const obj = {};
    items.forEach((s) => { obj[s.keyName] = s.value; });
    res.json(obj);
  } catch (e) { next(e); }
});

router.put('/', auth, async (req, res, next) => {
  try {
    const updates = req.body;
    for (const [keyName, value] of Object.entries(updates)) {
      await prisma.setting.upsert({ where: { keyName }, update: { value: String(value) }, create: { keyName, value: String(value) } });
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

module.exports = router;
