'use client';

import { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImageUpload({ onImageUpload, disabled = false }) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validação do arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, seleciona apenas ficheiros de imagem');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('A imagem deve ter menos de 10MB');
      return;
    }

    setIsUploading(true);

    try {
      // Preview local da imagem
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);

      // Simular upload para Cloudinary (versão simplificada para teste)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Callback com dados da imagem
      onImageUpload({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      });

      toast.success('Imagem carregada com sucesso!');

    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Erro ao carregar imagem. Tenta novamente.');
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
      // Limpar input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removePreview = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      {/* Preview da imagem */}
      {previewImage && (
        <div className="mb-2 relative inline-block">
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-xs max-h-32 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
          />
          <button
            onClick={removePreview}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
            disabled={isUploading}
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Input de arquivo oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Botão de upload */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || isUploading}
        className={`p-2 rounded-full transition-all duration-200 ${
          disabled || isUploading
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-900/50 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transform hover:scale-105'
        }`}
        title="Carregar imagem matemática"
      >
        {isUploading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <ImageIcon size={20} />
        )}
      </button>

      {/* Informação sobre tipos suportados */}
      {!previewImage && !disabled && (
        <div className="absolute top-full left-0 mt-1 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          JPG, PNG, WebP • Máx. 10MB
        </div>
      )}
    </div>
  );
}