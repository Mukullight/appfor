import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Mail, BarChart3, Star } from 'lucide-react';

const HeroSection = () => {
  const features = [
    { icon: Users, text: "Find local diners" },
    { icon: Mail, text: "Send targeted offers" },
    { icon: BarChart3, text: "Track results" }
  ];

  const testimonials = [
    { name: "Maria's Bistro", rating: 5, text: "Increased our customer base by 40% in just 2 months!" },
    { name: "Tony's Pizza", rating: 5, text: "The targeted campaigns brought in exactly the customers we wanted." },
    { name: "Green Leaf Café", rating: 5, text: "So easy to use, and the AI suggestions are spot-on." }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          {/* Badge */}
          <Badge variant="secondary" className="mb-4 px-4 py-1">
            Trusted by 500+ restaurants
          </Badge>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Fill Your Tables with
            <span className="block text-primary">Perfect Customers</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop waiting for customers to find you. Use our AI-powered platform to discover local food lovers, 
            send them irresistible offers, and watch your restaurant thrive.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="px-8 py-3 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-muted-foreground">
                <feature.icon className="w-5 h-5 text-primary" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 text-center shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex justify-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
              <p className="font-semibold text-foreground">{testimonial.name}</p>
            </Card>
          ))}
        </div>

        {/* Demo Preview */}
        <div className="bg-card rounded-2xl shadow-strong p-8 mx-auto max-w-4xl">
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Dashboard Preview</p>
              <p className="text-sm text-muted-foreground mt-2">Real-time campaign analytics and diner insights</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;