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

  // Seed projects (using upsert to update existing and create new)
  const projects = [
    {
      slug: 'joy-school',
      title: 'Project Joy School',
      category: ProjectCategory.Education,
      short: 'Providing children with knowledge, cultural values, and awareness of important information. Encourages regular school attendance and academic excellence.',
      image: '/assets/hero-education.jpg',
      stats: [{ value: '15,000+', label: 'Children benefited' }, { value: 'Regular', label: 'School attendance' }],
      progress: 75,
    },
    {
      slug: 'project-progress',
      title: 'Project Progress',
      category: ProjectCategory.Education,
      short: 'Started after COVID-19 to improve education in government schools. Students achieving top positions based on evaluation criteria are recognized. Impact has reached IIM Ahmedabad.',
      image: '/assets/hero-education.jpg',
      stats: [{ value: 'Game changer', label: 'In education' }, { value: 'IIM', label: 'Ahmedabad recognition' }],
      progress: 85,
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
      short: 'Reduces financial burden of purchasing notebooks and educational materials for underprivileged families. For the last five years, thousands of students have received study materials with continuous assistance.',
      image: '/assets/project-notebooks.jpg',
      stats: [{ value: '5+', label: 'Years running' }, { value: 'Thousands', label: 'Students supported' }],
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
      short: 'Started with the aim of feeding stray and speechless animals. Through this initiative, thousands of animals have been provided with food.',
      image: '/assets/project-rotibank.jpg',
      stats: [{ value: 'Thousands', label: 'Animals fed' }, { value: 'Daily', label: 'Food distribution' }],
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
      slug: 'project-cultural',
      title: 'Project Cultural',
      category: ProjectCategory.CulturalActivities,
      short: 'Launched to connect children with India\'s rich cultural heritage. Children are educated about various traditions, customs, and important aspects of Indian culture.',
      image: '/assets/diwali3.jpg',
      stats: [{ value: 'Heritage', label: 'Awareness' }, { value: 'Traditions', label: 'Education' }],
      progress: 70,
    },
    {
      slug: 'every-foot-deserves-footwear',
      title: 'Every Foot Deserves Footwear',
      category: ProjectCategory.CommunityWelfare,
      short: 'During scorching summer, many children walk barefoot. Free slippers are distributed to needy children to address this issue.',
      image: '/assets/chappal.jpg',
      stats: [{ value: '10,000+', label: 'Children benefited' }, { value: 'Summer', label: 'Distribution' }],
      progress: 90,
    },
    {
      slug: 'kanya-worship',
      title: 'Kanya (Girl Child) Worship Program',
      category: ProjectCategory.WomenEmpowerment,
      short: 'Large-scale Kanya Pujan program organized in Vadodara. 251 girls have been honored with year-round support to build confidence and encourage them.',
      image: '/assets/project-sanitary.jpg',
      stats: [{ value: '251', label: 'Girls honored' }, { value: 'Year-round', label: 'Support provided' }],
      progress: 75,
    },
    {
      slug: 'project-family',
      title: 'Project Family',
      category: ProjectCategory.CommunityWelfare,
      short: 'Complete support provided for marriages of five girls from economically weaker families. The organization stands with them like a family to help them take a new step in life with dignity.',
      image: '/assets/diwali.jpg',
      stats: [{ value: '5', label: 'Marriages supported' }, { value: 'Family', label: 'Like support' }],
      progress: 100,
    },
    {
      slug: 'safe-uttarayan',
      title: 'Safe Uttarayan',
      category: ProjectCategory.CulturalActivities,
      short: 'During Uttarayan kite festival, free kites and string are distributed to hundreds of children from underprivileged families to ensure safe and happy celebration without injury risk.',
      image: '/assets/diwali2.jpg',
      stats: [{ value: 'Hundreds', label: 'Children' }, { value: 'Safe', label: 'Celebration' }],
      progress: 80,
    },
    {
      slug: 'ganesh-darshan-yatra',
      title: 'Ganesh Darshan Yatra',
      category: ProjectCategory.CulturalActivities,
      short: 'Special visits organized for children in slum areas to experience Ganesh Festival. They participate in celebrations, have darshan, and gain knowledge through information centers.',
      image: '/assets/holi.jpg',
      stats: [{ value: '500+', label: 'Children participated' }, { value: 'Cultural', label: 'City experience' }],
      progress: 85,
    },
    {
      slug: 'voter-awareness',
      title: 'Voter Awareness Campaign',
      category: ProjectCategory.CommunityWelfare,
      short: 'Campaign conducted to encourage young people and citizens of all age groups to vote responsibly. Motivates people to pledge to vote and aims to increase voter participation.',
      image: '/assets/flag.jpg',
      stats: [{ value: 'Lakhs', label: 'People reached' }, { value: 'Vote', label: 'Pledge campaign' }],
      progress: 70,
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
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    })
  }
  console.log('✅ Projects seeded:', projects.length)

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

  // Seed events (delete existing and recreate)
  await prisma.event.deleteMany({})
  
  const events = [
    {
      title: 'Annual Notebook Distribution Drive',
      date: new Date('2026-07-12'),
      location: 'Vadodara — 12 schools',
      description: 'Notebooks and stationery kits handed to students before the new academic year under Project Sankalp.',
      image: '/assets/project-notebooks.jpg',
      upcoming: true,
    },
    {
      title: 'Kanya Pujan Ceremony 2026',
      date: new Date('2026-09-28'),
      location: 'Vadodara Community Hall',
      description: 'Honoring young girls with traditional worship ceremony and year-round support under Kanya Worship Program.',
      image: '/assets/project-sanitary.jpg',
      upcoming: true,
    },
    {
      title: 'Safe Uttarayan Kite Festival',
      date: new Date('2027-01-14'),
      location: 'Multiple Slum Areas, Vadodara',
      description: 'Free kites and string distribution to ensure safe celebration for underprivileged children.',
      image: '/assets/diwali2.jpg',
      upcoming: true,
    },
    {
      title: 'Footwear Distribution Drive',
      date: new Date('2026-05-15'),
      location: 'Government Schools, Vadodara',
      description: 'Free slippers distribution to needy children during summer season.',
      image: '/assets/chappal.jpg',
      upcoming: true,
    },
    {
      title: 'Ganesh Darshan Yatra',
      date: new Date('2026-09-07'),
      location: 'Ganesh Pandals, Vadodara',
      description: 'Special visits for slum children to experience Ganesh Festival with darshan and information centers.',
      image: '/assets/holi.jpg',
      upcoming: false,
    },
    {
      title: 'Voter Awareness Campaign',
      date: new Date('2026-04-10'),
      location: 'Vadodara City Wide',
      description: 'Campaign to encourage responsible voting and increase voter participation among citizens.',
      image: '/assets/flag.jpg',
      upcoming: false,
    },
    {
      title: 'Cultural Heritage Workshop',
      date: new Date('2026-02-20'),
      location: 'Community Center, Vadodara',
      description: 'Educating children about Indian traditions, customs and cultural heritage under Project Cultural.',
      image: '/assets/diwali3.jpg',
      upcoming: false,
    },
    {
      title: 'Project Family Marriage Support',
      date: new Date('2025-12-15'),
      location: 'Vadodara',
      description: 'Complete support provided for marriages of girls from economically weaker families.',
      image: '/assets/diwali.jpg',
      upcoming: false,
    },
    {
      title: 'Joy School Education Session',
      date: new Date('2026-03-10'),
      location: 'Government Primary School, Waghodia',
      description: 'Knowledge and cultural values session for children under Project Joy School.',
      image: '/assets/hero-education.jpg',
      upcoming: false,
    },
    {
      title: 'Project Progress Recognition Ceremony',
      date: new Date('2026-01-20'),
      location: 'IIM Ahmedabad Campus',
      description: 'Recognition ceremony for top-performing students from government schools.',
      image: '/assets/hero-education.jpg',
      upcoming: false,
    },
  ]

  for (const event of events) {
    await prisma.event.create({ data: event })
  }
  console.log('✅ Events seeded:', events.length)

  // Seed blog posts (using upsert to update existing and create new)
  const blogPosts = [
    {
      slug: 'five-years-of-roti-bank',
      title: 'Feeding thousands of stray animals — what Roti Bank taught us',
      excerpt: 'How an initiative to feed stray and speechless animals has made a difference in thousands of lives.',
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
    {
      slug: 'joy-school-15000-children',
      title: '15,000 children and counting — Project Joy School impact',
      excerpt: 'How providing knowledge, cultural values and awareness is transforming education for children.',
      category: 'Education',
      date: new Date('2025-08-20'),
      image: '/assets/hero-education.jpg',
      read: '5 min',
    },
    {
      slug: 'project-progress-iim-recognition',
      title: 'From government schools to IIM Ahmedabad — Project Progress journey',
      excerpt: 'How a post-COVID education initiative became a game changer reaching prestigious institutions.',
      category: 'Success Stories',
      date: new Date('2025-07-15'),
      image: '/assets/hero-education.jpg',
      read: '7 min',
    },
    {
      slug: 'cultural-heritage-education',
      title: 'Connecting children with their roots — Project Cultural',
      excerpt: 'How teaching traditions and customs is making children more aware of their rich heritage.',
      category: 'Cultural Activities',
      date: new Date('2025-06-10'),
      image: '/assets/diwali3.jpg',
      read: '4 min',
    },
    {
      slug: 'footwear-distribution-summer',
      title: '10,000 pairs of slippers — protecting feet during scorching summer',
      excerpt: 'How Every Foot Deserves Footwear initiative is helping children walk with dignity.',
      category: 'Community Impact',
      date: new Date('2025-05-25'),
      image: '/assets/chappal.jpg',
      read: '5 min',
    },
    {
      slug: 'kanya-pujan-empowerment',
      title: '251 girls honored — Kanya Worship Program building confidence',
      excerpt: 'How year-round support and recognition is empowering girl children in Vadodara.',
      category: 'Women Empowerment',
      date: new Date('2025-04-18'),
      image: '/assets/project-sanitary.jpg',
      read: '6 min',
    },
    {
      slug: 'project-family-marriage-support',
      title: 'Standing like a family — supporting marriages with dignity',
      excerpt: 'How Project Family is helping girls from economically weaker families take new steps in life.',
      category: 'Community Impact',
      date: new Date('2025-03-22'),
      image: '/assets/diwali.jpg',
      read: '5 min',
    },
    {
      slug: 'safe-uttarayan-celebration',
      title: 'Safe kites, happy children — Uttarayan without injuries',
      excerpt: 'How free kite and string distribution is ensuring safe festival celebration for underprivileged children.',
      category: 'Cultural Activities',
      date: new Date('2025-02-14'),
      image: '/assets/diwali2.jpg',
      read: '4 min',
    },
    {
      slug: 'ganesh-darshan-yatra-experience',
      title: '500 children experience Cultural City — Ganesh Darshan Yatra',
      excerpt: 'How slum children experienced Ganesh Festival through special visits and information centers.',
      category: 'Cultural Activities',
      date: new Date('2025-01-08'),
      image: '/assets/holi.jpg',
      read: '5 min',
    },
    {
      slug: 'voter-awareness-campaign',
      title: 'Reaching lakhs — Voter Awareness Campaign impact',
      excerpt: 'How motivating citizens to vote responsibly is increasing democratic participation.',
      category: 'Community Impact',
      date: new Date('2024-12-01'),
      image: '/assets/flag.jpg',
      read: '6 min',
    },
  ]

  for (const post of blogPosts) {
    await prisma.blog.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
  }
  console.log('✅ Blog posts seeded:', blogPosts.length)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
