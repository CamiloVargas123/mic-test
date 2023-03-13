export interface Post {
  id: string
  title: string
  description: string
  price: number
  offer?: number
  img: string[]
  isNew?: boolean
}
export interface PostDetail extends Post {
  likes: number
  sizes: string[]
  info: InfoPost[]
  aditionalInfo: string
}

export interface InfoPost {
  title: string
  description: {
    title?: string
    text: string
  }[]
}