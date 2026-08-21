-- 1. Mengaktifkan kembali RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 2. Policy untuk Categories (Publik hanya bisa membaca)
CREATE POLICY "Allow public read access on categories"
ON categories FOR SELECT USING (true);

-- 3. Policy untuk Projects (Publik hanya bisa membaca)
CREATE POLICY "Allow public read access on projects"
ON projects FOR SELECT USING (true);

-- 4. Policy untuk Projects (Hanya User Login yang bisa mengubah data)
CREATE POLICY "Allow authenticated users to insert projects"
ON projects FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update projects"
ON projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete projects"
ON projects FOR DELETE TO authenticated USING (true);
