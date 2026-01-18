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
            "topic_title": "Two Sided Platform Mediated Networks",
            "content": {
                "introduction": "Two sided platform mediated networks represent a departure from traditional pipeline businesses. Instead of producing value internally and pushing it downstream, platforms create value by enabling interactions between distinct groups of users who need each other to derive benefit.",
                "sections": [
                    { "title": "Basic Structure", "text": "A two sided platform consists of an intermediary that connects two or more interdependent participant groups such as buyers and sellers, drivers and riders, or developers and users. Each group derives value from the presence of the other, but coordinating directly would involve high search, coordination, or transaction costs without the platform." },
                    { "title": "Role of the Platform", "text": "The platform’s primary role is to reduce friction in interactions. It provides the technical infrastructure, rules, and standards that allow participants to find each other, transact efficiently, and resolve coordination problems. The platform itself typically does not own the assets being exchanged." },
                    { "title": "Network Effects", "text": "Network effects are central to platform value creation. Direct network effects occur when the value to a participant increases as more users of the same type join. Indirect network effects occur when growth on one side increases value for users on the other side. Strong indirect network effects are a defining feature of two sided platforms." },
                    { "title": "Pricing Logic", "text": "Because participation on both sides is critical, platform pricing is often asymmetric. One side may be subsidized or offered free access to stimulate adoption, while the other side is monetized. Pricing decisions are driven by the goal of accelerating network growth rather than short term profit maximization." }
                ],
                "summary": "Two sided platforms create value by enabling and scaling interactions between interdependent user groups. Their structure, reliance on network effects, and asymmetric pricing distinguish them from traditional business models.",
                "reflection_prompt": "Why does owning assets matter less for platforms than for traditional firms, even in capital intensive industries?"
            }
        },
        {
            "topic_title": "Challenges in Two Sided Networks",
            "content": {
                "introduction": "While two sided platforms offer powerful growth potential, they also face unique challenges that do not arise in traditional businesses. These challenges stem from interdependence between user groups and the reliance on network effects for value creation.",
                "sections": [
                    { "title": "Chicken and Egg Problem", "text": "The most fundamental challenge is the chicken and egg problem. Each user group is reluctant to join unless the other group is already present. Overcoming this problem requires careful sequencing, subsidies, or targeted seeding strategies." },
                    { "title": "Critical Mass", "text": "Platforms must reach critical mass on both sides for network effects to become self reinforcing. If one side grows faster than the other, interaction quality suffers, reducing perceived value and slowing adoption." },
                    { "title": "Value Imbalance", "text": "Different sides often experience and evaluate value differently. Platforms must continuously balance incentives, pricing, and features to prevent one side from feeling exploited or neglected." },
                    { "title": "Trust and Quality", "text": "As platforms scale, maintaining trust and quality becomes increasingly complex. Low quality participants, fraud, or misuse can erode overall platform value. Reputation systems, verification mechanisms, and monitoring are commonly used to address these risks." },
                    { "title": "Disintermediation Risk", "text": "Successful matching can create incentives for users to bypass the platform and transact directly. Platforms must provide ongoing value beyond initial matching to reduce disintermediation." }
                ],
                "summary": "The success of two sided platforms depends not only on growth, but on managing coordination, trust, balance, and governance challenges inherent in networked markets.",
                "reflection_prompt": "Which challenge becomes more critical as platforms scale, growth or governance, and why?"
            }
        },
        {
            "topic_title": "Envelopment Strategy in Platform Mediated Networked Markets",
            "content": {
                "introduction": "As platforms mature, competition increasingly shifts from standalone offerings to battles between ecosystems. Envelopment is a key strategy platforms use to grow, defend their position, and reshape market boundaries.",
                "sections": [
                    { "title": "Meaning of Envelopment", "text": "Envelopment occurs when a platform enters an adjacent market by leveraging its existing user base, shared functionality, or data assets. Rather than competing head on as a new entrant, the platform bundles the new service with its existing offering." },
                    { "title": "Conditions for Envelopment", "text": "Envelopment is most effective when platforms share common users, complementary services, or similar interaction structures. Functional overlap and user overlap reduce adoption friction in the adjacent market." },
                    { "title": "Role of Network Effects", "text": "Existing network effects accelerate envelopment. Users already active on the core platform are more likely to adopt bundled services, allowing the platform to scale faster than standalone competitors." },
                    { "title": "Defensive and Offensive Use", "text": "Envelopment can be defensive, aimed at preventing competitors from encroaching on the platform’s core market, or offensive, aimed at capturing new value pools. Over time, repeated envelopment can significantly expand platform scope." },
                    { "title": "Competitive Implications", "text": "Envelopment blurs industry boundaries and changes how competition is defined. Firms may find themselves competing with platforms from entirely different industries that leverage shared users or data." }
                ],
                "summary": "Envelopment allows platforms to extend their reach, strengthen network effects, and reshape competitive landscapes by leveraging existing ecosystems rather than building new ones from scratch.",
                "reflection_prompt": "How does envelopment change the way firms should define their competitors in digital markets?"
            }
        }
    ]
};

async function reImportModule2() {
    console.log("🚀 Starting Structured Module 2 Import...");

    const { data: moduleDataFromDb, error: mError } = await supabase
        .from('modules')
        .select('id')
        .ilike('title', `%${moduleData.module_title}%`)
        .single();

    if (mError || !moduleDataFromDb) { console.error("Module not found"); return; }

    for (const topic of moduleData.topics) {
        const { data: topicRec, error: tError } = await supabase
            .from('topics')
            .select('id')
            .eq('module_id', moduleDataFromDb.id)
            .ilike('title', `%${topic.topic_title}%`)
            .single();

        if (tError || !topicRec) {
            console.log(`Topic not perfect match, searching by title overlap: ${topic.topic_title}`);
            // Fallback for slight title differences
            const { data: fallback, error: fError } = await supabase
                .from('topics')
                .select('id')
                .eq('module_id', moduleDataFromDb.id)
                .ilike('title', `%${topic.topic_title.split(' ')[0]}%`)
                .limit(1);

            if (fError || !fallback.length) {
                console.log(`❌ Topic not found: ${topic.topic_title}`);
                continue;
            }
            topicRec.id = fallback[0].id;
        }

        // Format Markdown
        let markdown = `## Introduction\n${topic.content.introduction}\n\n`;
        for (const section of topic.content.sections) {
            markdown += `## ${section.title}\n${section.text}\n\n`;
        }
        markdown += `## Summary\n${topic.content.summary}\n\n---\n\n### 💡 Reflection Prompt\n*${topic.content.reflection_prompt}*`;

        const { error: updateError } = await supabase
            .from('lesson_content')
            .update({ body: markdown.trim() })
            .eq('topic_id', topicRec.id);

        if (updateError) {
            console.error(`Error updating ${topic.topic_title}:`, updateError.message);
        } else {
            console.log(`✅ Updated: ${topic.topic_title}`);
        }
    }
}

reImportModule2();
