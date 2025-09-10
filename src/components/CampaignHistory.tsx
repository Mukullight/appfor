import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Mail, 
  MessageSquare, 
  Eye, 
  BarChart3, 
  Calendar, 
  Users, 
  TrendingUp,
  Filter,
  Download
} from 'lucide-react';

const CampaignHistory = () => {
  const { data: campaigns = [], isLoading, error } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-lg">Loading campaigns...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-500">
            <div className="text-lg">Error loading campaigns: {error.message}</div>
          </div>
        </div>
      </section>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-secondary text-secondary-foreground';
      case 'draft': return 'bg-muted text-muted-foreground';
      case 'scheduled': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getOpenRate = (opened: number, recipients: number) => {
    if (recipients === 0) return '0%';
    return `${Math.round((opened / recipients) * 100)}%`;
  };

  const getClickRate = (clicked: number, recipients: number) => {
    if (recipients === 0) return '0%';
    return `${Math.round((clicked / recipients) * 100)}%`;
  };

  const totalRevenue = campaigns
    .filter(c => c.status === 'completed')
    .reduce((sum, c) => sum + (c.revenue || 0), 0);

  const totalRecipients = campaigns
    .filter(c => c.status === 'completed')
    .reduce((sum, c) => sum + c.recipients, 0);

  const avgOpenRate = campaigns
    .filter(c => c.status === 'completed')
    .reduce((sum, c, _, arr) => sum + (c.opened / c.recipients) / arr.length, 0);

  return (
    <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Campaign Dashboard
            </h2>
            <p className="text-muted-foreground">
              Track your marketing performance and customer engagement
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="email">Email Only</SelectItem>
                <SelectItem value="sms">SMS Only</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
              <TrendingUp className="w-4 h-4 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-secondary mt-1">+12% from last month</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Customers Reached</div>
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {totalRecipients.toLocaleString()}
            </div>
            <div className="text-xs text-secondary mt-1">+8% from last month</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Avg Open Rate</div>
              <Eye className="w-4 h-4 text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(avgOpenRate * 100)}%
            </div>
            <div className="text-xs text-secondary mt-1">+3% from last month</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Active Campaigns</div>
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {campaigns.filter(c => c.status !== 'completed').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">2 scheduled, 1 draft</div>
          </Card>
        </div>

        {/* Campaign List */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Recent Campaigns</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Campaign</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Sent Date</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Recipients</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Open Rate</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Click Rate</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                     <td className="p-4">
                       <div>
                         <div className="font-medium text-foreground">{campaign.name}</div>
                         <div className="text-sm text-muted-foreground">{campaign.offer_title}</div>
                       </div>
                     </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {campaign.type === 'email' ? (
                          <Mail className="w-4 h-4 text-primary" />
                        ) : (
                          <MessageSquare className="w-4 h-4 text-accent" />
                        )}
                        <span className="text-sm capitalize">{campaign.type}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </td>
                     <td className="p-4">
                       <div className="flex items-center space-x-2">
                         <Calendar className="w-4 h-4 text-muted-foreground" />
                         <span className="text-sm">
                           {campaign.sent_date ? new Date(campaign.sent_date).toLocaleDateString() : 'Not sent'}
                         </span>
                       </div>
                     </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{campaign.recipients}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">
                        {getOpenRate(campaign.opened, campaign.recipients)}
                      </span>
                      <div className="text-xs text-muted-foreground">
                        {campaign.opened} opened
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">
                        {getClickRate(campaign.clicked, campaign.recipients)}
                      </span>
                      <div className="text-xs text-muted-foreground">
                        {campaign.clicked} clicked
                      </div>
                    </td>
                     <td className="p-4">
                       <span className="text-sm font-medium text-secondary">
                         ${campaign.revenue?.toLocaleString() || '0'}
                       </span>
                     </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1">
            Create New Campaign
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            Import Customer List
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            View Analytics
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CampaignHistory;