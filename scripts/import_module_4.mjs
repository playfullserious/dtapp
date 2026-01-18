import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const moduleData = {
    "module_title": "Understanding Customers",
    "topics": [
        {
            "topic_title": "Customer Personas",
            "content": {
                "introduction": "Customer personas are structured representations of different types of customers that capture their goals, behaviors, constraints, and motivations. They are used to move beyond broad market segments and focus on how real customers think, decide, and act in specific contexts.",
                "why_personas_matter": "In digital settings, customers interact with products and services across multiple touchpoints over time. Personas help organizations adopt an outside-in perspective by grounding decisions in customer value rather than internal assumptions or organizational silos.",
                "digital_specificity": "Unlike traditional personas that are often static and demographic, digital personas emphasize behaviors, usage patterns, and contexts. They can evolve as new data becomes available, reflecting changing expectations and habits.",
                "summary": "Well-designed personas provide a shared reference point for teams, enabling more coherent design, prioritization, and experimentation around customer needs."
            }
        },
        {
            "topic_title": "Dropbox Case Study",
            "content": {
                "introduction": "The Dropbox case illustrates how digital innovation can begin with a clear articulation of customer value rather than a fully built product. The company focused on a simple but widespread problem, keeping files synchronized across devices, instead of emphasizing technical complexity.",
                "customer_value_framing": "Rather than describing features or architecture, Dropbox communicated its offering in terms of customer benefit, ease of use, reliability, and peace of mind. This framing allowed potential users to quickly grasp the value without needing technical knowledge.",
                "early_validation": "Before investing heavily in infrastructure, the idea was validated using simple demonstrations and early prototypes. These were used to test whether customers understood the value and were interested in the solution.",
                "summary": "The case shows that understanding and communicating customer value early can reduce risk and guide development more effectively than building complete solutions upfront."
            }
        },
        {
            "topic_title": "Customer Needs and Solution Formulation",
            "content": {
                "introduction": "Customer needs refer to the underlying problems or goals customers are trying to address, which are often different from the solutions they currently use. Identifying these needs requires looking beyond stated preferences to understand context and intent.",
                "separating_needs_and_solutions": "Customers often describe needs in terms of familiar products or processes. Effective innovation separates the problem from existing solutions, allowing alternative approaches to be explored.",
                "solution_as_hypothesis": "In digital innovation, solutions are best treated as hypotheses about how value will be created. Each proposed solution represents an assumption that must be tested with real users.",
                "summary": "Clear articulation of customer needs enables more flexible solution design and reduces the risk of building products that are technically sound but poorly aligned with customer value."
            }
        },
        {
            "topic_title": "Qualitative Approaches",
            "content": {
                "introduction": "Qualitative approaches aim to develop a deep understanding of customer behavior, motivations, and context. Methods such as interviews, observations, and journey mapping help uncover insights that are difficult to capture through numerical data alone.",
                "role_in_discovery": "These approaches are particularly valuable when exploring new or unfamiliar problem spaces. They help identify unmet needs, hidden frustrations, and emotional drivers of behavior.",
                "strengths_and_limits": "Qualitative methods provide rich, detailed insight but do not scale easily and are not designed for statistical generalization. Their primary role is exploration and hypothesis generation.",
                "summary": "Qualitative research grounds innovation efforts in real customer experiences, reducing reliance on internal assumptions and abstract reasoning."
            }
        },
        {
            "topic_title": "Quantitative Approaches",
            "content": {
                "introduction": "Quantitative approaches use data to measure customer behavior and identify patterns at scale. Digital interactions generate continuous data streams that reveal how customers actually use products and services.",
                "behavioral_focus": "These methods focus on observed behavior rather than stated opinions. Metrics such as usage frequency, drop-offs, and conversion rates provide insight into what customers value in practice.",
                "role_in_testing": "Quantitative analysis supports experimentation by enabling comparison between alternatives and tracking outcomes over time. It helps validate or reject assumptions formed during earlier exploration.",
                "summary": "Quantitative approaches transform customer understanding into an ongoing learning process rather than a one-time research activity."
            }
        },
        {
            "topic_title": "Minimum Viable Product Concept",
            "content": {
                "introduction": "A minimum viable product, or MVP, is the simplest version of a solution that allows an organization to test a value proposition with real customers. It is designed to generate learning rather than to deliver a complete or polished product.",
                "purpose_of_mvp": "The goal of an MVP is to validate key assumptions about customer needs and value quickly and at low cost. It focuses on what is necessary to learn, not on what is technically possible.",
                "risk_management": "By exposing ideas to customers early, MVPs reduce the risk of large investments based on untested assumptions. Feedback from early use informs future development decisions.",
                "summary": "MVPs enable faster learning cycles and support adaptive decision making in uncertain environments."
            }
        },
        {
            "topic_title": "Formation of Prototypes and MVP",
            "content": {
                "introduction": "Prototypes and MVPs represent stages in translating customer insights into tangible artifacts. Prototypes explore ideas, interactions, and flows, while MVPs test whether a solution delivers sufficient value in real use.",
                "iterative_development": "These artifacts are created and refined through iteration. Each version generates feedback that shapes subsequent design choices, priorities, and assumptions.",
                "role_of_customers": "Customers play an active role in this process through their behavior and feedback. Their responses guide refinement more effectively than internal evaluation alone.",
                "summary": "The systematic formation of prototypes and MVPs operationalizes customer understanding, turning insight into continuous learning and improvement."
            }
        }
    ]
};

function formatKey(key) {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function importModule4() {
    console.log("🚀 Starting Module 4 Import...");

    const { data: moduleDb, error: mError } = await supabase
        .from('modules')
        .select('id')
        .ilike('title', `%${moduleData.module_title}%`)
        .single();

    if (mError || !moduleDb) { console.error("Module 4 not found"); return; }

    for (const topic of moduleData.topics) {
        const { data: topicRec, error: tError } = await supabase
            .from('topics')
            .select('id')
            .eq('module_id', moduleDb.id)
            .ilike('title', `%${topic.topic_title}%`)
            .single();

        if (tError || !topicRec) {
            console.log(`❌ Topic not found in DB: ${topic.topic_title}`);
            continue;
        }

        let markdown = "";
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

importModule4();
