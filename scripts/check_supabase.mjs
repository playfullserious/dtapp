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

async function checkData() {
    const { data: modules, error: mError } = await supabase.from('modules').select('id, title');
    const { data: topics, error: tError } = await supabase.from('topics').select('id, title');
    const { data: content, error: cError } = await supabase.from('lesson_content').select('id');

    console.log('--- Database Check ---');
    console.log('Modules Error:', mError ? mError.message : 'None');
    console.log('Modules Count:', modules ? modules.length : 0);
    if (modules) modules.forEach(m => console.log(` - [${m.id}] ${m.title}`));

    console.log('\nTopics Error:', tError ? tError.message : 'None');
    console.log('Topics Count:', topics ? topics.length : 0);

    console.log('\nContent Error:', cError ? cError.message : 'None');
    console.log('Content Count:', content ? content.length : 0);
}

checkData();
