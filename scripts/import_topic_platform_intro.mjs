import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const moduleId = "6fad22ca-2e63-41d1-8769-3eb02d6be8dc"; // Module 2 ID

const topicData = {
    "topic_title": "What Is a Platform?",
    "purpose": "Establish a clear and narrow definition of a platform without overlapping with platform structure, challenges, or competitive strategies covered elsewhere.",
    "definition": "A platform is a business model that enables direct interactions and value exchange between two or more distinct user groups.",
    "qualification_criteria": [
        "At least two distinct user groups are involved",
        "Interactions between these groups are central to value creation",
        "The firm facilitates interactions rather than producing all value",
        "Participation on one side increases value for the other"
    ],
    "exclusions": [
        "A one-sided business serving a single customer group",
        "A digital product or service without cross-group interaction",
        "A technology or software layer by itself"
    ],
    "simple_intuition": [
        "Pipelines produce and sell",
        "Platforms connect and enable exchange"
    ],
    "minimal_examples": {
        "platforms": [
            "A marketplace connecting buyers and sellers",
            "A media business connecting users and advertisers"
        ],
        "not_platforms": [
            "Standalone SaaS sold to end users",
            "Traditional retailer selling owned inventory"
        ]
    },
    "boundary_rule": "If there is no interaction between distinct user groups, the business is not a platform.",
    "one_line_takeaway": "A platform is defined by who interacts with whom, not by the technology used."
};

async function importTopic21() {
    console.log("🚀 Importing Topic 2.1 (What Is a Platform?)...");

    // 1. Shift existing topics' order_index if they start from 0/1/etc.
    // Actually, I'll just set this to 0 and re-sequence all topics in this module.

    // 2. Upsert the new topic
    let topic;
    const { data: existingTopic } = await supabase
        .from('topics')
        .select('id')
        .eq('module_id', moduleId)
        .eq('title', topicData.topic_title)
        .single();

    if (existingTopic) {
        console.log("Topic exists, updating order...");
        const { data: updatedTopic } = await supabase
            .from('topics')
            .update({ order_index: 0 })
            .eq('id', existingTopic.id)
            .select()
            .single();
        topic = updatedTopic;
    } else {
        console.log("Creating new topic...");
        const { data: newTopic } = await supabase
            .from('topics')
            .insert({
                module_id: moduleId,
                title: topicData.topic_title,
                order_index: 0
            })
            .select()
            .single();
        topic = newTopic;
    }

    // 3. Re-sequence other topics
    const { data: otherTopics } = await supabase
        .from('topics')
        .select('id, title, order_index')
        .eq('module_id', moduleId)
        .neq('id', topic.id)
        .order('order_index', { ascending: true });

    if (otherTopics) {
        for (let i = 0; i < otherTopics.length; i++) {
            await supabase
                .from('topics')
                .update({ order_index: i + 1 })
                .eq('id', otherTopics[i].id);
        }
        console.log("✅ Re-sequenced other topics.");
    }

    // 4. Format Markdown
    let markdown = `**Purpose:** ${topicData.purpose}\n\n`;
    markdown += `## Definition\n${topicData.definition}\n\n`;

    markdown += `## Qualification Criteria\n`;
    topicData.qualification_criteria.forEach(item => {
        markdown += `- ${item}\n`;
    });
    markdown += `\n`;

    markdown += `## Exclusions\n`;
    topicData.exclusions.forEach(item => {
        markdown += `- ${item}\n`;
    });
    markdown += `\n`;

    markdown += `## Simple Intuition\n`;
    topicData.simple_intuition.forEach(item => {
        markdown += `- ${item}\n`;
    });
    markdown += `\n`;

    markdown += `## Minimal Examples\n`;
    markdown += `**What counts as a platform:**\n`;
    topicData.minimal_examples.platforms.forEach(item => {
        markdown += `- ${item}\n`;
    });
    markdown += `\n**What does NOT count:**\n`;
    topicData.minimal_examples.not_platforms.forEach(item => {
        markdown += `- ${item}\n`;
    });
    markdown += `\n`;

    markdown += `## Boundary Rule\n**${topicData.boundary_rule}**\n\n`;

    markdown += `## Summary\n> ${topicData.one_line_takeaway}\n\n`;

    markdown += `---\n\n### 💡 Reflection Prompt\n*Can you think of a company that is currently a pipeline but is perfectly positioned to become a platform? What distinct user groups would it need to connect?*`;

    // 5. Upsert content
    const { data: existingContent } = await supabase
        .from('lesson_content')
        .select('id')
        .eq('topic_id', topic.id)
        .single();

    if (existingContent) {
        await supabase
            .from('lesson_content')
            .update({
                body: markdown.trim(),
                content_type: 'markdown'
            })
            .eq('id', existingContent.id);
    } else {
        await supabase
            .from('lesson_content')
            .insert({
                topic_id: topic.id,
                body: markdown.trim(),
                content_type: 'markdown',
                order_index: 0
            });
    }

    console.log("✅ Topic 2.1 imported successfully as the first topic!");
}

importTopic21();
