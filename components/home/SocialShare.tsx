'use client';

import { Twitter, Linkedin, Link2 } from 'lucide-react';
import { useState } from 'react';

export function SocialShare() {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : 'https://www.financetrackers.app';
  const title = "Finance Tracker - Gérez vos finances intelligemment avec l'IA";
  const description = "Prenez le contrôle de vos finances avec Finance Tracker. Suivi en temps réel, conseils IA personnalisés, objectifs d'épargne.";

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-8 border-t border-gray-200">
      <span className="text-sm font-medium text-gray-700 mr-2">Partager :</span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
        aria-label="Partager sur Twitter"
      >
        <Twitter size={20} />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
        aria-label="Partager sur Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
        aria-label="Partager sur LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        aria-label="Copier le lien"
      >
        {copied ? (
          <span className="text-sm text-emerald-600">✓ Copié</span>
        ) : (
          <Link2 size={20} />
        )}
      </button>
    </div>
  );
}

