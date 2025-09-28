import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AquaChat } from "@/components/AquaChat";
import { SectorDashboard } from "@/components/SectorDashboard";

type Sector = 'Agriculture' | 'Industry' | 'Energy' | 'Healthcare' | 'Environment';

const sectors = [
  {
    id: 'Agriculture' as Sector,
    title: '🌾 Agriculture',
    description: 'Irrigation & Crop Water Management',
    features: ['Crop recommendation', 'Irrigation scheduling', 'Drought warnings'],
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'Industry' as Sector,
    title: '🏭 Industry', 
    description: 'Industrial Water Efficiency',
    features: ['Water consumption tracking', 'Efficiency optimization', 'Sustainability alerts'],
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'Energy' as Sector,
    title: '⚡ Energy',
    description: 'Energy & Hydropower Water Flow',
    features: ['Hydropower optimization', 'Cooling water management', 'Renewable planning'],
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'Healthcare' as Sector,
    title: '🏥 Healthcare',
    description: 'Hospital Water Safety & Supply',
    features: ['Water availability monitoring', 'Usage tracking', 'Contamination alerts'],
    gradient: 'from-red-500 to-pink-600'
  },
  {
    id: 'Environment' as Sector,
    title: '🌱 Environment',
    description: 'Ecosystem & Groundwater Sustainability',
    features: ['Groundwater mapping', 'Biodiversity monitoring', 'Sustainability reporting'],
    gradient: 'from-teal-500 to-cyan-600'
  }
];

const Index = () => {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleSectorSelect = (sector: Sector) => {
    setSelectedSector(sector);
    setShowChat(true);
  };

  const handleBackToHome = () => {
    setSelectedSector(null);
    setShowChat(false);
  };

  if (selectedSector && showChat) {
    return (
      <div className="min-h-screen bg-gradient-mist">
        <SectorDashboard 
          sector={selectedSector} 
          onBack={handleBackToHome}
        />
        <AquaChat sector={selectedSector} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mist">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              SWIS 💧 Smart Water Intelligence
            </h1>
            <p className="text-lg text-muted-foreground">
              AI-powered water management across all sectors
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Meet Aqua, your Water Intelligence Assistant
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your sector to access real-time water insights, AI predictions, and personalized recommendations
          </p>
        </div>

        {/* Sector Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sectors.map((sector) => (
            <Card 
              key={sector.id}
              className="group cursor-pointer border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-water water-flow ripple-effect"
              onClick={() => handleSectorSelect(sector.id)}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{sector.title}</CardTitle>
                  <Badge variant="secondary" className="bg-gradient-aqua text-primary-foreground">
                    Smart AI
                  </Badge>
                </div>
                <CardDescription className="font-medium">
                  {sector.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {sector.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full group-hover:bg-gradient-ocean transition-flow"
                  variant="outline"
                >
                  Enter Dashboard 🌊
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Preview */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Powered by Advanced AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl">📊</div>
              <h3 className="font-semibold">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground">Live DWLR sensor data</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🤖</div>
              <h3 className="font-semibold">AI Predictions</h3>
              <p className="text-sm text-muted-foreground">Smart forecasting models</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">💡</div>
              <h3 className="font-semibold">Smart Insights</h3>
              <p className="text-sm text-muted-foreground">Actionable recommendations</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">⚠️</div>
              <h3 className="font-semibold">Early Warnings</h3>
              <p className="text-sm text-muted-foreground">Proactive risk alerts</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;