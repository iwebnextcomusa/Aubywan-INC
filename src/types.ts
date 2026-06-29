export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'renovation' | 'exterior' | 'interior';
  description: string;
  image: string;
  beforeImage?: string; // For the requested before-and-after section
  client: string;
  location: string;
  year: string;
  duration?: string;
  highlights?: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  projectType: string;
  location: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'estimates' | 'timeline' | 'license' | 'billing' | 'warranty';
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  details: string[];
  iconName: string; // Key for matching a Lucide icon dynamically
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  newsletterSignup: boolean;
}
