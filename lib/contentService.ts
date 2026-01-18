import { supabase } from './supabase';

export interface Module {
    id?: string;
    title: string;
    description: string;
    role_in_course?: string;
    focus?: string;
    order_index?: number;
}

export interface Topic {
    id?: string;
    module_id: string;
    title: string;
    order_index?: number;
}

export interface LessonContent {
    id?: string;
    topic_id: string;
    content_type: string;
    body: string;
    order_index?: number;
}

export const contentService = {
    // Save a full chapter with its topics
    async importChapter(data: { chapter: string; description: string; topics: { title: string; content: string }[] }) {
        // 1. Create Module
        const { data: module, error: moduleError } = await supabase
            .from('modules')
            .insert({
                title: data.chapter,
                description: data.description,
            })
            .select()
            .single();

        if (moduleError) throw moduleError;

        // 2. Create Topics and Content
        for (let i = 0; i < data.topics.length; i++) {
            const topicData = data.topics[i];

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

        return module;
    },

    async getModules() {
        const { data, error } = await supabase
            .from('modules')
            .select('*')
            .order('order_index', { ascending: true });

        if (error) throw error;
        return data;
    },

    async getTopics(moduleId: string) {
        const { data, error } = await supabase
            .from('topics')
            .select('*')
            .eq('module_id', moduleId)
            .order('order_index', { ascending: true });

        if (error) throw error;
        return data;
    },

    async getLessonContent(topicId: string) {
        const { data, error } = await supabase
            .from('lesson_content')
            .select('*')
            .eq('topic_id', topicId)
            .single();

        if (error) throw error;
        return data;
    }
};
