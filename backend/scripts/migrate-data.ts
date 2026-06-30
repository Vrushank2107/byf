import { PrismaClient } from '@prisma/client'

const OLD_DATABASE_URL = process.env.OLD_DATABASE_URL
const NEW_DATABASE_URL = process.env.DATABASE_URL

if (!OLD_DATABASE_URL) {
  console.error('OLD_DATABASE_URL environment variable is required')
  process.exit(1)
}

if (!NEW_DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required')
  process.exit(1)
}

const oldPrisma = new PrismaClient({
  datasources: {
    db: {
      url: OLD_DATABASE_URL,
    },
  },
})

const newPrisma = new PrismaClient({
  datasources: {
    db: {
      url: NEW_DATABASE_URL,
    },
  },
})

async function migrateData() {
  console.log('Starting data migration...')

  try {
    // Migrate Projects
    console.log('Migrating projects...')
    const projects = await oldPrisma.project.findMany()
    for (const project of projects) {
      await newPrisma.project.create({
        data: {
          id: project.id,
          title: project.title,
          slug: project.slug,
          short: project.short,
          image: project.image,
          stats: project.stats,
          progress: project.progress,
          order: project.order,
          category: project.category,
          fullStory: project.fullStory,
          showInHero: project.showInHero,
          images: project.images,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
        },
      })
    }
    console.log(`Migrated ${projects.length} projects`)

    // Migrate Events
    console.log('Migrating events...')
    const events = await oldPrisma.event.findMany()
    for (const event of events) {
      await newPrisma.event.create({
        data: {
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
          image: event.image,
          upcoming: event.upcoming,
          createdAt: event.createdAt,
          updatedAt: event.updatedAt,
        },
      })
    }
    console.log(`Migrated ${events.length} events`)

    // Migrate Blog Posts
    console.log('Migrating blog posts...')
    const blogPosts = await oldPrisma.blog.findMany()
    for (const post of blogPosts) {
      await newPrisma.blog.create({
        data: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: post.category,
          date: post.date,
          image: post.image,
          read: post.read,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
      })
    }
    console.log(`Migrated ${blogPosts.length} blog posts`)

    // Migrate Activities
    console.log('Migrating activities...')
    const activities = await oldPrisma.activity.findMany()
    for (const activity of activities) {
      await newPrisma.activity.create({
        data: {
          id: activity.id,
          title: activity.title,
          tag: activity.tag,
          date: activity.date,
          image: activity.image,
          createdAt: activity.createdAt,
          updatedAt: activity.updatedAt,
        },
      })
    }
    console.log(`Migrated ${activities.length} activities`)

    // Migrate Testimonials
    console.log('Migrating testimonials...')
    const testimonials = await oldPrisma.testimonial.findMany()
    for (const testimonial of testimonials) {
      await newPrisma.testimonial.create({
        data: {
          id: testimonial.id,
          name: testimonial.name,
          quote: testimonial.quote,
          role: testimonial.role,
          image: testimonial.image,
          createdAt: testimonial.createdAt,
          updatedAt: testimonial.updatedAt,
        },
      })
    }
    console.log(`Migrated ${testimonials.length} testimonials`)

    // Migrate Impact Stats
    console.log('Migrating impact stats...')
    const impactStats = await oldPrisma.impactStat.findMany()
    for (const stat of impactStats) {
      await newPrisma.impactStat.create({
        data: {
          id: stat.id,
          label: stat.label,
          value: stat.value,
          suffix: stat.suffix,
          color: stat.color,
          order: stat.order,
          createdAt: stat.createdAt,
          updatedAt: stat.updatedAt,
        },
      })
    }
    console.log(`Migrated ${impactStats.length} impact stats`)

    // Migrate Leaders
    console.log('Migrating leaders...')
    const leaders = await oldPrisma.leader.findMany()
    for (const leader of leaders) {
      await newPrisma.leader.create({
        data: {
          id: leader.id,
          name: leader.name,
          role: leader.role,
          bio: leader.bio,
          image: leader.image,
          order: leader.order,
          createdAt: leader.createdAt,
          updatedAt: leader.updatedAt,
        },
      })
    }
    console.log(`Migrated ${leaders.length} leaders`)

    // Migrate Partners
    console.log('Migrating partners...')
    const partners = await oldPrisma.partner.findMany()
    for (const partner of partners) {
      await newPrisma.partner.create({
        data: {
          id: partner.id,
          name: partner.name,
          order: partner.order,
          createdAt: partner.createdAt,
          updatedAt: partner.updatedAt,
        },
      })
    }
    console.log(`Migrated ${partners.length} partners`)

    // Migrate Gallery
    console.log('Migrating gallery...')
    const gallery = await oldPrisma.gallery.findMany()
    for (const item of gallery) {
      await newPrisma.gallery.create({
        data: {
          id: item.id,
          src: item.src,
          alt: item.alt,
          tag: item.tag,
          createdAt: item.createdAt,
        },
      })
    }
    console.log(`Migrated ${gallery.length} gallery items`)

    // Migrate Volunteers
    console.log('Migrating volunteers...')
    const volunteers = await oldPrisma.volunteer.findMany()
    for (const volunteer of volunteers) {
      await newPrisma.volunteer.create({
        data: {
          id: volunteer.id,
          name: volunteer.name,
          email: volunteer.email,
          phone: volunteer.phone,
          address: volunteer.address,
          skills: volunteer.skills,
          availability: volunteer.availability,
          resumeName: volunteer.resumeName,
          resumeUrl: volunteer.resumeUrl,
          reviewed: volunteer.reviewed,
          submittedAt: volunteer.submittedAt,
        },
      })
    }
    console.log(`Migrated ${volunteers.length} volunteers`)

    // Migrate Messages
    console.log('Migrating messages...')
    const messages = await oldPrisma.message.findMany()
    for (const message of messages) {
      await newPrisma.message.create({
        data: {
          id: message.id,
          name: message.name,
          email: message.email,
          phone: message.phone,
          subject: message.subject,
          message: message.message,
          read: message.read,
          submittedAt: message.submittedAt,
        },
      })
    }
    console.log(`Migrated ${messages.length} messages`)

    // Migrate Donations
    console.log('Migrating donations...')
    const donations = await oldPrisma.donation.findMany()
    for (const donation of donations) {
      await newPrisma.donation.create({
        data: {
          id: donation.id,
          name: donation.name,
          email: donation.email,
          phone: donation.phone,
          address: donation.address,
          pan: donation.pan,
          amount: donation.amount,
          fund: donation.fund,
          status: donation.status,
          razorpayOrderId: donation.razorpayOrderId,
          razorpayPaymentId: donation.razorpayPaymentId,
          razorpaySignature: donation.razorpaySignature,
          receiptNumber: donation.receiptNumber,
          receiptGenerated: donation.receiptGenerated,
          isAnonymous: donation.isAnonymous,
          createdAt: donation.createdAt,
          updatedAt: donation.updatedAt,
        },
      })
    }
    console.log(`Migrated ${donations.length} donations`)

    // Migrate Settings
    console.log('Migrating settings...')
    const settings = await oldPrisma.siteSettings.findFirst()
    if (settings) {
      await newPrisma.siteSettings.create({
        data: {
          id: settings.id,
          email: settings.email,
          phone: settings.phone,
          whatsapp: settings.whatsapp,
          whatsappName: settings.whatsappName,
          address: settings.address,
          instagram: settings.instagram,
          facebook: settings.facebook,
          twitter: settings.twitter,
          youtube: settings.youtube,
          founderPortfolioUrl: settings.founderPortfolioUrl,
          donationFunds: settings.donationFunds,
          heroEducation: settings.heroEducation,
          heroBlankets: settings.heroBlankets,
          heroFlood: settings.heroFlood,
          heroWomen: settings.heroWomen,
          pNotebooks: settings.pNotebooks,
          pSanitary: settings.pSanitary,
          pRotibank: settings.pRotibank,
          pJoycation: settings.pJoycation,
          blanket: settings.blanket,
          chappal: settings.chappal,
          diwali: settings.diwali,
          diwali2: settings.diwali2,
          diwali3: settings.diwali3,
          flag: settings.flag,
          holi: settings.holi,
          holi2: settings.holi2,
          holi3: settings.holi3,
          joycation1: settings.joycation1,
          donateHeroImage: settings.donateHeroImage,
          aboutHeroImage: settings.aboutHeroImage,
          aboutSectionImage: settings.aboutSectionImage,
          contactHeroImage: settings.contactHeroImage,
          eventsHeroImage: settings.eventsHeroImage,
          blogHeroImage: settings.blogHeroImage,
          volunteerHeroImage: settings.volunteerHeroImage,
          volunteerFormImage: settings.volunteerFormImage,
          galleryHeroImage: settings.galleryHeroImage,
          projectsHeroImage: settings.projectsHeroImage,
          updatedAt: settings.updatedAt,
        },
      })
      console.log('Migrated settings')
    }

    console.log('Data migration completed successfully!')
  } catch (error) {
    console.error('Error during migration:', error)
    throw error
  } finally {
    await oldPrisma.$disconnect()
    await newPrisma.$disconnect()
  }
}

migrateData()
