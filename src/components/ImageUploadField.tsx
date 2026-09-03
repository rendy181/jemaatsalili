import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, RefreshCw } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  helpText?: string;
  recommendedSize?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  helpText = 'Pilih file gambar dari komputer/HP Anda (JPG, PNG, WebP) atau masukkan link URL.',
  recommendedSize,
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar (JPG, PNG, WebP, GIF).');
      return;
    }

    // Limit to 5MB for localStorage performance
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file gambar maksimal 5MB agar performa website tetap cepat.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all ${
              mode === 'upload'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'hover:text-blue-700'
            }`}
          >
            <Upload className="w-2.5 h-2.5" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all ${
              mode === 'url'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'hover:text-blue-700'
            }`}
          >
            <LinkIcon className="w-2.5 h-2.5" />
            <span>URL Link</span>
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />

          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-4 text-center transition-all flex flex-col items-center justify-center gap-2 ${
              isDragging
                ? 'border-blue-500 bg-blue-50/80 scale-[1.01]'
                : value
                ? 'border-blue-200 bg-blue-50/30 hover:bg-blue-50/60'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
            }`}
          >
            {value ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-blue-200 shrink-0 bg-slate-100 shadow-xs">
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Gambar Berhasil Dipilih</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    Klik area ini untuk mengganti file gambar lain.
                  </p>
                  {recommendedSize && (
                    <span className="text-[10px] text-blue-600 font-medium block">
                      Rekomendasi: {recommendedSize}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange('');
                  }}
                  className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                  title="Hapus gambar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Klik untuk memilih file gambar atau tarik & lepas (Drag & Drop)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Mendukung JPG, PNG, WEBP (Maksimal 5MB)
                  </p>
                  {recommendedSize && (
                    <span className="text-[10px] text-blue-600 font-semibold block mt-1">
                      Ukuran disarankan: {recommendedSize}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/... atau URL file gambar"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs"
                title="Hapus URL"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {value && (
            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
              <img
                src={value}
                alt="Preview URL"
                className="w-12 h-12 rounded-lg object-cover border border-slate-300"
                referrerPolicy="no-referrer"
              />
              <span className="text-[11px] text-slate-600 truncate flex-1">
                Preview gambar dari link aktif
              </span>
            </div>
          )}
        </div>
      )}

      {helpText && <p className="text-[10px] text-slate-400">{helpText}</p>}
    </div>
  );
};
