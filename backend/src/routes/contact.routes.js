const router = require('express').Router();
const { z } = require('zod');
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');
const { sendMail } = require('../utils/mailer');

const schema = z.object({
  name: z.string().min(2), email: z.string().email(), phone: z.string().optional(),
  service: z.string().optional(), date: z.string().optional(), persons: z.number().optional(),
  message: z.string().min(5),
});

router.post('/', async (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    const c = await prisma.contact.create({ data: { ...data, date: data.date ? new Date(data.date) : null } });
    await sendMail({
      subject: '✉️ Nouveau message — Maz Travel',
      html: `<h2>Nouveau message</h2><p><b>Nom :</b> ${data.name}</p><p><b>Email :</b> ${data.email}</p>
        <p><b>Téléphone :</b> ${data.phone || '—'}</p><p><b>Service :</b> ${data.service || '—'}</p>
        <p><b>Message :</b><br>${data.message}</p>`
    });
    res.json({ ok: true, contact: c });
  } catch (e) { next(e); }
});

router.get('/', auth, async (req, res, next) => { try { res.json(await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } })); } catch (e) { next(e); } });
router.put('/:id/read', auth, async (req, res, next) => { try { res.json(await prisma.contact.update({ where: { id: +req.params.id }, data: { read: true } })); } catch (e) { next(e); } });
router.delete('/:id', auth, async (req, res, next) => { try { res.json(await prisma.contact.delete({ where: { id: +req.params.id } })); } catch (e) { next(e); } });

module.exports = router;
