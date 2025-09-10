"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Target,
  TrendingUp,
  BarChart3,
  Plus,
  Star,
  Clock,
  User,
  Zap,
  Calendar,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Eye,
  Database,
  Activity,
  Brain,
  Rocket,
  Send,
  Workflow,
  Play,
  Settings,
  ChevronRight,
} from "lucide-react"

const automatedWorkflowStatus = {
  icpGeneration: { status: "completed", progress: 100, leads: 1247 },
  leadScoring: { status: "processing", progress: 85, scored: 1058, remaining: 189 },
  enrichment: { status: "processing", progress: 72, enriched: 897, processing: 350 },
  sequenceCreation: { status: "completed", progress: 100, sequences: 3 },
  outreachLaunch: { status: "ready", progress: 0, scheduled: 456 },
}

const icpProfile = {
  title: "SaaS Founders & Sales Leaders",
  description: "Decision makers at B2B SaaS companies looking to scale their sales operations",
  criteria: {
    companySize: "10-500 employees",
    industry: "B2B SaaS, Marketing Technology, Sales Tools",
    revenue: "$1M-50M ARR",
    geography: "North America, Europe",
    techStack: ["Salesforce", "HubSpot", "Outreach", "Apollo"],
    painPoints: ["Low email deliverability", "Manual outreach processes", "Poor lead quality", "Scaling challenges"],
    buyingSignals: ["Recently raised funding", "Hiring sales team", "Expanding internationally", "New product launch"],
  },
  segments: [
    { name: "Tier 1 - High Intent", count: 89, score: "9-10", description: "Ready to buy, strong fit" },
    { name: "Tier 2 - Warm Prospects", count: 234, score: "7-8", description: "Good fit, needs nurturing" },
    { name: "Tier 3 - Future Opportunities", count: 156, score: "5-6", description: "Potential fit, long-term" },
  ],
}

const automatedSequences = [
  {
    id: 1,
    name: "SaaS Founder Outreach",
    type: "Multi-channel",
    steps: 5,
    duration: "14 days",
    channels: ["Email", "LinkedIn", "Phone"],
    status: "active",
    performance: { sent: 156, opened: 89, replied: 23, meetings: 8 },
    nextAction: "Send follow-up email to 34 prospects",
  },
  {
    id: 2,
    name: "Sales Leader Nurture",
    type: "Email-focused",
    steps: 4,
    duration: "10 days",
    channels: ["Email", "LinkedIn"],
    status: "active",
    performance: { sent: 234, opened: 145, replied: 34, meetings: 12 },
    nextAction: "LinkedIn connection requests to 45 prospects",
  },
  {
    id: 3,
    name: "Enterprise Decision Maker",
    type: "High-touch",
    steps: 6,
    duration: "21 days",
    channels: ["Email", "LinkedIn", "Phone", "Direct Mail"],
    status: "draft",
    performance: { sent: 0, opened: 0, replied: 0, meetings: 0 },
    nextAction: "Review and launch sequence",
  },
]

const topScoredLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "VP of Sales",
    company: "TechFlow Solutions",
    score: 9.2,
    tier: "Tier 1",
    signals: ["Recently hired 5 SDRs", "Expanding to EU market", "Using outdated email tools"],
    nextAction: "Send personalized email about scaling challenges",
    status: "ready",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Founder & CEO",
    company: "GrowthLab",
    score: 8.8,
    tier: "Tier 1",
    signals: ["Raised Series A", "Posted about email deliverability issues", "Growing sales team"],
    nextAction: "LinkedIn connection with funding congratulations",
    status: "ready",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Head of Marketing",
    company: "CloudTech Innovations",
    score: 8.5,
    tier: "Tier 1",
    signals: ["Attending SaaStr conference", "Looking for email automation", "Budget approved"],
    nextAction: "Conference-based outreach email",
    status: "ready",
  },
]

