const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, val] = line.split('=');
  if (key && val) acc[key.trim()] = val.trim().replace(/^\"|\"$/g, '');
  return acc;
}, {});
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
supabase.from('projects').insert([{
  title: 'Test',
  description: 'Test',
  category_id: 2,
  image: 'test',
  image_alt: 'test',
  year: 2026,
  featured: true
}]).select().then(res => console.log('Result:', JSON.stringify(res))).catch(console.error);
