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

    // Add default values for missing fields
    const completeRequirements: ProjectRequirements = {
      projectType: requirements.projectType,
      industry: requirements.industry,
      purpose: requirements.purpose || 'Build brand awareness',
      targetAudience: requirements.targetAudience || 'General consumers (B2C)',
      styleDirection: requirements.styleDirection || 'modern',
      colorPreferences: requirements.colorPreferences || { type: 'ai-suggested' },
      typographyStyle: requirements.typographyStyle || 'professional',
      requiredSections: requirements.requiredSections || ['hero', 'about', 'contact'],
      interactiveElements: requirements.interactiveElements || [],
      specialFeatures: requirements.specialFeatures || [],
      devicePriority: requirements.devicePriority || 'mobile-first',
      accessibilityLevel: requirements.accessibilityLevel || 'enhanced'
    }

    // Generate the template
    console.log('Generating template for requirements:', completeRequirements)
    const template = await TemplateGenerator.generateTemplate(completeRequirements)

    console.log('Template generated successfully:', {
      id: template.id,
      name: template.name,
      componentsCount: template.components.length,
      htmlLength: template.html.length,
      cssLength: template.css.length
    })

    return NextResponse.json({
      success: true,
      template
    })

  } catch (error) {
    console.error('Template generation error:', error)
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace available')
    
    return NextResponse.json(
      { 
        error: 'Failed to generate template',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
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