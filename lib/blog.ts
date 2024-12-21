export type BlogPost = {
  id: string
  title: string
  date: string
  content: string
  excerpt: string
}

// Static blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 'welcome-post',
    title: 'Welcome to My Blog',
    date: '2023-12-20',
    content: `
# Welcome to My Blog

I'm excited to share my journey as an IT Apprentice with you. This blog will cover various topics including:

- Web Development
- Cloud Computing
- Digital Transformation
- Technical Projects
- Learning Experiences

Stay tuned for more updates!
    `,
    excerpt: "Welcome to my blog! I'm excited to share my journey as an IT Apprentice with you..."
  },
  {
    id: 'my-apprenticeship',
    title: 'My IT Apprenticeship Experience',
    date: '2023-12-19',
    content: `
# My IT Apprenticeship Experience

Working as an IT Apprentice has been an incredible journey of learning and growth. Here are some key highlights:

## Technical Skills

- Full-stack web development
- Cloud infrastructure
- Agile methodologies
- System administration

## Projects

I've had the opportunity to work on various exciting projects...
    `,
    excerpt: "Working as an IT Apprentice has been an incredible journey of learning and growth..."
  }
]

export function getSortedPostsData(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostData(id: string): BlogPost {
  const post = blogPosts.find(post => post.id === id)
  if (!post) {
    throw new Error(`Post not found: ${id}`)
  }
  return post
}

export function createPost(title: string, content: string): void {
  // In a real application, this would send data to an API
  console.log('Creating post:', { title, content })
}

export function updatePost(id: string, title: string, content: string): void {
  // In a real application, this would send data to an API
  console.log('Updating post:', { id, title, content })
}

export function deletePost(id: string): void {
  // In a real application, this would send data to an API
  console.log('Deleting post:', { id })
}

