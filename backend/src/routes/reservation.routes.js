const router = require('express').Router();
const { z } = require('zod');
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');
const { sendMail } = require('../utils/mailer');

const reservationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  serviceType: z.enum(['transfer', 'excursion', 'activity', 'disposition']),
  serviceId: z.number().optional().nullable(),
  pickupLocation: z.string().optional().nullable(),
  dropLocation: z.string().optional().nullable(),
  date: z.string(),
  persons: z.number().min(1).default(1),
  vehicleType: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
});

router.post('/', async (req, res, next) => {
  try {
    const data = reservationSchema.parse(req.body);
    const reservation = await prisma.reservation.create({
      data: { ...data, date: new Date(data.date) }
    });

    await sendMail({
      subject: `🚙 Nouvelle réservation — ${data.serviceType}`,
      html: `<h2>Nouvelle réservation</h2>
        <p><b>Client :</b> ${data.fullName}</p>
        <p><b>Email :</b> ${data.email}</p>
        <p><b>Téléphone :</b> ${data.phone}</p>
        <p><b>Service :</b> ${data.serviceType}</p>
        <p><b>Date :</b> ${data.date}</p>
        <p><b>Personnes :</b> ${data.persons}</p>
        <p><b>Message :</b> ${data.message || '—'}</p>`
    });

    res.json({ ok: true, reservation });
  } catch (e) { next(e); }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const { status } = req.query;
    const items = await prisma.reservation.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (e) { next(e); }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    res.json(await prisma.reservation.update({ where: { id: +req.params.id }, data: req.body }));
  } catch (e) { next(e); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try { res.json(await prisma.reservation.delete({ where: { id: +req.params.id } })); } catch (e) { next(e); }
});

module.exports = router;
