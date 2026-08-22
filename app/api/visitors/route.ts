import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// Mendapatkan jumlah visitor
export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('visitor_counter')
      .select('count')
      .eq('id', 1)
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ count: 0 }, { status: 200 }); // Graceful fallback
    }

    return NextResponse.json({ count: data.count });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}

// Menambah jumlah visitor
export async function POST() {
  try {
    const supabase = await createClient();

    // Untuk increment secara atomik (tanpa perlu tahu nilai sebelumnya via RPC)
    // Berhubung kita belum punya RPC, kita bisa fetch lalu update. 
    // Di aplikasi produksi yang tinggi trafik, lebih baik buat RPC di Postgres.
    // Tapi karena ini aplikasi portofolio, fetch-lalu-update sudah cukup memadai.

    const { data: currentData, error: fetchError } = await supabase
      .from('visitor_counter')
      .select('count')
      .eq('id', 1)
      .single();

    if (fetchError) {
      console.error(fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const newCount = currentData.count + 1;

    const { error: updateError } = await supabase
      .from('visitor_counter')
      .update({ count: newCount })
      .eq('id', 1);

    if (updateError) {
      console.error(updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ count: newCount });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
