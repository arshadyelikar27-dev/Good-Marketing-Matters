import { 
  TrendingUp, 
  Share2, 
  Search, 
  MessageCircle, 
  Sparkles, 
  Megaphone, 
  Video, 
  Laptop, 
  Smartphone, 
  Palette,
  Target,
  BarChart3,
  Users,
  PenTool,
  Zap,
  Globe,
  Shield,
  RefreshCw,
  type LucideIcon
} from "lucide-react";

import type { ElementType } from 'react';
import { FaYoutube, FaGoogle, FaWordpress, FaApple, FaAndroid, FaReact } from 'react-icons/fa';
import { FaMeta } from 'react-icons/fa6';

interface SubService {
  icon: ElementType;
  title: string;
  description: string;
  image?: string;
}

interface WhyChooseItem {
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  icon: ElementType;
  heroDescription: string;
  imageUrl?: string;
  subServices: SubService[];
  whyChoose: WhyChooseItem[];
  process: ProcessStep[];
  stats: { value: string; label: string }[];
}

export const services: ServiceData[] = [
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    tagline: "Accelerate Your Business Growth with GMM",
    shortDescription: "Boost your growth with tailored campaigns, including Google Ads, LinkedIn Ads, and social media strategies.",
    icon: TrendingUp,
    imageUrl: "/services/perf_marketing.png",
    heroDescription: "At GMM, we deliver impactful performance marketing solutions to scale your business with precision-driven campaigns across leading platforms. Every rupee you spend works harder, tracked to the last click.",
    subServices: [
      { icon: FaMeta, title: "Facebook & Instagram Ads", description: "Launch hyper-targeted ad campaigns on Facebook and Instagram to engage audiences and drive conversions. Maximize ROI with data-driven strategies.", image: "/services/cards/meta_ads.png" },
      { icon: FaGoogle, title: "Google Ads", description: "Reach customers with high intent using search, display, and shopping campaigns. Optimize ad performance for maximum visibility and conversions.", image: "/services/cards/google_ads.png" },
      { icon: FaYoutube, title: "YouTube Ads", description: "Create compelling video ads to connect with your audience on YouTube. Leverage skippable and non-skippable ad formats for optimal reach.", image: "/services/cards/youtube_ads.png" },
      { icon: RefreshCw, title: "Conversion Rate Optimization", description: "Enhance user experience and optimize landing pages to boost conversions. Utilize analytics to implement data-backed improvements.", image: "/services/cards/cro_ads.png" },
      { icon: Zap, title: "Performance Analytics", description: "Track campaign performance with detailed reports. Leverage actionable insights to refine your marketing strategies and achieve business goals.", image: "/services/cards/analytics_ads.png" },
    ],
    whyChoose: [
      { title: "Proven Expertise", description: "Our team has a track record of delivering successful performance marketing campaigns across Google Ads, Facebook, Instagram, and YouTube, tailored to meet diverse business goals." },
      { title: "Customized Strategies", description: "We design bespoke strategies that align with your business objectives and audience preferences, ensuring your campaigns deliver maximum impact." },
      { title: "ROI-Focused Approach", description: "By leveraging advanced analytics, we optimize campaigns to achieve high ROI through precise targeting, creative execution, and ongoing refinement." },
    ],
    process: [
      { step: "01", title: "Goal Setting", description: "We begin by understanding your objectives, target audience, and business goals to create a focused strategy." },
      { step: "02", title: "Campaign Planning", description: "We design tailored campaigns across platforms like Google Ads, Facebook, and YouTube, focusing on your business KPIs." },
      { step: "03", title: "Campaign Execution", description: "We launch and manage campaigns across multiple channels, using creative and precise targeting to engage your audience." },
      { step: "04", title: "Analysis & Optimization", description: "We track performance metrics, analyze results, and continually optimize campaigns for better ROI." },
    ],
    stats: [
      { value: "1,000+", label: "Successful Campaigns" },
      { value: "2,000+", label: "Global Clients" },
      { value: "75+", label: "Marketing Awards" },
      { value: "$50M+", label: "Managed Ad Spend" },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    tagline: "Transform Your Online Presence with GMM",
    shortDescription: "Engage your audience with strategic posts, creative campaigns, and impactful brand storytelling.",
    icon: Share2,
    imageUrl: "/services/social_marketing.png",
    heroDescription: "At GMM, we specialize in crafting impactful social media campaigns that amplify your brand, engage your audience, and drive meaningful results. We turn followers into loyal customers.",
    subServices: [
      { icon: Users, title: "Social Media Strategy Development", description: "Tailored strategies to align with your business goals and audience preferences. Platform-specific approaches for Facebook, Instagram, LinkedIn, Twitter, and more.", image: "/services/cards/sm_strategy_1785666607970.png" },
      { icon: PenTool, title: "Content Creation", description: "Create engaging posts, graphics, and videos that resonate with your audience. Maintain a consistent tone and aesthetic across all platforms.", image: "/services/cards/sm_content_1785666619370.png" },
      { icon: Target, title: "Paid Social Advertising", description: "Launch targeted ad campaigns to boost reach and conversions. Optimize ad spend for maximum ROI across all social platforms.", image: "/services/cards/sm_paid_1785666630242.png" },
      { icon: MessageCircle, title: "Community Management", description: "Monitor and respond to comments, messages, and reviews to foster engagement. Build lasting relationships with your audience.", image: "/services/cards/sm_community_1785666644197.png" },
      { icon: BarChart3, title: "Social Media Analytics", description: "Track performance metrics like reach, engagement, and conversions. Provide detailed reports and actionable insights to refine strategies.", image: "/services/cards/sm_analytics_1785666654952.png" },
    ],
    whyChoose: [
      { title: "Creative Excellence", description: "Our team crafts visually stunning and narrative-driven content that captures attention and builds an emotional connection between your brand and your audience." },
      { title: "Multi-Platform Mastery", description: "We handle Instagram, Facebook, LinkedIn, YouTube Shorts, and X — each with a platform-native strategy designed to maximize organic and paid reach." },
      { title: "Data-Driven Decisions", description: "Every post, story, and reel is backed by analytics. We track what resonates, iterate fast, and amplify what works to get measurable outcomes." },
    ],
    process: [
      { step: "01", title: "Brand Audit", description: "We analyze your current social presence, audience demographics, and competitor benchmarks to identify gaps and opportunities." },
      { step: "02", title: "Strategy Design", description: "We create a tailored content calendar, tone of voice guide, and platform-specific strategies aligned with your business goals." },
      { step: "03", title: "Content Creation & Publishing", description: "Our creative team produces high-quality graphics, videos, and copy. We schedule and publish at peak engagement times." },
      { step: "04", title: "Monitor, Engage & Optimize", description: "We actively manage your community, respond to messages, and use performance data to continuously refine your social strategy." },
    ],
    stats: [
      { value: "500+", label: "Brands Managed" },
      { value: "10M+", label: "Social Impressions Monthly" },
      { value: "3x", label: "Average Engagement Boost" },
      { value: "200+", label: "Successful Campaigns" },
    ],
  },
  {
    slug: "seo",
    title: "Search Engine Optimization (SEO)",
    tagline: "Dominate Search Rankings with GMM",
    shortDescription: "Enhance visibility and traffic with expert keyword optimization and technical SEO strategies.",
    icon: Search,
    imageUrl: "/services/seo_image.png",
    heroDescription: "At GMM, we engineer search dominance through a combination of technical precision, strategic content, and authoritative link-building. We don't just get you on page one — we keep you there.",
    subServices: [
      { icon: Shield, title: "Technical SEO", description: "Audit and fix site speed, crawlability, indexation, Core Web Vitals, and structured data to give search engines exactly what they need to rank you.", image: "/services/cards/seo_tech_1785666665860.png" },
      { icon: PenTool, title: "On-Page Optimization", description: "Strategic keyword mapping, meta-tag optimization, content enhancement, and internal linking to make every page a ranking asset.", image: "/services/cards/seo_onpage_1785666679364.png" },
      { icon: Globe, title: "Off-Page & Link Building", description: "Build domain authority with high-quality backlinks from reputable industry sources, digital PR, and guest contributions.", image: "/services/cards/seo_offpage_1785666691902.png" },
      { icon: Target, title: "Local SEO", description: "Dominate local search results with optimized Google Business Profile, local citations, and geo-targeted content strategies.", image: "/services/cards/seo_tech_1785666665860.png" },
      { icon: BarChart3, title: "SEO Reporting", description: "Transparent, easy-to-understand monthly reports tracking keyword rankings, organic traffic growth, and ROI.", image: "/services/cards/seo_offpage_1785666691902.png" },
    ],
    whyChoose: [
      { title: "White-Hat Practices", description: "We strictly follow Google's guidelines. Our strategies are built for long-term sustainable growth, not risky shortcuts that can get you penalized." },
      { title: "Industry Specialists", description: "Our SEO team includes technical experts, content strategists, and link builders who collaborate to deliver a comprehensive, 360-degree SEO strategy." },
      { title: "Transparent Reporting", description: "You'll never be in the dark. We provide clear, data-rich reports showing exactly how your rankings and traffic are moving, with full attribution." },
    ],
    process: [
      { step: "01", title: "SEO Audit", description: "Comprehensive audit of your site's technical health, existing rankings, content gaps, and backlink profile." },
      { step: "02", title: "Keyword Strategy", description: "In-depth keyword research to identify high-value, high-intent terms your target audience is searching for." },
      { step: "03", title: "On-Page & Technical Fix", description: "Implement on-page changes, technical fixes, and content creation based on audit findings and keyword strategy." },
      { step: "04", title: "Build Authority & Track", description: "Execute off-page campaigns and monitor progress, making data-driven adjustments every month." },
    ],
    stats: [
      { value: "300+", label: "Keywords on Page 1" },
      { value: "5x", label: "Average Traffic Growth" },
      { value: "150+", label: "SEO Clients" },
      { value: "98%", label: "Client Retention Rate" },
    ],
  },
  {
    slug: "answer-engine-optimization",
    title: "Answer Engine Optimization (AEO)",
    tagline: "Become the Definitive Answer in the AI Era with GMM",
    shortDescription: "Optimize your content for AI-powered answer engines like ChatGPT and Google AI Overviews to appear in AI-generated answers.",
    icon: MessageCircle,
    imageUrl: "/services/aeo.png",
    heroDescription: "At GMM, we future-proof your digital presence by ensuring your brand is the trusted source that AI models like ChatGPT, Claude, Perplexity, and Google AI Overviews cite when answering your customers' questions.",
    subServices: [
      { icon: Zap, title: "AI Search Readiness Audit", description: "Assess your current content against what AI models are using as sources and identify gaps to fill before your competitors do." },
      { icon: PenTool, title: "Direct Answer Content Formatting", description: "Restructure your content with concise, question-answer formats, definitions, how-to schemas, and FAQs that AI engines love to quote." },
      { icon: Globe, title: "Voice Search Optimization", description: "Optimize for conversational queries as smart speakers and voice assistants become primary search interfaces for your customers." },
      { icon: Shield, title: "Structured Data & Schema", description: "Implement advanced schema markup so AI systems can understand and extract your content with confidence." },
      { icon: BarChart3, title: "AEO Performance Tracking", description: "Monitor how frequently your brand is cited in AI-generated answers and track traffic coming from AI search referrals." },
    ],
    whyChoose: [
      { title: "Early Mover Advantage", description: "AEO is the next frontier. Most brands haven't optimized for it yet. We help you capture AI search visibility before the market gets saturated." },
      { title: "Content Authority Building", description: "We build your brand as the go-to knowledge source in your niche — the kind of brand that AI models confidently recommend in their responses." },
      { title: "Integrated with SEO", description: "Our AEO strategies are always aligned with your existing SEO efforts, creating a multiplier effect on your overall organic search performance." },
    ],
    process: [
      { step: "01", title: "AI Landscape Analysis", description: "Analyze how AI engines currently represent your brand, competitors, and industry, and find the whitespace opportunities." },
      { step: "02", title: "Content Structuring", description: "Restructure existing content and create new authoritative pieces formatted for AI comprehension and citation." },
      { step: "03", title: "Schema & Technical Setup", description: "Implement comprehensive structured data, FAQs, and entity markup to make your content AI-readable." },
      { step: "04", title: "Monitor & Adapt", description: "Track AI citation frequency and adapt your strategy as the AI search landscape evolves rapidly month over month." },
    ],
    stats: [
      { value: "3x", label: "AI Citation Rate Boost" },
      { value: "50+", label: "AEO Campaigns" },
      { value: "40%", label: "Traffic from AI Search" },
      { value: "100+", label: "Content Assets Optimized" },
    ],
  },
  {
    slug: "generative-engine-optimization",
    title: "Generative Engine Optimization (GEO)",
    tagline: "Own the Future of AI-Generated Search with GMM",
    shortDescription: "Optimize your content for generative AI search engines that create new content, ensuring your brand is featured in AI-generated results.",
    icon: Sparkles,
    imageUrl: "/services/geo.png",
    heroDescription: "At GMM, we specialize in Generative Engine Optimization — the cutting-edge practice of ensuring your brand is synthesized, recommended, and featured by AI systems like Google's AI Mode, ChatGPT Search, and Perplexity that generate entirely new content from the web.",
    subServices: [
      { icon: Sparkles, title: "Generative Search Audits", description: "Deep analysis of how generative AI systems currently perceive and represent your brand compared to competitors." },
      { icon: Globe, title: "Contextual Brand Placement", description: "Strategic content positioning to ensure your brand naturally appears in AI-synthesized responses across key topics and queries." },
      { icon: Shield, title: "AI Knowledge Graph Integration", description: "Build and optimize your entity presence in knowledge graphs that generative AI systems rely on to form their understanding of your brand." },
      { icon: PenTool, title: "Synthesized Content Strategy", description: "Create content architectures and information hierarchies that generative AI can easily parse, extract, and cite." },
      { icon: BarChart3, title: "GEO Performance Monitoring", description: "Track brand mentions in AI-generated content, measure share of AI voice, and report on traffic from generative search sources." },
    ],
    whyChoose: [
      { title: "Pioneering Expertise", description: "GEO is a brand-new field. Our team stays at the absolute cutting edge, running live experiments and publishing frameworks that define this discipline." },
      { title: "Holistic AI Strategy", description: "We don't just do GEO in isolation. We integrate it with your SEO, AEO, and content marketing for a unified approach to AI-era search dominance." },
      { title: "Future-Proof Growth", description: "As traditional search evolves into AI-generated experiences, GEO positions your brand to thrive in the next decade of digital marketing." },
    ],
    process: [
      { step: "01", title: "AI Perception Analysis", description: "Understand how current generative AI systems perceive, describe, and recommend your brand today." },
      { step: "02", title: "Gap Identification", description: "Identify where your brand is missing from AI-generated narratives and which competitors are currently dominating." },
      { step: "03", title: "Content & Entity Optimization", description: "Create and optimize content, knowledge graph entries, and structured data to improve your AI-era brand footprint." },
      { step: "04", title: "Measure Share of AI Voice", description: "Monitor and report on your brand's growing presence in AI-generated search results and responses." },
    ],
    stats: [
      { value: "5x", label: "Brand Mention Growth" },
      { value: "30+", label: "GEO Clients" },
      { value: "60%", label: "AI Search Share Increase" },
      { value: "100%", label: "Future-Ready Strategy" },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Complete Digital Domination with GMM",
    shortDescription: "Integrated digital marketing solutions to grow your brand's online presence and engagement.",
    icon: Megaphone,
    imageUrl: "/services/digital.png",
    heroDescription: "At GMM, we take a holistic 360-degree approach to digital marketing. We combine SEO, paid advertising, content marketing, email campaigns, and social media into one unified growth engine for your business.",
    subServices: [
      { icon: Target, title: "Full-Funnel Campaigns", description: "Awareness to conversion — we build integrated campaigns that guide your audience through every stage of the buyer's journey with precision." },
      { icon: PenTool, title: "Content Marketing", description: "Strategic blog posts, whitepapers, case studies, and video content that educate your audience and build organic authority." },
      { icon: Zap, title: "Email Marketing", description: "Automated drip sequences, newsletters, and targeted email campaigns that nurture leads and drive repeat purchases." },
      { icon: BarChart3, title: "Analytics & Reporting", description: "Cross-channel analytics dashboards that unify your data, making it easy to see what's working and where to invest more." },
      { icon: Globe, title: "Online Reputation Management", description: "Proactively manage your brand's online reputation with review management, crisis response, and positive narrative building." },
    ],
    whyChoose: [
      { title: "Integrated Approach", description: "We break down silos between SEO, paid, social, and email to create a unified strategy where every channel amplifies the others." },
      { title: "Dedicated Account Managers", description: "You get a dedicated account manager who knows your business inside-out and is your single point of contact for all digital marketing needs." },
      { title: "Agile Execution", description: "Digital moves fast. We operate with startup agility — testing, learning, and pivoting quickly to capitalize on every emerging opportunity." },
    ],
    process: [
      { step: "01", title: "Discovery & Audit", description: "Comprehensive audit of your current digital footprint, competitors, and market opportunities across all channels." },
      { step: "02", title: "Strategy Blueprint", description: "A full-funnel digital marketing blueprint with clear goals, KPIs, channel mix, and budget allocation recommendations." },
      { step: "03", title: "Execution & Launch", description: "Simultaneous execution across all channels with coordinated messaging and creative that tells a cohesive brand story." },
      { step: "04", title: "Optimize & Scale", description: "Continuous performance monitoring and monthly strategy sessions to optimize spend and scale what's working." },
    ],
    stats: [
      { value: "500+", label: "Digital Campaigns" },
      { value: "4x", label: "Average ROI" },
      { value: "300+", label: "Active Clients" },
      { value: "10+", label: "Years of Expertise" },
    ],
  },
  {
    slug: "branding-animations-cgi-ads",
    title: "Branding, Animations & CGI Ads",
    tagline: "Captivate the World with GMM Visuals",
    shortDescription: "Engage and captivate your audience with stunning animations and branding campaigns.",
    icon: Video,
    imageUrl: "/services/branding.png",
    heroDescription: "At GMM, we create visual identities and motion experiences that stop the scroll and leave lasting impressions. From logo design to mind-bending 3D CGI advertisements, we bring brands to life.",
    subServices: [
      { icon: PenTool, title: "Logo & Brand Identity Design", description: "Create timeless logos and comprehensive brand identity guidelines including color palettes, typography, and brand voice documents." },
      { icon: Video, title: "2D & 3D Animations", description: "Explainer videos, product demos, and social content animations that communicate your value proposition in the most engaging format possible." },
      { icon: Sparkles, title: "CGI Advertisements", description: "Photorealistic CGI ads for products that are impossible or too expensive to shoot conventionally — perfect for luxury goods, architecture, and tech." },
      { icon: Globe, title: "Motion Graphics", description: "Dynamic motion graphics for social media, YouTube, presentations, and broadcast that elevate your brand's perceived quality." },
      { icon: Target, title: "Brand Campaign Strategy", description: "Full brand campaign strategy from concept and creative direction to multi-platform rollout and impact measurement." },
    ],
    whyChoose: [
      { title: "World-Class Creative Team", description: "Our designers, motion artists, and CGI specialists bring international-caliber creativity to every project, regardless of your budget." },
      { title: "Brand Strategy First", description: "We don't just make things look beautiful — every visual decision is grounded in brand strategy, audience psychology, and business objectives." },
      { title: "Cutting-Edge Technology", description: "We use industry-leading tools including Adobe Creative Suite, Blender, Cinema 4D, and Unreal Engine to produce visuals that competitors can't match." },
    ],
    process: [
      { step: "01", title: "Brand Discovery", description: "Deep-dive sessions to understand your brand values, target audience, competitive landscape, and visual preferences." },
      { step: "02", title: "Concept & Moodboarding", description: "Develop creative concepts and moodboards for your approval before a single pixel is designed or rendered." },
      { step: "03", title: "Design & Production", description: "Full design and production, with regular client check-ins and feedback cycles to ensure the output perfectly matches your vision." },
      { step: "04", title: "Delivery & Brand Guide", description: "Final delivery in all required formats, plus a comprehensive brand guidelines document for consistent application going forward." },
    ],
    stats: [
      { value: "200+", label: "Brand Identities Created" },
      { value: "500+", label: "Animation Projects" },
      { value: "50+", label: "CGI Campaigns" },
      { value: "10+", label: "International Awards" },
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    tagline: "Build Your Digital Flagship with GMM",
    shortDescription: "Create user-friendly, responsive websites tailored to your business goals and brand identity.",
    icon: Laptop,
    imageUrl: "/services/web_dev.png",
    heroDescription: "At GMM, we engineer high-performance, visually stunning websites that are built to convert. From corporate websites to complex e-commerce platforms, every line of code we write serves your business objectives.",
    subServices: [
      { icon: Globe, title: "Custom Web Development", description: "Bespoke websites built from scratch using modern frameworks like Next.js and React, tailored precisely to your business requirements." },
      { icon: Target, title: "E-Commerce Development", description: "Scalable online stores with seamless checkout experiences, inventory management, and payment gateway integrations that maximize sales." },
      { icon: FaWordpress, title: "CMS Development (WordPress)", description: "Powerful, easy-to-manage WordPress websites with custom themes and plugins that give your team full control of content." },
      { icon: Zap, title: "UI/UX Design & Implementation", description: "User-centered design that prioritizes intuitive navigation, accessibility, and conversion-optimized user journeys." },
      { icon: Shield, title: "Performance & Security Optimization", description: "Core Web Vitals optimization, security hardening, SSL implementation, and regular performance audits to keep your site fast and safe." },
    ],
    whyChoose: [
      { title: "Performance-First Development", description: "Every site we build is optimized for speed. Fast load times mean better SEO rankings, lower bounce rates, and higher conversion rates." },
      { title: "Mobile-First Design", description: "With over 60% of traffic coming from mobile, we design and develop with mobile as the primary experience, not an afterthought." },
      { title: "Post-Launch Support", description: "We don't disappear after launch. Our team provides ongoing maintenance, security updates, and feature enhancements to keep your site evolving." },
    ],
    process: [
      { step: "01", title: "Discovery & Wireframing", description: "Define site architecture, user flows, and content structure through detailed wireframes and technical planning." },
      { step: "02", title: "Design Approval", description: "High-fidelity Figma designs for desktop and mobile presented for your feedback and approval before development begins." },
      { step: "03", title: "Development & Testing", description: "Agile development with regular staging previews, cross-browser testing, and QA before every milestone." },
      { step: "04", title: "Launch & Handover", description: "Smooth launch with DNS management, analytics setup, team training, and detailed technical documentation." },
    ],
    stats: [
      { value: "400+", label: "Websites Launched" },
      { value: "<2s", label: "Average Load Time" },
      { value: "99.9%", label: "Uptime Guaranteed" },
      { value: "100%", label: "Mobile Responsive" },
    ],
  },
  {
    slug: "app-development",
    title: "App Development",
    tagline: "Build the App Your Users Will Love with GMM",
    shortDescription: "Develop intuitive mobile apps to enhance user experience and boost customer satisfaction.",
    icon: Smartphone,
    imageUrl: "/services/app_dev.png",
    heroDescription: "At GMM, we build high-performance mobile applications that deliver exceptional user experiences on iOS and Android. From concept to App Store launch, we handle every phase of the app development lifecycle.",
    subServices: [
      { icon: FaApple, title: "iOS App Development", description: "Native Swift-based iOS apps with beautiful interfaces that meet Apple's strict quality guidelines and deliver premium experiences." },
      { icon: FaAndroid, title: "Android App Development", description: "Native Kotlin-based Android apps optimized for performance across thousands of Android devices and screen sizes." },
      { icon: FaReact, title: "Cross-Platform Development", description: "React Native and Flutter apps that give you a single codebase with near-native performance on both iOS and Android — faster and more cost-effective." },
      { icon: Shield, title: "App Maintenance & Updates", description: "Ongoing app maintenance, OS compatibility updates, performance monitoring, and new feature development post-launch." },
      { icon: BarChart3, title: "App Analytics & Growth", description: "In-app analytics setup, App Store Optimization (ASO), and growth marketing strategies to maximize downloads and retention." },
    ],
    whyChoose: [
      { title: "User-Centric Design", description: "We put users first in every design decision. Our UX research, wireframing, and prototype testing processes ensure the final product delights users." },
      { title: "Scalable Architecture", description: "We build apps on robust, scalable architectures that handle growth gracefully — from your first 100 users to your first million." },
      { title: "Agile Development", description: "Transparent, sprint-based development with weekly demos ensures you're always in control and the app evolves based on real feedback." },
    ],
    process: [
      { step: "01", title: "Discovery & Scoping", description: "Define app features, user personas, technical requirements, and create a detailed project roadmap and timeline." },
      { step: "02", title: "UX Design & Prototyping", description: "Interactive prototypes that let you experience the app's flow and UI before any code is written." },
      { step: "03", title: "Development & QA", description: "Agile development sprints with continuous integration, automated testing, and rigorous QA on real devices." },
      { step: "04", title: "Launch & Growth", description: "App Store submission, launch marketing support, and ongoing iteration based on user reviews and analytics." },
    ],
    stats: [
      { value: "100+", label: "Apps Launched" },
      { value: "5M+", label: "Total Downloads" },
      { value: "4.8★", label: "Average App Store Rating" },
      { value: "50+", label: "Enterprise Apps" },
    ],
  },
  {
    slug: "graphic-designing",
    title: "Graphic Designing & Content Writing",
    tagline: "Tell Your Brand Story with GMM",
    shortDescription: "Visually stunning graphic designs and compelling copy to elevate your brand communication.",
    icon: Palette,
    imageUrl: "/services/graphic.png",
    heroDescription: "At GMM, our designers and writers collaborate seamlessly to produce creative assets that are both visually arresting and persuasively written. We believe great design and great copy are inseparable.",
    subServices: [
      { icon: PenTool, title: "Social Media Graphics", description: "Scroll-stopping visuals for Instagram, Facebook, LinkedIn, and Twitter that maintain brand consistency and drive engagement." },
      { icon: Palette, title: "UI/UX Design", description: "User interface design for websites and apps that balances aesthetic appeal with usability and conversion optimization." },
      { icon: Globe, title: "Copywriting & Content Writing", description: "Persuasive website copy, SEO blog articles, product descriptions, and marketing collateral that connects with your audience and converts." },
      { icon: Target, title: "Marketing Collateral", description: "Pitch decks, brochures, flyers, banners, and print materials designed to impress in every physical and digital context." },
      { icon: Zap, title: "Infographics & Data Visualization", description: "Transform complex data and information into beautiful, easy-to-understand infographics that get shared and drive authority." },
    ],
    whyChoose: [
      { title: "Design Meets Strategy", description: "We don't design for aesthetics alone. Every visual is crafted with a strategic objective — driving clicks, building trust, or simplifying a complex message." },
      { title: "Fast Turnaround", description: "Our streamlined creative process and dedicated design team ensure fast delivery without compromising on quality or attention to detail." },
      { title: "Unlimited Revisions Policy", description: "We work until you're 100% satisfied. Our collaborative process ensures the final output perfectly represents your brand vision." },
    ],
    process: [
      { step: "01", title: "Creative Brief", description: "Detailed brief to understand your brand guidelines, target audience, key messages, and the specific goals of each creative piece." },
      { step: "02", title: "Research & Concept", description: "Competitive research and creative concepting to ensure your designs stand out in your specific market and category." },
      { step: "03", title: "Design & Copywriting", description: "Simultaneous design and copywriting, reviewed together to ensure visuals and words tell a unified, compelling story." },
      { step: "04", title: "Revise & Finalize", description: "Structured revision rounds to incorporate your feedback, with final delivery in all required formats and resolutions." },
    ],
    stats: [
      { value: "1,000+", label: "Creative Assets Delivered" },
      { value: "300+", label: "Brand Clients" },
      { value: "5M+", label: "Words Written" },
      { value: "24hr", label: "Average Delivery Time" },
    ],
  }
];
