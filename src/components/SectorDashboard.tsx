import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingDown, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Droplets } from "lucide-react";

type Sector = 'Agriculture' | 'Industry' | 'Energy' | 'Healthcare' | 'Environment';

interface SectorDashboardProps {
  sector: Sector;
  onBack: () => void;
}

const dashboardData = {
  Agriculture: {
    title: "🌾 Agriculture Water Management",
    metrics: [
      { 
        title: "Groundwater Level", 
        value: "12.5 m", 
        change: "-1.2 m", 
        trend: "down", 
        status: "warning",
        graphic: "sparkline"
      },
      { 
        title: "Soil Moisture", 
        value: "68%", 
        change: "-5%", 
        trend: "down", 
        status: "warning",
        graphic: "progress-bar"
      },
      { 
        title: "Irrigation Efficiency", 
        value: "78%", 
        change: "+3%", 
        trend: "up", 
        status: "good",
        graphic: "chart"
      },
      { 
        title: "Crop Water Stress", 
        value: "Medium", 
        change: "↗️", 
        trend: "up", 
        status: "warning",
        graphic: "risk-badge"
      }
    ],
    alerts: [
      { type: "warning", message: "15% groundwater decline expected in 10 days" },
      { type: "info", message: "Irrigation scheduling optimized for morning hours" }
    ]
  },
  Industry: {
    title: "🏭 Industrial Water Efficiency",
    metrics: [
      { 
        title: "Water Consumption", 
        value: "1,850 L/min", 
        change: "+12%", 
        trend: "up", 
        status: "danger",
        graphic: "sparkline"
      },
      { 
        title: "Cooling Efficiency", 
        value: "78%", 
        change: "-2%", 
        trend: "down", 
        status: "warning",
        graphic: "progress-bar"
      },
      { 
        title: "Leak Detection", 
        value: "0 Active", 
        change: "✅", 
        trend: "stable", 
        status: "good",
        graphic: "status"
      },
      { 
        title: "Sustainability Score", 
        value: "6.2/10", 
        change: "-0.8", 
        trend: "down", 
        status: "warning",
        graphic: "chart"
      }
    ],
    alerts: [
      { type: "danger", message: "Extraction rate 1.8× above sustainable limits" },
      { type: "warning", message: "Compliance risk in 14 days" }
    ]
  },
  Energy: {
    title: "⚡ Energy & Hydropower",
    metrics: [
      { 
        title: "Reservoir Level", 
        value: "42%", 
        change: "-3%", 
        trend: "down", 
        status: "warning",
        graphic: "progress-bar"
      },
      { 
        title: "Inflow Rate", 
        value: "2,400 m³/h", 
        change: "-8%", 
        trend: "down", 
        status: "warning",
        graphic: "sparkline"
      },
      { 
        title: "Turbine Efficiency", 
        value: "85%", 
        change: "+1%", 
        trend: "up", 
        status: "good",
        graphic: "chart"
      },
      { 
        title: "Power Generation", 
        value: "450 MW", 
        change: "-12%", 
        trend: "down", 
        status: "warning",
        graphic: "trend"
      }
    ],
    alerts: [
      { type: "warning", message: "12% inflow reduction expected in 7 days" },
      { type: "info", message: "Backup energy coordination recommended" }
    ]
  },
  Healthcare: {
    title: "🏥 Healthcare Water Safety",
    metrics: [
      { 
        title: "Water Reserve", 
        value: "4.2 days", 
        change: "-0.3", 
        trend: "down", 
        status: "warning",
        graphic: "progress-bar"
      },
      { 
        title: "Water Quality", 
        value: "Excellent", 
        change: "✅", 
        trend: "stable", 
        status: "good",
        graphic: "status"
      },
      { 
        title: "ICU Water Usage", 
        value: "85%", 
        change: "+5%", 
        trend: "up", 
        status: "warning",
        graphic: "chart"
      },
      { 
        title: "Lab Water Usage", 
        value: "92%", 
        change: "+8%", 
        trend: "up", 
        status: "danger",
        graphic: "risk-badge"
      }
    ],
    alerts: [
      { type: "warning", message: "Water reserve below 5-day safety buffer" },
      { type: "info", message: "Emergency protocols ready for activation" }
    ]
  },
  Environment: {
    title: "🌱 Environmental Sustainability",
    metrics: [
      { 
        title: "Wetland Level", 
        value: "0.82 m", 
        change: "-0.15 m", 
        trend: "down", 
        status: "warning",
        graphic: "sparkline"
      },
      { 
        title: "Groundwater Table", 
        value: "8.5 m", 
        change: "-0.3 m", 
        trend: "down", 
        status: "warning",
        graphic: "trend"
      },
      { 
        title: "Biodiversity Index", 
        value: "7.2/10", 
        change: "-0.5", 
        trend: "down", 
        status: "warning",
        graphic: "chart"
      },
      { 
        title: "Ecosystem Health", 
        value: "Good", 
        change: "→", 
        trend: "stable", 
        status: "good",
        graphic: "status"
      }
    ],
    alerts: [
      { type: "warning", message: "Ecosystem stress likely in 45 days" },
      { type: "info", message: "Managed recharge projects recommended" }
    ]
  }
};

export const SectorDashboard = ({ sector, onBack }: SectorDashboardProps) => {
  const data = dashboardData[sector];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'danger': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good': return 'bg-success/10 text-success border-success/20';
      case 'warning': return 'bg-warning/10 text-warning border-warning/20';
      case 'danger': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onBack}
          className="ripple-effect"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="text-muted-foreground">Real-time water intelligence dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live Data</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data.metrics.map((metric, index) => (
          <Card key={index} className="water-flow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs font-medium">
                  {metric.title}
                </CardDescription>
                <Badge variant="outline" className={getStatusBadge(metric.status)}>
                  {metric.graphic}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">{metric.value}</span>
                <div className={`flex items-center gap-1 text-sm ${getStatusColor(metric.status)}`}>
                  {getTrendIcon(metric.trend)}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Suggested: {metric.graphic} visualization
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Active Alerts & Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.alerts.map((alert, index) => (
            <div 
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                alert.type === 'danger' 
                  ? 'bg-destructive/5 border-destructive/20' 
                  : alert.type === 'warning'
                  ? 'bg-warning/5 border-warning/20'
                  : 'bg-primary/5 border-primary/20'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${
                alert.type === 'danger' ? 'bg-destructive' :
                alert.type === 'warning' ? 'bg-warning' : 'bg-primary'
              }`}></div>
              <p className="text-sm flex-1">{alert.message}</p>
              <Badge 
                variant="outline"
                className={
                  alert.type === 'danger' ? 'text-destructive border-destructive/20' :
                  alert.type === 'warning' ? 'text-warning border-warning/20' :
                  'text-primary border-primary/20'
                }
              >
                {alert.type}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start gap-2">
              <BarChart3 className="w-4 h-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <AlertTriangle className="w-4 h-4" />
              View All Alerts
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <CheckCircle className="w-4 h-4" />
              Optimization Tips
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};