-- ============================================
-- XIME Content Platform - Hierarchical Content Schema
-- ============================================

-- 1. MODULES (Chapters)
CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TOPICS (Sections within Chapters)
CREATE TABLE IF NOT EXISTS topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. LESSON_CONTENT (The actual "White Paper" or "Book" content)
CREATE TABLE IF NOT EXISTS lesson_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    content_type TEXT DEFAULT 'markdown', -- 'markdown', 'video', 'pdf'
    body TEXT, -- This will hold the long-form text from ChatGPT
    file_url TEXT, -- For PDF white papers
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_content ENABLE ROW LEVEL SECURITY;

-- Policies (Viewable by everyone logged in)
CREATE POLICY "Allow authenticated view modules" ON modules FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated view topics" ON topics FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated view lesson_content" ON lesson_content FOR SELECT USING (auth.role() = 'authenticated');

-- Policies (Only Faculty can Edit)
CREATE POLICY "Faculty manage modules" ON modules FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role = 'faculty')
);
CREATE POLICY "Faculty manage topics" ON topics FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role = 'faculty')
);
CREATE POLICY "Faculty manage content" ON lesson_content FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND role = 'faculty')
);
