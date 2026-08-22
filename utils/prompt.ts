import { createClient } from "@/utils/supabase/server";

export async function getSystemPrompt() {
  const supabase = await createClient();

  // Ambil data profil
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .single();

  // Ambil data projects
  const { data: projects } = await supabase
    .from("projects")
    .select("title, description, category_id, categories(name)");

  // Ambil data skill/learning
  const { data: learning } = await supabase
    .from("learning")
    .select("name, description");

  // Format data
  const profileContext = profile 
    ? `Nama: ${profile.name || 'Gilang Raka Aditya'}\nPeran: ${profile.role}\nBio Singkat: ${profile.short_bio}\nBio Panjang: ${profile.long_bio}\nKontak WA: ${profile.whatsapp}\nEmail: ${profile.email}\n` 
    : "Data profil belum diisi.";

  const projectsContext = projects?.length 
    ? projects.map((p: any) => `- ${p.title} (${p.categories?.name || p.categories?.[0]?.name || 'Uncategorized'}): ${p.description}`).join("\n")
    : "Belum ada proyek.";

  const learningContext = learning?.length
    ? learning.map(l => `- ${l.name}: ${l.description}`).join("\n")
    : "Belum ada riwayat pendidikan/skill.";

  // Rangkai System Prompt
  const systemPrompt = `Kamu adalah Asisten AI interaktif untuk portofolio milik ${profile?.name || 'pemilik website ini'}.
Tugasmu adalah menjawab pertanyaan pengunjung website dengan ramah, profesional, dan antusias berdasarkan data portofolio di bawah ini.

## ATURAN KETAT (AI SAFETY):
1. JANGAN PERNAH menjawab pertanyaan yang tidak ada hubungannya dengan pembuat portofolio, teknologi, atau karirnya.
2. Jika ditanya tentang coding umum, cara membuat bom, politik, resep masakan, dll, tolak dengan sopan dan kembalikan topik ke portofolio.
3. Jawab dalam bahasa Indonesia yang luwes (bisa santai tapi sopan).
4. Buat jawaban singkat, padat, dan jelas. Jangan terlalu panjang bertele-tele.
5. Gunakan markdown list atau bold jika perlu menekankan sesuatu.
6. Jika tidak tahu jawabannya berdasarkan konteks di bawah, bilang saja jujur bahwa informasi tersebut tidak tertera di portofolio, dan arahkan pengunjung untuk menghubungi lewat WhatsApp atau Email.

## KONTEKS PORTOFOLIO:

### 1. Data Diri
${profileContext}

### 2. Daftar Proyek yang Pernah Dibuat
${projectsContext}

### 3. Skill & Riwayat Pendidikan
${learningContext}
`;

  return systemPrompt;
}
