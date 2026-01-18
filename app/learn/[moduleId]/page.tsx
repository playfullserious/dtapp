'use client';

import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { contentService } from '@/lib/contentService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReaderPage({ params }: { params: Promise<{ moduleId: string }> }) {
    const { moduleId } = use(params);
    const { data: session, status } = useSession();
    const router = useRouter();

    const [topics, setTopics] = useState<any[]>([]);
    const [currentTopic, setCurrentTopic] = useState<any>(null);
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    // 1. Fetch all topics for this module
    useEffect(() => {
        async function loadTopics() {
            try {
                const data = await contentService.getTopics(moduleId);
                setTopics(data);
                if (data.length > 0) {
                    setCurrentTopic(data[0]);
                }
            } catch (err) {
                console.error('Error loading topics:', err);
            }
        }
        if (status === 'authenticated') loadTopics();
    }, [moduleId, status]);

    // 2. Fetch content when current topic changes
    useEffect(() => {
        async function loadContent() {
            if (!currentTopic) return;
            setLoading(true);
            try {
                const data = await contentService.getLessonContent(currentTopic.id);
                setContent(data.body);
            } catch (err) {
                console.error('Error loading content:', err);
            } finally {
                setLoading(false);
            }
        }
        loadContent();
    }, [currentTopic]);

    if (status === 'loading') return <div className="p-8">Loading...</div>;
    if (!session) return <div className="p-8">Please sign in to access content.</div>;

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar Navigation */}
            <aside className="w-80 border-r border-gray-100 bg-gray-50/50 hidden lg:flex flex-col sticky top-0 h-screen overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
                    <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <span className="font-bold text-gray-900 truncate">Course Content</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {topics.map((topic, index) => (
                        <button
                            key={topic.id}
                            onClick={() => setCurrentTopic(topic)}
                            className={`w-full text-left p-4 rounded-xl transition-all flex items-start space-x-3 ${currentTopic?.id === topic.id
                                    ? 'bg-white shadow-md border-l-4 border-indigo-600 ring-1 ring-black/5'
                                    : 'hover:bg-gray-100 text-gray-600'
                                }`}
                        >
                            <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${currentTopic?.id === topic.id ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {index + 1}
                            </span>
                            <span className={`text-sm font-medium ${currentTopic?.id === topic.id ? 'text-gray-900' : ''}`}>
                                {topic.title}
                            </span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {/* Header Mobile Only */}
                <header className="lg:hidden p-4 border-b border-gray-100 bg-white sticky top-0 z-10 flex justify-between items-center">
                    <button onClick={() => router.push('/dashboard')} className="text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <span className="font-bold text-gray-900 text-sm">{currentTopic?.title}</span>
                    <div className="w-6" />
                </header>

                <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12 lg:py-20">
                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            <div className="h-10 bg-gray-100 rounded-lg w-3/4"></div>
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-64 bg-gray-100 rounded-xl mt-8"></div>
                        </div>
                    ) : (
                        <article className="prose prose-indigo lg:prose-xl max-w-none">
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-8">
                                {currentTopic?.title}
                            </h1>

                            <div className="markdown-content text-gray-700 leading-relaxed space-y-6">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {content}
                                </ReactMarkdown>
                            </div>

                            {/* Navigation Footer */}
                            <div className="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center">
                                {topics.findIndex(t => t.id === currentTopic?.id) > 0 ? (
                                    <button
                                        onClick={() => setCurrentTopic(topics[topics.findIndex(t => t.id === currentTopic?.id) - 1])}
                                        className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                        <span>Previous Topic</span>
                                    </button>
                                ) : <div />}

                                {topics.findIndex(t => t.id === currentTopic?.id) < topics.length - 1 ? (
                                    <button
                                        onClick={() => setCurrentTopic(topics[topics.findIndex(t => t.id === currentTopic?.id) + 1])}
                                        className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-100"
                                    >
                                        <span>Next Topic</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg shadow-green-100"
                                    >
                                        Finish Module
                                    </button>
                                )}
                            </div>
                        </article>
                    )}
                </div>
            </main>

            {/* Custom Styles for Markdown */}
            <style jsx global>{`
        .markdown-content h2 { font-size: 1.875rem; font-weight: 700; color: #111827; margin-top: 2.5rem; margin-bottom: 1.25rem; }
        .markdown-content p { margin-bottom: 1.5rem; line-height: 1.75; font-size: 1.125rem; }
        .markdown-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .markdown-content li { margin-bottom: 0.5rem; }
        .markdown-content strong { color: #111827; font-weight: 600; }
        .markdown-content blockquote { border-left: 4px solid #4f46e5; padding-left: 1.5rem; font-style: italic; color: #4b5563; margin: 2rem 0; }
      `}</style>
        </div>
    );
}
