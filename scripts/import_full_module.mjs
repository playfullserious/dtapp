import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const fullModuleData = {
    "chapter": "Why Digital Transformation",
    "description": "This module explores the structural, economic, and strategic forces that made Digital Transformation inevitable. It traces how global trade, falling technology costs, shifting consumer expectations, and the evolution of IT roles created the conditions for firm-wide transformation.",
    "topics": [
        {
            "title": "1.1 Prelude to Transformation: Structural Drivers",
            "content": `Digital transformation didn’t happen in a vacuum – it was enabled by decades of structural shifts in business and technology. Key drivers include:

**Globalization and Market Liberalization:** The late 20th-century push for free trade and China’s emergence as a manufacturing and tech powerhouse dramatically expanded global competition. Companies suddenly faced new rivals and markets worldwide, forcing them to innovate and become more efficient. This created urgency to leverage technology for speed and scale in order to stay competitive.

**Declining Tech Costs (Compute, Storage, Bandwidth):** Technological cost curves have plummeted – from computing power (thanks to Moore’s Law) to data storage and Internet bandwidth. What was once expensive (supercomputing, high-speed connectivity) became affordable to even small firms. Cheaper cloud infrastructure and ubiquitous broadband made advanced IT capabilities accessible at scale, leveling the playing field and enabling new digital business models.

**Crisis-Driven IT Resets:** Economic shocks like the dot-com bust (2000) and the 2008 global financial crisis served as turning points. The dot-com crash cleared out unsustainable online businesses, but left behind a matured Internet for the next generation to exploit. The 2008 recession forced companies to cut costs and do more with less – accelerating adoption of cost-efficient technologies (like cloud computing and SaaS). In tough times, businesses became more willing to rethink IT, paving the way for transformative innovations.

**From Building to Renting (Rise of Cloud/SaaS):** Traditionally, firms built or bought their own IT systems. Now, they increasingly rent technology as a service. The mid-2000s saw a shift to Software-as-a-Service (SaaS) and cloud platforms (e.g. Amazon Web Services started in 2006). Instead of heavy upfront investment in servers and software, companies could subscribe to flexible, scalable services on demand. This lowered barriers to trying new digital solutions and sped up innovation cycles. (Notably, an earlier attempt in the late ‘90s – the ASP model of hosted software – largely failed due to immature technology and trust issues, but it foreshadowed today’s successful cloud services.)

**Consumerization of IT:** Innovation in tech began to be led by the consumer market rather than enterprise. Employees and customers started bringing their own powerful devices (smartphones, tablets, laptops) and user-friendly apps into the workplace. User expectations for IT rose – people wanted business technology to be as convenient and intuitive as their personal apps. This “bring your own device” trend and the popularity of app stores, social media, and cloud storage services forced enterprise IT to adapt. In short, consumer tech set the baseline for corporate tech, driving businesses to modernize interfaces and experiences.

**Growing Trust in External Providers:** Over time, companies became comfortable relying on external infrastructure and services. Early on, businesses were wary of hosting critical data outside their walls. But successful SaaS pioneers (like Salesforce) and reliable cloud providers proved third-party platforms could be secure, reliable, and compliant. As confidence grew, using external email, data centers, or entire platforms became normal. Outsourcing IT components to specialists (cloud hosts, SaaS vendors) is now seen as smart strategy, allowing firms to focus on core activities.

**Lessons from Early Failures:** The road to today’s digital ecosystem included learning from past mistakes. For example, the Application Service Provider (ASP) wave in the late 1990s tried to deliver software over the internet but fizzled out (due to slow internet, weak business models, etc.). However, those experiments provided valuable lessons that informed the next generation of services. Today’s cloud and platform successes build on those early ideas – with better tech and trust – to finally realize the vision of on-demand digital resources.`
        },
        {
            "title": "1.2 The Digital Economy and New Value Models",
            "content": `The digital economy operates on fundamentally different economics and value creation models than the traditional industrial economy. Notable shifts include:

**Lower Transaction and Coordination Costs:** Digital platforms have drastically reduced the cost of finding, connecting, and transacting with others. Online marketplaces, for instance, match buyers and sellers instantly across the globe. Coordination that once required layers of intermediaries can now happen in real time via apps and platforms. This reduction in friction enables new business models (like Uber or Airbnb) that wouldn’t be possible before – connecting distributed suppliers and consumers with minimal overhead. In essence, platforms cut out middlemen and streamline exchanges, changing how value is distributed.

**From Products to Services (and Ecosystems):** There’s a broad shift from one-off product sales to ongoing services and integrated solutions. Many physical products are now sold “as-a-service” or with digital services layered on top (for example, software subscriptions instead of boxed software, or manufacturers offering predictive maintenance services via IoT data). Data has become a key asset and revenue source – companies monetize insights or target offerings using big data. Businesses also increasingly operate as part of ecosystems rather than stand-alone entities: they partner with others on platforms to deliver a complete customer experience. (For example, a smartphone’s value comes from the device plus app developers, accessory makers, and content providers – an ecosystem orchestrated by the platform owner.)

**Near-Zero Marginal Cost:** In the digital realm, producing an additional unit of product or service often costs almost nothing. Once you’ve built a software app or digital content, serving one more user has negligible cost. This zero (or very low) marginal cost structure means digital businesses can scale exponentially at low expense – potentially reaching millions of users without the traditional cost constraints. It also shifts how companies compete and make money: value comes from network scale and customer engagement rather than per-unit profit. (For example, social media platforms and search engines make money via ads at scale, since each extra user costs little but adds network value.)

**Inverted Value Creation:** Digital platforms often exhibit an “inverted” value model, where users or partners create much of the value instead of the company alone. Think of YouTube: the platform provides the infrastructure, but the content (and thus the value attracting viewers) is created by users. Similarly, app stores rely on third-party developers to enrich a platform, and marketplaces depend on sellers’ products. This is the opposite of the traditional pipeline model where a firm produces outputs for consumers. In the digital economy, successful firms build open platforms and invite others to contribute, leveraging external innovation and resources. The platform orchestrator earns value by facilitating and curating this exchange, rather than by producing everything itself.

**Collapsing Industry Boundaries:** Digital technology has blurred or outright erased traditional industry boundaries. A company born in one sector can quickly expand into others by leveraging software and data. For example, Amazon went from selling books online to dominating retail, cloud computing, logistics, and even entertainment production. Tech-driven firms often offer a mix of products and services that span what used to be separate industries. Likewise, digital convergence means customers expect solutions that cut across sectors (e.g. a single app might combine banking, shopping, and social features). The result is that competition now comes from unexpected players – a telecom might compete with a streaming entertainment provider, or a car company with a tech firm’s mobility service. In the digital economy, value is created by addressing customer needs holistically, not by sticking to narrow industry lanes.`
        },
        {
            "title": "1.3 The Urgency to Transform",
            "content": `In today’s environment, going digital isn’t a luxury – it’s an urgent imperative for survival and growth. Several forces drive this urgency:

**Beyond Simple Digitization:** Many firms have “digitized” some processes (e.g. moved paperwork online or launched a website), but digital transformation goes much further. It means reimagining the business for a digital age, not just digitizing the status quo. The urgency comes from the fact that incremental tweaks aren’t enough – merely adopting new tech tools won’t keep a company competitive if its fundamental business model and operations remain outdated. Organizations must truly transform how they work and deliver value, rather than get caught in the trap of thinking a new app or software alone will future-proof them.

**Rising Customer Expectations:** Today’s customers have been spoiled by digital-native companies that offer seamless, personalized, on-demand experiences. As a result, customer expectations are higher than ever across all industries. People expect instant service, intuitive interfaces, omnichannel access, and constant innovation. If one company doesn’t meet these expectations, a competitor (or a tech startup) might. This puts pressure on every business to transform customer experience through digital means – from responsive mobile apps to AI-driven personalization – just to meet baseline expectations and maintain loyalty.

**Competitive Asymmetry (Fast vs. Slow Movers):** Digital technology has enabled asymmetric competition – small, agile startups or tech-savvy entrants can challenge large incumbents in a short time. These fast movers often operate with new cost structures and innovation cycles that traditional firms struggle to match. For example, a cloud-based newcomer can scale rapidly without the legacy baggage of an older competitor. This creates a “fast beats slow” dynamic. Companies that delay transformation risk falling into a disadvantage that compounds: as competitors digitize operations and leverage data, they can iterate faster and deliver better value, pulling further ahead. The urgency is clear when you consider how quickly industry leaders can be toppled by those who embraced digital early (think of how Netflix outpaced Blockbuster).

**Industry Disruption and Pressures:** Every sector is facing its own flavor of digital disruption. Industry-specific pressures add to the need for transformation. In finance, for instance, fintech companies and digital payment platforms force banks to reinvent services. In retail, the shift to e-commerce and direct-to-consumer models pressures brick-and-mortar retailers to innovate or perish. In manufacturing, automation, AI and IoT (Internet of Things) are changing how factories operate and how products are serviced. Even in government and education, constituents expect digital engagement. Additionally, regulators and market conditions are evolving (e.g. open banking regulations or digital compliance standards) which mandate change. All these factors mean that standing still is falling behind – the cost of inaction is growing. Transformation is urgent because the competitive environment is unforgiving to those who wait.`
        },
        {
            "title": "1.4 What Digital Transformation Really Means",
            "content": `“Digital transformation” is a buzzword, so it’s important to clarify its true meaning and scope. In essence, digital transformation means integrating digital technology into every facet of an organization’s strategy, operations, and culture to fundamentally improve performance. Key aspects of this include:

**Definition and Scope:** Digital transformation isn’t just about installing new software or moving to the cloud – it’s a holistic change in how a business creates value. It involves rethinking products and services (perhaps digitizing the product itself or offering new digital services), optimizing processes through automation and data, and often adopting new business models. The scope is enterprise-wide: from customer experience and marketing, to supply chain and back-office operations. It also includes the transformation of the organization’s culture and skills, ensuring teams can innovate and adapt continuously.

**Operating Model & Capability Changes:** True transformation changes how the company works. Firms may reorganize from rigid departmental silos to more agile, cross-functional teams focused on products or customer journeys. Decision-making becomes more data-driven. New capabilities are developed – for example, data analytics, UX design, or AI engineering – which might not have been core to the business before. The workforce might need upskilling or new talent to drive digital initiatives. Essentially, the company’s operating model (processes, structure, talent) is updated to support speed, flexibility, and innovation, rather than sticking to older ways optimized for a pre-digital era.

**Cross-Functional and Continuous:** Digital transformation is not a one-off project owned by IT; it’s cross-functional and ongoing. It requires collaboration across departments – IT working closely with business units, marketing with data science, operations with technology, and so on. Silos break down because delivering a great digital customer experience or an AI-enhanced process often involves many parts of the organization working together. Moreover, transformation is continuous – technology and customer expectations keep evolving, so the organization must be in a state of constant learning and improvement. Leading companies view transformation as a journey with no end point, continually adapting to the next digital shift (e.g. today cloud and mobile, tomorrow AI and whatever comes next).

**Common Misconceptions:** It’s useful to dispel what digital transformation is NOT. It’s not just website revamps or a new mobile app (those can be elements of it, but superficial changes alone don’t transform the core business). It’s not purely an IT department project – without leadership and change across strategy, culture, and processes, tech upgrades will fizzle out. It’s also not something that can be fully “completed” in a few months through a single initiative; launching a new e-commerce site, for example, is a start but true transformation likely requires reorganizing logistics, retraining staff, adjusting the business model (pricing, marketing), etc. Finally, digital transformation is not only about technology – technology is a means, but the end goal is new business value and improved outcomes (customer satisfaction, efficiency, growth). Keeping these misconceptions in check helps focus on the real, deeper changes needed.`
        },
        {
            "title": "1.5 Why IT Strategy Moved to the Center",
            "content": `In the past, information technology was often seen as a support function – necessary for operations, but secondary to “core” business strategy. That era is over. In modern enterprises, IT strategy and business strategy have converged, and technology considerations sit at the heart of strategic planning:

**Business and IT Strategy Convergence:** It has become nearly impossible to separate “business strategy” from “IT strategy” – they are essentially one and the same in a digital world. Competitive strategy now inherently includes decisions on digital platforms, data usage, AI capabilities, and more. Companies win or lose based on how well they leverage technology for innovation, customer experience, and efficiency. This means CIOs/CTOs (technology leaders) and CEOs must work hand-in-hand. For example, a retailer’s growth strategy might hinge on its mobile shopping app and supply chain analytics – clearly a tech strategy element that is also the business strategy. In short, digital strategy is business strategy, not a separate plan.

**IT as a Value Creation Platform (not just plumbing):** Historically, IT was about keeping systems running and costs down. Now, technology is a key driver of new value creation. Companies use IT to launch new products (think of a bank launching a new payment app), create new revenue streams (like a manufacturer monetizing IoT data as a service), and deepen customer relationships (through CRM systems, personalization algorithms, etc.). Even internal IT platforms (data lakes, cloud infrastructure, API services) provide a foundation on which the business can rapidly experiment and build new offerings. In effect, the IT environment becomes a platform for innovation – enabling quick assembly of capabilities to support business ideas. Organizations that treat IT as merely back-office miss out on its strategic potential, while those that embrace IT as core to value delivery lead their industries.

**From Siloed Projects to Product Thinking:** With IT now central, companies are shifting how they manage technology initiatives. The old approach was siloed “IT projects” defined by functional requirements and delivered to stakeholders, often in isolation. Now, leading firms adopt “product thinking” – treating digital capabilities as continuously improving products with dedicated teams. Cross-functional teams (combining IT developers, product managers, designers, business analysts, etc.) work together on an ongoing basis to enhance a digital product or platform (e.g. an e-commerce site or a mobile banking app), rather than doing one-off projects and disbanding. This product-centric approach breaks down the wall between “the business side” and “the IT side”: it’s a unified team focused on outcomes. It also aligns with agile and DevOps methods, allowing constant iteration and faster delivery of improvements. Silos between IT and other departments crumble, replaced by a more integrated, customer-centric operating model.

**Governance and Leadership Implications:** Having IT at the strategic core also changes governance and leadership focus. Boards and executives must understand technology trends and risks (cybersecurity, data privacy, disruptive innovations) as part of their oversight. Many companies have created new roles or committees for digital governance, ensuring that digital initiatives align with business goals and ethical standards. Resource allocation processes have evolved too – funding is often allocated to digital programs that cut across traditional departments, requiring new budgeting and accountability frameworks (like product-based funding instead of department budgets). Additionally, companies are rethinking policies around data governance, vendor management, and platform standards because these are now strategic issues, not just technical details. In summary, with IT intertwined with strategy, leadership must foster an environment where technology-driven ideas are evaluated as strategic opportunities, and where the organization’s structure and policies support rapid yet controlled innovation.`
        },
        {
            "title": "1.6 Diagnostic Case Studies",
            "content": `Real-world examples, both failures and successes, help illustrate what digital transformation is (and isn’t) about:

**Kodak – Digitization vs. Transformation:** Kodak, once the giant of photography, is a cautionary tale. The company actually invented one of the first digital cameras in 1975, yet failed to transform its business model for the digital era. Kodak was skilled at chemical film and photo printing, and while it did digitize (eventually selling digital cameras), it kept focusing on driving film sales and processing. The leadership didn’t fully embrace new value streams (like online photo sharing or smartphone integration) that digital technology enabled. As a result, more agile competitors (and changing consumer behavior) made film obsolete, and Kodak went bankrupt in 2012. Lesson: simply having digital products isn’t enough – Kodak digitized its product, but didn’t transform its core business strategy, culture, and revenue model to align with the digital age. True transformation might have meant rethinking how people cherish and share images (which is what Instagram, ironically, did successfully).

**Blockbuster vs. Netflix – The Cost of Delay:** Blockbuster was the king of video rental stores, but it missed the wave of digital change. Along came Netflix, which started with a mail-order DVD service and then boldly pivoted to streaming video on-demand as broadband improved. Blockbuster at first ignored the shift, clinging to its physical stores and late fees model, and by the time it reacted (offering a late streaming attempt), Netflix had already locked in millions of subscribers. Netflix transformed from a DVD rental business to a streaming and data-driven content company, eventually even creating its own original content. Blockbuster, lacking a digital strategy, rapidly declined and filed for bankruptcy. The contrast shows that early movers in digital can create asymmetrical competition – Netflix built a scalable online platform and personalized recommendation engine (leveraging data), which Blockbuster couldn't quickly replicate. The lesson: companies must be willing to disrupt their own legacy models before someone else does. Embracing new digital delivery methods and business models early is critical; otherwise, even a market leader can lose everything.

**Amazon – Combining Digital and Physical at Scale:** Amazon exemplifies the power of digital transformation when pursued relentlessly. Starting as an online bookstore, Amazon used software, data, and algorithms to reinvent retail logistics and customer service. It built massive physical infrastructure (fulfillment centers, distribution networks) optimized by advanced software and data analytics. Amazon’s digital mindset led to innovations like 1-Click ordering, personalized recommendations, and the Prime membership model – all aimed at removing friction for the customer. Additionally, Amazon Web Services (AWS) was born from Amazon’s internal need for scalable computing, and became a hugely successful cloud platform offered to the world, showing Amazon’s ability to turn an internal digital capability into a new business line. By treating IT as core and leveraging data at every step, Amazon blurred the line between tech company and retailer. Its success underscores that digital transformation can drive both operational excellence (efficiency, speed) and new business growth. Amazon also proved that being “digital” doesn't mean having no physical presence – rather, it means smartly integrating technology with physical operations. Today, Amazon’s blend of digital savvy and logistical might set the standard in retail and beyond.

**Tesla – Software-Led Reinvention of Automotive:** Tesla brought Silicon Valley innovation culture to the auto industry. Traditional car manufacturers focused mainly on mechanical engineering and relied on suppliers for many electronics; Tesla, however, treated the car as a computer on wheels, designing vehicles with a software-first approach. Tesla delivers over-the-air software updates to add features or improve performance on existing cars – something unheard of before in autos. This continuous improvement model (familiar in software but novel in car manufacturing) means a Tesla vehicle actually gets better after purchase, whereas a traditional car only ages. Tesla also collected driving data from its fleet to train its self-driving AI, giving it an edge in autonomous driving development. Beyond the product itself, Tesla transformed the automotive business model: selling directly to consumers online (bypassing the dealership system) and building a brand around clean energy innovation (including ventures into solar and battery storage, creating an energy ecosystem). The result has been a dramatic shift in industry expectations – now every automaker is scrambling to improve software integration, offer electric vehicles, and provide Tesla-like user experiences. Tesla’s story highlights how a newcomer can redefine industry rules through digital prowess, and how software and data can become more important than hardware in delivering value. This is digital transformation at an industry scale – changing what consumers value and forcing all competitors to adapt or risk obsolescence.`
        },
        {
            "title": "1.7 From Awareness to Strategic Imperative",
            "content": `By now, it’s clear that digital transformation is not just a trend but a strategic necessity. The final takeaway for organizations is the mindset shift required:

**Avoiding Incrementalism:** One key lesson is that small-scale, piecemeal changes are not enough to keep up with the pace of digital disruption. Tweaking at the edges – for example, improving one product line or digitizing one department – while useful, often fails to address the larger strategic threats and opportunities. Companies that stick to incremental moves may find themselves perpetually behind more daring competitors. In contrast, those that pursue bold, holistic transformation can leapfrog and redefine their markets. In practical terms, this means leadership must be willing to challenge old assumptions and be ambitious in reshaping the business. Playing it too safe can actually be the riskiest approach in a fast-changing digital landscape.

**Transformation as the Default Strategy:** Instead of viewing digital transformation as a one-time program or a reaction to market changes, leading companies treat it as a continual strategic priority. In other words, transformation is the “new normal.” It should be baked into the company’s DNA that adapting to new technology and continuously improving digital capabilities is an ongoing process. Strategies are now crafted with digital opportunities at the center, not as add-ons. This means companies regularly revisit and update their vision as new tech emerges (AI, blockchain, etc.), always asking how they can reinvent aspects of their business. When transformation is a default mindset, organizations become more agile, innovative, and resilient in the face of disruption. Essentially, they’re not just reacting to change, but proactively driving it.

**Looking Ahead – A Journey, Not a Destination:** Embracing digital transformation as a strategic imperative is just the beginning. It sets the stage for the next steps – which involve executing on this vision, overcoming challenges (cultural resistance, skill gaps, legacy systems), and measuring progress. In the upcoming modules, we will dive into how to drive transformation effectively. We’ll explore strategies for planning digital initiatives, leadership and talent requirements, methods like agile and design thinking, and how to manage the change process. The road ahead is complex but exciting: organizations that successfully navigate it will be well-positioned to thrive in the future. Remember, transformation is a journey with no finish line – by accepting this, companies can move from mere awareness of digital trends to making transformation a core, ongoing strategic practice.`
        }
    ]
};

