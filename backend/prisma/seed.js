const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');

  const hashed = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@maztravel.ma' },
    update: {},
    create: { email: 'admin@maztravel.ma', password: hashed, name: 'Admin Maz Travel', role: 'ADMIN' },
  });

  const excursions = [
    { slug: 'desert-merzouga-3j', titleFr: 'Désert de Merzouga — 3 jours', titleEn: 'Merzouga Desert — 3 days', titleEs: 'Desierto de Merzouga — 3 días',
      descriptionFr: 'Aventure de 3 jours dans le Sahara : dunes dorées, bivouac luxueux, balade en chameau au coucher du soleil et nuit sous les étoiles.',
      descriptionEn: '3-day Sahara adventure: golden dunes, luxury bivouac, sunset camel ride and a night under the stars.',
      descriptionEs: 'Aventura de 3 días en el Sahara: dunas doradas, vivaque de lujo, paseo en camello al atardecer y noche bajo las estrellas.',
      duration: '3 jours / 2 nuits', priceMad: 1800, priceEur: 180, priceUsd: 195,
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c5cf75?w=900&q=80',
      tag: 'SAHARA', featured: true, badges: JSON.stringify(['WiFi','Annulation gratuite','TripAdvisor']) },
    { slug: 'vallee-ourika', titleFr: "Vallée de l'Ourika", titleEn: 'Ourika Valley', titleEs: 'Valle de Ourika',
      descriptionFr: "Montagnes de l'Atlas, villages berbères, cascades et déjeuner traditionnel.",
      descriptionEn: 'Atlas Mountains, Berber villages, waterfalls and traditional lunch.',
      descriptionEs: 'Montañas del Atlas, pueblos bereberes, cascadas y almuerzo tradicional.',
      duration: '1 jour', priceMad: 450, priceEur: 45, priceUsd: 49,
      image: 'https://images.unsplash.com/photo-1597212720158-e21091ea4c1f?w=900&q=80',
      tag: 'MONTAGNES', featured: true, badges: JSON.stringify(['Annulation gratuite','TripAdvisor']) },
    { slug: 'essaouira', titleFr: 'Essaouira', titleEn: 'Essaouira', titleEs: 'Essaouira',
      descriptionFr: "Cité portuaire fortifiée au bord de l'Atlantique, médina UNESCO, port de pêche et plages.",
      descriptionEn: 'Fortified port city on the Atlantic, UNESCO medina, fishing harbor and beaches.',
      descriptionEs: 'Ciudad portuaria fortificada en el Atlántico, medina UNESCO, puerto pesquero y playas.',
      duration: '1 jour', priceMad: 600, priceEur: 60, priceUsd: 65,
      image: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=900&q=80',
      tag: 'OCÉAN', featured: true, badges: JSON.stringify(['WiFi','Annulation gratuite']) },
    { slug: 'ouarzazate', titleFr: 'Ouarzazate & Aït Ben Haddou', titleEn: 'Ouarzazate & Aït Ben Haddou', titleEs: 'Ouarzazate y Aït Ben Haddou',
      descriptionFr: "Studios de cinéma, kasbah classée UNESCO, passage par le col de Tizi n'Tichka.",
      descriptionEn: "Film studios, UNESCO kasbah, crossing the Tizi n'Tichka pass.",
      descriptionEs: "Estudios de cine, kasbah UNESCO, paso por Tizi n'Tichka.",
      duration: '1 jour', priceMad: 750, priceEur: 75, priceUsd: 82,
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80',
      tag: 'KASBAH', featured: true, badges: JSON.stringify(['WiFi','TripAdvisor']) },
    { slug: 'agafay', titleFr: "Désert d'Agafay", titleEn: 'Agafay Desert', titleEs: 'Desierto de Agafay',
      descriptionFr: 'Désert de pierres à 30 min de Marrakech, dîner sous tente et spectacle.',
      descriptionEn: 'Stone desert 30 min from Marrakech, tented dinner and show.',
      descriptionEs: 'Desierto de piedras a 30 min de Marrakech, cena en tienda y espectáculo.',
      duration: '1/2 jour', priceMad: 550, priceEur: 55, priceUsd: 60,
      image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&q=80',
      tag: 'DÉSERT', featured: true, badges: JSON.stringify(['WiFi','Annulation gratuite','TripAdvisor']) },
    { slug: 'casablanca', titleFr: 'Casablanca', titleEn: 'Casablanca', titleEs: 'Casablanca',
      descriptionFr: 'Mosquée Hassan II, corniche et architecture art déco.',
      descriptionEn: 'Hassan II Mosque, corniche, art deco architecture.',
      descriptionEs: 'Mezquita Hassan II, corniche, arquitectura art déco.',
      duration: '1 jour', priceMad: 900, priceEur: 90, priceUsd: 99,
      image: 'https://images.unsplash.com/photo-1577894389094-ee4ebd5a73ee?w=900&q=80',
      tag: 'MÉTROPOLE', badges: JSON.stringify(['Annulation gratuite']) },
  ];
  for (const ex of excursions) await prisma.excursion.upsert({ where: { slug: ex.slug }, update: {}, create: ex });

  const activities = [
    { slug: 'quad-palmeraie', titleFr: 'Quad Palmeraie', titleEn: 'Quad Palm Grove', titleEs: 'Quad Palmeral',
      descriptionFr: 'Balade en quad dans la palmeraie.', descriptionEn: 'Quad biking in the palm grove.', descriptionEs: 'Paseo en quad por el palmeral.',
      category: 'marrakech', duration: '2h', priceMad: 350, priceEur: 35,
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80', featured: true },
    { slug: 'chameau-palmeraie', titleFr: 'Chameau Palmeraie', titleEn: 'Camel ride Palm Grove', titleEs: 'Paseo camello Palmeral',
      descriptionFr: 'Promenade traditionnelle.', descriptionEn: 'Traditional camel ride.', descriptionEs: 'Paseo tradicional.',
      category: 'marrakech', duration: '1h', priceMad: 200, priceEur: 20,
      image: 'https://images.unsplash.com/photo-1547636780-9929e6e6dbe9?w=800&q=80' },
    { slug: 'montgolfiere', titleFr: 'Vol en montgolfière', titleEn: 'Hot air balloon flight', titleEs: 'Vuelo en globo',
      descriptionFr: 'Survol au lever du soleil.', descriptionEn: 'Sunrise flight.', descriptionEs: 'Vuelo al amanecer.',
      category: 'marrakech', duration: '3h', priceMad: 1900, priceEur: 190,
      image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80', featured: true },
    { slug: 'quad-agafay', titleFr: 'Quad Agafay', titleEn: 'Quad Agafay', titleEs: 'Quad Agafay',
      descriptionFr: 'Quad dans le désert de pierres.', descriptionEn: 'Quad in the stone desert.', descriptionEs: 'Quad en el desierto de piedras.',
      category: 'agafay', duration: '2h', priceMad: 400, priceEur: 40,
      image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80', featured: true },
    { slug: 'diner-agafay', titleFr: 'Dîner spectacle Agafay', titleEn: 'Agafay dinner show', titleEs: 'Cena espectáculo Agafay',
      descriptionFr: 'Dîner sous les étoiles.', descriptionEn: 'Dinner under the stars.', descriptionEs: 'Cena bajo las estrellas.',
      category: 'agafay', duration: 'Soirée', priceMad: 650, priceEur: 65,
      image: 'https://images.unsplash.com/photo-1604506576404-d3aa1c75abc8?w=800&q=80', featured: true },
    { slug: 'diner-chez-ali', titleFr: 'Dîner Chez Ali', titleEn: 'Chez Ali dinner', titleEs: 'Cena Chez Ali',
      descriptionFr: 'Fantasia et dîner marocain.', descriptionEn: 'Fantasia and Moroccan dinner.', descriptionEs: 'Fantasia y cena marroquí.',
      category: 'other', duration: 'Soirée', priceMad: 450, priceEur: 45,
      image: 'https://images.unsplash.com/photo-1565368003200-3b22f4a37901?w=800&q=80' },
  ];
  for (const a of activities) await prisma.activity.upsert({ where: { slug: a.slug }, update: {}, create: a });

  const routes = [
    { fromLoc: 'Aéroport Marrakech', toLoc: 'Médina / Riad', duration: '20 min', priceMad: 250, priceEur: 25 },
    { fromLoc: 'Aéroport Marrakech', toLoc: 'Gueliz / Hivernage', duration: '15 min', priceMad: 250, priceEur: 25 },
    { fromLoc: 'Aéroport Casablanca', toLoc: 'Marrakech', duration: '3h', priceMad: 1500, priceEur: 150 },
    { fromLoc: 'Marrakech', toLoc: 'Essaouira', duration: '3h', priceMad: 1200, priceEur: 120 },
    { fromLoc: 'Marrakech', toLoc: 'Ouarzazate', duration: '4h', priceMad: 1400, priceEur: 140 },
    { fromLoc: 'Marrakech', toLoc: 'Casablanca', duration: '3h', priceMad: 1500, priceEur: 150 },
    { fromLoc: 'Marrakech', toLoc: 'Agafay', duration: '45 min', priceMad: 400, priceEur: 40 },
    { fromLoc: 'Marrakech', toLoc: 'Fès', duration: '7h', priceMad: 2800, priceEur: 280 },
  ];
  for (const r of routes) {
    const exists = await prisma.transferRoute.findFirst({ where: { fromLoc: r.fromLoc, toLoc: r.toLoc } });
    if (!exists) await prisma.transferRoute.create({ data: r });
  }

  const vehicles = [
    { name: 'Mercedes Classe E', type: 'sedan', capacity: 3, pricePerDayMad: 1200, pricePerDayEur: 120, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&q=80' },
    { name: 'Toyota Land Cruiser', type: 'suv', capacity: 6, pricePerDayMad: 1800, pricePerDayEur: 180, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80' },
    { name: 'Mercedes Vito', type: 'minivan', capacity: 7, pricePerDayMad: 1500, pricePerDayEur: 150, image: 'https://images.unsplash.com/photo-1609520505218-7421df17a35f?w=600&q=80' },
    { name: 'Mercedes Sprinter', type: 'minibus', capacity: 16, pricePerDayMad: 2500, pricePerDayEur: 250, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80' },
  ];
  for (const v of vehicles) {
    const exists = await prisma.vehicle.findFirst({ where: { name: v.name } });
    if (!exists) await prisma.vehicle.create({ data: v });
  }

  const testimonials = [
    { name: 'Marie Dubois', country: 'France', flag: '🇫🇷', rating: 5, language: 'fr', featured: true,
      comment: 'Service exceptionnel ! Chauffeur très professionnel et véhicule impeccable. Excursion au désert inoubliable.' },
    { name: 'John Smith', country: 'United Kingdom', flag: '🇬🇧', rating: 5, language: 'en', featured: true,
      comment: 'Highly recommend Maz Travel. Punctual, friendly, and great prices. The Ourika valley tour was magical.' },
    { name: 'Carlos Garcia', country: 'España', flag: '🇪🇸', rating: 5, language: 'es', featured: true,
      comment: 'Excelente servicio de principio a fin. El conductor habla español y conoce todos los rincones.' },
    { name: 'Sophie Laurent', country: 'Belgique', flag: '🇧🇪', rating: 5, language: 'fr',
      comment: "Transferts toujours à l'heure, propreté irréprochable. Notre référence à Marrakech." },
  ];
  for (const t of testimonials) {
    const exists = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!exists) await prisma.testimonial.create({ data: t });
  }

  const gallery = [
    { title: 'Dunes Merzouga', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c5cf75?w=800&q=80', category: 'desert', ord: 1 },
    { title: 'Marrakech', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', category: 'marrakech', ord: 2 },
    { title: 'Essaouira', image: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80', category: 'marrakech', ord: 3 },
    { title: 'Agafay', image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80', category: 'desert', ord: 4 },
    { title: 'Ourika', image: 'https://images.unsplash.com/photo-1597212720158-e21091ea4c1f?w=800&q=80', category: 'marrakech', ord: 5 },
  ];
  for (const g of gallery) {
    const exists = await prisma.gallery.findFirst({ where: { title: g.title } });
    if (!exists) await prisma.gallery.create({ data: g });
  }

  // Settings
  const settings = [
    { keyName: 'rate_eur_mad', value: '10.8' },
    { keyName: 'rate_usd_mad', value: '9.85' },
    { keyName: 'contact_phone', value: '+212679067586' },
    { keyName: 'contact_email', value: 'contact@maztravel.ma' },
    { keyName: 'contact_whatsapp', value: '+212679067586' },
    { keyName: 'contact_address', value: 'Avenue Mohamed VI, Marrakech 40000, Maroc' },
    { keyName: 'social_facebook', value: 'https://facebook.com/maztravel' },
    { keyName: 'social_instagram', value: 'https://instagram.com/maztravel' },
    { keyName: 'seo_keywords', value: 'transport touristique Marrakech, transfert aéroport Marrakech, excursion Marrakech, désert Merzouga, activités Maroc' },
  ];
  for (const s of settings) await prisma.setting.upsert({ where: { keyName: s.keyName }, update: {}, create: s });

  console.log('✅ Seed terminé.');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
