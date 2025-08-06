import { ProjectRequirements } from '@/types'

export interface ContentStrategy {
  tone: 'professional' | 'friendly' | 'authoritative' | 'approachable' | 'technical'
  urgency: 'low' | 'medium' | 'high'
  focusArea: 'credibility' | 'innovation' | 'results' | 'personal' | 'expertise'
  ctaStyle: 'soft' | 'direct' | 'urgent' | 'consultative'
  messaging: {
    primaryValue: string
    secondaryValues: string[]
    riskMitigators: string[]
  }
}

export interface ContentPersonalization {
  businessName?: string
  ownerName?: string
  locationContext?: string
  targetPain?: string
  solutionBenefit?: string
}

// Purpose-driven content strategies
export const PURPOSE_STRATEGIES: Record<string, ContentStrategy> = {
  'Generate leads and conversions': {
    tone: 'professional',
    urgency: 'high',
    focusArea: 'results',
    ctaStyle: 'direct',
    messaging: {
      primaryValue: 'proven results that drive growth',
      secondaryValues: ['measurable outcomes', 'quick implementation', 'ROI focus'],
      riskMitigators: ['free consultation', 'case studies', 'money-back guarantee']
    }
  },
  'Build brand awareness': {
    tone: 'approachable',
    urgency: 'low',
    focusArea: 'innovation',
    ctaStyle: 'soft',
    messaging: {
      primaryValue: 'innovative solutions that set you apart',
      secondaryValues: ['thought leadership', 'industry expertise', 'creative approach'],
      riskMitigators: ['awards and recognition', 'media features', 'industry partnerships']
    }
  },
  'Sell products or services': {
    tone: 'friendly',
    urgency: 'medium',
    focusArea: 'results',
    ctaStyle: 'direct',
    messaging: {
      primaryValue: 'quality solutions at competitive prices',
      secondaryValues: ['customer satisfaction', 'value for money', 'fast delivery'],
      riskMitigators: ['customer reviews', 'satisfaction guarantee', 'secure payment']
    }
  },
  'Share information and content': {
    tone: 'authoritative',
    urgency: 'low',
    focusArea: 'expertise',
    ctaStyle: 'consultative',
    messaging: {
      primaryValue: 'trusted expertise and insights',
      secondaryValues: ['comprehensive resources', 'regular updates', 'expert analysis'],
      riskMitigators: ['credentials and certifications', 'published research', 'industry recognition']
    }
  },
  'Collect user data': {
    tone: 'approachable',
    urgency: 'medium',
    focusArea: 'personal',
    ctaStyle: 'soft',
    messaging: {
      primaryValue: 'personalized experiences tailored to you',
      secondaryValues: ['privacy protection', 'valuable insights', 'exclusive content'],
      riskMitigators: ['privacy policy', 'data security', 'opt-out options']
    }
  },
  'Provide customer support': {
    tone: 'friendly',
    urgency: 'low',
    focusArea: 'credibility',
    ctaStyle: 'consultative',
    messaging: {
      primaryValue: 'reliable support when you need it most',
      secondaryValues: ['24/7 availability', 'expert assistance', 'quick resolution'],
      riskMitigators: ['response time guarantees', 'satisfaction ratings', 'multiple contact options']
    }
  },
  'Showcase portfolio/work': {
    tone: 'professional',
    urgency: 'low',
    focusArea: 'expertise',
    ctaStyle: 'consultative',
    messaging: {
      primaryValue: 'exceptional work that speaks for itself',
      secondaryValues: ['creative excellence', 'attention to detail', 'client satisfaction'],
      riskMitigators: ['client testimonials', 'award recognition', 'portfolio diversity']
    }
  },
  'Build community': {
    tone: 'friendly',
    urgency: 'low',
    focusArea: 'personal',
    ctaStyle: 'soft',
    messaging: {
      primaryValue: 'a welcoming community where you belong',
      secondaryValues: ['shared interests', 'supportive environment', 'valuable connections'],
      riskMitigators: ['member testimonials', 'community guidelines', 'free to join']
    }
  },
  'Educate and inform': {
    tone: 'authoritative',
    urgency: 'low',
    focusArea: 'expertise',
    ctaStyle: 'consultative',
    messaging: {
      primaryValue: 'comprehensive education from trusted experts',
      secondaryValues: ['practical knowledge', 'step-by-step guidance', 'real-world application'],
      riskMitigators: ['instructor credentials', 'student success stories', 'curriculum transparency']
    }
  },
  'Drive event attendance': {
    tone: 'approachable',
    urgency: 'high',
    focusArea: 'innovation',
    ctaStyle: 'urgent',
    messaging: {
      primaryValue: 'exclusive insights you can\'t get anywhere else',
      secondaryValues: ['networking opportunities', 'industry leaders', 'limited availability'],
      riskMitigators: ['speaker lineup', 'past attendee feedback', 'agenda preview']
    }
  }
}

