import { FireType } from '../components/FireLevel'

export type PostData = {
    slug: string
    date: string
    title: string
    subtitle?: string
    excerpt?: string
    description?: string
    status?: 'published' | 'draft'
    tags?: string[]
    content?: string
    keywords?: string
    completion?: FireType
    updated?: string
}
