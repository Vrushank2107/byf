import { PrismaClient, ProjectCategory } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Check if settings already exist
  const existingSettings = await prisma.siteSettings.findFirst()

  if (existingSettings) {
    console.log('✅ Site settings already exist, skipping settings seed')
  } else {
    // Seed site settings
    const settings = await prisma.siteSettings.create({
      data: {
        email: 'contact@barodayouthfederation.org',
        phone: '+91 97237 84628',
        whatsapp: '919723784628',
        whatsappName: 'Rukmil Shah',
        address: 'Vadodara, Gujarat, India',
        instagram: 'https://www.instagram.com/baroda_youth_federation/',
        facebook: 'https://www.facebook.com/p/Baroda-YOUTH-Federation-100072446950431/',
        twitter: 'https://x.com/BarodaYouth',
        youtube: 'https://www.youtube.com/@barodayouthfederation1956',
        founderPortfolioUrl: '',
      },
    })
    console.log('✅ Site settings seeded:', settings)
  }

  // Check if projects already exist
  const existingProjects = await prisma.project.count()
  if (existingProjects > 0) {
    console.log('✅ Projects already exist, skipping projects seed')
  } else {
    // Seed projects
    const projects = [
      {
        slug: 'project-progress',
        title: 'Project Progress',
        category: ProjectCategory.Education,
        short: 'Year-long tuition and mentorship for first-generation learners in Vadodara\'s outer wards.',
        image: '/assets/hero-education.jpg',
        stats: [{ value: '1,200+', label: 'Students mentored' }, { value: '38', label: 'Volunteer tutors' }],
        progress: 72,
      },
      {
        slug: 'joycation',
        title: 'JoyCation',
        category: ProjectCategory.CommunityWelfare,
        short: 'Day-out trips, art kits and a hot meal for children who have never been on a picnic.',
        image: '/assets/joycation1.jpg',
        stats: [{ value: '850+', label: 'Kids hosted' }, { value: '12', label: 'Editions' }],
        progress: 65,
      },
      {
        slug: 'sankalp',
        title: 'Project Sankalp',
        category: ProjectCategory.Education,
        short: '50,000+ notebooks and stationery kits handed out before every academic year.',
        image: '/assets/project-notebooks.jpg',
        stats: [{ value: '50,000+', label: 'Notebooks' }, { value: '180', label: 'Schools' }],
        progress: 88,
      },
      {
        slug: 'sanitary-pads',
        title: 'Sanitary Pad Distribution',
        category: ProjectCategory.WomenEmpowerment,
        short: 'Free pads, dignity kits and menstrual-health sessions for adolescent girls.',
        image: '/assets/project-sanitary.jpg',
        stats: [{ value: '22,000+', label: 'Girls reached' }, { value: '60+', label: 'Schools covered' }],
        progress: 54,
      },
      {
        slug: 'flood-relief',
        title: 'Flood Relief Work',
        category: ProjectCategory.DisasterRelief,
        short: 'Food packets, drinking water and medical aid during the 2024 Vadodara floods.',
        image: '/assets/hero-flood.jpg',
        stats: [{ value: '61,000+', label: 'Beneficiaries' }, { value: '28', label: 'Relief days' }],
        progress: 100,
      },
      {
        slug: 'roti-bank',
        title: 'Roti Bank',
        category: ProjectCategory.CommunityWelfare,
        short: 'Hot rotis and sabzi distributed nightly to homeless families across the city.',
        image: '/assets/project-rotibank.jpg',
        stats: [{ value: '1,400', label: 'Meals / week' }, { value: '5', label: 'Years running' }],
        progress: 80,
      },
      {
        slug: 'blanket-drive',
        title: 'Winter Blanket Drive',
        category: ProjectCategory.CommunityWelfare,
        short: 'Warm blankets for the elderly, daily-wage workers and street families every winter.',
        image: '/assets/blanket.jpg',
        stats: [{ value: '10,000+', label: 'Blankets' }, { value: '9', label: 'Winters' }],
        progress: 92,
      },
      {
        slug: 'festival-celebrations',
        title: 'Festival Celebrations',
        category: ProjectCategory.CulturalActivities,
        short: 'Holi, Diwali and Uttarayan with kids in slum schools — colour, sweets, kites and joy.',
        image: '/assets/diwali3.jpg',
        stats: [{ value: '3,000+', label: 'Children' }, { value: '20+', label: 'Events' }],
        progress: 70,
      },
    ]

    for (const project of projects) {
      await prisma.project.create({ data: project })
    }
    console.log('✅ Projects seeded:', projects.length)
  }

  // Check if gallery already exists
  const existingGallery = await prisma.gallery.count()
  if (existingGallery > 0) {
    console.log('✅ Gallery already exists, skipping gallery seed')
  } else {
    // Seed gallery
    const gallery = [
      { src: '/assets/joycation1.jpg', tag: 'JoyCation', alt: 'Children at JoyCation event with Baroda Youth Federation volunteers' },
      { src: '/assets/flag.jpg', tag: 'Education', alt: 'Students with national flag distribution' },
      { src: '/assets/holi.jpg', tag: 'Holi', alt: 'Holi celebration with children' },
      { src: '/assets/diwali3.jpg', tag: 'Diwali', alt: 'Diwali fireworks celebration with kids' },
      { src: '/assets/blanket.jpg', tag: 'Blanket Distribution', alt: 'Blanket distribution at night' },
      { src: '/assets/holi2.jpg', tag: 'Holi', alt: 'Children playing Holi in village' },
      { src: '/assets/diwali.jpg', tag: 'Diwali', alt: 'Volunteer celebrating Diwali with a child' },
      { src: '/assets/chappal.jpg', tag: 'Education', alt: 'Footwear distribution for children' },
      { src: '/assets/diwali2.jpg', tag: 'Diwali', alt: 'Diwali group photo with volunteers' },
      { src: '/assets/holi3.jpg', tag: 'Holi', alt: 'Village Holi group photo' },
      { src: '/assets/project-sanitary.jpg', tag: 'Sanitary Program', alt: 'Women receiving sanitary pad kits' },
      { src: '/assets/hero-flood.jpg', tag: 'Flood Relief', alt: 'Flood relief volunteers distributing food' },
      { src: '/assets/project-notebooks.jpg', tag: 'Education', alt: 'Schoolgirl receiving notebooks' },
      { src: '/assets/hero-blankets.jpg', tag: 'Blanket Distribution', alt: 'Elderly women receiving blankets' },
      { src: '/assets/project-rotibank.jpg', tag: 'Sanitary Program', alt: 'Roti bank volunteers preparing meals' },
      { src: '/assets/hero-education.jpg', tag: 'Education', alt: 'Volunteers with students at village school' },
    ]

    for (const item of gallery) {
      await prisma.gallery.create({ data: item })
    }
    console.log('✅ Gallery seeded:', gallery.length)
  }

  // Check if activities already exist
  const existingActivities = await prisma.activity.count()
  if (existingActivities > 0) {
    console.log('✅ Activities already exist, skipping activities seed')
  } else {
    // Seed activities
    const activities = [
      {
        title: 'Project Progress Session',
        tag: 'Education',
        date: 'Jan 15, 2024',
        image: '/assets/hero-education.jpg',
      },
      {
        title: 'JoyCation Winter Edition',
        tag: 'Community',
        date: 'Dec 20, 2023',
        image: '/assets/joycation1.jpg',
      },
      {
        title: 'Notebook Distribution',
        tag: 'Education',
        date: 'Jun 10, 2024',
        image: '/assets/project-notebooks.jpg',
      },
      {
        title: 'Holi Celebration',
        tag: 'Culture',
        date: 'Mar 25, 2024',
        image: '/assets/holi.jpg',
      },
      {
        title: 'Diwali with Kids',
        tag: 'Culture',
        date: 'Nov 12, 2023',
        image: '/assets/diwali3.jpg',
      },
      {
        title: 'Blanket Drive',
        tag: 'Community',
        date: 'Jan 5, 2024',
        image: '/assets/blanket.jpg',
      },
    ]

    for (const activity of activities) {
      await prisma.activity.create({ data: activity })
    }
    console.log('✅ Activities seeded:', activities.length)
  }

  // Check if testimonials already exist
  const existingTestimonials = await prisma.testimonial.count()
  if (existingTestimonials > 0) {
    console.log('✅ Testimonials already exist, skipping testimonials seed')
  } else {
    // Seed testimonials
    const testimonials = [
      {
        name: 'Priya Sharma',
        role: 'Student, Project Progress',
        quote: 'Baroda Youth Federation volunteers helped me understand math concepts I struggled with for years. Now I want to become a teacher.',
        image: '/assets/avatar1.jpg',
      },
      {
        name: 'Ramesh Patel',
        role: 'Parent, JoyCation',
        quote: 'My daughter had never been to a picnic. The joy on her face that day is something I will never forget.',
        image: '/assets/avatar2.jpg',
      },
      {
        name: 'Anita Desai',
        role: 'Teacher, Municipal School',
        quote: 'The notebooks and stationery from Project Sankalp ensure no child in my class goes without basic supplies.',
        image: '/assets/avatar3.jpg',
      },
    ]

    for (const testimonial of testimonials) {
      await prisma.testimonial.create({ data: testimonial })
    }
    console.log('✅ Testimonials seeded:', testimonials.length)
  }

  // Check if impact stats already exist
  const existingImpactStats = await prisma.impactStat.count()
  if (existingImpactStats > 0) {
    console.log('✅ Impact stats already exist, skipping impact stats seed')
  } else {
    // Seed impact stats
    const impactStats = [
      { label: 'Students', value: '1,200+', suffix: '', color: 'primary', order: 0 },
      { label: 'Volunteers', value: '450+', suffix: '', color: 'secondary', order: 1 },
      { label: 'Projects', value: '8', suffix: '', color: 'accent', order: 2 },
      { label: 'Years', value: '10', suffix: '+', color: 'primary', order: 3 },
      { label: 'Lives Touched', value: '100K', suffix: '+', color: 'secondary', order: 4 },
    ]

    for (const stat of impactStats) {
      await prisma.impactStat.create({ data: stat })
    }
    console.log('✅ Impact stats seeded:', impactStats.length)
  }

  // Check if leaders already exist
  const existingLeaders = await prisma.leader.count()
  if (existingLeaders > 0) {
    console.log('✅ Leaders already exist, skipping leaders seed')
  } else {
    // Seed leaders
    const leaders = [
      {
        name: 'Rukmil Shah',
        role: 'Founder & President',
        bio: 'Started Baroda Youth Federation in 2014 with eight friends and a single Sunday tuition class. Today leads 450+ volunteers across five missions.',
        order: 0,
      },
      {
        name: 'Neha Patel',
        role: 'Vice President',
        bio: 'Coordinates all education programs including Project Progress and Project Sankalp. Former teacher with 8 years of experience.',
        order: 1,
      },
      {
        name: 'Amit Joshi',
        role: 'Operations Head',
        bio: 'Manages logistics for all relief work, blanket drives and food distribution. Ensures every resource reaches the right hands.',
        order: 2,
      },
      {
        name: 'Priya Desai',
        role: 'Program Coordinator',
        bio: 'Leads the women empowerment initiatives including sanitary pad distribution and skill development workshops.',
        order: 3,
      },
      {
        name: 'Vikram Singh',
        role: 'Treasurer',
        bio: 'Handles all financial operations, donor relations and ensures complete transparency in fund allocation.',
        order: 4,
      },
      {
        name: 'Sneha Mehta',
        role: 'Volunteer Coordinator',
        bio: 'Recruits and manages the volunteer base of 450+ people. Organizes training sessions and team-building activities.',
        order: 5,
      },
    ]

    for (const leader of leaders) {
      await prisma.leader.create({ data: leader })
    }
    console.log('✅ Leaders seeded:', leaders.length)
  }

  // Check if partners already exist
  const existingPartners = await prisma.partner.count()
  if (existingPartners > 0) {
    console.log('✅ Partners already exist, skipping partners seed')
  } else {
    // Seed partners
    const partners = [
      { name: 'Vadodara Municipal Corporation', order: 0 },
      { name: 'Rotary Club Vadodara', order: 1 },
      { name: 'Lions Club Gujarat', order: 2 },
      { name: 'Gujarat CSR Forum', order: 3 },
      { name: 'Local Schools Network', order: 4 },
      { name: 'Community Health Center', order: 5 },
      { name: 'Youth NGOs Federation', order: 6 },
      { name: 'Corporate Partners', order: 7 },
    ]

    for (const partner of partners) {
      await prisma.partner.create({ data: partner })
    }
    console.log('✅ Partners seeded:', partners.length)
  }

  // Check if events already exist
  const existingEvents = await prisma.event.count()
  if (existingEvents > 0) {
    console.log('✅ Events already exist, skipping events seed')
  } else {
    // Seed events
    const events = [
      {
        title: 'Annual Notebook Distribution Drive',
        date: new Date('2026-07-12'),
        location: 'Vadodara — 12 schools',
        description: '50,000+ notebooks and stationery kits handed to students before the new academic year.',
        image: '/assets/project-notebooks.jpg',
        upcoming: true,
      },
      {
        title: 'Independence Day Flag Distribution',
        date: new Date('2026-08-15'),
        location: 'Government Primary School, Waghodia',
        description: 'National flags, sweets and a patriotic assembly for 600+ children.',
        image: '/assets/flag.jpg',
        upcoming: true,
      },
      {
        title: 'Winter Blanket Drive 2026',
        date: new Date('2026-12-18'),
        location: 'Sayajigunj & Old City',
        description: 'Distribute 1,500 blankets to street families, daily-wage workers and the elderly.',
        image: '/assets/blanket.jpg',
        upcoming: true,
      },
      {
        title: 'Diwali with the Children',
        date: new Date('2025-11-01'),
        location: 'Atladara Community Center',
        description: 'Diyas, sweets, sparklers and a hot meal with 200 children from nearby slums.',
        image: '/assets/diwali3.jpg',
        upcoming: false,
      },
      {
        title: 'Holi Colour Drive',
        date: new Date('2025-03-25'),
        location: 'Waghodia Village',
        description: 'Organic colours, music and lunch for 300+ village children.',
        image: '/assets/holi2.jpg',
        upcoming: false,
      },
      {
        title: 'JoyCation #12 — Sayaji Baug',
        date: new Date('2025-05-05'),
        location: 'Sayaji Baug, Vadodara',
        description: 'Day-out for 90 children with art, games, a hot lunch and a bus ride back home.',
        image: '/assets/joycation1.jpg',
        upcoming: false,
      },
    ]

    for (const event of events) {
      await prisma.event.create({ data: event })
    }
    console.log('✅ Events seeded:', events.length)
  }

  // Check if blog posts already exist
  const existingBlog = await prisma.blog.count()
  if (existingBlog > 0) {
    console.log('✅ Blog posts already exist, skipping blog seed')
  } else {
    // Seed blog posts
    const blogPosts = [
      {
        slug: 'five-years-of-roti-bank',
        title: 'Five years, 3 lakh meals — what Roti Bank taught us',
        excerpt: 'How a small Sunday-evening idea grew into a nightly operation serving over 1,400 meals a week.',
        category: 'Success Stories',
        date: new Date('2025-09-10'),
        image: '/assets/project-rotibank.jpg',
        read: '6 min',
      },
      {
        slug: 'diwali-with-the-children',
        title: 'Diwali with 200 kids who had never lit a sparkler',
        excerpt: 'What an evening of light, laddoos and fireworks looked like through their eyes.',
        category: 'Activities',
        date: new Date('2024-11-04'),
        image: '/assets/diwali3.jpg',
        read: '4 min',
      },
      {
        slug: 'vadodara-flood-response',
        title: 'Inside the 28-day Vadodara flood response',
        excerpt: 'How 450 volunteers reached 61,000+ people with food, water and medicine.',
        category: 'Community Impact',
        date: new Date('2024-09-20'),
        image: '/assets/hero-flood.jpg',
        read: '8 min',
      },
      {
        slug: 'i-came-for-a-sunday',
        title: 'I came for a Sunday and stayed six years',
        excerpt: 'A long-time Baroda Youth Federation volunteer on what really keeps her coming back every week.',
        category: 'Volunteer Experiences',
        date: new Date('2025-02-14'),
        image: '/assets/joycation1.jpg',
        read: '5 min',
      },
      {
        slug: 'menstrual-health-curriculum',
        title: 'Designing a menstrual-health curriculum that girls actually want',
        excerpt: 'What we learned from 60 schools, 22,000 girls and a lot of honest conversations.',
        category: 'Community Impact',
        date: new Date('2025-04-02'),
        image: '/assets/project-sanitary.jpg',
        read: '7 min',
      },
      {
        slug: 'blanket-drive-2024',
        title: '10,000 blankets later — the math of warmth',
        excerpt: 'How we plan, source and distribute blankets without a single rupee of overhead.',
        category: 'Success Stories',
        date: new Date('2024-12-15'),
        image: '/assets/blanket.jpg',
        read: '6 min',
      },
    ]

    for (const post of blogPosts) {
      await prisma.blog.create({ data: post })
    }
    console.log('✅ Blog posts seeded:', blogPosts.length)
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
