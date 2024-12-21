'use client'

import { useState } from 'react'
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getSortedPostsData, BlogPost } from "../../lib/blog"
import Link from "next/link"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<BlogPost[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSearch = () => {
    try {
      const allPosts = getSortedPostsData()
      const filteredPosts = allPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(filteredPosts)
      setError(null)
    } catch (error) {
      console.error("Error searching posts:", error)
      setSearchResults([])
      setError("An error occurred while searching. Please try again later.")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Search</h1>
        <div className="flex gap-4 mb-8">
          <Input
            type="search"
            placeholder="Search portfolio"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} className="bg-[#1d70b8] hover:bg-[#1d70b8]/90">
            Search
          </Button>
        </div>
        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}
        {searchResults.length === 0 ? (
          <div className="text-gray-600">No results found. Try a different search term or check back later for new content.</div>
        ) : (
          <div className="space-y-6">
            {searchResults.map((result) => (
              <div key={result.id} className="border p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/blog/${result.id}`} className="hover:text-[#1d70b8]">
                    {result.title}
                  </Link>
                </h2>
                <p className="text-gray-600">{result.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

