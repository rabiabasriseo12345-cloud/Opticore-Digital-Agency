// ==========================================
// Supabase Database Client Configuration
// ==========================================

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

const isPlaceholder = (val) => !val || val.includes('your-project-id') || val.includes('your-anon-public');

if (supabaseUrl && supabaseKey && !isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseKey)) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('⚡ Supabase Client initialized successfully!');
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err.message);
  }
} else {
  console.log('ℹ️ Supabase credentials not set in .env yet. Using in-memory array storage until credentials are provided.');
}

module.exports = supabase;
