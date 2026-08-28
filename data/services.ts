export type Service = {
  id: string
  number: string
  title: string
  description: string
  image: string
}

export const services: Service[] = [
  {
    id: 'strategy',
    number: '01',
    title: 'Digital Strategy',
    description: 'We define the roadmap for your digital success through deep research and analytics.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop', // Abstract flow
  },
  {
    id: 'design',
    number: '02',
    title: 'Brand Design',
    description: 'Crafting unique visual identities that resonate with your target audience.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Geometric shapes
  },
  {
    id: 'development',
    number: '03',
    title: 'Web Development',
    description: 'Building robust, scalable, and high-performance web experiences.',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop', // Modern architecture
  },
  {
    id: 'motion',
    number: '04',
    title: 'Motion & 3D',
    description: 'Bringing your brand to life with captivating motion graphics and 3D art.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', // Tech abstract
  },
]
