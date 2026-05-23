const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

router.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.password))) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) { next(err); }
});

router.get('/me', auth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, email: true, name: true, role: true } });
  res.json(user);
});

module.exports = router;
