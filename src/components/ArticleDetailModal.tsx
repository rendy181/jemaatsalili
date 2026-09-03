import React from 'react';
import { ChurchArticle } from '../types/church';
import {
  X,
  Calendar,
  User,
  Clock,
  Tag,
  Share2,
  Bookmark,
  Heart,
  BookOpen,
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: ChurchArticle | null;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
}) => {
  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan artikel disalin ke papan klip!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-purple-100 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-purple-100 text-purple-700 transition-colors"
              title="Bagikan Artikel"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Article Image Banner */}
          {article.imageUrl && (
            <div className="rounded-2xl overflow-hidden shadow-md max-h-80 w-full">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Title & Metadata */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight font-display">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5 font-medium text-slate-900">
                <User className="w-4 h-4 text-purple-600" />
                <span>{article.author}</span>
                <span className="text-slate-400">({article.authorRole})</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span>{new Date(article.publishDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
              </div>
            </div>
          </div>

          {/* Article Summary Box */}
          <div className="bg-purple-50/80 p-4 rounded-2xl border-l-4 border-purple-600 text-sm italic text-purple-900 leading-relaxed font-medium">
            "{article.summary}"
          </div>

          {/* Full Article Content */}
          <div className="prose prose-purple max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Encouragement Footer */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Gereja Masehi Advent Hari Ketujuh Jemaat Salili</h4>
            <p className="text-xs text-slate-600">
              Kiranya tulisan ini menjadi berkat dan menguatkan iman pengharapan kita menyambut kedatangan Tuhan Yesus.
            </p>
          </div>
        </div>

        {/* Modal Bottom Action */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors"
          >
            Tutup Bacaan
          </button>
        </div>
      </div>
    </div>
  );
};
