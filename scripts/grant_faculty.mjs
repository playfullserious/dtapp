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

async function fixUserRole() {
    const email = 'sridhars@xime.org';
    const role = 'faculty';
    const name = 'Sridhar Srinivasan';

    console.log(`Setting up ${email} as ${role}...`);

    const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (existingUser) {
        console.log('User exists, updating role...');
        const { error } = await supabase
            .from('users')
            .update({ role })
            .eq('email', email);
        if (error) console.error('Update error:', error);
        else console.log('Successfully updated to faculty!');
    } else {
        console.log('User does not exist, creating user...');
        const { error } = await supabase
            .from('users')
            .insert({ email, role, name });
        if (error) console.error('Insert error:', error);
        else console.log('Successfully created faculty user!');
    }
}

fixUserRole();
