import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const moduleData = {
    "title": "Module 0: Before Digital Transformation Had a Name",
    "description": "Digital Transformation did not happen in one step. It emerged over time through a series of technological, economic, and behavioral shifts. Understanding this evolution helps explain why many organizations still struggle with Digital Transformation today, why legacy systems persist, why culture and structure matter as much as technology, and why transformation often feels harder than expected. This module traces the major stages that quietly reshaped how firms operate, compete, and make decisions, eventually making Digital Transformation unavoidable.",
    "topic_title": "The Cumulative Evolution of Digital Capabilities",
    "timeline": [
        {
            "period": "Pre-1990s",
            "stage_title": "Enterprise IT as Controlled Infrastructure",
            "events": [
                "Mainframes and client-server systems dominate",
                "IT owned, operated, and controlled within firm boundaries",
                "High capital costs and long planning cycles",
                "Technology viewed primarily as automation and cost control"
            ],
            "managerial_view": [
                "IT is a support function",
                "Business strategy and IT strategy are largely separate"
            ]
        },
        {
            "period": "Early–Mid 1990s",
            "stage_title": "PCs and Internet Access Spread",
            "events": [
                "Rapid fall in PC prices increases household adoption",
                "Dial-up internet expands access beyond corporations",
                "TCP/IP standardizes global connectivity"
            ],
            "managerial_view": [
                "Individuals experience technology outside work",
                "Early gap emerges between consumer and enterprise technology"
            ]
        },
        {
            "period": "1997–1999",
            "stage_title": "Y2K and Remote Connectivity",
            "events": [
                "Y2K remediation exposes dependence on software systems",
                "Large-scale audits of legacy applications",
                "VPNs and remote access technologies adopted widely",
                "Global coordination of distributed IT teams"
            ],
            "managerial_view": [
                "IT recognized as business-critical",
                "Comfort with remote access and distributed work increases"
            ]
        },
        {
            "period": "1999–2000",
            "stage_title": "Dot-com Boom and App Proliferation",
            "events": [
                "Explosion of web-based applications",
                "Browser becomes a universal access layer",
                "Early e-commerce platforms emerge"
            ],
            "managerial_view": [
                "Speed and growth prioritized over process",
                "First exposure to digital business models"
            ]
        },
        {
            "period": "2000–2002",
            "stage_title": "Dot-com Crash and Digital Realism",
            "events": [
                "Collapse of speculative internet firms",
                "Survivors demonstrate scalable digital economics"
            ],
            "managerial_view": [
                "Digital seen as powerful but risky",
                "Greater focus on economics and sustainability"
            ]
        },
        {
            "period": "2001–2005",
            "stage_title": "Globalization and Distributed Operations",
            "events": [
                "Post-9/11 volatility and geopolitical uncertainty",
                "Rapid growth of offshoring and outsourcing",
                "China’s integration into global trade accelerates competition"
            ],
            "managerial_view": [
                "Cost efficiency becomes dominant objective",
                "Connectivity, process standardization, and global labor reinforce each other"
            ]
        },
        {
            "period": "2005–2008",
            "stage_title": "Search, Platforms, and Buying Behavior Shift",
            "events": [
                "Search engines become primary discovery tools",
                "Consumers research and compare before buying",
                "APIs and service-oriented architectures mature"
            ],
            "managerial_view": [
                "Firms lose control over customer attention",
                "Marketing and sales begin shifting to digital channels"
            ]
        },
        {
            "period": "2008–2010",
            "stage_title": "Financial Crisis and Cloud Inflection",
            "events": [
                "Global financial crisis constrains capital spending",
                "Cloud computing gains credibility",
                "Virtualization becomes mainstream"
            ],
            "managerial_view": [
                "Preference shifts from owning to renting IT",
                "Agility and flexibility valued over scale investments"
            ]
        },
        {
            "period": "2010–2013",
            "stage_title": "Mobile, Cloud, and Data Scale Together",
            "events": [
                "Smartphones become primary computing devices",
                "Cloud platforms mature",
                "Data volumes grow rapidly across all interactions"
            ],
            "managerial_view": [
                "Multiple digital capabilities begin reinforcing each other",
                "Front-end experience increasingly tied to back-end systems"
            ]
        },
        {
            "period": "2013–2015",
            "stage_title": "Digital Becomes Strategic",
            "events": [
                "Platforms and ecosystems dominate leading firms",
                "Agile and analytics embedded into operations",
                "Technology decisions reshape business models"
            ],
            "managerial_view": [
                "Digital Transformation enters the mainstream",
                "Business strategy and technology strategy converge"
            ]
        }
    ],
    "closing_note": "What began as isolated technology adoption gradually evolved into interconnected digital capabilities. Digital Transformation emerged not as a choice, but as a response to accumulated changes in technology, customer behavior, and competitive dynamics. Many of today’s transformation challenges can be traced back to this layered evolution."
};

async function importModule0() {
    console.log("🚀 Importing Module 0...");

    // 1. Module
    let module;
    const { data: existingModule } = await supabase
        .from('modules')
        .select('id')
        .eq('title', moduleData.title)
        .single();

    if (existingModule) {
        console.log("Module exists, updating...");
        const { data: updatedModule } = await supabase
            .from('modules')
            .update({
                description: moduleData.description,
                order_index: 0
            })
            .eq('id', existingModule.id)
            .select()
            .single();
        module = updatedModule;
    } else {
        console.log("Creating new module...");
        const { data: newModule } = await supabase
            .from('modules')
            .insert({
                title: moduleData.title,
                description: moduleData.description,
                order_index: 0
            })
            .select()
            .single();
        module = newModule;
    }

    if (!module) {
        console.error("Failed to get/create module");
        return;
    }

    // 2. Topic
    let topic;
    const { data: existingTopic } = await supabase
        .from('topics')
        .select('id')
        .eq('module_id', module.id)
        .eq('title', moduleData.topic_title)
        .single();

    if (existingTopic) {
        console.log("Topic exists, updating...");
        const { data: updatedTopic } = await supabase
            .from('topics')
            .update({
                order_index: 0
            })
            .eq('id', existingTopic.id)
            .select()
            .single();
        topic = updatedTopic;
    } else {
        console.log("Creating new topic...");
        const { data: newTopic } = await supabase
            .from('topics')
            .insert({
                module_id: module.id,
                title: moduleData.topic_title,
                order_index: 0
            })
            .select()
            .single();
        topic = newTopic;
    }

    // 3. Format Markdown Content
    let markdown = `## Introduction\n${moduleData.description}\n\n`;

    moduleData.timeline.forEach(stage => {
        markdown += `### ${stage.period}: ${stage.stage_title}\n`;
        markdown += `**Key Events:**\n`;
        stage.events.forEach(event => {
            markdown += `- ${event}\n`;
        });
        markdown += `\n**Managerial View:**\n`;
        stage.managerial_view.forEach(view => {
            markdown += `- ${view}\n`;
        });
        markdown += `\n---\n\n`;
    });

    markdown += `### Summary\n${moduleData.closing_note}\n\n---\n\n### 💡 Reflection Prompt\n*Looking at this timeline, which period do you think had the most significant impact on the current state of Digital Transformation? Why?*`;

    // 4. check if lesson content exists
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

    console.log("✅ Module 0 and timeline content imported successfully!");
}

importModule0();