// Audience-driven content modifications
export const AUDIENCE_MODIFIERS: Record<string, {
  languageComplexity: 'simple' | 'moderate' | 'advanced'
  decisionSpeed: 'fast' | 'moderate' | 'slow'
  trustFactors: string[]
  painPoints: string[]
}> = {
  'General consumers (B2C)': {
    languageComplexity: 'simple',
    decisionSpeed: 'fast',
    trustFactors: ['customer reviews', 'money-back guarantee', 'easy returns'],
    painPoints: ['saving money', 'convenience', 'quality concerns']
  },
  'Business professionals (B2B)': {
    languageComplexity: 'advanced',
    decisionSpeed: 'slow',
    trustFactors: ['case studies', 'ROI data', 'industry certifications'],
    painPoints: ['efficiency', 'scalability', 'compliance']
  },
  'Young adults (18-30)': {
    languageComplexity: 'moderate',
    decisionSpeed: 'fast',
    trustFactors: ['social proof', 'innovation', 'sustainability'],
    painPoints: ['affordability', 'convenience', 'social impact']
  },
  'Middle-aged professionals (30-50)': {
    languageComplexity: 'advanced',
    decisionSpeed: 'moderate',
    trustFactors: ['expertise', 'track record', 'comprehensive solutions'],
    painPoints: ['time constraints', 'family considerations', 'career advancement']
  },
  'Seniors (50+)': {
    languageComplexity: 'simple',
    decisionSpeed: 'slow',
    trustFactors: ['personal service', 'established reputation', 'clear communication'],
    painPoints: ['simplicity', 'reliability', 'personal attention']
  },
  'Students and educators': {
    languageComplexity: 'moderate',
    decisionSpeed: 'moderate',
    trustFactors: ['educational value', 'peer recommendations', 'institutional partnerships'],
    painPoints: ['budget constraints', 'learning outcomes', 'practical application']
  },
  'Entrepreneurs and startups': {
    languageComplexity: 'advanced',
    decisionSpeed: 'fast',
    trustFactors: ['scalability', 'innovation', 'growth potential'],
    painPoints: ['resource constraints', 'speed to market', 'competitive advantage']
  },
  'Enterprise decision makers': {
    languageComplexity: 'advanced',
    decisionSpeed: 'slow',
    trustFactors: ['security', 'compliance', 'enterprise support'],
    painPoints: ['integration complexity', 'risk management', 'stakeholder buy-in']
  },
  'Creative professionals': {
    languageComplexity: 'moderate',
    decisionSpeed: 'moderate',
    trustFactors: ['portfolio quality', 'creative freedom', 'industry recognition'],
    painPoints: ['creative constraints', 'client management', 'pricing pressures']
  },
  'Technical/Developer audience': {
    languageComplexity: 'advanced',
    decisionSpeed: 'moderate',
    trustFactors: ['technical specifications', 'documentation quality', 'open source'],
    painPoints: ['technical debt', 'scalability', 'maintenance overhead']
  }
}

export function getContentStrategy(requirements: ProjectRequirements): ContentStrategy {
  const purpose = requirements.purpose || 'Generate leads and conversions'
  return PURPOSE_STRATEGIES[purpose] || PURPOSE_STRATEGIES['Generate leads and conversions']
}

export function getAudienceModifiers(requirements: ProjectRequirements) {
  const audience = requirements.targetAudience || 'General consumers (B2C)'
  return AUDIENCE_MODIFIERS[audience] || AUDIENCE_MODIFIERS['General consumers (B2C)']
}

