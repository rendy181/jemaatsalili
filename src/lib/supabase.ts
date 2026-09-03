// ============================================
// KONEKSI KE SUPABASE
// ============================================

const SUPABASE_URL = "https://trbazsjcmxsqeqluqzku.supabase.co/rest/v1/
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyYmF6c2pjbXhzcWVxbHVxemt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MTI4NzUsImV4cCI6MjEwMzk4ODg3NX0.HeLSP86467zmNkQX0AAQeOwhBiYNeVi3etZxJIow6Mg

export const supabase = {
  url: SUPABASE_URL,
  key: SUPABASE_KEY,
  
  // === FUNGSI GET DATA ===
  async get(table: string) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  // === FUNGSI POST DATA (TAMBAH DATA) ===
  async post(table: string, data: any) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // === FUNGSI UPDATE DATA ===
  async update(table: string, id: string, data: any) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // === FUNGSI DELETE DATA ===
  async delete(table: string, id: string) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    });
    return response;
  },
};