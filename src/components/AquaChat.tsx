import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Waves } from "lucide-react";

type Sector = 'Agriculture' | 'Industry' | 'Energy' | 'Healthcare' | 'Environment';

interface Message {
  id: string;
  type: 'user' | 'aqua';
  content: string;
  timestamp: Date;
  dashboardData?: any;
}

interface AquaChatProps {
  sector: Sector;
}

const generateAquaResponse = (sector: Sector, userMessage: string): string => {
  const responses = {
    Agriculture: `🌾🌊 **Aqua's Agriculture Dashboard Analysis**

**1️⃣ Current Status:**  
- Groundwater Level: 12.5 m 💧 (↓1.2 m last week ⬇️)  
- Soil Moisture: Moderate decline 🌱  
- Rainfall Forecast: Below average 🌦️  

**2️⃣ Prediction:**  
- Expected 15% groundwater decline in next 10 days (Confidence: High ⚠️)  

**3️⃣ Impacts:**  
- Paddy fields may face water stress  
- High-demand crops at risk 🌾  

**4️⃣ Recommended Actions:**  
1️⃣ Implement drip irrigation → saves ~25% water 💧  
2️⃣ Consider drought-resistant crop varieties 🌱  
3️⃣ Schedule irrigation for early morning hours  

**5️⃣ Suggested Report:**  
📊 Generate **Crop Water Optimization Report**`,

    Industry: `🏭💧 **Aqua's Industrial Dashboard Analysis**

**1️⃣ Current Status:**  
- Water Extraction: 1.8× sustainable limits ⚠️  
- Cooling System Efficiency: 78% 🌊  
- No active leaks detected ✅  

**2️⃣ Prediction:**  
- Compliance risk within 14 days (Confidence: High ⚠️)  

**3️⃣ Impacts:**  
- Regional water scarcity risk  
- Potential regulatory issues 📋  

**4️⃣ Recommended Actions:**  
1️⃣ Optimize cooling loops immediately 🌀  
2️⃣ Install smart submeters for monitoring  
3️⃣ Reduce non-critical usage by 35% 💧  

**5️⃣ Suggested Report:**  
📊 Generate **Industrial Efficiency & Compliance Report**`,

    Energy: `⚡🚰 **Aqua's Energy Dashboard Analysis**

**1️⃣ Current Status:**  
- Reservoir Level: 42% capacity 💧  
- Inflow Rate: Declining trend ⬇️  
- Turbine Efficiency: 85% ⚡  

**2️⃣ Prediction:**  
- 12% inflow reduction expected in 7 days (Confidence: Medium ⚠️)  

**3️⃣ Impacts:**  
- Reduced power generation capacity  
- Need for backup energy sources 🔋  

**4️⃣ Recommended Actions:**  
1️⃣ Adjust turbine scheduling for peak efficiency  
2️⃣ Coordinate with backup reservoir systems  
3️⃣ Monitor upstream rainfall patterns 🌦️  

**5️⃣ Suggested Report:**  
📊 Generate **Hydropower Optimization & Planning Report**`,

    Healthcare: `🏥💦 **Aqua's Healthcare Dashboard Analysis**

**1️⃣ Current Status:**  
- Water Reserve: 4.2 days capacity 💧  
- Quality Parameters: All within safe limits ✅  
- Critical Units: ICU & Labs priority 🏥  

**2️⃣ Prediction:**  
- Stable usage but buffer concerns (Confidence: High ⚠️)  

**3️⃣ Impacts:**  
- Potential disruption to patient care  
- Laboratory operations at risk 🔬  

**4️⃣ Recommended Actions:**  
1️⃣ Activate emergency backup systems  
2️⃣ Review and test contingency protocols  
3️⃣ Coordinate with municipal supply 🚰  

**5️⃣ Suggested Report:**  
📊 Generate **Healthcare Water Security & Safety Report**`,

    Environment: `🌱🌀 **Aqua's Environmental Dashboard Analysis**

**1️⃣ Current Status:**  
- Wetland Water Level: 0.82 m 💧 (↓0.15 m this month ⬇️)  
- Groundwater Table: Declining gradually  
- Biodiversity Index: Moderate concern 🦋  

**2️⃣ Prediction:**  
- Ecosystem stress likely in 45 days (Confidence: Medium ⚠️)  

**3️⃣ Impacts:**  
- Aquatic species habitat reduction  
- Vegetation stress in wetland areas 🌿  

**4️⃣ Recommended Actions:**  
1️⃣ Initiate managed aquifer recharge 💧  
2️⃣ Install check dams upstream 🌊  
3️⃣ Monitor industrial water usage nearby  

**5️⃣ Suggested Report:**  
📊 Generate **Ecosystem Health & Sustainability Report**`
  };

  return responses[sector] || "I'm analyzing your water data... 🌊";
};

export const AquaChat = ({ sector }: AquaChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'aqua',
      content: `🌊 Hi! I'm **Aqua**, your Smart Water Intelligence assistant! I've analyzed the latest DWLR sensor data for your ${sector.toLowerCase()} operations. How can I help you optimize your water management today? 💧`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Aqua thinking/processing
    setTimeout(() => {
      const aquaResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'aqua',
        content: generateAquaResponse(sector, inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aquaResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 bg-card/95 backdrop-blur-sm border rounded-lg shadow-flow flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b bg-gradient-ocean rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-aqua rounded-full flex items-center justify-center">
            <Waves className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-primary-foreground">Aqua Assistant</h3>
            <p className="text-xs text-primary-foreground/80">{sector} Intelligence</p>
          </div>
          <Badge variant="secondary" className="ml-auto bg-white/20 text-primary-foreground">
            AI Live
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.type === 'aqua' ? (
                <div 
                  className="text-sm whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-xs text-muted-foreground ml-2">Aqua is analyzing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Ask Aqua about your water data..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            size="icon"
            className="bg-gradient-ocean hover:opacity-90 transition-ripple"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};