import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, Image, File, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./button";
import { Progress } from "./progress";

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  onUploadComplete?: (uploadedFiles: UploadedFile[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
}

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onUploadComplete,
  multiple = true,
  accept = "*/*",
  maxSize = 10, // 10MB default
  maxFiles = 5,
  className = "",
  disabled = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type if accept is specified
    if (accept !== "*/*") {
      const acceptedTypes = accept.split(",").map(type => type.trim());
      const fileType = file.type;
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type;
        }
        return fileType.match(new RegExp(type.replace('*', '.*')));
      });

      if (!isAccepted) {
        return `File type not supported. Accepted types: ${accept}`;
      }
    }

    return null;
  };

  const processFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    // Check max files limit
    if (fileArray.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`);
    }

    // Validate each file
    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert(`Upload errors:\n${errors.join('\n')}`);
    }

    if (validFiles.length > 0) {
      onFileSelect(validFiles);

      // Simulate upload process
      setUploading(true);
      const newUploadedFiles: UploadedFile[] = validFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        progress: 0,
        status: 'uploading'
      }));

      setUploadedFiles(prev => [...prev, ...newUploadedFiles]);

      // Simulate upload progress
      newUploadedFiles.forEach((uploadedFile, index) => {
        const interval = setInterval(() => {
          setUploadedFiles(prev =>
            prev.map(f =>
              f.id === uploadedFile.id
                ? { ...f, progress: Math.min(f.progress + Math.random() * 30, 100) }
                : f
            )
          );
        }, 200);

        // Complete upload after random time
        setTimeout(() => {
          clearInterval(interval);
          setUploadedFiles(prev =>
            prev.map(f =>
              f.id === uploadedFile.id
                ? { ...f, progress: 100, status: 'completed' }
                : f
            )
          );

          // Check if all uploads are complete
          setTimeout(() => {
            setUploadedFiles(prev => {
              const allCompleted = prev.every(f => f.status === 'completed');
              if (allCompleted) {
                setUploading(false);
                onUploadComplete?.(prev);
              }
              return prev;
            });
          }, 500);
        }, 2000 + index * 500);
      });
    }
  }, [onFileSelect, onUploadComplete, maxSize, accept, maxFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles, disabled]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && !disabled) {
      processFiles(e.target.files);
    }
  }, [processFiles, disabled]);

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-6 h-6 text-blue-500" />;
    }
    if (file.type.includes('pdf')) {
      return <FileText className="w-6 h-6 text-red-500" />;
    }
    return <File className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {isDragOver ? 'Drop files here' : 'Upload Documents'}
        </h3>
        <p className="text-gray-600 mb-4">
          Drag and drop files here, or click to select files
        </p>
        <p className="text-sm text-gray-500">
          Max file size: {maxSize}MB • Max files: {maxFiles} • Accepted: {accept}
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h4 className="font-medium text-gray-900">Upload Progress</h4>
            {uploadedFiles.map((uploadedFile) => (
              <motion.div
                key={uploadedFile.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
              >
                {getFileIcon(uploadedFile.file)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {uploadedFile.status === 'uploading' && (
                    <div className="w-20">
                      <Progress value={uploadedFile.progress} className="h-2" />
                    </div>
                  )}

                  {uploadedFile.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}

                  {uploadedFile.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(uploadedFile.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Status */}
      {uploading && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Uploading files... Please wait
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

