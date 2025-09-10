import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter, Users, Mail } from 'lucide-react';

// Sample diner data - in real app this would come from the dataset
const sampleDiners = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Austin, TX",
    interests: ["Italian", "Fine Dining", "Date Night"],
    age: 32,
    lastVisit: "2 weeks ago",
    email: "sarah.j@email.com"
  },
  {
    id: 2,
    name: "Mike Chen",
    location: "Austin, TX", 
    interests: ["Asian Fusion", "Quick Lunch", "Vegetarian"],
    age: 28,
    lastVisit: "1 week ago",
    email: "m.chen@email.com"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Austin, TX",
    interests: ["Mexican", "Family Dining", "Weekend Brunch"],
    age: 35,
    lastVisit: "3 days ago",
    email: "emily.r@email.com"
  },
  {
    id: 4,
    name: "David Kim",
    location: "Austin, TX",
    interests: ["BBQ", "Casual Dining", "Sports Bar"],
    age: 41,
    lastVisit: "1 week ago",
    email: "david.kim@email.com"
  },{
    "id": 5,
    "name": "Lisa Patel",
    "location": "Austin, TX",
    "interests": ["Indian", "Vegan", "Date Night"],
    "age": 29,
    "lastVisit": "5 days ago",
    "email": "lisa.patel@email.com"
  },
  {
    "id": 6,
    "name": "James Carter",
    "location": "Austin, TX",
    "interests": ["Steakhouse", "Craft Beer", "Business Dinner"],
    "age": 45,
    "lastVisit": "10 days ago",
    "email": "james.c@email.com"
  },
  {
    "id": 7,
    "name": "Amanda Lee",
    "location": "Austin, TX",
    "interests": ["Sushi", "Fine Dining", "Seafood"],
    "age": 27,
    "lastVisit": "2 days ago",
    "email": "amanda.lee@email.com"
  },
  {
    "id": 8,
    "name": "Carlos Mendoza",
    "location": "Austin, TX",
    "interests": ["Tacos", "Casual Dining", "Live Music"],
    "age": 33,
    "lastVisit": "1 week ago",
    "email": "carlos.m@email.com"
  },
  {
    "id": 9,
    "name": "Rachel Nguyen",
    "location": "Austin, TX",
    "interests": ["Vietnamese", "Vegetarian", "Quick Lunch"],
    "age": 30,
    "lastVisit": "4 days ago",
    "email": "rachel.n@email.com"
  },
  {
    "id": 10,
    "name": "Thomas Brooks",
    "location": "Austin, TX",
    "interests": ["Burgers", "Family Dining", "Outdoor Seating"],
    "age": 38,
    "lastVisit": "6 days ago",
    "email": "thomas.b@email.com"
  }
];

const DinerSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedDiners, setSelectedDiners] = useState<number[]>([]);

  const interests = ["Italian", "Mexican", "Asian Fusion", "BBQ", "Fine Dining", "Casual Dining", "Vegetarian", "Date Night", "Family Dining", "Weekend Brunch"];
  const cities = ["Austin, TX", "Dallas, TX", "Houston, TX", "San Antonio, TX"];

  const filteredDiners = sampleDiners.filter(diner => {
    const matchesSearch = diner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         diner.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || selectedCity === "all" || diner.location === selectedCity;
    const matchesInterests = selectedInterests.length === 0 || 
                           selectedInterests.some(interest => diner.interests.includes(interest));
    
    return matchesSearch && matchesCity && matchesInterests;
  });

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleDinerSelect = (dinerId: number) => {
    setSelectedDiners(prev => 
      prev.includes(dinerId)
        ? prev.filter(id => id !== dinerId)
        : [...prev, dinerId]
    );
  };

  return (
    <section id="search" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Customers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Search our database of local food lovers and discover potential customers who match your restaurant's style.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Filters</h3>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Location
                </label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interests Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Dining Interests
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {interests.map(interest => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox 
                        id={interest}
                        checked={selectedInterests.includes(interest)}
                        onCheckedChange={() => handleInterestToggle(interest)}
                      />
                      <label htmlFor={interest} className="text-sm text-foreground cursor-pointer">
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedCity("all");
                  setSelectedInterests([]);
                }}
              >
                Clear Filters
              </Button>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-lg font-semibold">{filteredDiners.length} Potential Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{selectedDiners.length} selected</span>
                {selectedDiners.length > 0 && (
                  <Button size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                )}
              </div>
            </div>

            {/* Diner Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredDiners.map(diner => (
                <Card key={diner.id} className="p-6 hover:shadow-medium transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{diner.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {diner.location}
                      </div>
                    </div>
                    <Checkbox
                      checked={selectedDiners.includes(diner.id)}
                      onCheckedChange={() => handleDinerSelect(diner.id)}
                    />
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Dining Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {diner.interests.map(interest => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Age: {diner.age}</span>
                    <span>Last visit: {diner.lastVisit}</span>
                  </div>
                </Card>
              ))}
            </div>

            {filteredDiners.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No matches found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DinerSearch;