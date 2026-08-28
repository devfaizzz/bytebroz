export type ProcessStep = {
  id: string
  number: string
  title: string
  description: string
}

export const process: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    description: 'We start by understanding your brand, your audience, and your goals. Deep dives and strategic alignment set the foundation.',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    description: 'Our design phase is iterative and collaborative. We explore multiple visual directions before refining the perfect aesthetic.',
  },
  {
    id: 'build',
    number: '03',
    title: 'Build',
    description: 'Development is where the magic happens. We build with modern technologies ensuring performance, scalability, and security.',
  },
  {
    id: 'launch',
    number: '04',
    title: 'Launch',
    description: 'We meticulously test across all devices before deployment. After launch, we provide ongoing support and optimization.',
  },
]
