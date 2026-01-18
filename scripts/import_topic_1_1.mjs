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
    "topic_id": "1.1",
    "topic_title": "Clayton Christensen Disruptive Innovation Framework",
    "role_in_course": "Prelude to Digital Transformation",
    "focus": "WHY",
    "estimated_word_count": 1000,
    "content": {
        "introduction": "Digital transformation did not begin with digital technologies. It began when the traditional rules that governed competition stopped working reliably. Clayton Christensen’s Disruptive Innovation Framework explains why well managed, successful firms often fail when new technologies and business models emerge. This framework provides the intellectual foundation for understanding why digital transformation became unavoidable for many industries.",
        "core_concept": "Disruptive innovation describes a process by which a new product or service starts by serving segments that are overlooked, ignored, or considered unattractive by established players, and then gradually moves upmarket to challenge incumbents. Unlike sustaining innovations, which improve performance along dimensions valued by existing customers, disruptive innovations initially underperform on those dimensions but offer different benefits such as simplicity, convenience, or lower cost.",
        "sustaining_vs_disruptive": "Sustaining innovations help incumbents improve what they already do well. They are predictable, aligned with existing customer demands, and supported by existing processes and incentives. Disruptive innovations, in contrast, create a mismatch with incumbent priorities. They often appear inferior at first and therefore do not attract serious attention from leading firms, even though they open the door to fundamentally different ways of creating and capturing value.",
        "types_of_disruption": {
            "low_end_disruption": "Low end disruption targets the least profitable or most price sensitive customers of incumbents. These customers are often overserved by existing solutions. Disruptors offer simpler and cheaper alternatives that are good enough for these segments. Over time, performance improves and the disruptor moves into the mainstream market.",
            "new_market_disruption": "New market disruption creates a market where none previously existed. It targets non consumers by offering solutions that are more accessible or easier to use. These innovations expand the overall market rather than stealing customers from incumbents initially."
        },
        "performance_trajectories": "A key insight of the framework is that technologies often improve faster than customer needs. Incumbents focus on high performance customers and continue improving their offerings, eventually overshooting what most customers actually require. This creates room for simpler solutions to gain acceptance, even if they appear inferior by traditional performance metrics.",
        "managerial_rationality": "Christensen’s most powerful contribution is showing that incumbents fail not because of poor management, but because of good management. Firms listen to their best customers, allocate resources to the most profitable opportunities, and focus on improving existing products. These rational decisions systematically bias firms against investing in disruptive innovations, which initially appear small, risky, and unprofitable.",
        "the_innovators_dilemma": "The innovator’s dilemma arises because firms cannot simultaneously optimize for current success and invest adequately in future disruptive paths using the same structures and incentives. Processes that make firms efficient and competitive in stable environments make them fragile in the face of disruption.",
        "implications_for_digital_era": "In the digital era, many technologies exhibit disruptive characteristics. Digital offerings often start by being cheaper, more accessible, or more convenient, and initially serve fringe or non traditional users. Over time, they improve rapidly and challenge incumbents across industries. Understanding this pattern is essential before studying digital platforms, customer centric innovation, or digital transformation strategies.",
        "summary": "Christensen’s framework explains why disruption is structural rather than accidental. It shows that traditional competitive advantage does not guarantee future success when the basis of competition changes. This insight sets the stage for understanding why firms must rethink business models, customer engagement, and organizational capabilities in the digital age.",
        "reflection_prompt": "If established firms fail because they do the right things too well, what must change in how firms think about strategy and innovation in a digital world?"
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

## Core Concept
${contentJson.content.core_concept}

## Sustaining vs. Disruptive Innovation
${contentJson.content.sustaining_vs_disruptive}

## Types of Disruption
### Low-End Disruption
${contentJson.content.types_of_disruption.low_end_disruption}

### New Market Disruption
${contentJson.content.types_of_disruption.new_market_disruption}

## Performance Trajectories
${contentJson.content.performance_trajectories}

## Managerial Rationality
${contentJson.content.managerial_rationality}

## The Innovator’s Dilemma
${contentJson.content.the_innovators_dilemma}

## Implications for the Digital Era
${contentJson.content.implications_for_digital_era}

## Summary
${contentJson.content.summary}

---

### 💡 Reflection Prompt
*${contentJson.content.reflection_prompt}*
`;

        // 4. Update the content (using upsert/update since structure already exists)
        const { error: contentError } = await supabase
            .from('lesson_content')
            .update({ body: markdownBody.trim() })
            .eq('topic_id', topicData.id);

        if (contentError) {
            throw contentError;
        }

        console.log(`✅ Successfully imported content for: ${contentJson.topic_title}`);
    } catch (err) {
        console.error('Import Error:', err);
    }
}

importTopicContent();
