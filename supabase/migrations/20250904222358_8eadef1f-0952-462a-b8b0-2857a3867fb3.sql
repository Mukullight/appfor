-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  offer_title TEXT,
  message TEXT,
  channel TEXT NOT NULL,
  recipients INTEGER DEFAULT 0,
  opened INTEGER DEFAULT 0,
  clicked INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  sent_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own campaigns" 
ON public.campaigns 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own campaigns" 
ON public.campaigns 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns" 
ON public.campaigns 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns" 
ON public.campaigns 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO public.campaigns (name, type, status, offer_title, message, channel, recipients, opened, clicked, revenue, sent_date) VALUES
('Welcome Series', 'email', 'completed', 'Welcome to Our Platform!', 'Thank you for joining us. Here''s what you can expect...', 'email', 1500, 900, 180, 2500.00, now() - interval '7 days'),
('Holiday Sale', 'sms', 'completed', '50% Off Everything!', 'Limited time offer - don''t miss out on huge savings!', 'sms', 800, 720, 144, 5000.00, now() - interval '3 days'),
('Product Launch', 'push', 'active', 'New Feature Available', 'Check out our latest feature that will revolutionize your workflow', 'push', 2000, 1200, 240, 3200.00, now() - interval '1 day'),
('Re-engagement', 'email', 'draft', 'We Miss You!', 'Come back and see what''s new. Special offer inside!', 'email', 0, 0, 0, 0, NULL);