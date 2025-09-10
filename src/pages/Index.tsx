import Navigation from "@/components/Navigation";
import Hero from "@/components/hero";
import HeroSection from "@/components/HeroSection";
import DinerSearch from "@/components/DinerSearch";
import CampaignCreator from "@/components/CampaignCreator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Target, Zap, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Find customers who love your type of cuisine and dining experience. No more guesswork."
    },
    {
      icon: Zap,
      title: "AI-Powered Offers",
      description: "Generate compelling offers that convert. Our AI knows what messages work best."
    },
    {
      icon: BarChart3,
      title: "Track Results",
      description: "See exactly which campaigns drive customers through your doors."
    }
  ];

  const benefits = [
    "Stop relying on expensive food delivery apps",
    "Build your own customer database", 
    "Send targeted offers that actually work",
    "Track campaign performance in real-time",
    "Increase repeat visits with smart segmentation"
  ];

  const stats = [
    { number: "500+", label: "Restaurants Trust Us" },
    { number: "50K+", label: "Diners in Database" },
    { number: "40%", label: "Average Revenue Increase" },
    { number: "2 Min", label: "Setup Time" }
  ];

  return (
    <div style={{paddingTop: '80px'}}> 
      <Navigation />
      <Hero/>

    <div className="min-h-screen bg-background">
     
      
      <main>
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Three Simple Steps to More Customers
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform makes it easy to find, engage, and convert local food lovers into loyal customers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="p-8 text-center shadow-soft hover:shadow-medium transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <DinerSearch />
        <CampaignCreator />

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Why Restaurant Owners Choose Us
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Take Control of Your Customer Acquisition
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Stop paying high commissions to delivery platforms. Build direct relationships with customers who will become your most loyal patrons.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button size="lg" className="px-8 py-3">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              
              <div className="bg-muted rounded-2xl p-8 lg:p-12">
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <div className="flex items-center space-x-3 mb-4">
                    <ChefHat className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Maria's Bistro</h3>
                      <p className="text-sm text-muted-foreground">Italian Restaurant</p>
                    </div>
                  </div>
                  <blockquote className="text-foreground mb-4 italic">
                    "In just 8 weeks, we've added 127 new regular customers and increased our weekend bookings by 60%. This platform changed everything for us."
                  </blockquote>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Campaign Results:</span>
                    <span className="font-semibold text-secondary">+$18,400 revenue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 hero-gradient">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Fill Your Tables?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of restaurant owners who are already growing their business with targeted customer campaigns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-primary">
                Schedule Demo
              </Button>
            </div>
            <p className="text-white/80 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Get More Diners</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 Get More Diners. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div> </div>
  );
};

export default Index;