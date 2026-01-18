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

const contentJson = {
    "course_title": "Digital Transformation",
    "module_id": 1,
    "module_title": "Technology Led Disruption",
    "topic_id": "1.2",
    "topic_title": "Impact of Technology Led Disruption on Industries",
    "role_in_course": "Prelude to Digital Transformation",
    "focus": "WHY",
    "content": {
        "introduction": "Technology led disruption is not just about individual firms winning or losing. It reshapes entire industries. New technologies change how value is created, delivered, and captured, altering the underlying economics of industries. Understanding these industry level impacts helps explain why digital transformation became unavoidable for many established firms.",
        "industry_economics_shift": "Digital technologies dramatically change industry economics by reducing the cost of information, coordination, and transactions. Computing, storage, and connectivity become cheaper and more scalable. As a result, activities that once required large investments and physical assets can now be performed digitally at much lower cost, changing who can compete and how.",
        "entry_barriers": "One of the most visible impacts of technology led disruption is the lowering of entry barriers. New entrants no longer need to own physical infrastructure or distribution networks to reach customers. Digital channels allow firms to access markets quickly and at scale, increasing competition and putting pressure on incumbent business models.",
        "cost_structures": "Technology led disruption often changes cost structures from fixed and asset heavy to variable and asset light. Marginal costs fall sharply, especially for digital products and services. This allows new entrants to experiment, scale selectively, and operate profitably at price points that incumbents find unattractive or unsustainable.",
        "value_chain_changes": "Disruption frequently alters traditional value chains. Activities may be unbundled, automated, or shifted to new players. Intermediaries can be removed, while new intermediaries such as digital platforms may emerge. Control over customer relationships often moves away from traditional incumbents to digital players who own data and interfaces.",
        "industry_boundaries": "Digital technologies blur industry boundaries. Firms from one industry can enter another by leveraging shared technologies, data, or customer bases. This leads to competition from unexpected directions and makes traditional industry definitions less useful for strategic analysis.",
        "repeating_patterns": "Across industries, similar disruption patterns can be observed. Disruption often starts at the low end or among non consumers, improves rapidly, and then moves into the core market. Incumbents tend to respond late because early signals appear weak or irrelevant when viewed through existing performance metrics.",
        "implications_for_firms": "At the industry level, these shifts mean that competitive advantage becomes less durable. Firms can no longer rely solely on scale, efficiency, or historical position. They must continuously reassess how technology is reshaping their industry and whether their current business models remain viable.",
        "link_to_digital_transformation": "The cumulative impact of these industry level changes creates the conditions for digital transformation. When industry structures, value chains, and competitive dynamics change, incremental improvements are no longer sufficient. Firms are forced to rethink strategy, organization, and capabilities, setting the stage for digital transformation initiatives.",
        "summary": "Technology led disruption reshapes industries by lowering entry barriers, changing cost structures, and redefining value chains and boundaries. These changes explain why digital transformation is not a choice driven by fashion, but a strategic response to fundamental shifts in industry dynamics.",
        "reflection_prompt": "If industry boundaries and cost structures are shifting due to technology, how should firms rethink who their real competitors are?"
    }
};

async function importTopicContent() {
    try {
        // 1. Find the module ID
        const { data: moduleData, error: moduleError } = await supabase
            .from('modules')
            .select('id')
            .ilike('title', `%${contentJson.module_title}%`)
            .single();

        if (moduleError || !moduleData) {
            console.error('Module not found:', contentJson.module_title);
            return;
        }

        // 2. Find the topic ID within that module
        const { data: topicData, error: topicError } = await supabase
            .from('topics')
            .select('id')
            .eq('module_id', moduleData.id)
            .ilike('title', `%${contentJson.topic_title}%`)
            .single();

        if (topicError || !topicData) {
            console.error('Topic not found:', contentJson.topic_title);
            return;
        }

        // 3. Format the content into Markdown
        const markdownBody = `
## Introduction
${contentJson.content.introduction}

## Industry Economics Shift
${contentJson.content.industry_economics_shift}

## Lowering Entry Barriers
${contentJson.content.entry_barriers}

## Changing Cost Structures
${contentJson.content.cost_structures}

## Value Chain Transformations
${contentJson.content.value_chain_changes}

## Blurring Industry Boundaries
${contentJson.content.industry_boundaries}

## Repeating Patterns of Disruption
${contentJson.content.repeating_patterns}

## Implications for the Firm
${contentJson.content.implications_for_firms}

## The Link to Digital Transformation
${contentJson.content.link_to_digital_transformation}

## Summary
${contentJson.content.summary}

---

### 💡 Reflection Prompt
*${contentJson.content.reflection_prompt}*
`;

        // 4. Update the content
        const { error: contentError } = await supabase
            .from('lesson_content')
            .update({ body: markdownBody.trim() })
            .eq('topic_id', topicData.id);

        if (contentError) {
            throw contentError;
        }

        console.log(`✅ Successfully imported content for Topic 1.2: ${contentJson.topic_title}`);
    } catch (err) {
        console.error('Import Error:', err);
    }
}

importTopicContent();
