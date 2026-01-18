import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const caseStudyText = `### Dropbox — Understanding Customer Value Before Building the Product

In the mid-2000s, file storage and sharing was not a new problem. USB drives, email attachments, FTP servers, and enterprise file systems already existed. Yet for many users, managing files across multiple devices remained frustrating and unreliable. Files were lost, overwritten, or left on the wrong computer. The problem was not a lack of technology, but a poor fit between existing solutions and everyday user behavior.

Dropbox began by focusing on this mismatch. Instead of asking what features could be built, the founders asked a simpler question: why is something as basic as keeping files in sync still painful for users? The answer lay in how people actually worked. Users switched between home and work computers, collaborated informally, and expected their files to be available without thinking about storage, transfer, or backups.

Early on, Dropbox did not try to differentiate through technical sophistication. The underlying technology was complex, but the customer value proposition was intentionally simple. Files should appear automatically on every device, update without manual action, and remain available even if a device failed. The emphasis was on convenience, reliability, and peace of mind rather than on storage capacity or advanced features.

Rather than building a complete product immediately, Dropbox tested whether this value proposition resonated with users. A short explainer video demonstrated the experience of using Dropbox, showing how files stayed synchronized effortlessly. This demonstration was not meant to showcase technology but to communicate customer value clearly. The strong response validated that users immediately understood the problem and found the proposed solution compelling.

This early validation shaped how Dropbox approached development. Features were prioritized based on their contribution to the core value of seamless file synchronization. Complexity was hidden from users, even if it increased technical effort behind the scenes. The product experience was designed to fit naturally into existing workflows rather than requiring users to adapt to new processes.

Dropbox’s early growth was driven less by marketing spend and more by word of mouth. Users who experienced relief from a persistent frustration were willing to recommend the service to others. This behavior reinforced the importance of solving a real, widespread customer problem before scaling aggressively.

The Dropbox case illustrates a key principle of digital innovation: successful products often begin with a precise understanding of customer pain rather than with technology capabilities. By articulating value from the customer’s perspective and validating it early, Dropbox reduced uncertainty and guided development in a focused, disciplined way.

This case sets the stage for understanding how customer insight, need identification, and early experimentation shape effective digital solutions.`;

const existingSections = {
    "introduction": "The Dropbox case illustrates how digital innovation can begin with a clear articulation of customer value rather than a fully built product. The company focused on a simple but widespread problem, keeping files synchronized across devices, instead of emphasizing technical complexity.",
    "customer_value_framing": "Rather than describing features or architecture, Dropbox communicated its offering in terms of customer benefit, ease of use, reliability, and peace of mind. This framing allowed potential users to quickly grasp the value without needing technical knowledge.",
    "early_validation": "Before investing heavily in infrastructure, the idea was validated using simple demonstrations and early prototypes. These were used to test whether customers understood the value and were interested in the solution.",
    "summary": "The case shows that understanding and communicating customer value early can reduce risk and guide development more effectively than building complete solutions upfront."
};

async function updateDropboxTopic() {
    console.log("🚀 Updating Dropbox Case Study with full narrative...");

    const { data: topicRec, error: tError } = await supabase
        .from('topics')
        .select('id')
        .ilike('title', 'Dropbox Case Study')
        .single();

    if (tError || !topicRec) {
        console.error("Topic 4.2 not found");
        return;
    }

    let finalMarkdown = `${caseStudyText}\n\n---\n\n`;
    finalMarkdown += `## Analysis: Key Takeaways\n\n`;
    finalMarkdown += `### Core Insight\n${existingSections.introduction}\n\n`;
    finalMarkdown += `### Customer Value Framing\n${existingSections.customer_value_framing}\n\n`;
    finalMarkdown += `### Validation Strategy\n${existingSections.early_validation}\n\n`;
    finalMarkdown += `## Summary\n${existingSections.summary}`;

    const { error: updateError } = await supabase
        .from('lesson_content')
        .update({ body: finalMarkdown.trim() })
        .eq('topic_id', topicRec.id);

    if (updateError) {
        console.error(`Error updating Dropbox Topic:`, updateError.message);
    } else {
        console.log(`✅ Successfully enhanced the Dropbox Case Study content.`);
    }
}

updateDropboxTopic();
