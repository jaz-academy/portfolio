# Project: Interactive Portfolio

**Stack:** Next.js + TypeScript + Tailwind CSS + Supabase + Vercel + GitHub

**Tujuan akhir:** siswa membangun portfolio pribadi yang awalnya statis, kemudian berkembang menjadi aplikasi web dinamis, terautentikasi, memiliki CRUD/API, CI/CD, dan fitur AI/Agent.

---

### Tahap 1 — Memahami Web & Membuat Struktur UI

**Konsep**

- Cara kerja website
- HTML semantic
- struktur halaman
- element, attribute
- link, image, section, navigation
- dasar accessibility

**Praktik**
Buat struktur portfolio:

```text
Home
About
Skills
Projects
Experience
Contact
```

**Output**
Portfolio masih HTML/JSX sederhana.
Copy Template dari TailwindCss

---

## Tahap 2 — JavaScript Fundamental

**Konsep**

```text
variable             : const navigation, projects, learning, socialLinks

data type            : data/portfolio.ts dan types/portfolio.ts
array                : navigation[], projects[], learning[], socialLinks[]
object               : profile, project, learning, social link, stat
function             : handleNavigationClick(), getFeaturedProjects()
operator             : handleNavigationClick(), filter(), spread operator (...)
condition            : isScrolled, project.featured, feature.icon &&
loop                 : navigation.map(), projects.map(), learning.map()

event                : onClick pada Header.tsx
DOM/state thinking   : scrollIntoView(), document.querySelector(), useState()
```

**Praktik**

Data portfolio dibuat dalam JavaScript:

```text
projects[]
skills[]
experiences[]
```

Kemudian digunakan untuk menampilkan daftar project, skill, dan pengalaman.

**Output**
Portfolio mulai menggunakan data, bukan HTML yang semuanya ditulis berulang.

my-app/
├── app/
├── components/
├── data/
│ └── portfolio.ts
├── types/
│ └── portfolio.ts
└── lib/
└── portfolio-utils.ts

---

## Tahap 3 — TypeScript

**Konsep**

```text
type                 : ProjectCategory, SocialPlatform
interface            : Project, Learning, Education, SocialLink, Profile
union                : ProjectCategory, SocialPlatform, availability, status
optional property    : Project.featured?, Learning.icon?, SocialLink.description?
array/object typing  : projects: Project[], profile: Profile, learning: Learning[]
component typing     : icon: ComponentType<{ className?: string }>

type safety          : compilerOptions.strict pada tsconfig.json

function typing      : getFeaturedProjects(projects: Project[]): Project[]
props typing         : ProjectImageCardProps pada ProjectImageCard.tsx
```

**Praktik**

Definisikan model:

```text
Project
Skill
Experience
Profile
```

Kemudian seluruh data portfolio menggunakan TypeScript.

**Output**
Portfolio memiliki struktur data yang dinamis dan aman.

---

## Tahap 4 — React Component

**Konsep**

```text
component            : components/*.tsx
state                : components/Header.tsx
event                : components/Header.tsx
useState             : components/Header.tsx
useEffect            : components/Header.tsx
list & key           : Header.tsx, Bento.tsx, Stats.tsx, Centered.tsx, Footer.tsx
conditional rendering: components/Header.tsx, Centered.tsx, Footer.tsx

props                : components/ProjectImageCard.tsx

form                 : belum tersedia
```

**Praktik**

Pecah portfolio menjadi component:

```text
Navbar
Hero
About
SkillCard
ProjectCard
Experience
ContactForm
Footer
```

Buat interaksi:

- mobile menu
- project filter
- project detail
- dark/light mode
- contact form
- modal

**Output**
Portfolio menjadi interactive frontend.

---

## Tahap 5 — Tailwind CSS & UI Design

**Konsep**

- utility class
- spacing
- typography
- color
- flex
- grid
- responsive
- hover/focus
- animation
- dark mode

**Implementasi saat ini**

