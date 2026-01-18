import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkRoles() {
    const { data: users, error } = await supabase
        .from('users')
        .select('email, role');

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Current Users and Roles:');
    users.forEach(u => {
        console.log(`- ${u.email}: [${u.role}]`);
    });
}

checkRoles();
