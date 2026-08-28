export async function getProfileData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/profile`, {
      cache: 'no-store'
    })
    if (!res.ok) return null
    const json = await res.json()
    
    // Map snake_case to camelCase
    if (json.data) {
      return {
        ...json.data,
        image: json.data.image || '',
        linkCv: json.data.link_cv,
        shortBio: json.data.short_bio,
        longBio: json.data.long_bio,
        socialLinks: json.data.social_links
      }
    }
    return null
  } catch {
    return null
  }
}

export async function getLearningData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/learning`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
}
