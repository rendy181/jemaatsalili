import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { ChurchArticle } from '../types/church';
import {
  BookOpen,
  Search,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Flame,
  Sparkles,
} from 'lucide-react';
import { ArticleDetailModal } from './ArticleDetailModal';

export const ArticlesSection: React.FC = () => {
  const { articles, isLoading } = useChurch(); // ← TAMBAHKAN isLoading!
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleModal, setActiveArticleModal] = useState<ChurchArticle | null>(null);

  const categories = [
    'Semua',
    'Renungan',
    'Warta Sabat',
    'Kesehatan',
    'Pemuda Advent',
    'Berita Jemaat',
  ];

  // ===== TAMPILKAN LOADING SAAT DATA BELUM SIAP =====
  if (isLoading) {
    return (
      <section id="artikel" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 text-lg font-medium">Memuat artikel...</p>
          </div>
        </div>
      </section>
    );
  }

  const filteredArticles = articles.filter((art) => {
    const matchCategory =
      selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <section id="artikel" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Warta & Khazanah Rohani</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Artikel, Renungan & Berita Jemaat
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Santapan rohani firman Tuhan, warta persekutuan jemaat, pesan kesehatan NEWSTART, dan kabar pelayanan Advent di Siau.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-50/80 p-4 rounded-3xl border border-slate-200/80">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-sm shadow-blue-600/30'
                    : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-800 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box with Realtime Filter */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul, topik, penulis artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-full border border-blue-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300 space-y-3">
            <BookOpen className="w-10 h-10 text-blue-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">Tidak ada artikel ditemukan</h3>
            <p className="text-xs text-slate-500">Coba kata kunci pencarian lain atau pilih kategori Semua.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-3xl overflow-hidden border border-blue-100 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-950/90 text-blue-100 backdrop-blur-md shadow-sm border border-blue-500/20">
                      {article.category}
                    </span>
                  </div>
                  {article.isFeatured && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        <span>Pilihan</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Article Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-600" />
                        {new Date(article.publishDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-600" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  {/* Author & Read Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold">
                        {article.author.charAt(0)}
                      </div>
                      <div className="text-[11px]">
                        <span className="font-semibold text-slate-900 block line-clamp-1">{article.author}</span>
                        <span className="text-slate-400 text-[10px] block">{article.authorRole}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveArticleModal(article)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors group-hover:translate-x-1"
                    >
                      <span>Baca</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* Reader Modal */}
      <ArticleDetailModal
        article={activeArticleModal}
        onClose={() => setActiveArticleModal(null)}
      />
    </section>
  );
};