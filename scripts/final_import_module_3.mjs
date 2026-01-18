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
                "introduction": "The merchant model is one of the most familiar and historically dominant business models in commerce. In this model, a firm creates value by purchasing or producing goods and reselling them to customers at a markup. Digital technologies have significantly enhanced the reach and efficiency of merchant models, but they have not fundamentally altered the underlying logic of value creation, which remains centered on ownership and resale of inventory.",
                "core_structure": "In the merchant model, the firm owns or controls inventory and bears the associated risks related to demand uncertainty, storage, and obsolescence. Prices are set by the firm, and revenue is generated through the margin between procurement cost and selling price. This structure closely mirrors traditional retail, even when transactions occur through digital channels.",
                "role_of_digital_technology": "Digital technologies improve the performance of merchant models by reducing search costs for customers, enabling broader assortment visibility, and supporting dynamic pricing and promotions. Data from customer interactions allows merchants to refine demand forecasting, optimize inventory levels, and personalize marketing, improving operational efficiency rather than redefining the business model.",
                "scalability_and_constraints": "Merchant models scale by expanding supplier relationships, inventory capacity, and fulfillment infrastructure. This makes them relatively asset intensive and capital constrained. Growth is limited by working capital requirements, logistics complexity, and the firm’s ability to manage inventory risk at scale.",
                "competitive_dynamics": "Competition in merchant models is driven by price, assortment, convenience, and execution excellence. Digital capabilities can improve competitiveness, but firms still face traditional trade-offs related to cost control, margins, and service levels.",
                "summary": "The merchant model uses digital technologies to enhance traditional buying and selling logic. While digital channels improve efficiency and reach, value creation remains rooted in inventory ownership and margin management."
            }
        },
        {
            "topic_title": "Sharing Economy",
            "content": {
                "introduction": "The sharing economy represents a shift from ownership based consumption to access based consumption. Digital platforms enable individuals or organizations to share underutilized assets or capabilities with others, creating new forms of value without requiring the platform itself to own those assets.",
                "basic_logic": "In the sharing economy, platforms connect asset owners with users who seek temporary access rather than permanent ownership. The platform facilitates discovery, matching, and transactions, while asset ownership remains distributed among participants. This logic allows value to be created from resources that would otherwise remain idle.",
                "role_of_trust_and_reputation": "Trust is central to the functioning of sharing economy models. Participants often transact with strangers, which introduces perceived risk. Reputation systems, ratings, reviews, and verification mechanisms reduce uncertainty and enable repeated interactions, making large scale participation possible.",
                "economic_implications": "Sharing economy models increase asset utilization and lower costs for users by spreading fixed costs across many transactions. For asset owners, these models create additional income streams from existing resources. At a system level, they can alter labor patterns, pricing structures, and market entry barriers.",
                "regulatory_and_social_challenges": "As sharing economy platforms scale, they frequently clash with regulations designed for traditional industries. Issues related to labor classification, safety standards, taxation, and local compliance become prominent, shaping both public perception and long term viability.",
                "summary": "The sharing economy uses digital platforms to transform idle assets into economic value by enabling access instead of ownership, fundamentally changing how consumption and work are organized."
            }
        },
        {
            "topic_title": "Ecommerce",
            "content": {
                "introduction": "Ecommerce refers to the buying and selling of goods and services through digital channels. Rather than being a single business model, ecommerce functions as a transaction and distribution layer that can support multiple underlying business models.",
                "forms_of_ecommerce": "Ecommerce can enable merchant models, marketplaces, subscription services, and direct to consumer brands. What unifies these forms is the use of digital interfaces for discovery, ordering, payment, and post purchase interaction.",
                "value_creation_mechanisms": "Ecommerce creates value by improving convenience, expanding choice, and reducing transaction friction. Customers benefit from easy comparison, broader selection, and home delivery, while firms gain access to wider markets without physical presence.",
                "data_and_personalization": "Digital commerce generates detailed data on customer behavior, preferences, and purchasing patterns. This data enables personalization of recommendations, targeted promotions, and pricing optimization, improving conversion rates and customer lifetime value.",
                "limitations_and_tradeoffs": "Despite its advantages, ecommerce faces challenges related to logistics costs, returns management, customer acquisition expenses, and last mile delivery complexity. These constraints strongly influence profitability and competitive strategy.",
                "summary": "Ecommerce digitizes the transaction and distribution layer of commerce, enabling diverse business models while reshaping customer expectations around convenience, speed, and choice."
            }
        },
        {
            "topic_title": "Online and Offline Business Comparison",
            "content": {
                "introduction": "Comparing online and offline businesses highlights how digital technologies alter the economics of value creation and delivery. While the fundamental goal of serving customers remains constant, the mechanisms through which firms operate differ significantly.",
                "cost_structures": "Offline businesses are typically asset heavy, with high fixed costs related to physical locations and infrastructure. Online businesses often operate with lower fixed costs but higher variable costs related to technology, logistics, and customer acquisition.",
                "customer_interaction": "Offline businesses rely on physical presence and human interaction, enabling rich experiential engagement but limiting scale. Online businesses interact through digital interfaces, allowing personalization and reach at scale while reducing physical touchpoints.",
                "scalability_and_learning": "Online models scale more rapidly due to lower marginal costs and faster feedback loops enabled by data. Offline models scale more slowly, as expansion requires physical replication of assets and locations.",
                "hybrid_models": "Many firms adopt hybrid models that combine online and offline elements. These models seek to balance efficiency, data driven learning, and experiential engagement by integrating digital and physical channels.",
                "summary": "Online and offline businesses differ in cost structures, scalability, and learning speed. Digital transformation increasingly involves integrating the strengths of both rather than choosing one exclusively."
            }
        }
    ]
};

function formatKey(key) {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function finalImportModule3() {
    console.log("🚀 Starting Final Module 3 Replacement...");

    const { data: moduleDataFromDb, error: mError } = await supabase
        .from('modules')
        .select('id')
        .ilike('title', `%${moduleData.module_title}%`)
        .single();

    if (mError || !moduleDataFromDb) { console.error("Module 3 not found"); return; }

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
        let markdown = "";

        // Sort keys to ensure Introduction is first and Summary is last
        const keys = Object.keys(topic.content);

        if (topic.content.introduction) {
            markdown += `## Introduction\n${topic.content.introduction}\n\n`;
        }

        for (const key of keys) {
            if (key === 'introduction' || key === 'summary') continue;
            markdown += `## ${formatKey(key)}\n${topic.content[key]}\n\n`;
        }

        if (topic.content.summary) {
            markdown += `## Summary\n${topic.content.summary}\n\n`;
        }

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

finalImportModule3();
