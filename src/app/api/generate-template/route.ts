import { NextRequest, NextResponse } from 'next/server'
import { TemplateGenerator } from '@/lib/ai/template-generator'
import { ProjectRequirements } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const requirements: ProjectRequirements = await request.json()

    // Validate required fields
    if (!requirements.projectType || !requirements.industry) {
      return NextResponse.json(
        { error: 'Project type and industry are required' },
        { status: 400 }
      )
    }

    // Generate the template
    console.log('Generating template for requirements:', requirements)
    const template = await TemplateGenerator.generateTemplate(requirements)

    return NextResponse.json({
      success: true,
      template
    })

  } catch (error) {
    console.error('Template generation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate template',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Template generation API endpoint',
    methods: ['POST'],
    example: {
      projectType: 'landing',
      industry: 'tech',
      styleDirection: 'modern',
      colorPreferences: { type: 'ai-suggested' },
      typographyStyle: 'professional',
      requiredSections: ['hero', 'about', 'contact'],
      devicePriority: 'mobile-first',
      accessibilityLevel: 'enhanced'
    }
  })
}