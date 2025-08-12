const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

console.log('Iniciando teste...');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testar() {
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'OK' : 'FALTA');
  console.log('KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'OK' : 'FALTA');
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email: `test${Date.now()}@teste.com`,
      password: 'teste123456'
    });
    
    if (error) {
      console.log('ERRO:', error.message);
      console.log('STATUS:', error.status);
    } else {
      console.log('SUCESSO!');
    }
  } catch (err) {
    console.log('ERRO GRAVE:', err.message);
  }
}

testar();