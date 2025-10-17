import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import { categoryMapping } from './categoryMapping'

export interface Writeup {
  slug: string
  title: string
  description: string
  category: string
  content: string
  contentHtml: string
}

const writeupsDirectory = path.join(process.cwd(), 'writeups')

export function getWriteups(): Writeup[] {
  const fileNames = fs.readdirSync(writeupsDirectory)
  const allWriteupsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const fullPath = path.join(writeupsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // Extract title from filename or content
      const title = data.title || name.replace(/\.md$/, '').replace(/[-_]/g, ' ')
      
      // Extract description from first paragraph or use default
      const description = data.description || content.split('\n\n')[0].replace(/^#+\s*/, '').substring(0, 150) + '...'
      
      // Extract category from mapping
      const category = data.category || categoryMapping[title] || 'General'
      
      // Preprocess markdown to convert Obsidian-style image syntax to standard markdown
      let processedContent = content.replace(/!\[\[([^\]]+)\]\]/g, (match, imagePath) => {
        // Convert ![[image.png]] to ![alt text](/images/image.png)
        const imageName = imagePath.split('/').pop() || imagePath
        const altText = imageName.replace(/\.[^/.]+$/, '') // Remove file extension for alt text
        return `![${altText}](/images/${imageName})`
      })
      
      // Process markdown to HTML
      const processedContentResult = remark().use(gfm).use(html).processSync(processedContent)
      const contentHtml = processedContentResult.toString()

      return {
        slug: name.replace(/\.md$/, ''),
        title,
        description,
        category,
        content,
        contentHtml
      }
    })

  return allWriteupsData
}

export function getWriteupBySlug(slug: string): Writeup | null {
  try {
    // Decode URL-encoded slug to match filename
    const decodedSlug = decodeURIComponent(slug)
    const fullPath = path.join(writeupsDirectory, `${decodedSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const title = data.title || decodedSlug.replace(/[-_]/g, ' ')
    const description = data.description || content.split('\n\n')[0].replace(/^#+\s*/, '').substring(0, 150) + '...'
    const category = data.category || categoryMapping[title] || 'General'
    
    // Preprocess markdown to convert Obsidian-style image syntax to standard markdown
    let processedContent = content.replace(/!\[\[([^\]]+)\]\]/g, (match, imagePath) => {
      // Convert ![[image.png]] to ![alt text](/images/image.png)
      const imageName = imagePath.split('/').pop() || imagePath
      const altText = imageName.replace(/\.[^/.]+$/, '') // Remove file extension for alt text
      return `![${altText}](/images/${imageName})`
    })
    
    // Process markdown to HTML
    const processedContentResult = remark().use(gfm).use(html).processSync(processedContent)
    const contentHtml = processedContentResult.toString()
    
    return {
      slug,
      title,
      description,
      category,
      content,
      contentHtml
    }
  } catch {
    return null
  }
}

export function getAllWriteupSlugs(): string[] {
  const fileNames = fs.readdirSync(writeupsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}
