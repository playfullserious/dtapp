import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from './supabase';

const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || 'xime.org';
const facultyEmails = process.env.FACULTY_EMAILS?.split(',').map(e => e.trim()) || [];

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const email = user.email;

            if (!email) {
                return false;
            }

            // Check if email domain is allowed
            const emailDomain = email.split('@')[1];
            if (emailDomain !== allowedDomain) {
                console.log(`Access denied: ${email} is not from ${allowedDomain}`);
                return false;
            }

            // Determine user role
            const role = facultyEmails.includes(email) ? 'faculty' : 'student';

            // Store/update user in Supabase
            try {
                const { data: existingUser } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', email)
                    .single();

                if (existingUser) {
                    // Update last login
                    await supabase
                        .from('users')
                        .update({
                            last_login: new Date().toISOString(),
                            name: user.name,
                            avatar_url: user.image
                        })
                        .eq('email', email);
                } else {
                    // Create new user
                    await supabase
                        .from('users')
                        .insert({
                            email,
                            name: user.name,
                            role,
                            avatar_url: user.image,
                        });
                }

                // Log activity
                await supabase
                    .from('activity_log')
                    .insert({
                        user_id: existingUser?.id,
                        action: 'login',
                        resource_type: 'user',
                    });

            } catch (error) {
                console.error('Error storing user:', error);
            }

            return true;
        },
        async session({ session, token }) {
            if (session.user?.email) {
                // Fetch user role from Supabase
                const { data: user } = await supabase
                    .from('users')
                    .select('role, id')
                    .eq('email', session.user.email)
                    .single();

                if (user) {
                    (session.user as any).role = user.role;
                    (session.user as any).id = user.id;
                }
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
