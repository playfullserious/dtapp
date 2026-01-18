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

async function listModules() {
    const { data: modules, error } = await supabase
        .from('modules')
        .select('*, topics(count)');

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Current Modules:');
    modules.forEach(m => {
        console.log(`- [${m.id}] ${m.title} (${m.topics[0].count} topics) Created: ${m.created_at}`);
    });
}

listModules();
