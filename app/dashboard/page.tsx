'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { contentService, Module } from '@/lib/contentService';
import Link from 'next/link';

export default function StudentDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    useEffect(() => {
        async function loadModules() {
            try {
                console.log('🔍 Dashboard: Starting to fetch modules...');
                console.log('🔍 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
                const data = await contentService.getModules();
                console.log('✅ Fetch Success! Modules found:', data?.length);
                setModules(data || []);
            } catch (err: any) {
                console.error('❌ Error loading modules:', err);
                console.error('Error Details:', err.message || err);
            } finally {
                setLoading(false);
            }
        }
        if (status === 'authenticated') {
            loadModules();
        }
    }, [status]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">DT</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {session?.user?.image && (
                                <img
                                    src={session.user.image}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full ring-2 ring-indigo-100"
                                />
                            )}
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                                <p className="text-xs text-gray-500">{session?.user?.email}</p>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name?.split(' ')[0]}! 👋</h2>
                        <p className="text-indigo-100 opacity-90 max-w-lg">
                            You are currently enrolled in <strong>Digital Transformation</strong>.
                            Review the modules below to continue your progress.
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
                            <p className="text-xs text-gray-500 font-medium">Available Chapters</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                            <p className="text-xs text-gray-500 font-medium">In Progress</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                            <p className="text-xs text-gray-500 font-medium">Completed</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                            <p className="text-xs text-gray-500 font-medium">Bookmarks</p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        Assigned Modules
                    </h3>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 bg-gray-50 animate-pulse rounded-xl"></div>
                            ))}
                        </div>
                    ) : modules.length > 0 ? (
                        <div className="grid gap-6">
                            {modules.map((module, index) => (
                                <div
                                    key={module.id}
                                    className="group block p-6 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                                        <div className="flex items-start space-x-5">
                                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    {module.focus && (
                                                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                                            {module.focus}
                                                        </span>
                                                    )}
                                                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                        {module.title}
                                                    </h4>
                                                </div>
                                                <p className="text-gray-600 line-clamp-2 max-w-2xl text-sm leading-relaxed">
                                                    {module.role_in_course || module.description}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/learn/${module.id}`}
                                            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm"
                                        >
                                            Start Learning
                                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">No modules available yet</h4>
                            <p className="text-gray-500 max-w-xs mx-auto">Your faculty is currently curating the first set of digital transformation modules.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

