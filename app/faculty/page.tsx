'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { contentService, Module } from '@/lib/contentService';
import Link from 'next/link';

export default function FacultyDashboard() {
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
                const data = await contentService.getModules();
                setModules(data);
            } catch (err) {
                console.error('Error loading modules:', err);
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
            <header className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">X</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
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
                                <span className="inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700">
                                    👨‍🏫 Faculty
                                </span>
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
                <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
                    <h2 className="text-3xl font-bold mb-2">Welcome, {session?.user?.name?.split(' ')[0]}! 👋</h2>
                    <p className="text-indigo-100 opacity-90">Manage your course content and track student engagement for <strong>Digital Transformation</strong>.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
                            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Modules</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Students</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Views</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Downloads</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Quick Management
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link
                            href="/faculty/importer"
                            className="group flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-indigo-200/50 hover:scale-[1.02] transition-all"
                        >
                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                            </div>
                            <span className="text-lg font-bold">Smart Importer</span>
                            <span className="text-indigo-100 text-xs mt-1 text-center opacity-80">Paste ChatGPT JSON to create chapters</span>
                        </Link>

                        <button className="group flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 transition-all">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            </div>
                            <span className="text-lg font-bold text-gray-900">Analytics</span>
                            <span className="text-gray-500 text-xs mt-1 text-center font-medium">Coming soon</span>
                        </button>

                        <button className="group flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 transition-all">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                            <span className="text-lg font-bold text-gray-900">Students</span>
                            <span className="text-gray-500 text-xs mt-1 text-center font-medium">Coming soon</span>
                        </button>
                    </div>
                </div>

                {/* Modules List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Your Content Modules</h3>
                        <Link
                            href="/faculty/importer"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                        >
                            + Create Module
                        </Link>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            <div className="h-20 bg-gray-50 animate-pulse rounded-xl"></div>
                            <div className="h-20 bg-gray-50 animate-pulse rounded-xl"></div>
                        </div>
                    ) : modules.length > 0 ? (
                        <div className="grid gap-4">
                            {modules.map((module, idx) => (
                                <div key={module.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <span className="w-8 h-8 bg-indigo-100 text-indigo-700 font-bold rounded flex items-center justify-center text-sm">{idx + 1}</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{module.title}</h4>
                                            <p className="text-xs text-gray-500">{module.description.substring(0, 100)}...</p>
                                        </div>
                                    </div>
                                    <Link href={`/learn/${module.id}`} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">Preview</Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">No chapters found</h4>
                            <p className="text-gray-500 mb-6">Start building your course curriculum.</p>
                            <Link
                                href="/faculty/importer"
                                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold"
                            >
                                Use Smart Importer
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

