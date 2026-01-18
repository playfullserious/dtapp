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
                "introduction": "Two sided platform mediated networks represent a clear break from traditional pipeline businesses. In pipeline models, firms create value internally through production and then push it downstream to customers. In contrast, platforms do not primarily create value themselves. Instead, they enable interactions between distinct groups of users who need each other in order to derive value. The platform becomes valuable only to the extent that it successfully brings these groups together and facilitates meaningful exchanges between them.",
                "sections": [
                    { "title": "Basic Structure", "text": "A two sided platform consists of an intermediary that connects two or more interdependent participant groups such as buyers and sellers, drivers and riders, or developers and users. Each group is attracted to the platform because the presence of the other group increases its own value. Without the platform, these groups would face high search costs, coordination difficulties, and transaction friction. The platform reduces these frictions by centralizing access and standardizing interaction mechanisms." },
                    { "title": "Role of the Platform", "text": "The platform’s primary role is to reduce friction in interactions rather than to produce outputs. It provides the technical infrastructure that enables matching, communication, and transactions, along with rules and standards that govern participation. By setting these rules, the platform shapes how value is created and captured across participants. Importantly, the platform typically does not own the assets being exchanged, yet it plays a central role in orchestrating how those assets are utilized." },
                    { "title": "Network Effects", "text": "Network effects are central to how platforms create and scale value. Direct network effects occur when the value to a participant increases as more users of the same type join the platform, such as more users joining a social network. Indirect network effects occur when growth on one side of the platform increases value for users on the other side, such as more sellers attracting more buyers. Strong indirect network effects are a defining feature of two sided platforms and are a major source of competitive advantage once scale is achieved." },
                    { "title": "Pricing Logic", "text": "Because participation on both sides is essential, platform pricing is rarely neutral. One side is often subsidized or offered free access to encourage rapid adoption and participation. The other side is monetized once sufficient interaction value is created. These pricing decisions are strategic rather than purely financial, and they are designed to accelerate network effects and reach critical mass rather than maximize short term profitability." }
                ],
                "summary": "Two sided platforms create value by enabling, governing, and scaling interactions between interdependent user groups. Their structural reliance on network effects and asymmetric pricing differentiates them sharply from traditional business models.",
                "reflection_prompt": "Why does owning assets matter less for platforms than for traditional firms, even in capital intensive industries?"
            }
        },
        {
            "topic_title": "Challenges in Two Sided Networks",
            "content": {
                "introduction": "While two sided platforms offer strong growth potential, they also face challenges that are structurally different from those of traditional businesses. These challenges arise because value creation depends on the simultaneous participation of multiple user groups and the strength of network effects between them.",
                "sections": [
                    { "title": "Chicken and Egg Problem", "text": "The most fundamental challenge in two sided networks is the chicken and egg problem. Each user group is reluctant to join unless the other group is already present and active. This makes early stage platform launch particularly difficult. Platforms must use deliberate strategies such as subsidies, exclusivity, or targeted seeding to overcome this initial coordination failure." },
                    { "title": "Critical Mass", "text": "Even after launch, platforms must reach and sustain critical mass on both sides. If one side grows significantly faster than the other, interaction quality declines and perceived value drops. Without sufficient activity, network effects remain weak and users may disengage. Achieving balance is therefore as important as achieving scale." },
                    { "title": "Value Imbalance", "text": "Different sides of a platform often perceive value in different ways. What benefits one group may impose costs on the other. Platforms must continuously manage pricing, features, and rules to ensure that neither side feels exploited or ignored. Failure to manage this balance can trigger rapid erosion of participation." },
                    { "title": "Trust and Quality", "text": "As platforms scale, maintaining trust and quality becomes increasingly complex. Low quality participants, misinformation, fraud, or misuse can reduce the value of interactions for all users. Platforms therefore invest heavily in reputation systems, verification processes, and monitoring mechanisms to preserve trust and sustain engagement." },
                    { "title": "Disintermediation Risk", "text": "Successful platforms also face the risk of disintermediation. Once users find each other through the platform, they may attempt to bypass it and transact directly. To reduce this risk, platforms must continue to add value beyond initial matching, such as dispute resolution, guarantees, analytics, or ongoing engagement features." }
                ],
                "summary": "The success of two sided platforms depends not only on growth but on the ability to manage coordination, balance incentives, maintain trust, and enforce governance as scale increases.",
                "reflection_prompt": "Which challenge becomes more critical as platforms scale, growth or governance, and why?"
            }
        },
        {
            "topic_title": "Envelopment Strategy in Platform Mediated Networked Markets",
            "content": {
                "introduction": "As platforms mature, competition increasingly shifts away from individual products toward competition between ecosystems. Envelopment is a key strategy platforms use to expand their influence, defend their position, and reshape market boundaries.",
                "sections": [
                    { "title": "Meaning of Envelopment", "text": "Envelopment occurs when a platform enters an adjacent market by leveraging its existing user base, shared functionality, or accumulated data. Instead of entering as a standalone competitor, the platform bundles the new service with its existing offering. This allows it to attract users more quickly than a new entrant starting from scratch." },
                    { "title": "Conditions for Envelopment", "text": "Envelopment is most effective when platforms share common users, complementary services, or similar interaction structures. User overlap and functional overlap reduce the effort required for adoption in the adjacent market. These conditions lower switching costs and weaken incumbent competitors in the new domain." },
                    { "title": "Role of Network Effects", "text": "Existing network effects play a critical role in enabling envelopment. Users who are already active on the core platform are more likely to adopt bundled services, accelerating growth in the adjacent market. This allows platforms to scale new offerings rapidly and establish dominance before competitors can respond." },
                    { "title": "Defensive and Offensive Use", "text": "Envelopment can serve both defensive and offensive purposes. Defensively, it prevents competitors from encroaching on the platform’s core market. Offensively, it allows platforms to capture new value pools and expand their ecosystem footprint. Over time, repeated envelopment can significantly broaden platform scope." },
                    { "title": "Competitive Implications", "text": "Envelopment blurs traditional industry boundaries and changes how competition should be understood. Firms may find themselves competing with platforms originating in entirely different industries, unified by shared users, data, or interaction logic." }
                ],
                "summary": "Envelopment enables platforms to grow by extending existing ecosystems into adjacent markets, reinforcing network effects and reshaping competitive landscapes.",
                "reflection_prompt": "How does envelopment change the way firms should define their competitors in digital markets?"
            }
        }
    ]
};

async function finalReImportModule2() {
    console.log("🚀 Starting Final Module 2 Re-Import...");

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
            console.log(`Topic not found, searching by prefix: ${topic.topic_title}`);
            continue;
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

finalReImportModule2();
