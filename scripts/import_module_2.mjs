import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const moduleData = {
    "module_title": "Platform Model",
    "topics": [
        {
            "title": "Two sided platform mediated networks basic structure",
            "paragraphs": [
                "A two sided platform is an intermediary that enables interactions between two or more distinct groups of users who depend on each other for value. The platform does not primarily create value by producing goods or services itself, but by facilitating efficient exchange between these groups.",
                "Each side of the platform serves a different role, commonly framed as producers and consumers or supply and demand. The platform reduces search costs, coordination costs, and transaction friction, making interactions easier than they would be without the platform.",
                "Value creation in platform models is driven by network effects. Direct network effects arise when the value to a user increases as more users of the same type join the platform. Indirect network effects arise when growth on one side increases value for the other side.",
                "Pricing in two sided platforms is typically asymmetric. One side may be subsidized or offered free access to attract participation, while the other side bears a larger share of the cost. This pricing structure is designed to accelerate network growth and reach critical mass."
            ]
        },
        {
            "title": "Challenges in two sided networks",
            "paragraphs": [
                "The most fundamental challenge in two sided networks is the chicken and egg problem. Each user group is reluctant to join unless the other group is already present, making early stage adoption difficult.",
                "Achieving and maintaining critical mass on both sides is essential. Insufficient participation on either side reduces interaction quality and weakens network effects, limiting the platform’s ability to scale.",
                "Different sides often perceive value differently, creating imbalance in incentives. Platforms must carefully design pricing, features, and rules to ensure that both sides remain engaged and see sufficient benefit.",
                "As platforms scale, maintaining quality and trust becomes increasingly complex. Poor quality participants, misuse, or fraud can reduce overall platform value and trigger user exit.",
                "Successful platforms also face the risk of disintermediation, where users bypass the platform after initial matching. Governance mechanisms such as rules, reputation systems, and enforcement are required to sustain long term value creation."
            ]
        },
        {
            "title": "Envelopment strategy in platform mediated networked markets",
            "paragraphs": [
                "Envelopment refers to a competitive strategy where a platform expands into adjacent markets by leveraging its existing user base or technological capabilities. Rather than building from scratch, the platform uses overlap in users or functionality to enter new domains.",
                "This strategy is effective when platforms share common users, complementary services, or similar interaction structures. By bundling multiple services together, platforms can reduce switching incentives for users and weaken competing platforms.",
                "Network effects play a central role in envelopment. Existing participation on the core platform accelerates adoption in the adjacent market, allowing rapid scaling that standalone entrants may struggle to achieve.",
                "Envelopment can be defensive, aimed at protecting the core platform from competitors, or offensive, aimed at capturing new sources of value. Over time, successful envelopment can reshape market boundaries and redefine competitive dynamics."
            ]
        }
    ]
};

async function importModule2() {
    console.log("🚀 Starting Module 2 Import...");

    // 1. Find the module
    const { data: module, error: mError } = await supabase
        .from('modules')
        .select('id')
        .ilike('title', `%${moduleData.module_title}%`)
        .single();

    if (mError || !module) { console.error("Module not found:", moduleData.module_title); return; }

    for (const topic of moduleData.topics) {
        // 2. Find the topic
        const { data: topicRec, error: tError } = await supabase
            .from('topics')
            .select('id')
            .eq('module_id', module.id)
            .ilike('title', `%${topic.title}%`)
            .single();

        if (tError || !topicRec) { console.log(`Topic not found or skipped: ${topic.title}`); continue; }

        // 3. Update content
        const markdown = topic.paragraphs.join("\n\n");
        const { error: updateError } = await supabase
            .from('lesson_content')
            .update({ body: markdown })
            .eq('topic_id', topicRec.id);

        if (updateError) {
            console.error(`Error updating ${topic.title}:`, updateError.message);
        } else {
            console.log(`✅ Updated: ${topic.title}`);
        }
    }
}

importModule2();
