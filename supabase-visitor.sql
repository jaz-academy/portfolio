-- Tabel Visitor Counter
-- Menggunakan Singleton Pattern karena kita hanya butuh 1 baris penyimpan data angka.

CREATE TABLE IF NOT EXISTS public.visitor_counter (
    id integer PRIMARY KEY DEFAULT 1,
    count integer NOT NULL DEFAULT 0,
    CONSTRAINT single_row CHECK (id = 1)
);

-- Menginisialisasi baris pertama jika belum ada
INSERT INTO public.visitor_counter (id, count) 
VALUES (1, 0) 
ON CONFLICT (id) DO NOTHING;

-- Nonaktifkan RLS karena tabel ini sifatnya publik (dibaca dan di-update)
ALTER TABLE public.visitor_counter DISABLE ROW LEVEL SECURITY;
