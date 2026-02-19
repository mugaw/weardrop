import { Product, BlogPost } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wool Cashmere Overcoat',
    description: 'Crafted from the finest Italian wool and cashmere blend, this overcoat embodies timeless sophistication. Features a relaxed silhouette with dropped shoulders, concealed button closure, and full satin lining.',
    price: 1290,
    originalPrice: 1590,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'
    ],
    category: 'men',
    subcategory: 'outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Navy', hex: '#1B3A5F' }
    ],
    isSale: true,
    rating: 4.9,
    reviewCount: 124,
    sku: 'NOIR-M-001',
    inStock: true
  },
  {
    id: '2',
    name: 'Silk Blend Turtleneck',
    description: 'An elevated essential in luxurious silk-cashmere blend. The refined turtleneck silhouette offers understated elegance for any occasion.',
    price: 380,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80'
    ],
    category: 'women',
    subcategory: 'knitwear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Black', hex: '#141414' },
      { name: 'Mocha', hex: '#967969' }
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 89,
    sku: 'NOIR-W-002',
    inStock: true
  },
  {
    id: '3',
    name: 'Structured Wool Blazer',
    description: 'A modern interpretation of classic tailoring. This single-breasted blazer features sharp shoulders, nipped waist, and premium wool from renowned Italian mills.',
    price: 890,
    images: [
      'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80'
    ],
    category: 'women',
    subcategory: 'blazers',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Black', hex: '#141414' }
    ],
    rating: 4.7,
    reviewCount: 156,
    sku: 'NOIR-W-003',
    inStock: true
  },
  {
    id: '4',
    name: 'Merino Crew Neck Sweater',
    description: 'The perfect foundation piece in ultra-fine merino wool. Lightweight yet warm, with exceptional softness and natural breathability.',
    price: 245,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
      'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80'
    ],
    category: 'men',
    subcategory: 'knitwear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Navy', hex: '#1B3A5F' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    isNew: true,
    rating: 4.6,
    reviewCount: 203,
    sku: 'NOIR-M-004',
    inStock: true
  },
  {
    id: '5',
    name: 'Wide Leg Tailored Trousers',
    description: 'Effortlessly elegant trousers with a fluid wide-leg silhouette. Cut from premium wool with a hint of stretch for all-day comfort.',
    price: 420,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80'
    ],
    category: 'women',
    subcategory: 'trousers',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#141414' },
      { name: 'Cream', hex: '#FFFDD0' }
    ],
    rating: 4.8,
    reviewCount: 112,
    sku: 'NOIR-W-005',
    inStock: true
  },
  {
    id: '6',
    name: 'Italian Leather Belt',
    description: 'Handcrafted in Italy from full-grain vegetable-tanned leather. Features a minimalist brushed metal buckle for refined sophistication.',
    price: 165,
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'
    ],
    category: 'accessories',
    subcategory: 'belts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Black', hex: '#141414' }
    ],
    rating: 4.9,
    reviewCount: 78,
    sku: 'NOIR-A-006',
    inStock: true
  },
  {
    id: '7',
    name: 'Cashmere Scarf',
    description: 'Luxuriously soft cashmere scarf in a generous size. Perfect for wrapping or draping, finished with delicate fringe detailing.',
    price: 295,
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80'
    ],
    category: 'accessories',
    subcategory: 'scarves',
    sizes: ['One Size'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Navy', hex: '#1B3A5F' }
    ],
    isNew: true,
    rating: 5.0,
    reviewCount: 67,
    sku: 'NOIR-A-007',
    inStock: true
  },
  {
    id: '8',
    name: 'Slim Fit Cotton Shirt',
    description: 'Impeccably crafted from premium Egyptian cotton. Features a modern slim fit, spread collar, and mother-of-pearl buttons.',
    price: 185,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'
    ],
    category: 'men',
    subcategory: 'shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Pink', hex: '#FFB6C1' }
    ],
    rating: 4.7,
    reviewCount: 234,
    sku: 'NOIR-M-008',
    inStock: true
  },
  {
    id: '9',
    name: 'Pleated Midi Skirt',
    description: 'Elegant pleated skirt in fluid crepe fabric. The midi length and A-line silhouette create a timeless, feminine shape.',
    price: 340,
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0ujc0?w=800&q=80',
      'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=800&q=80'
    ],
    category: 'women',
    subcategory: 'skirts',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#141414' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    rating: 4.5,
    reviewCount: 98,
    sku: 'NOIR-W-009',
    inStock: true
  },
  {
    id: '10',
    name: 'Leather Weekender Bag',
    description: 'Handcrafted from premium full-grain leather. Spacious interior with thoughtful compartments for effortless travel.',
    price: 890,
    originalPrice: 1190,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'
    ],
    category: 'accessories',
    subcategory: 'bags',
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac', hex: '#9A463D' },
      { name: 'Black', hex: '#141414' }
    ],
    isSale: true,
    rating: 4.9,
    reviewCount: 45,
    sku: 'NOIR-A-010',
    inStock: true
  },
  {
    id: '11',
    name: 'Double-Breasted Wool Coat',
    description: 'A statement piece in luxurious Italian wool. The double-breasted silhouette with peak lapels exudes confidence and refinement.',
    price: 1490,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80'
    ],
    category: 'men',
    subcategory: 'outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy', hex: '#1B3A5F' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 87,
    sku: 'NOIR-M-011',
    inStock: true
  },
  {
    id: '12',
    name: 'Silk Midi Dress',
    description: 'Effortlessly elegant in fluid silk crepe. The bias-cut silhouette drapes beautifully, with delicate spaghetti straps.',
    price: 680,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80'
    ],
    category: 'women',
    subcategory: 'dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Black', hex: '#141414' },
      { name: 'Emerald', hex: '#50C878' }
    ],
    rating: 4.9,
    reviewCount: 134,
    sku: 'NOIR-W-012',
    inStock: true
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Timeless Dressing',
    excerpt: 'Discover the philosophy behind building a wardrobe that transcends seasons and trends.',
    content: `
      <p>In a world of fast fashion and ever-changing trends, the concept of timeless dressing has never been more relevant. At NOIR ATELIER, we believe in creating pieces that not only stand the test of time in terms of quality but also in style.</p>
      
      <h3>The Foundation of a Timeless Wardrobe</h3>
      <p>Building a timeless wardrobe starts with understanding your personal style and investing in quality pieces that reflect it. It's about choosing garments that make you feel confident and comfortable, regardless of the occasion.</p>
      
      <h3>Quality Over Quantity</h3>
      <p>The key to timeless dressing lies in the details – the weight of the fabric, the precision of the cut, the craftsmanship of the construction. These elements transform a simple garment into a cherished piece that you'll reach for year after year.</p>
      
      <h3>The Color Palette</h3>
      <p>Neutral tones form the backbone of any timeless wardrobe. Black, white, navy, camel, and grey provide a versatile foundation that can be mixed and matched effortlessly. These colors never go out of style and always look sophisticated.</p>
      
      <h3>Invest in the Classics</h3>
      <p>Certain pieces have earned their place in the pantheon of timeless fashion: the perfectly tailored blazer, the crisp white shirt, the well-cut trousers, the little black dress. These are the building blocks upon which you can create countless looks.</p>
    `,
    author: 'Isabella Laurent',
    date: '2024-01-15',
    category: 'Style Guide',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Sustainable Luxury: Our Commitment',
    excerpt: 'How we are redefining luxury fashion through sustainable practices and ethical production.',
    content: `
      <p>Luxury and sustainability are not mutually exclusive. In fact, true luxury should be sustainable by definition – created with care, designed to last, and produced with respect for both people and planet.</p>
      
      <h3>Our Materials</h3>
      <p>We source only the finest natural fibers from certified suppliers who share our commitment to environmental responsibility. From organic cotton to responsibly sourced wool, every material is chosen with intention.</p>
      
      <h3>Ethical Production</h3>
      <p>Our garments are crafted in family-owned ateliers where skilled artisans are paid fair wages and work in safe conditions. We believe that luxury should never come at the cost of human dignity.</p>
      
      <h3>Made to Last</h3>
      <p>In an age of disposable fashion, we create pieces designed to be worn for years, even decades. Quality construction and classic design ensure that our garments remain relevant and beautiful over time.</p>
    `,
    author: 'Marcus Chen',
    date: '2024-01-10',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Behind the Seams: The Craft of Tailoring',
    excerpt: 'A journey into the meticulous world of bespoke tailoring and what makes it special.',
    content: `
      <p>There is something almost magical about a perfectly tailored garment. It fits not just your body, but your personality, your lifestyle, your aspirations. This is the art of tailoring – a craft that has been refined over centuries.</p>
      
      <h3>The Process</h3>
      <p>Creating a bespoke garment begins with understanding. Our master tailors take the time to learn about how you move, how you live, and how you want to feel. Every measurement is taken with precision, every detail considered with care.</p>
      
      <h3>The Handwork</h3>
      <p>While modern technology has its place, there are certain techniques that can only be done by hand. The canvas construction of a jacket, the hand-stitched lapels, the perfectly rolled collar – these are the marks of true craftsmanship.</p>
      
      <h3>The Fittings</h3>
      <p>A bespoke garment is built through a series of fittings, each one bringing the piece closer to perfection. It's a collaborative process between tailor and client, resulting in a garment that is uniquely yours.</p>
    `,
    author: 'Sophie Anderson',
    date: '2024-01-05',
    category: 'Craftsmanship',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'The Essential Winter Edit',
    excerpt: 'Curated pieces to elevate your cold-weather wardrobe with sophistication and warmth.',
    content: `
      <p>Winter dressing presents a unique challenge: how to stay warm without sacrificing style. Our winter edit brings together pieces that offer both exceptional warmth and impeccable design.</p>
      
      <h3>The Perfect Coat</h3>
      <p>A great coat is the foundation of winter style. Look for natural fibers like wool and cashmere that provide warmth without bulk. Our overcoats are designed with clean lines and thoughtful details that elevate any outfit.</p>
      
      <h3>Layering Essentials</h3>
      <p>The key to winter dressing is layering. Fine-knit merino sweaters, silk turtlenecks, and cashmere cardigans create warmth through layers while maintaining a refined silhouette.</p>
      
      <h3>Accessorize with Intention</h3>
      <p>Winter accessories are both functional and decorative. A cashmere scarf, leather gloves, and a quality bag complete your look while providing essential protection from the elements.</p>
    `,
    author: 'Isabella Laurent',
    date: '2023-12-20',
    category: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    readTime: '4 min read'
  }
];

export const categories = [
  { id: 'all', label: 'All', href: '/shop' },
  { id: 'men', label: 'Men', href: '/shop?category=men' },
  { id: 'women', label: 'Women', href: '/shop?category=women' },
  { id: 'accessories', label: 'Accessories', href: '/shop?category=accessories' },
  { id: 'new', label: 'New Arrivals', href: '/shop?filter=new' },
  { id: 'sale', label: 'Sale', href: '/shop?filter=sale' }
];

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' }
];
