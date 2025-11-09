import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (token_hash && type) {
    const supabase = createServerClient();

    try {
      // Pour les confirmations d'email, utiliser verifyOtp avec le type email
      if (type === 'email' || type === 'signup') {
        const { error } = await supabase.auth.verifyOtp({
          type: 'email',
          token_hash,
        });

        if (!error) {
          // Redirection vers la page de succès
          return NextResponse.redirect(new URL(`/auth/confirm/success?next=${encodeURIComponent(next)}`, requestUrl.origin));
        }
      } else {
        // Pour les autres types (email_change, etc.)
        const { error } = await supabase.auth.verifyOtp({
          type: type as 'email_change',
          token_hash,
        });

        if (!error) {
          return NextResponse.redirect(new URL(`/auth/confirm/success?next=${encodeURIComponent(next)}`, requestUrl.origin));
        }
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
    }
  }

  // En cas d'erreur, rediriger vers la page d'erreur
  return NextResponse.redirect(new URL('/auth/confirm/error', requestUrl.origin));
}