async function importFullModule() {
    console.log('🚀 Starting import of FULL Module 1 CONTENT...');

    try {
        // 1. Delete existing module if it exists (to avoid duplicates)
        await supabase.from('modules').delete().eq('title', fullModuleData.chapter);

        // 2. Create Module
        const { data: module, error: moduleError } = await supabase
            .from('modules')
            .insert({
                title: fullModuleData.chapter,
                description: fullModuleData.description,
            })
            .select()
            .single();

        if (moduleError) throw moduleError;
        console.log('✅ Created Module:', module.id);

        // 3. Create Topics and Content
        for (let i = 0; i < fullModuleData.topics.length; i++) {
            const topicData = fullModuleData.topics[i];

            const { data: topic, error: topicError } = await supabase
                .from('topics')
                .insert({
                    module_id: module.id,
                    title: topicData.title,
                    order_index: i,
                })
                .select()
                .single();

            if (topicError) throw topicError;
            console.log(`   - Created Topic ${i + 1}/${fullModuleData.topics.length}:`, topic.title);

            const { error: contentError } = await supabase
                .from('lesson_content')
                .insert({
                    topic_id: topic.id,
                    body: topicData.content,
                    content_type: 'markdown',
                    order_index: 0,
                });

            if (contentError) throw contentError;
        }

        console.log('\n✨ FULL IMPORT COMPLETE! Every word of Module 1 is now in your database.');
    } catch (err) {
        console.error('❌ Error during import:', err.message);
    }
}

importFullModule();
