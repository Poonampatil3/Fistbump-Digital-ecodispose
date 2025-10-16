export const wasteData = {
  items: {
    'plastic-bottle': {
      id: 'plastic-bottle',
      name: 'Plastic Bottle',
      material: 'Plastic',
      category: 'Plastics & Packaging',
      binColor: 'Yellow',
      tip: 'Remove cap and rinse before recycling. Crush to save space.',
      upcycling: 'Cut the top off and use as a plant pot, bird feeder, or pencil holder.',
      contamination: 'Make sure it\'s clean and dry',
      image: '/api/placeholder/200/200'
    },
    'glass-bottle': {
      id: 'glass-bottle',
      name: 'Glass Bottle',
      material: 'Glass',
      category: 'Glass',
      binColor: 'Green',
      tip: 'Rinse thoroughly and remove labels if possible. Separate by color if required.',
      upcycling: 'Clean and use as a vase, storage container, or create decorative lighting.',
      contamination: 'Must be clean and free of residues',
      image: '/api/placeholder/200/200'
    },
    'aluminum-can': {
      id: 'aluminum-can',
      name: 'Aluminum Can',
      material: 'Metal',
      category: 'Metals',
      binColor: 'Yellow',
      tip: 'Rinse and crush to save space. Remove any paper labels.',
      upcycling: 'Create decorative items, plant markers, or small organizers.',
      contamination: 'Should be clean and dry',
      image: '/api/placeholder/200/200'
    },
    'newspaper': {
      id: 'newspaper',
      name: 'Newspaper',
      material: 'Paper',
      category: 'Paper & Card',
      binColor: 'Blue',
      tip: 'Keep dry and clean. Bundle together or place in paper bag.',
      upcycling: 'Use for crafts, wrapping paper, papier-mâché, or compost bedding.',
      contamination: 'Avoid if wet or greasy',
      image: '/api/placeholder/200/200'
    },
    'cardboard': {
      id: 'cardboard',
      name: 'Cardboard Box',
      material: 'Paper',
      category: 'Paper & Card',
      binColor: 'Blue',
      tip: 'Flatten boxes to save space. Remove any plastic packaging.',
      upcycling: 'Create storage organizers, pet houses, or compost in small pieces.',
      contamination: 'Should be clean and dry',
      image: '/api/placeholder/200/200'
    },
    'food-scraps': {
      id: 'food-scraps',
      name: 'Food Scraps',
      material: 'Organic',
      category: 'Bio/Organic',
      binColor: 'Brown',
      tip: 'Avoid mixing with non-compostable materials. Use compostable bags.',
      upcycling: 'Compost to create nutrient-rich soil for gardening.',
      contamination: 'No plastic or glass mixed in',
      image: '/api/placeholder/200/200'
    },
    'battery': {
      id: 'battery',
      name: 'Battery',
      material: 'Hazardous',
      category: 'E-Waste',
      binColor: 'Special Collection',
      tip: 'Do not dispose in regular bins. Find e-waste drop-off locations.',
      upcycling: 'Not recommended - proper disposal required for safety.',
      contamination: 'Never mix with regular waste',
      image: '/api/placeholder/200/200'
    },
    'electronics': {
      id: 'electronics',
      name: 'Small Electronics',
      material: 'E-Waste',
      category: 'E-Waste',
      binColor: 'Special Collection',
      tip: 'Take to e-waste recycling centers. Remove batteries if possible.',
      upcycling: 'Some components can be reused in DIY projects by experts.',
      contamination: 'Requires special handling',
      image: '/api/placeholder/200/200'
    }
  },

  upcyclingProjects: {
    'orange-peels': {
      id: 'orange-peels',
      name: 'Orange Peel Fertilizer',
      materials: ['Orange peels'],
      difficulty: 'Easy',
      time: '7 days',
      steps: [
        'Dry orange peels for 7 days in sunlight',
        'Crush dried peels into small pieces',
        'Mix with soil as natural fertilizer',
        'Optional: Grind into powder for faster absorption'
      ],
      benefits: 'Natural pest repellent and nutrient-rich fertilizer'
    },
    'plastic-bottle-planter': {
      id: 'plastic-bottle-planter',
      name: 'Plastic Bottle Vertical Garden',
      materials: ['Plastic bottles', 'Soil', 'Plants'],
      difficulty: 'Medium',
      time: '1 hour',
      steps: [
        'Cut plastic bottles in half',
        'Create drainage holes in the bottom',
        'Fill with soil and plant herbs or flowers',
        'Mount on wall or fence for vertical garden'
      ],
      benefits: 'Space-saving gardening solution'
    },
    'glass-jar-storage': {
      id: 'glass-jar-storage',
      name: 'Decorative Storage Jars',
      materials: ['Glass jars', 'Paint', 'Decorations'],
      difficulty: 'Easy',
      time: '30 minutes',
      steps: [
        'Clean and dry glass jars thoroughly',
        'Paint or decorate as desired',
        'Use for storing spices, crafts, or bathroom items',
        'Add labels for organization'
      ],
      benefits: 'Reduces need for new storage containers'
    }
  },

  localeRules: {
    'Germany': {
      name: 'Germany',
      colors: {
        'Blue': { 
          category: 'Paper & Card',
          items: ['Newspaper', 'Cardboard', 'Office paper', 'Books'],
          tips: 'Keep dry and clean. Remove plastic wrapping.'
        },
        'Yellow': { 
          category: 'Plastics & Packaging',
          items: ['Plastic bottles', 'Packaging', 'Metal cans', 'Tetra Pak'],
          tips: 'Rinse containers. No hazardous materials.'
        },
        'Brown': { 
          category: 'Bio/Organic',
          items: ['Food scraps', 'Garden waste', 'Coffee grounds', 'Tea bags'],
          tips: 'No plastic bags. Use compostable bags only.'
        },
        'Green': { 
          category: 'Glass',
          items: ['Glass bottles', 'Glass jars'],
          tips: 'Separate by color. Remove lids and labels.'
        },
        'Gray': { 
          category: 'Residual',
          items: ['Non-recyclables', 'Sanitary products', 'Diapers'],
          tips: 'Only for items that cannot be recycled.'
        }
      },
      pickup: {
        'Blue': 'Every 2 weeks on Tuesday',
        'Yellow': 'Weekly on Friday',
        'Brown': 'Weekly on Wednesday',
        'Gray': 'Weekly on Monday'
      }
    },
    'USA': {
      name: 'United States',
      colors: {
        'Blue': { 
          category: 'Recyclables',
          items: ['Paper', 'Cardboard', 'Plastics #1-7', 'Metal cans'],
          tips: 'Check local guidelines as rules vary by city.'
        },
        'Green': { 
          category: 'Organic Waste',
          items: ['Food scraps', 'Yard waste', 'Compostable materials'],
          tips: 'No plastic or animal products in some systems.'
        },
        'Black': { 
          category: 'Landfill',
          items: ['Non-recyclables', 'Styrofoam', 'Ceramics'],
          tips: 'Minimize use of this bin when possible.'
        }
      },
      pickup: {
        'Blue': 'Weekly on Thursday',
        'Green': 'Weekly on Wednesday',
        'Black': 'Weekly on Thursday'
      }
    },
    'UK': {
      name: 'United Kingdom',
      colors: {
        'Blue': { 
          category: 'Paper & Card',
          items: ['Newspapers', 'Cardboard', 'Magazines', 'Junk mail'],
          tips: 'Flatten cardboard boxes.'
        },
        'Green': { 
          category: 'Glass',
          items: ['Glass bottles', 'Glass jars'],
          tips: 'Separate by color if required locally.'
        },
        'Brown': { 
          category: 'Garden Waste',
          items: ['Grass cuttings', 'Leaves', 'Small branches'],
          tips: 'No soil or stones.'
        },
        'Black': { 
          category: 'General Waste',
          items: ['Non-recyclables', 'Plastic film', 'Sanitary waste'],
          tips: 'Last resort for non-recyclable items.'
        }
      },
      pickup: {
        'Blue': 'Every 2 weeks on Monday',
        'Green': 'Every 2 weeks on Monday',
        'Brown': 'Weekly on Friday',
        'Black': 'Weekly on Monday'
      }
    }
  }
};