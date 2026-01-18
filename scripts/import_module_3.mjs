import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const moduleData = {
    "module_title": "Sharing Economy and Merchant Model",
    "topics": [
        {
            "topic_title": "Merchant Model",
            "content": {
                "introduction": "The merchant model represents one of the earliest and most widely adopted digital business models. In this model, the firm acts as a seller of goods or services, purchasing or producing inventory and reselling it to customers through digital channels. While the delivery mechanism is digital, the underlying logic closely resembles traditional retail.",
                "sections": [
                    { "title": "Core Structure", "text": "In the merchant model, the firm owns or controls inventory and sets prices for customers. Revenue is generated through the margin between procurement cost and selling price. Digital technologies primarily enhance reach, speed, and efficiency rather than fundamentally altering the structure of value creation." },
                    { "title": "Role of Digital Technology", "text": "Digital platforms reduce search costs for customers, enable dynamic pricing, and support efficient logistics and fulfillment. Data collected from customer interactions allows merchants to optimize assortment, pricing, and promotions. However, value creation remains centered on buying and selling goods." },
                    { "title": "Scalability and Constraints", "text": "Merchant models scale by expanding inventory, supplier relationships, and fulfillment capacity. This makes them more asset intensive than platform models. Growth is constrained by working capital, logistics complexity, and inventory risk." },
                    { "title": "Competitive Dynamics", "text": "Competition in merchant models is driven by price, assortment, convenience, and operational efficiency. Digital capabilities improve performance but do not eliminate traditional retail trade-offs." }
                ],
                "summary": "The merchant model digitizes traditional retail logic without fundamentally changing ownership or control of goods. It illustrates how digital transformation can enhance efficiency without fully reconfiguring value creation.",
                "reflection_prompt": "Why does the merchant model benefit from digital technologies without becoming a true platform model?"
            }
        },
        {
            "topic_title": "Sharing Economy",
            "content": {
                "introduction": "The sharing economy represents a shift from ownership based consumption to access based consumption. Digital platforms enable individuals or organizations to share underutilized assets or capabilities with others, creating new forms of value without requiring traditional asset ownership by the platform.",
                "sections": [
                    { "title": "Basic Logic", "text": "In the sharing economy, platforms connect asset owners with users who seek temporary access. The platform does not typically own the assets being shared. Instead, it facilitates discovery, trust, and transactions between participants." },
                    { "title": "Role of Trust and Reputation", "text": "Trust is central to the sharing economy. Reputation systems, ratings, reviews, and verification mechanisms reduce perceived risk and enable strangers to transact. Without these mechanisms, participation and scale would be limited." },
                    { "title": "Economic Implications", "text": "Sharing economy models unlock latent capacity in assets such as homes, vehicles, or skills. This increases utilization rates and lowers costs for users. For providers, it creates new income opportunities from existing assets." },
                    { "title": "Regulatory and Social Challenges", "text": "Sharing economy platforms often challenge existing regulations designed for traditional industries. Issues related to labor classification, safety, taxation, and local regulations frequently arise as these models scale." }
                ],
                "summary": "The sharing economy uses digital platforms to convert idle assets into economic value by enabling access rather than ownership, fundamentally changing how consumption and work are organized.",
                "reflection_prompt": "What risks increase when value creation depends on assets owned by users rather than by firms?"
            }
        },
        {
            "topic_title": "Ecommerce",
            "content": {
                "introduction": "Ecommerce refers to the buying and selling of goods and services through digital channels. While it overlaps with merchant and platform models, ecommerce is best understood as a distribution and transaction channel rather than a standalone business model.",
                "sections": [
                    { "title": "Forms of Ecommerce", "text": "Ecommerce can support multiple business models including merchant models, marketplaces, subscriptions, and direct to consumer brands. The defining feature is the digital interface through which transactions occur." },
                    { "title": "Value Creation Mechanisms", "text": "Ecommerce creates value by increasing convenience, expanding choice, and reducing transaction friction. Customers benefit from easy comparison, faster discovery, and home delivery. Firms benefit from broader reach and data driven insights." },
                    { "title": "Data and Personalization", "text": "Digital commerce generates rich data on customer behavior. This data enables personalization of recommendations, pricing, and promotions, increasing conversion and customer lifetime value." },
                    { "title": "Limitations and Tradeoffs", "text": "Despite its advantages, ecommerce faces challenges such as logistics costs, returns management, and last mile delivery complexity. These constraints shape profitability and competitive strategy." }
                ],
                "summary": "Ecommerce digitizes the transaction and distribution layer of commerce, enabling multiple underlying business models while reshaping customer expectations around convenience and choice.",
                "reflection_prompt": "Why is ecommerce better viewed as an enabler of business models rather than a business model itself?"
            }
        },
        {
            "topic_title": "Online and Offline Business Comparison",
            "content": {
                "introduction": "Comparing online and offline businesses highlights how digital technologies alter cost structures, customer interactions, and scalability. While the core economic objectives remain similar, the mechanisms through which value is created and delivered differ significantly.",
                "sections": [
                    { "title": "Cost Structures", "text": "Offline businesses are often asset heavy with high fixed costs related to physical infrastructure. Online businesses typically operate with lower fixed costs and higher variable costs related to technology, logistics, and customer acquisition." },
                    { "title": "Customer Interaction", "text": "Offline businesses rely on physical presence and human interaction, limiting scale but enabling rich experiential engagement. Online businesses interact through digital interfaces, allowing scale and personalization but reducing physical touchpoints." },
                    { "title": "Scalability", "text": "Online models scale more rapidly due to lower marginal costs of expansion. Offline models scale more slowly as they require physical replication of assets and locations." },
                    { "title": "Hybrid Models", "text": "Many firms adopt hybrid models that combine online and offline elements. These models seek to balance efficiency, reach, and experience by integrating digital and physical channels." }
                ],
                "summary": "Online and offline businesses differ in cost structures, scalability, and customer interaction modes. Digital transformation increasingly involves integrating the strengths of both rather than choosing one over the other.",
                "reflection_prompt": "Which aspects of value creation are strengthened by physical presence, and which are enhanced by digital channels?"
            }
        }
    ]
};

async function importModule3() {
    console.log("🚀 Starting Module 3 Import...");

    const { data: moduleDataFromDb, error: mError } = await supabase
        .from('modules')
        .select('id')
        .ilike('title', `%${moduleData.module_title}%`)
        .single();

    if (mError || !moduleDataFromDb) { console.error("Module 3 not found in DB"); return; }

    for (const topic of moduleData.topics) {
        const { data: topicRec, error: tError } = await supabase
            .from('topics')
            .select('id')
            .eq('module_id', moduleDataFromDb.id)
            .ilike('title', `%${topic.topic_title}%`)
            .single();

        if (tError || !topicRec) {
            console.log(`❌ Topic not found: ${topic.topic_title}`);
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

importModule3();