export default function DashboardPage() {
  const [activeModule, setActiveModule] = useState("overview")
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [selectedSequence, setSelectedSequence] = useState<any>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate progress updates
      if (automatedWorkflowStatus.leadScoring.status === "processing") {
        automatedWorkflowStatus.leadScoring.progress = Math.min(100, automatedWorkflowStatus.leadScoring.progress + 2)
      }
      if (automatedWorkflowStatus.enrichment.status === "processing") {
        automatedWorkflowStatus.enrichment.progress = Math.min(100, automatedWorkflowStatus.enrichment.progress + 1)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleLaunchOutreach = async () => {
    setIsProcessing(true)
    // Simulate launching outreach
    await new Promise((resolve) => setTimeout(resolve, 3000))
    automatedWorkflowStatus.outreachLaunch.status = "active"
    automatedWorkflowStatus.outreachLaunch.progress = 100
    setIsProcessing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-accent"
      case "processing":
        return "text-yellow-600"
      case "ready":
        return "text-blue-600"
      case "active":
        return "text-accent"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "processing":
        return <Loader2 className="w-4 h-4 animate-spin" />
      case "ready":
        return <Play className="w-4 h-4" />
      case "active":
        return <Activity className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-64 bg-sidebar border-r border-sidebar-border p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">AI SDR</span>
        </div>

        <nav className="space-y-2">
          <Button
            variant={activeModule === "overview" ? "default" : "ghost"}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setActiveModule("overview")}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeModule === "workflow" ? "default" : "ghost"}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setActiveModule("workflow")}
          >
            <Workflow className="w-4 h-4 mr-2" />
            Automated Workflow
          </Button>
          <Button
            variant={activeModule === "icp" ? "default" : "ghost"}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setActiveModule("icp")}
          >
            <Target className="w-4 h-4 mr-2" />
            ICP & Segmentation
          </Button>
          <Button
            variant={activeModule === "leads" ? "default" : "ghost"}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setActiveModule("leads")}
          >
            <Users className="w-4 h-4 mr-2" />
            Lead Intelligence
          </Button>
          <Button
            variant={activeModule === "sequences" ? "default" : "ghost"}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setActiveModule("sequences")}
          >
            <Send className="w-4 h-4 mr-2" />
            Outreach Sequences
          </Button>
          <Button
            variant={activeModule === "analytics" ? "default" : "ghost"}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setActiveModule("analytics")}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance Analytics
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeModule === "overview" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">AI SDR Dashboard</h1>
                <p className="text-muted-foreground">Automated sales development and intelligent lead management</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
                <Button className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Launch Campaign
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High-Intent Leads</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">Tier 1 prospects ready</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">+15% from last week</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14.7%</div>
                  <p className="text-xs text-muted-foreground">Above industry average</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-accent" />
                  Automated AI Workflow Status
                </CardTitle>
                <CardDescription>
                  Your AI SDR is automatically processing prospects and preparing outreach campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                    <div className={`${getStatusColor(automatedWorkflowStatus.icpGeneration.status)}`}>
                      {getStatusIcon(automatedWorkflowStatus.icpGeneration.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">ICP Generation</h4>
                      <p className="text-xs text-muted-foreground">
                        {automatedWorkflowStatus.icpGeneration.leads} prospects identified
                      </p>
                      <Progress value={automatedWorkflowStatus.icpGeneration.progress} className="h-1 mt-2" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                    <div className={`${getStatusColor(automatedWorkflowStatus.leadScoring.status)}`}>
                      {getStatusIcon(automatedWorkflowStatus.leadScoring.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Lead Scoring</h4>
                      <p className="text-xs text-muted-foreground">
                        {automatedWorkflowStatus.leadScoring.scored} scored,{" "}
                        {automatedWorkflowStatus.leadScoring.remaining} remaining
                      </p>
                      <Progress value={automatedWorkflowStatus.leadScoring.progress} className="h-1 mt-2" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                    <div className={`${getStatusColor(automatedWorkflowStatus.enrichment.status)}`}>
                      {getStatusIcon(automatedWorkflowStatus.enrichment.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Data Enrichment</h4>
                      <p className="text-xs text-muted-foreground">
                        {automatedWorkflowStatus.enrichment.enriched} enriched,{" "}
                        {automatedWorkflowStatus.enrichment.processing} processing
                      </p>
                      <Progress value={automatedWorkflowStatus.enrichment.progress} className="h-1 mt-2" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`${getStatusColor(automatedWorkflowStatus.outreachLaunch.status)}`}>
                      {getStatusIcon(automatedWorkflowStatus.outreachLaunch.status)}
                    </div>
                    <div>
                      <h4 className="font-medium">Outreach Campaign Ready</h4>
                      <p className="text-sm text-muted-foreground">456 prospects ready for automated outreach</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLaunchOutreach}
                    disabled={isProcessing || automatedWorkflowStatus.outreachLaunch.status === "active"}
                    className="flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Launching...
                      </>
                    ) : automatedWorkflowStatus.outreachLaunch.status === "active" ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Campaign Active
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4" />
                        Launch Campaign
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  High-Priority Prospects
                </CardTitle>
                <CardDescription>AI-scored leads ready for personalized outreach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topScoredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">{lead.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {lead.title} at {lead.company}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              Score: {lead.score}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {lead.tier}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-accent">{lead.nextAction}</p>
                        <Button size="sm" className="mt-2">
                          <Send className="w-3 h-3 mr-1" />
                          Start Outreach
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeModule === "workflow" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Automated Workflow</h1>
              <p className="text-muted-foreground">AI-powered end-to-end sales development process</p>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Workflow Pipeline</CardTitle>
                <CardDescription>Automated process from company data to outreach execution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Step 1: ICP Generation */}
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">1. ICP Generation & Segmentation</h3>
                      <p className="text-sm text-muted-foreground">
                        AI analyzed your company data and created ideal customer profiles
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm">Completed - 3 segments created</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* Step 2: Lead Scoring */}
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">2. Lead Scoring & Prioritization</h3>
                      <p className="text-sm text-muted-foreground">WHO-ACT-NEED methodology applied to all prospects</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Loader2 className="w-4 h-4 text-yellow-600 animate-spin" />
                        <span className="text-sm">Processing - 85% complete</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* Step 3: Enrichment */}
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">3. Data Enrichment</h3>
                      <p className="text-sm text-muted-foreground">
                        Gathering contact details, company insights, and behavioral data
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                        <span className="text-sm">Processing - 72% complete</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* Step 4: Sequence Creation */}
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Workflow className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">4. Personalized Sequence Creation</h3>
                      <p className="text-sm text-muted-foreground">AI-generated multi-channel outreach sequences</p>
                      <div className="flex items-center gap-2 mt-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm">Completed - 3 sequences ready</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* Step 5: Launch */}
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-muted/50">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">5. Campaign Launch</h3>
                      <p className="text-sm text-muted-foreground">Automated outreach execution across all channels</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Play className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Ready to launch - 456 prospects queued</span>
                      </div>
                    </div>
                    <Button className="ml-4">
                      <Rocket className="w-4 h-4 mr-2" />
                      Launch Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeModule === "icp" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">ICP & Segmentation</h1>
              <p className="text-muted-foreground">AI-generated ideal customer profile based on your company data</p>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Ideal Customer Profile
                </CardTitle>
                <CardDescription>Generated from Saleshandy's market position and customer base</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{icpProfile.title}</h3>
                  <p className="text-muted-foreground">{icpProfile.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Company Criteria</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Company Size:</span>
                        <span>{icpProfile.criteria.companySize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span>{icpProfile.criteria.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span>{icpProfile.criteria.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Geography:</span>
                        <span>{icpProfile.criteria.geography}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Pain Points</h4>
                    <div className="space-y-2">
                      {icpProfile.criteria.painPoints.map((pain, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm">{pain}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Buying Signals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {icpProfile.criteria.buyingSignals.map((signal, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span className="text-sm">{signal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Segmentation Results</CardTitle>
                <CardDescription>Prospects automatically categorized by fit and intent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {icpProfile.segments.map((segment, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{segment.name}</h4>
                        <Badge variant="outline">{segment.count} prospects</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{segment.description}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">Score: {segment.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeModule === "sequences" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Outreach Sequences</h1>
                <p className="text-muted-foreground">AI-generated multi-channel outreach campaigns</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Sequence
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {automatedSequences.map((sequence) => (
                <Card key={sequence.id} className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{sequence.name}</CardTitle>
                      <Badge variant={sequence.status === "active" ? "default" : "secondary"}>{sequence.status}</Badge>
                    </div>
                    <CardDescription>
                      {sequence.type} • {sequence.steps} steps • {sequence.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Channels</h4>
                      <div className="flex gap-2">
                        {sequence.channels.map((channel) => (
                          <Badge key={channel} variant="outline" className="text-xs">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Performance</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sent:</span>
                          <span>{sequence.performance.sent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Opened:</span>
                          <span>{sequence.performance.opened}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Replied:</span>
                          <span>{sequence.performance.replied}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Meetings:</span>
                          <span>{sequence.performance.meetings}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">Next Action:</p>
                      <p className="text-sm font-medium">{sequence.nextAction}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Settings className="w-3 h-3 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeModule === "leads" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Lead Intelligence</h1>
              <p className="text-muted-foreground">AI-powered lead scoring and enrichment</p>
            </div>
          </div>
        )}

        {activeModule === "analytics" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Performance Analytics</h1>
              <p className="text-muted-foreground">Track campaign performance and optimize outreach</p>
            </div>
          </div>
        )}

        {/* Other module views would be implemented similarly */}
        {activeModule !== "overview" &&
          activeModule !== "workflow" &&
          activeModule !== "icp" &&
          activeModule !== "leads" &&
          activeModule !== "sequences" &&
          activeModule !== "analytics" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground capitalize">{activeModule.replace("-", " ")}</h1>
                <p className="text-muted-foreground">Module content coming soon...</p>
              </div>
              <Card>
                <CardContent className="p-8 text-center">
                  <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Module Under Development</h3>
                  <p className="text-muted-foreground">
                    This module is being built to provide advanced {activeModule.replace("-", " ")} capabilities.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
      </div>
    </div>
  )
}