```text
utility class   : components/*.tsx, app/globals.css
spacing         : components/*.tsx
typography      : components/Hero.tsx, Feature.tsx, Bento.tsx, Centered.tsx
color           : app/globals.css, components/*.tsx
flex            : Header.tsx, Footer.tsx, komponen portfolio lainnya
grid            : Bento.tsx, Footer.tsx, Centered.tsx, Stats.tsx
responsive      : seluruh komponen dengan breakpoint Tailwind
hover/focus     : Header.tsx, Bento.tsx, Footer.tsx
animation       : Bento.tsx, Header.tsx, app/globals.css

dark mode       : belum tersedia
```

**Praktik**

Bangun desain portfolio yang responsive:

```text
Mobile
Tablet
Desktop
```

Latihan tambahan:

> Berikan screenshot sebuah website → recreate UI tersebut menggunakan Tailwind.

**Output**
Portfolio memiliki desain profesional dan responsive.

---

## Tahap 6 — Portfolio Statis di Next.js

**Konsep**

- Next.js project structure
- App Router
- `page.tsx`
- `layout.tsx`
- routing
- dynamic route
- Server Component
- Client Component
- metadata
- image optimization
- loading/error

**Struktur awal**

```text
app/
├── page.tsx
├── about/
│   └── page.tsx
├── projects/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── experience/
│   └── page.tsx
└── contact/
    └── page.tsx

components/
├── Navbar.tsx
├── Hero.tsx
├── ProjectCard.tsx
├── Skills.tsx
└── Footer.tsx

types/
└── portfolio.ts

data/
└── portfolio.ts
```

**Implementasi saat ini**

```text
App Router         : app/page.tsx
Root layout        : app/layout.tsx
Static page        : app/page.tsx
Server Components  : Hero.tsx, Feature.tsx, Stats.tsx, Bento.tsx,
                     Centered.tsx, Footer.tsx, ProjectImageCard.tsx
Client Component   : components/Header.tsx
Metadata           : app/layout.tsx
Image content      : Feature.tsx, ProjectImageCard.tsx

Loading/error      : belum tersedia
Dynamic route      : belum tersedia
```

**Output**

> Portfolio statis selesai di Next.js.

---

## Tahap 7 — Dari Static Data → Database + API

Portfolio yang sebelumnya:

```text
data/portfolio.ts
```

diubah menjadi:

```text
Database
   ↓
API
   ↓
Next.js
   ↓
UI
```

**Konsep**

- database
- table
- relation
- API
- HTTP
- GET
- POST
- PUT/PATCH
- DELETE
- request/response
- JSON
- CRUD
- environment variable

**Praktik**

Buat tabel:

```text
projects
skills
experiences
```

Buat API:

```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

**Output**

Portfolio mengambil data secara dinamis dari database.

---

## Tahap 8 — Authentication + Dashboard

Buat halaman:

```text
/login
/dashboard
/dashboard/projects
/dashboard/skills
/dashboard/experience
```

**Konsep**

- authentication
- session
- authorization
- protected route
- login/logout
- form validation
- CRUD UI

**Praktik**

Dashboard memungkinkan owner:

```text
Create
Read
Update
Delete
```

project portfolio tanpa mengubah source code.

**Output**

Portfolio berubah dari website statis menjadi **web application**.

---

# Fase 6 — Engineering & Deployment

## Tahap 9 — Git, GitHub, Vercel & CI/CD

**Konsep**

- Git
- commit
- branch
- pull request
- GitHub
- environment variables
- build
- production
- deployment
- CI/CD

**Workflow**

```text
Local
 ↓
Git
 ↓
GitHub
 ↓
Pull Request
 ↓
CI
 ↓
Build/Test
 ↓
Vercel
 ↓
Production
```

**Praktik**

Setiap perubahan:

```text
feature
 ↓
commit
 ↓
push
 ↓
CI
 ↓
preview deployment
 ↓
merge
 ↓