export function generatePersonalizedContent(
  baseContent: string,
  requirements: ProjectRequirements,
  personalization: ContentPersonalization = {}
): string {
  let content = baseContent

  // Use business name from requirements if available
  const businessName = requirements.businessName || personalization.businessName

  // Replace business name if provided
  if (businessName) {
    // Replace generic terms with business name
    content = content.replace(/\b(we|our|us)\b/gi, (match, p1) => {
      switch (p1.toLowerCase()) {
        case 'we': return businessName
        case 'our': return `${businessName}'s`
        case 'us': return businessName
        default: return businessName
      }
    })
    content = content.replace(/\bthe (company|business|organization)\b/gi, businessName)
    content = content.replace(/\bour (team|services|solutions)\b/gi, `${businessName}'s $1`)
  }

  // Adjust tone based on audience
  const audienceModifiers = getAudienceModifiers(requirements)
  const strategy = getContentStrategy(requirements)

  // Apply tone adjustments based on audience complexity
  if (strategy.tone === 'technical' && audienceModifiers.languageComplexity === 'simple') {
    // Simplify technical language
    content = content.replace(/utilize/gi, 'use')
    content = content.replace(/implement/gi, 'put in place')
    content = content.replace(/comprehensive/gi, 'complete')
    content = content.replace(/optimize/gi, 'improve')
    content = content.replace(/facilitate/gi, 'help with')
  }

  // Make language more approachable for general consumers
  if (requirements.targetAudience === 'General consumers (B2C)') {
    content = content.replace(/solutions/gi, 'services')
    content = content.replace(/leverage/gi, 'use')
    content = content.replace(/scalable/gi, 'flexible')
  }

  // Add urgency for fast-decision audiences
  if (audienceModifiers.decisionSpeed === 'fast' && strategy.urgency === 'high') {
    content = content.replace(/contact us/gi, 'get started today')
    content = content.replace(/learn more/gi, 'see results now')
  }

  return content
}

export function generateCTAText(
  requirements: ProjectRequirements,
  context: 'primary' | 'secondary' | 'footer' = 'primary'
): { primary: string; secondary: string } {
  const strategy = getContentStrategy(requirements)
  const audience = getAudienceModifiers(requirements)

  const ctaMap = {
    soft: {
      primary: ['Learn More', 'Explore Options', 'See How It Works', 'Get Information'],
      secondary: ['Contact Us', 'Schedule Call', 'Request Info', 'Ask Questions']
    },
    direct: {
      primary: ['Get Started', 'Start Now', 'Try It Free', 'Get Quote'],
      secondary: ['See Pricing', 'View Plans', 'Contact Sales', 'Learn More']
    },
    urgent: {
      primary: ['Register Now', 'Claim Your Spot', 'Don\'t Miss Out', 'Act Now'],
      secondary: ['Limited Time', 'Reserve Seat', 'Join Waitlist', 'Get Notified']
    },
    consultative: {
      primary: ['Schedule Consultation', 'Get Expert Advice', 'Discuss Your Needs', 'Free Assessment'],
      secondary: ['Learn More', 'View Portfolio', 'Read Case Studies', 'Contact Expert']
    }
  }

  const ctas = ctaMap[strategy.ctaStyle] || ctaMap.direct

  // Select CTAs based on decision speed
  const primaryIndex = audience.decisionSpeed === 'fast' ? 0 : 
                     audience.decisionSpeed === 'moderate' ? 1 : 2
  const secondaryIndex = audience.decisionSpeed === 'fast' ? 0 : 1

  return {
    primary: ctas.primary[primaryIndex] || ctas.primary[0],
    secondary: ctas.secondary[secondaryIndex] || ctas.secondary[0]
  }
}

export function generateValuePropositions(requirements: ProjectRequirements): string[] {
  const strategy = getContentStrategy(requirements)
  const audience = getAudienceModifiers(requirements)

  const baseValues = strategy.messaging.secondaryValues
  const painPoints = audience.painPoints
  const trustFactors = audience.trustFactors

  // Combine and prioritize based on audience pain points
  const combinedValues = [
    ...baseValues,
    ...painPoints.map(pain => `addressing ${pain}`),
    ...trustFactors.slice(0, 2)
  ]

  return combinedValues.slice(0, 4)
}