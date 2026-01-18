import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUser() {
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', 'sridhars@xime.org');

    if (error) {
        console.error('Error fetching user:', error.message);
    } else {
        console.log('Users found:', users);
    }
}

checkUser();