production
```

**Output**

Portfolio live di Vercel dengan deployment otomatis.

---

# Fase 7 — AI-Assisted Coding

## Tahap 10 — AI sebagai Coding Assistant

Mulai menggunakan AI secara terkontrol.

AI digunakan untuk:

- menjelaskan error
- menjelaskan code
- mencari alternatif solusi
- membuat boilerplate
- membuat test
- review code
- refactoring
- membaca dokumentasi

**Aturan**

Siswa tidak hanya menerima hasil.

Setiap hasil AI harus:

```text
Understand
↓
Review
↓
Run
↓
Test
↓
Verify
```

**Praktik**

Ambil fitur portfolio yang sudah ada → gunakan AI untuk memperbaiki atau mengembangkannya.

---

# Fase 8 — Interactive Portfolio

## Tahap 11 — Advanced Interactive Features

Tambahkan fitur yang membuat portfolio terasa seperti aplikasi.

Contoh:

- project search
- project filtering
- animated timeline
- interactive skills
- project modal
- command palette
- keyboard navigation
- visitor counter
- analytics
- contact interaction
- downloadable CV

**Konsep baru**

- client/server interaction
- state management
- async operation
- optimistic UI
- loading state
- error state

---

# Fase 9 — AI Application

## Tahap 12 — Chatbot di Portfolio

Tambahkan:

> **"Ask Me About My Portfolio"**

Pengunjung dapat bertanya:

```text
Apa project yang pernah dibuat?
Apa skill saya?
Pengalaman apa yang saya punya?
Teknologi apa yang digunakan?
```

Arsitektur:

```text
Visitor
 ↓
Chat UI
 ↓
API
 ↓
LLM
 ↓
Portfolio Context
 ↓
Response
```

**Konsep**

- LLM
- prompt
- context
- API key
- streaming response
- conversation state
- AI safety dasar

**Output**

Portfolio memiliki chatbot yang memahami pemilik portfolio.

---

# Fase 10 — Agent

## Tahap 13 — Portfolio Agent

Chatbot berkembang menjadi **Agent**.

Agent tidak hanya menjawab, tetapi dapat menggunakan tools.

Contoh tools:

```text
getProjects()
getSkills()
getExperience()
searchProjects()
getContactInfo()
```

Arsitektur:

```text
Visitor
 ↓
Agent
 ↓
Reasoning
 ↓
Tool Selection
 ↓
Portfolio API
 ↓
Data
 ↓
Agent
 ↓
Response
```

Kemudian dapat dikembangkan:

```text
Portfolio Agent
├── Project Tool
├── Skill Tool
├── Experience Tool
├── Search Tool
└── Contact Tool
```

**Output akhir**

Portfolio bukan lagi sekadar CV online.

Ia menjadi:

> **Interactive Personal Application + AI Assistant + Agent**

---

# Struktur Akhir Project

```text
interactive-portfolio/
│
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── projects/
│   ├── experience/
│   ├── contact/
│   │
│   ├── login/
│   ├── dashboard/
│   │   ├── projects/
│   │   ├── skills/
│   │   └── experience/
│   │
│   └── api/
│       ├── projects/
│       ├── skills/
│       ├── experience/
│       └── chat/
│
├── components/
├── lib/
├── types/
├── data/
├── hooks/
├── services/
├── agents/
├── public/
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

# Urutan Kompetensi

```text
01 Web
   ↓
02 JavaScript
   ↓
03 TypeScript
   ↓
04 React
   ↓
05 Tailwind
   ↓
06 Next.js
   ↓
07 API + Database
   ↓
08 Authentication + CRUD
   ↓
09 Git + CI/CD + Vercel
   ↓
10 AI-assisted Coding
   ↓
11 Interactive Application
   ↓
12 AI Application
   ↓
13 Agent
```

## Prinsip pembelajaran

Setiap tahap mengikuti pola:

```text
CONCEPT
   ↓
DEMO
   ↓
GUIDED PRACTICE
   ↓
CHALLENGE
   ↓
PROJECT
   ↓
DEBUG
   ↓
REFLECTION
```

Dan pada tahap 1–9, **siswa tetap menjadi programmer utama**.

Mulai tahap 10, AI mulai masuk sebagai assistant.

Mulai tahap 13, AI/Agent menjadi bagian dari aplikasi yang mereka bangun.

Dengan demikian satu project yang sama menjadi **benang merah seluruh kurikulum**, sehingga siswa dapat melihat perkembangan:

**"Saya belajar coding" → "Saya bisa membuat aplikasi" → "Saya bisa bekerja bersama AI" → "Saya bisa membangun aplikasi berbasis Agent."**
