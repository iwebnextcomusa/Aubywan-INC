import { ServiceItem, ProjectItem, TestimonialItem, FAQItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'residential',
    name: 'Residential Construction',
    description: 'Custom home building, structural additions, and complex framing. We translate architectural blueprints into your dream physical home with absolute structural integrity.',
    details: [
      'Custom Home Framing & Roofing',
      'Structural Additions & Extensions',
      'Architectural Blueprint Interpretation',
      'Foundations & Concrete Work',
      'Eco-Friendly building materials'
    ],
    iconName: 'Home'
  },
  {
    id: 'commercial',
    name: 'Commercial Construction',
    description: 'High-end commercial developments, corporate offices, and tenant improvements tailored for functional flow and business productivity.',
    details: [
      'Corporate Office Buildouts',
      'Retail & Restaurant Fit-outs',
      'Metal Framing & Demolition',
      'Commercial Drywall & Acoustic Tiles',
      'Project-compliant health & safety codes'
    ],
    iconName: 'Building2'
  },
  {
    id: 'renovations',
    name: 'Full Home Renovations',
    description: 'Transformative top-to-bottom home redesigns. We modernize outdated structures, maximize spatial utilization, and drastically increase property valuation.',
    details: [
      'Open-Concept Structural Wall Removals',
      'Full Home Modernization Flips',
      'Heritage Home Restorations',
      'Energy Efficiency Upgrades',
      'Load-Bearing Beam Installations'
    ],
    iconName: 'Hammer'
  },
  {
    id: 'kitchen',
    name: 'Kitchen Remodeling',
    description: 'Premium, functional culinary spaces. We engineer seamless layouts matching exquisite custom cabinetry, luxury stone countertops, and high-tech lighting.',
    details: [
      'Custom Cabinetry Design & Install',
      'Quartz & Granite Countertop Fitment',
      'Under-cabinet Smart LED Accent Lighting',
      'Plumbing & Luxury Faucet Integration',
      'High-end Island Construction'
    ],
    iconName: 'ChefHat'
  },
  {
    id: 'bathroom',
    name: 'Bathroom Remodeling',
    description: 'Oasis-style custom bathrooms featuring spa-grade wet rooms, heated floors, curbless custom-tiled glass showers, and floating vanities.',
    details: [
      'Custom Curbless Tiled Showers',
      'Schluter-System Waterproofing Protection',
      'Heated Tile Floor Installations (Ditra-Heat)',
      'Premium Glass Enclosure Fittings',
      'Modern Plumbing Rough-ins & Finishes'
    ],
    iconName: 'ShowerHead'
  },
  {
    id: 'basement',
    name: 'Basement Finishing',
    description: 'Turn cold, underutilized basements into warm, inviting living spaces, home theatres, income-generating rental suites, or personal gyms.',
    details: [
      'Full Insulation & Subfloor Dry-locking',
      'Home Theatre Acoustic Drywalling',
      'Secondary Suite Legal Kitchens & Baths',
      'Egress Window Installations',
      'Custom Under-stair Storage Units'
    ],
    iconName: 'Layers'
  },
  {
    id: 'drywall',
    name: 'Framing, Drywall & Plaster',
    description: 'Laser-straight framing paired with flawless level 5 drywall finishes, taping, mudding, and premium acoustic soundproofing.',
    details: [
      'Laser-aligned Wood & Steel Stud Framing',
      'Level 5 Smooth Drywall Finish',
      'Soundproofing & Acoustic Dampening Walls',
      'Custom Drywall Niches & Ceilings',
      'Flawless Repairs & Patching'
    ],
    iconName: 'Scissors'
  },
  {
    id: 'exterior',
    name: 'Decks & Patios',
    description: 'Extend your lifestyle outdoors. Beautiful cedar, treated lumber, and composite low-maintenance decks customized to your backyard terrain.',
    details: [
      'Low-maintenance Composite Decks (Trex/Azek)',
      'Premium Western Red Cedar Patios',
      'Heavy-duty Structural Post Footings',
      'Privacy Screens & Integrated Lighting',
      'Custom Pergolas & Gazebos'
    ],
    iconName: 'Sun'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj1',
    title: 'Saint-Eustache Kitchen Transformation',
    category: 'renovation',
    description: 'A complete dark-kitchen-to-bright-modern-coop renovation featuring custom charcoal custom islands, solid quartz countertops, and structural wall removals to build an open concept living area.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop',
    client: 'The Tremblay Family',
    location: 'Saint-Eustache, QC',
    year: '2025',
    duration: '3 Weeks',
    highlights: ['Structural beam insertion', 'Custom quartz countertop', 'Heated stone flooring', 'Under-cabinet smart LED']
  },
  {
    id: 'proj2',
    title: 'Grand-Côte Executive Basement Finish',
    category: 'interior',
    description: 'Transforming an uninsulated, cold basement into a luxury entertainment lounge featuring a modern wet bar, state-of-the-art acoustic soundproofing, custom fireplace, and an elegant bathroom.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    client: 'Gaston & Isabelle Roy',
    location: 'Saint-Eustache, QC',
    year: '2025',
    duration: '4 Weeks',
    highlights: ['Sub-floor insulation layers', 'Modern wet bar setup', 'Linear electric fireplace surround', 'Tiled powder room']
  },
  {
    id: 'proj3',
    title: 'Laval Modern Residential Build',
    category: 'residential',
    description: 'Laser-straight architectural framing, premium siding integration, and complete roof structural setup for a luxury 3,200 sq.ft. modern home in Laval.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    client: 'Villas du Nord Group',
    location: 'Laval, QC',
    year: '2024',
    duration: '3 Months',
    highlights: ['Laser wood framing', 'Truss installation', 'Architectural metal siding', 'Energy Star compliance']
  },
  {
    id: 'proj4',
    title: 'Saint-Eustache Multi-Level Cedar Deck',
    category: 'exterior',
    description: 'Premium western red cedar multi-tier deck overlooking a private ravine, featuring integrated low-voltage stair lighting, built-in structural planters, and heavy-duty glass railings.',
    image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=1200&auto=format&fit=crop',
    client: 'Marc-André Lafortune',
    location: 'Saint-Eustache, QC',
    year: '2025',
    duration: '10 Days',
    highlights: ['Western Red Cedar framing', 'Tempered glass railing', 'Smart step accent lights', 'Custom privacy screen']
  },
  {
    id: 'proj5',
    title: 'Mirabel Commercial Office Remodel',
    category: 'commercial',
    description: 'Full interior fit-out for a growing logistics firm. Metal stud partitions, suspended acoustic ceiling systems, durable vinyl flooring, and clean office divisions.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    client: 'LogisNord Solutions',
    location: 'Mirabel, QC',
    year: '2024',
    duration: '5 Weeks',
    highlights: ['Commercial steel stud framing', 'Acoustic ceiling grid', 'Heavy commercial vinyl tile', 'Integrated communication lines']
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Jean-François Gagnon',
    rating: 5,
    comment: 'We hired Construction Aubywan for our kitchen renovation in Saint-Eustache, and we could not be happier. They removed a load-bearing wall, framed everything perfectly, and handled the drywall with precision. Absolute experts, on time, and on budget!',
    date: 'May 12, 2025',
    projectType: 'Kitchen Remodel & Wall Removal',
    location: 'Saint-Eustache, QC'
  },
  {
    id: 't2',
    name: 'Mélanie Villeneuve',
    rating: 5,
    comment: 'Professional, reliable, and incredibly clean! The team finished our basement in just under 4 weeks. They took care of insulation, drywall, flooring, and custom trim. Having a licensed contractor who communicates this well in Quebec is a breath of fresh air.',
    date: 'March 20, 2025',
    projectType: 'Full Basement Finishing',
    location: 'Saint-Eustache, QC'
  },
  {
    id: 't3',
    name: 'Robert & Sarah Henderson',
    rating: 5,
    comment: 'The craftsmanship on our cedar deck is outstanding. They laid out concrete footings with serious precision, and the wood select is impeccable. Highly recommend Construction Aubywan INC for any interior or exterior renovations!',
    date: 'June 05, 2025',
    projectType: 'Custom Red Cedar Deck',
    location: 'Deux-Montagnes, QC'
  },
  {
    id: 't4',
    name: 'Antoine Lemieux',
    rating: 5,
    comment: 'Great project management and drywall taping. We run commercial offices and their commercial metal framing division completed our partition walls ahead of schedule. Flawless taping job, ready for paint immediately.',
    date: 'November 14, 2024',
    projectType: 'Commercial Metal Framing & Drywall',
    location: 'Mirabel, QC'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Are your estimates completely free of charge?',
    answer: 'Yes, absolutely! We provide detailed, obligation-free estimates for all clients in Saint-Eustache and surrounding North Shore areas. We will visit your property, review plans, understand your budget, and deliver a comprehensive breakdown.',
    category: 'estimates'
  },
  {
    id: 'faq2',
    question: 'Are you licensed and fully insured in Quebec?',
    answer: 'Yes, Construction Aubywan INC is a fully registered, licensed general contractor in Quebec. We carry comprehensive civil liability insurance and operate strictly under CNESST safety standards to protect both our clients and our master craftsmen.',
    category: 'license'
  },
  {
    id: 'faq3',
    question: 'How long does a typical kitchen or bathroom renovation take?',
    answer: 'While timelines depend on the exact design, a custom bathroom renovation typically takes 1 to 3 weeks. A major kitchen remodeling project (especially involving open-concept structural changes) usually ranges from 2 to 4 weeks. We outline exact milestone dates before hammers swing.',
    category: 'timeline'
  },
  {
    id: 'faq4',
    question: 'Which areas do you serve on the North Shore?',
    answer: 'Our home base is Saint-Eustache, QC. We regularly serve clients across Saint-Eustache, Deux-Montagnes, Laval, Mirabel, Blainville, Sainte-Thérèse, Boisbriand, and surrounding North Shore and Laurentian communities.',
    category: 'estimates'
  },
  {
    id: 'faq5',
    question: 'Do you offer a warranty on your workmanship?',
    answer: 'Yes! We stand behind every cut, frame, joint, and screw. Construction Aubywan INC offers an industry-leading written warranty on all craftsmanship. All manufactured products (like cabinets, roofing shingles, and flooring) are also backed by their respective manufacturer warranties.',
    category: 'warranty'
  },
  {
    id: 'faq6',
    question: 'What are your payment terms and billing structure?',
    answer: 'For small projects, we require a small booking deposit with the balance due upon completion. For larger commercial or residential custom builds, we structure a transparent, milestone-based payment schedule aligned with critical stages of completion (e.g., framing, drywall, finishing). We accept bank transfers and certified cheques.',
    category: 'billing'
  }
];
