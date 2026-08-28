export type Project = {
  id: string
  number: string
  title: string
  category: string
  year: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'chronos',
    number: '01',
    title: 'Chronos',
    category: 'Digital Experience',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Abstract 3D
  },
  {
    id: 'aether',
    number: '02',
    title: 'Aether OS',
    category: 'Product Design',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', // Tech abstract
  },
  {
    id: 'lumina',
    number: '03',
    title: 'Lumina',
    category: 'E-Commerce',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop', // Modern architecture / elegant
  },
  {
    id: 'vertex',
    number: '04',
    title: 'Vertex',
    category: 'Web Application',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop', // Abstract dark art
  },
]
