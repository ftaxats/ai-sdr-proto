"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowLeft, Loader2, Building2, User, Target, TrendingUp, Zap, Upload, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface OnboardingData {
  fullName: string
  linkedinUrl: string
  companyWebsite: string
  crmConnection?: string
  prospectSource?: "crm" | "csv" | "website"
  csvFile?: File
  linkedinProfile?: any
  companyInfo?: any
  outreachStrategy?: any
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [data, setData] = useState<OnboardingData>({
    fullName: "",
    linkedinUrl: "",
    companyWebsite: "",
  })

  const totalSteps = 7
  const progress = (currentStep / totalSteps) * 100

  const handleContinue = async () => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (currentStep === 2) {
      setData((prev) => ({
        ...prev,
        linkedinProfile: {
          name: data.fullName,
          title: "Founder @ GradeLab",
          about: "AI | SAAS | DEVELOPING SOLUTIONS",
          education: [
            {
              school: "Symbiosis Skills & Professional University",
              degree: "Bachelor of Technology - BTech",
              field: "Cyber security",
              years: "2022 - 2025",
            },
            {
              school: "Marwadi University",
              degree: "Diploma of Education",
              field: "Information Technology",
              years: "2019 - 2022",
            },
          ],
          experience: [
            {
              company: "GradeLab",
              position: "Founder",
              years: "2024 - Present",
            },
            {
              company: "Saleshandy",
              position: "Junior Product Manager",
              years: "2025 - Present",
            },
            {
              company: "AccuWeb.Cloud",
              position: "Frontend Developer",
              years: "2024",
            },
            {
              company: "STP WEB HOSTING",
              position: "DevOps Intern",
              years: "2023",
            },
          ],
          summary: "I build softwares which solves real world problems.",
        },
      }))
    } else if (currentStep === 3) {
      setData((prev) => ({
        ...prev,
        companyInfo: {
          name: "Saleshandy",
          website: "saleshandy.com",
          description:
            "Saleshandy is a leading cold email outreach software that helps businesses automate their email campaigns to generate more leads, improve deliverability, and increase open and reply rates.",
          detailedSummary:
            "Saleshandy is a comprehensive cold email outreach platform designed to streamline outbound lead generation and sales engagement. Founded in 2015, it offers a suite of tools that enable users to find verified leads from a database of over 700 million B2B contacts, automate highly personalized cold email campaigns, and manage all prospect conversations in a unified inbox.",
          features: [
            "Lead database with 700M+ verified B2B contacts",
            "Automated personalized cold email campaigns",
            "Unified inbox for conversation management",
            "Advanced deliverability optimization suite",
          ],
          industry: "SaaS - Sales & Marketing Technology",
          targetMarket: "B2B Sales Teams, Marketing Agencies, Startups",
        },
      }))
    } else if (currentStep === 4) {
      setData((prev) => ({
        ...prev,
        outreachStrategy: {
          primaryGoals: [
            {
              id: 1,
              title: "Increase Lead Generation by 300%",
              description: "Target high-intent prospects in SaaS and tech companies",
              timeline: "3 months",
              priority: "high",
            },
            {
              id: 2,
              title: "Improve Email Response Rate to 15%+",
              description: "Leverage AI personalization for higher engagement",
              timeline: "2 months",
              priority: "high",
            },
            {
              id: 3,
              title: "Build Strategic Partnerships",
              description: "Connect with complementary SaaS tools and agencies",
              timeline: "6 months",
              priority: "medium",
            },
          ],
          icpProfile: {
            title: "SaaS Founders & Sales Leaders",
            company_size: "10-500 employees",
            industry: "B2B SaaS, Marketing Technology",
            pain_points: ["Low email deliverability", "Manual outreach processes", "Poor lead quality"],
            buying_signals: ["Recently raised funding", "Hiring sales team", "Expanding internationally"],
          },
          channels: ["Email", "LinkedIn", "Cold Calling"],
          sequences: [
            {
              name: "SaaS Founder Sequence",
              steps: 5,
              duration: "14 days",
              focus: "Pain point + solution fit",
            },
            {
              name: "Sales Leader Sequence",
              steps: 4,
              duration: "10 days",
              focus: "ROI and efficiency gains",
            },
          ],
        },
      }))
    }

    setIsLoading(false)

    if (currentStep === 7) {
      router.push("/dashboard")
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCrmSelect = (crm: string) => {
    setData((prev) => ({ ...prev, crmConnection: crm, prospectSource: "crm" }))
  }

  const handleProspectSourceSelect = (source: "crm" | "csv" | "website") => {
    setData((prev) => ({ ...prev, prospectSource: source }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setData((prev) => ({ ...prev, csvFile: file, prospectSource: "csv" }))
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return data.fullName.trim() !== "" && data.linkedinUrl.trim() !== "" && data.companyWebsite.trim() !== ""
      case 2:
        return data.prospectSource !== undefined
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="w-1/2 p-8 flex flex-col justify-between border-r border-border">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AI SDR</span>
          </div>

          {/* Step Content */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Let's get started by getting some information
                </h1>
                <p className="text-muted-foreground">We'll use this to create your personalized AI sales strategy</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                    Your full name*
                  </Label>
                  <Input
                    id="fullName"
                    value={data.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Akshat Shah"
                    className="h-12 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl" className="text-sm font-medium text-foreground">
                    Your LinkedIn URL
                  </Label>
                  <Input
                    id="linkedinUrl"
                    value={data.linkedinUrl}
                    onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                    placeholder="https://www.linkedin.com/in/it-akshat-shah/"
                    className="h-12 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyWebsite" className="text-sm font-medium text-foreground">
                    Your company website*
                  </Label>
                  <Input
                    id="companyWebsite"
                    value={data.companyWebsite}
                    onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
                    placeholder="https://saleshandy.com"
                    className="h-12 border-border"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Connect your prospect data</h1>
                <p className="text-muted-foreground">
                  Choose how you'd like to import your prospects to create your ICP
                </p>
              </div>

              <div className="space-y-6">
                {/* CRM Connections */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-foreground">Connect from CRM</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      {
                        name: "HubSpot",
                        logo: "/images/hubspot-logo.png",
                        color: "bg-white border-gray-200 hover:border-orange-300 hover:shadow-md",
                      },
                      {
                        name: "Salesforce",
                        logo: "/images/salesforce-logo.png",
                        color: "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md",
                      },
                      {
                        name: "Zoho CRM",
                        logo: "/images/zoho-crm-logo.png",
                        color: "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md",
                      },
                      {
                        name: "Pipedrive",
                        logo: "/images/pipedrive-logo.png",
                        color: "bg-white border-gray-200 hover:border-green-300 hover:shadow-md",
                      },
                    ].map((crm) => (
                      <Card
                        key={crm.name}
                        className={`cursor-pointer transition-all ${crm.color} ${
                          data.crmConnection === crm.name ? "ring-2 ring-primary shadow-lg" : ""
                        }`}
                        onClick={() => handleCrmSelect(crm.name)}
                      >
                        <CardContent className="p-4 flex items-center justify-center">
                          <div className="w-12 h-12 relative">
                            <Image
                              src={crm.logo || "/placeholder.svg"}
                              alt={`${crm.name} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* CSV Upload */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-foreground">Upload CSV</h3>
                  <Card
                    className={`cursor-pointer transition-all border-2 border-dashed ${
                      data.prospectSource === "csv"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => document.getElementById("csvUpload")?.click()}
                  >
                    <CardContent className="p-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium mb-1 text-sm">
                        {data.csvFile ? data.csvFile.name : "Drop your prospect list CSV"}
                      </p>
                      <p className="text-xs text-muted-foreground">Include columns: Name, Email, Company, Title</p>
                      <input id="csvUpload" type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                    </CardContent>
                  </Card>
                </div>

                {/* Website Analysis */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-foreground">Find from website</h3>
                  <Card
                    className={`cursor-pointer transition-all ${
                      data.prospectSource === "website" ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleProspectSourceSelect("website")}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <Globe className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Don't have any - find from my website</p>
                        <p className="text-xs text-muted-foreground">
                          We'll analyze your website to identify your ideal customers
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to AI SDR</h1>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{data.fullName}</h2>
                <p className="text-muted-foreground">Analyzing your profile to create intelligent sales strategies</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">LinkedIn Profile Analyzed</span>
                </div>

                {data.linkedinProfile && (
                  <div className="space-y-2 text-sm text-muted-foreground ml-8">
                    <p>• Found {data.linkedinProfile.name}'s Profile</p>
                    <p>• {data.linkedinProfile.title}</p>
                    <p>• Junior Product Manager at Saleshandy</p>
                    <p>• Frontend Developer at AccuWeb.Cloud</p>
                    <p>• Found work history with 4 positions</p>
                    <p>
                      • Education: {data.linkedinProfile.education[0].school},{" "}
                      {data.linkedinProfile.education[1].school}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && data.linkedinProfile && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Company Intelligence Analysis</h1>
                <p className="text-muted-foreground">Building comprehensive market and competitive intelligence</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Company Profile Analyzed</span>
                </div>
                <div className="flex items-center gap-3 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Market Position Identified</span>
                </div>
                <div className="flex items-center gap-3 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Competitive Landscape Mapped</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && data.outreachStrategy && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">AI-Generated Outreach Strategy</h1>
                <p className="text-muted-foreground">
                  Based on your company profile, here are your recommended objectives
                </p>
              </div>

              <div className="space-y-4">
                {data.outreachStrategy.primaryGoals.map((goal: any) => (
                  <div key={goal.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{goal.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          goal.priority === "high" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {goal.priority}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                    <p className="text-xs text-muted-foreground">Timeline: {goal.timeline}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Automated Workflow Setup</h1>
                <p className="text-muted-foreground">Configuring your AI-powered sales development system</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">ICP Profile Generated</span>
                </div>
                <div className="flex items-center gap-3 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Lead Scoring Model Trained</span>
                </div>
                <div className="flex items-center gap-3 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Outreach Sequences Created</span>
                </div>
                <div className="flex items-center gap-3 text-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Enrichment Pipeline Active</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Your AI SDR Platform is Ready!</h1>
                <p className="text-muted-foreground">
                  Your intelligent sales development workspace is configured and ready to generate high-quality leads.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border-border">
                  <div className="flex items-center gap-3">
                    <Target className="w-8 h-8 text-accent" />
                    <div>
                      <h3 className="font-semibold">Smart Targeting</h3>
                      <p className="text-sm text-muted-foreground">AI-powered ICP matching</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-border">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-accent" />
                    <div>
                      <h3 className="font-semibold">Lead Scoring</h3>
                      <p className="text-sm text-muted-foreground">Prioritize best prospects</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {currentStep === 1
                ? "Personal Information"
                : currentStep === 2
                  ? "Prospect Data"
                  : currentStep === 3
                    ? "Profile Analysis"
                    : currentStep === 4
                      ? "Company Intelligence"
                      : currentStep === 5
                        ? "Strategy Planning"
                        : currentStep === 6
                          ? "System Setup"
                          : "Complete"}
            </span>
            <span>
              {currentStep}/{totalSteps} completed
            </span>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="flex gap-4">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex items-center gap-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}

            <Button onClick={handleContinue} disabled={!isStepValid() || isLoading} className="flex-1 h-12">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {currentStep === 1
                    ? "Processing..."
                    : currentStep === 2
                      ? "Analyzing Profile..."
                      : currentStep === 3
                        ? "Processing Company..."
                        : currentStep === 4
                          ? "Generating Strategy..."
                          : currentStep === 5
                            ? "Setting up AI..."
                            : "Finalizing..."}
                </>
              ) : currentStep === 7 ? (
                "Launch AI SDR Platform"
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-muted/30 p-8 flex items-center justify-center">
        {currentStep === 1 && (
          <Card className="w-full max-w-md border-border">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">{data.fullName || "Your Name"}</h3>
            </CardHeader>
            <CardContent className="space-y-4 text-center text-muted-foreground">
              <p>
                We'll analyze your profile and company to create a personalized AI-powered sales development strategy.
              </p>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="w-full max-w-md border-border">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">ICP Research</h3>
            </CardHeader>
            <CardContent className="space-y-4 text-center text-muted-foreground">
              <p>
                We'll analyze your prospect data to create a detailed Ideal Customer Profile and research your target
                market.
              </p>
              {data.prospectSource && (
                <div className="mt-4 p-3 bg-accent/5 rounded-lg">
                  <p className="text-sm font-medium text-foreground">
                    {data.prospectSource === "crm" && `Connected to ${data.crmConnection}`}
                    {data.prospectSource === "csv" && `CSV uploaded: ${data.csvFile?.name}`}
                    {data.prospectSource === "website" && "Website analysis selected"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && data.linkedinProfile && (
          <Card className="w-full max-w-md border-border">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">{data.linkedinProfile.name}</h3>
                <p className="text-sm text-muted-foreground">{data.linkedinProfile.title}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{data.linkedinProfile.about}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Experience</h4>
                {data.linkedinProfile.experience.slice(0, 2).map((exp: any, index: number) => (
                  <div key={index} className="text-sm space-y-1 mb-3">
                    <p className="font-medium">{exp.company}</p>
                    <p className="text-muted-foreground">{exp.position}</p>
                    <p className="text-muted-foreground">{exp.years}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && data.companyInfo && (
          <Card className="w-full max-w-md border-border">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">{data.companyInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{data.companyInfo.industry}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Market Position</h4>
                <p className="text-sm text-muted-foreground">{data.companyInfo.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Target Market</h4>
                <p className="text-sm text-muted-foreground">{data.companyInfo.targetMarket}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Features</h4>
                <div className="space-y-1">
                  {data.companyInfo.features.slice(0, 3).map((feature: string, index: number) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      • {feature}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 5 && data.outreachStrategy && (
          <Card className="w-full max-w-md border-border">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Ideal Customer Profile</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{data.outreachStrategy.icpProfile.title}</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Company Size:</strong> {data.outreachStrategy.icpProfile.company_size}
                  </p>
                  <p>
                    <strong>Industry:</strong> {data.outreachStrategy.icpProfile.industry}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Pain Points</h4>
                <div className="space-y-1">
                  {data.outreachStrategy.icpProfile.pain_points.map((pain: string, index: number) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      • {pain}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Buying Signals</h4>
                <div className="space-y-1">
                  {data.outreachStrategy.icpProfile.buying_signals.map((signal: string, index: number) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      • {signal}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {(currentStep === 6 || currentStep === 7) && (
          <Card className="w-full max-w-md border-border">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">AI SDR Platform</h3>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                Your intelligent sales development system is configured and ready to automate your entire outreach
                workflow.
              </p>
              {currentStep === 7 && (
                <div className="grid grid-cols-1 gap-3 mt-6">
                  <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-sm">Lead Intelligence Active</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-sm">Scoring Engine Ready</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-sm">Automated Sequences Live</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
