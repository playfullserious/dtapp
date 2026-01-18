import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const topicData = {
    "topic_title": "Envelopment Strategy in Platform Mediated Networked Markets",
    "content": {
        "introduction": "As platforms mature, competition increasingly shifts from individual products or services to competition between ecosystems. Platform providers often serve different markets that nonetheless have overlapping user bases or usage contexts. Envelopment is a strategy through which one platform leverages this overlap to enter another platform’s market, expand its scope, and reshape competitive boundaries.",
        "sections": [
            { "title": "Meaning of Envelopment", "text": "Envelopment occurs when a platform moves into an adjacent market by leveraging its existing users, technological capabilities, or data assets. Rather than entering as a standalone competitor, the platform offers a bundled solution that combines its existing product with the new offering. This approach allows the platform to piggyback on its current adoption and avoid the slow buildup faced by new entrants." },
            { "title": "Overlapping User Bases", "text": "A critical enabler of envelopment is the presence of overlapping user bases across platforms that serve different markets. When the same users participate in multiple platforms, a provider can introduce an adjacent service to its existing users with minimal friction. This overlap allows one platform provider to move into another’s market quickly by embedding the new functionality within a familiar environment." },
            { "title": "Bundling and Adoption", "text": "Bundling plays a central role in envelopment strategies. By offering two products or services together, platforms increase perceived value for users while reducing the incentive to adopt or remain on a competing standalone platform. Bundling lowers switching costs for users and can rapidly weaken the competitive position of incumbent platforms in the adjacent market." },
            { "title": "Role of Network Effects", "text": "Existing network effects significantly accelerate envelopment. Users already active on the core platform are more likely to adopt bundled services, and their participation helps establish network effects in the new market. This allows the enveloping platform to scale quickly and achieve competitive parity or dominance before rivals can respond effectively." },
            { "title": "Defensive and Offensive Use", "text": "Envelopment can serve both defensive and offensive strategic purposes. Defensively, platforms use envelopment to prevent competitors from encroaching on their core user base. Offensively, they use it to capture new value pools and extend their ecosystem footprint. Over time, repeated envelopment can transform a platform from a focused intermediary into a broad ecosystem orchestrator." },
            { "title": "Competitive Implications", "text": "Envelopment blurs traditional industry boundaries and changes how competition should be understood. Firms may find themselves competing with platform providers from different industries that share users or data rather than direct product similarities. This makes market definition and competitive analysis more complex in digital environments." }
        ],
        "summary": "Envelopment enables platforms to expand by leveraging overlapping user bases, bundling offerings, and extending existing network effects into adjacent markets. Through this process, platforms reshape competitive dynamics and redefine the boundaries of industries.",
        "reflection_prompt": "How does competition change when platforms can enter new markets by bundling services for existing users rather than acquiring new users from scratch?"
    }
};

async function updateTopic2_3() {
    console.log("🚀 Updating Topic 2.3 specifically...");

    // Find the topic record
    const { data: topicRec, error: tError } = await supabase
        .from('topics')
        .select('id')
        .ilike('title', `%${topicData.topic_title}%`)
        .single();

    if (tError || !topicRec) {
        console.error("Topic 2.3 not found specifically by title.");
        return;
    }

    // Format Markdown
    let markdown = `## Introduction\n${topicData.content.introduction}\n\n`;
    for (const section of topicData.content.sections) {
        markdown += `## ${section.title}\n${section.text}\n\n`;
    }
    markdown += `## Summary\n${topicData.content.summary}\n\n---\n\n### 💡 Reflection Prompt\n*${topicData.content.reflection_prompt}*`;

    const { error: updateError } = await supabase
        .from('lesson_content')
        .update({ body: markdown.trim() })
        .eq('topic_id', topicRec.id);

    if (updateError) {
        console.error(`Error updating Topic 2.3:`, updateError.message);
    } else {
        console.log(`✅ Successfully updated: ${topicData.topic_title}`);
    }
}

updateTopic2_3();
