import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageSquare, Sparkles, Send, Eye, Users, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CampaignCreator = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [campaignName, setCampaignName] = useState("");
  const [offerTitle, setOfferTitle] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("email");
  const [isGenerating, setIsGenerating] = useState(false);

  const createCampaignMutation = useMutation({
    mutationFn: async (campaignData: {
      name: string;
      offer_title: string;
      message: string;
      channel: string;
      type: string;
      status: string;
      recipients: number;
    }) => {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([campaignData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      setCampaignName("");
      setOfferTitle("");
      setOfferMessage("");
    }
  });

  const aiSuggestions = [
    {
      title: "20% Off Weekend Dinner",
      message: "Join us this weekend for an unforgettable dining experience! Present this offer and enjoy 20% off your entire dinner. Valid Friday-Sunday only. Book your table now!"
    },
    {
      title: "Free Appetizer Special",
      message: "Try our chef's signature appetizer on us! Show this message and receive a complimentary appetizer with any entrée purchase. Limited time offer - don't miss out!"
    },
    {
      title: "Happy Hour Extended",
      message: "Good news! We're extending happy hour just for our valued customers. Enjoy discounted drinks and appetizers until 7 PM all week. Come celebrate with us!"
    }
  ];

  const selectedDiners = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com" },
    { id: 2, name: "Mike Chen", email: "m.chen@email.com" },
    { id: 3, name: "Emily Rodriguez", email: "emily.r@email.com" }
  ];

  const handleGenerateOffer = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
      setOfferTitle(randomSuggestion.title);
      setOfferMessage(randomSuggestion.message);
      setIsGenerating(false);
      
      toast({
        title: "Offer Generated!",
        description: "AI has created a personalized offer for your campaign.",
      });
    }, 2000);
  };

  const handleSendCampaign = async () => {
    if (!campaignName || !offerTitle || !offerMessage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all campaign details before sending.",
        variant: "destructive"
      });
      return;
    }

    try {
      await createCampaignMutation.mutateAsync({
        name: campaignName,
        offer_title: offerTitle,
        message: offerMessage,
        channel: selectedChannel,
        type: selectedChannel,
        status: 'completed',
        recipients: selectedDiners.length,
      });

      toast({
        title: "Campaign Sent!",
        description: `Your campaign "${campaignName}" has been sent to ${selectedDiners.length} customers.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send campaign. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="campaigns" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Create Your Campaign
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Use AI to craft compelling offers and reach your selected customers instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Campaign Builder */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="space-y-6">
                {/* Campaign Name */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Campaign Name
                  </label>
                  <Input
                    placeholder="e.g., Weekend Special Promotion"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                  />
                </div>

                {/* Channel Selection */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Communication Channel
                  </label>
                  <Tabs value={selectedChannel} onValueChange={setSelectedChannel}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email" className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </TabsTrigger>
                      <TabsTrigger value="sms" className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>SMS</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Offer Creation */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Create Your Offer</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateOffer}
                      disabled={isGenerating}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isGenerating ? "Generating..." : "AI Assist"}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Offer Title
                      </label>
                      <Input
                        placeholder="Enter your offer title..."
                        value={offerTitle}
                        onChange={(e) => setOfferTitle(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Message
                      </label>
                      <Textarea
                        placeholder="Write your offer message..."
                        rows={4}
                        value={offerMessage}
                        onChange={(e) => setOfferMessage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Quick Suggestions
                  </h3>
                  <div className="grid gap-3">
                    {aiSuggestions.map((suggestion, index) => (
                      <Card 
                        key={index} 
                        className="p-3 cursor-pointer hover:shadow-soft transition-all duration-200"
                        onClick={() => {
                          setOfferTitle(suggestion.title);
                          setOfferMessage(suggestion.message);
                        }}
                      >
                        <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {suggestion.message}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Preview & Send */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Selected Recipients */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Recipients</h3>
                </div>
                <div className="space-y-2">
                  {selectedDiners.map(diner => (
                    <div key={diner.id} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm font-medium">{diner.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {selectedChannel}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-border mt-4">
                  <p className="text-sm text-muted-foreground">
                    Total recipients: <span className="font-medium">{selectedDiners.length}</span>
                  </p>
                </div>
              </Card>

              {/* Preview */}
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Eye className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Preview</h3>
                </div>
                
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <div className="bg-card rounded p-3">
                    <div className="text-xs text-muted-foreground mb-2">
                      {selectedChannel === 'email' ? 'EMAIL SUBJECT' : 'SMS MESSAGE'}
                    </div>  
                    <div className="font-medium text-sm">
                      {offerTitle || "Your offer title will appear here"}
                    </div>
                  </div>
                  
                  <div className="bg-card rounded p-3">
                    <div className="text-xs text-muted-foreground mb-2">MESSAGE BODY</div>
                    <div className="text-sm leading-relaxed">
                      {offerMessage || "Your offer message will appear here..."}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Send Button */}
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSendCampaign}
                disabled={!campaignName || !offerTitle || !offerMessage || createCampaignMutation.isPending}
              >
                <Send className="w-4 h-4 mr-2" />
                {createCampaignMutation.isPending ? 'Sending...' : 'Send Campaign'}
              </Button>

              {/* Schedule Option */}
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Schedule for Later</span>
                </div>
                <Select>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Send immediately" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Send immediately</SelectItem>
                    <SelectItem value="1hour">In 1 hour</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow morning</SelectItem>
                    <SelectItem value="custom">Custom time</SelectItem>
                  </SelectContent>
                </Select>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignCreator;