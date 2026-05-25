const router = require('express').Router();
const { z } = require('zod');
const prisma = require('../config/prisma');
const auth = require('../middleware/auth');
const { sendMail } = require('../utils/mailer');

const quoteSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  language: z.string().default('fr'),
  serviceType: z.enum(['TRANSFER', 'DISPOSITION', 'EXCURSION', 'ACTIVITY']),
  pickupLocation: z.string().optional().nullable(),
  dropLocation: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  excursionId: z.number().optional().nullable(),
  activityId: z.number().optional().nullable(),
  date: z.string(),
  time: z.string().optional().nullable(),
  adults: z.number().min(1).default(1),
  children: z.number().default(0),
  babies: z.number().default(0),
  vehicleType: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

async function generateQuoteNumber() {
  const year = new Date().getFullYear();
  const count = await prisma.quote.count({ where: { quoteNumber: { startsWith: `MAZ-${year}-` } } });
  return `MAZ-${year}-${String(count + 1).padStart(4, '0')}`;
}

// Public: create quote
router.post('/', async (req, res, next) => {
  try {
    const data = quoteSchema.parse(req.body);
    const quoteNumber = await generateQuoteNumber();
    const quote = await prisma.quote.create({
      data: { ...data, quoteNumber, date: new Date(data.date) },
      include: { excursion: true, activity: true },
    });

    // Notify admin
    await sendMail({
      subject: `🆕 Nouveau devis ${quoteNumber} — ${data.serviceType}`,
      html: `<h2>Nouvelle demande de devis</h2>
        <p><b>N° :</b> ${quoteNumber}</p>
        <p><b>Client :</b> ${data.fullName}</p>
        <p><b>Email :</b> ${data.email}</p>
        <p><b>Téléphone :</b> ${data.phone}</p>
        <p><b>Service :</b> ${data.serviceType}</p>
        <p><b>Date :</b> ${data.date} ${data.time || ''}</p>
        <p><b>Participants :</b> ${data.adults}A ${data.children}E ${data.babies}B</p>
        <p><b>Message :</b> ${data.message || '—'}</p>`
    });

    res.json({ ok: true, quote });
  } catch (e) { next(e); }
});

// Admin: list quotes
router.get('/', auth, async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const where = {};
    if (status) where.status = status;
    if (search) where.OR = [
      { fullName: { contains: search } }, { email: { contains: search } }, { quoteNumber: { contains: search } },
    ];
    const items = await prisma.quote.findMany({ where, orderBy: { createdAt: 'desc' }, include: { excursion: true, activity: true } });
    res.json(items);
  } catch (e) { next(e); }
});

// Admin: respond to quote with price + send email
router.put('/:id/respond', auth, async (req, res, next) => {
  try {
    const { adminPrice, adminCurrency, adminNote } = req.body;
    const quote = await prisma.quote.update({
      where: { id: +req.params.id },
      data: { adminPrice: +adminPrice, adminCurrency: adminCurrency || 'MAD', adminNote, status: 'QUOTED', sentAt: new Date() },
      include: { excursion: true, activity: true },
    });

    // Email client
    const serviceName = quote.excursion?.titleFr || quote.activity?.titleFr || quote.serviceType;
    await sendMail({
      to: quote.email,
      subject: `Votre devis Maz Travel — ${quote.quoteNumber}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <div style="background:#EA580C;color:white;padding:20px;border-radius:8px 8px 0 0;">
            <h1 style="margin:0;font-size:22px;">Maz Travel — Votre devis</h1>
          </div>
          <div style="padding:24px;background:#fff;border:1px solid #eee;border-top:0;">
            <p>Bonjour ${quote.fullName},</p>
            <p>Voici notre devis pour votre demande <b>${quote.quoteNumber}</b>.</p>
            <table style="width:100%;border-collapse:collapse;margin:20px 0;">
              <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Service</td><td style="padding:8px;border-bottom:1px solid #eee;"><b>${serviceName}</b></td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Date</td><td style="padding:8px;border-bottom:1px solid #eee;">${quote.date.toLocaleDateString('fr-FR')} ${quote.time || ''}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;">Participants</td><td style="padding:8px;border-bottom:1px solid #eee;">${quote.adults} adulte(s)${quote.children?', '+quote.children+' enfant(s)':''}${quote.babies?', '+quote.babies+' bébé(s)':''}</td></tr>
            </table>
            <div style="background:#FFF7ED;border:2px solid #EA580C;border-radius:8px;padding:20px;text-align:center;">
              <div style="font-size:13px;color:#9A3412;letter-spacing:2px;font-weight:600;">PRIX TOTAL</div>
              <div style="font-size:36px;color:#EA580C;font-weight:bold;margin:6px 0;">${quote.adminPrice} ${quote.adminCurrency}</div>
            </div>
            ${adminNote ? `<div style="margin-top:20px;padding:16px;background:#F5F5F5;border-radius:8px;"><p style="margin:0;white-space:pre-wrap;">${adminNote}</p></div>` : ''}
            <p style="margin-top:24px;">Pour confirmer votre réservation, répondez à cet email ou contactez-nous au <a href="tel:+212679067586">+212 6 79 06 75 86</a>.</p>
            <p style="color:#666;font-size:13px;margin-top:32px;">Cordialement,<br><b>L'équipe Maz Travel</b><br>Marrakech, Maroc</p>
          </div>
        </div>
      `
    });

    res.json({ ok: true, quote });
  } catch (e) { next(e); }
});

router.put('/:id/status', auth, async (req, res, next) => {
  try {
    const { status } = req.body;
    res.json(await prisma.quote.update({
      where: { id: +req.params.id },
      data: { status, ...(status === 'CONFIRMED' ? { confirmedAt: new Date() } : {}) }
    }));
  } catch (e) { next(e); }
});

router.delete('/:id', auth, async (req, res, next) => { try { res.json(await prisma.quote.delete({ where: { id: +req.params.id } })); } catch (e) { next(e); } });

module.exports = router;
