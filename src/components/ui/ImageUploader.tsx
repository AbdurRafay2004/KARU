import { useState, useCallback, useRef, useEffect } from 'react';
import { UploadCloud, X, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
    existingUrls: string[];
    onExistingUrlsChange: (urls: string[]) => void;
    pendingFiles: File[];
    onPendingFilesChange: (files: File[]) => void;
    maxFiles?: number;
    maxSizeMB?: number;
}

export function ImageUploader({
    existingUrls,
    onExistingUrlsChange,
    pendingFiles,
    onPendingFilesChange,
    maxFiles = 5,
    maxSizeMB = 5,
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [failedUrls, setFailedUrls] = useState<Set<number>>(new Set());
    // Store object URLs for clean up
    const [objectUrls, setObjectUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const totalImages = existingUrls.length + pendingFiles.length;

    // Generate and clean up object URLs for pending files to prevent memory leaks
    useEffect(() => {
        const newUrls = pendingFiles.map((file) => URL.createObjectURL(file));
        setObjectUrls(newUrls);

        return () => {
            newUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [pendingFiles]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (totalImages < maxFiles) setIsDragging(true);
    }, [totalImages, maxFiles]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const processFiles = useCallback((files: FileList | File[]) => {
        const validFiles: File[] = [];
        let skippedSize = 0;
        let skippedType = 0;

        Array.from(files).forEach((file) => {
            if (!file.type.startsWith('image/')) {
                skippedType++;
                return;
            }
            if (file.size > maxSizeMB * 1024 * 1024) {
                skippedSize++;
                return;
            }
            if (totalImages + validFiles.length < maxFiles) {
                validFiles.push(file);
            }
        });

        if (skippedType > 0 || skippedSize > 0) {
            let errorMsg = '';
            if (skippedType > 0) errorMsg += `${skippedType} file(s) skipped (must be images). `;
            if (skippedSize > 0) errorMsg += `${skippedSize} file(s) skipped (exceeded ${maxSizeMB}MB).`;
            alert(errorMsg);
        }

        if (validFiles.length > 0) {
            onPendingFilesChange([...pendingFiles, ...validFiles]);
        }
    }, [pendingFiles, totalImages, maxFiles, maxSizeMB, onPendingFilesChange]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    }, [processFiles]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(e.target.files);
        }
        // Reset input so the same file can be selected again if removed
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        if (totalImages >= maxFiles) return;

        const items = e.clipboardData.items;
        const pastedFiles: File[] = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                if (file) pastedFiles.push(file);
            }
        }

        if (pastedFiles.length > 0) {
            e.preventDefault(); // Prevent pasting into other inputs if focused on dropzone
            processFiles(pastedFiles);
        }
    }, [processFiles, totalImages, maxFiles]);

    const handleAddUrl = () => {
        if (!urlInput.trim()) return;

        try {
            new URL(urlInput); // basic validation
            if (totalImages < maxFiles) {
                onExistingUrlsChange([...existingUrls, urlInput.trim()]);
                setUrlInput('');
            }
        } catch (e) {
            alert('Please enter a valid URL');
        }
    };

    const removeExisting = (index: number) => {
        const newUrls = [...existingUrls];
        newUrls.splice(index, 1);
        onExistingUrlsChange(newUrls);
    };

    const removePending = (index: number) => {
        const newFiles = [...pendingFiles];
        newFiles.splice(index, 1);
        onPendingFilesChange(newFiles);
    };

    return (
        <div className="space-y-4">
            {/* Header / Instructions */}
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-karu-charcoal">
                    Product Images ({totalImages}/{maxFiles})
                </span>
                <span className="text-karu-stone">
                    Max size: {maxSizeMB}MB
                </span>
            </div>

            {/* Dropzone & Paste Area */}
            <div
                className={`
                    relative rounded-karu border-2 border-dashed p-8 text-center transition-colors cursor-pointer
                    ${isDragging
                        ? 'border-karu-terracotta bg-karu-terracotta/5'
                        : 'border-karu-sand hover:border-karu-clay/50 bg-karu-cream/30'
                    }
                    ${totalImages >= maxFiles ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onPaste={handlePaste}
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    disabled={totalImages >= maxFiles}
                />
                <div className="flex flex-col items-center gap-2 pointer-events-none">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-karu-terracotta">
                        <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-karu-charcoal font-medium mt-2">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-karu-stone text-sm">
                        You can also press <kbd className="px-1 py-0.5 bg-white border border-karu-sand rounded text-xs">Ctrl+V</kbd> to paste
                    </p>
                </div>
            </div>

            {/* External URL Input */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-karu-stone" />
                    <input
                        type="url"
                        placeholder="Or paste an image URL here..."
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
                        className="w-full pl-9 pr-4 py-2 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20 text-sm"
                        disabled={totalImages >= maxFiles}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAddUrl}
                    disabled={!urlInput.trim() || totalImages >= maxFiles}
                    className="px-4 py-2 bg-karu-charcoal text-white rounded-karu text-sm font-medium hover:bg-karu-charcoal/90 transition-colors disabled:opacity-50"
                >
                    Add URL
                </button>
            </div>

            {/* Preview Grid */}
            {totalImages > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4 border-t border-karu-sand">
                    {/* Existing URLs Preview */}
                    {existingUrls.map((url, index) => (
                        <div key={`url-${index}`} className="relative aspect-square rounded-karu overflow-hidden border border-karu-sand group">
                            <img
                                src={url}
                                alt={`Existing preview ${index}`}
                                className="w-full h-full object-cover"
                                onError={() => {
                                    setFailedUrls(prev => new Set(prev).add(index));
                                }}
                            />
                            {/* Fallback icon if image fails to load */}
                            {failedUrls.has(index) && (
                                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                    <ImageIcon className="text-karu-stone w-8 h-8" />
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => removeExisting(index)}
                                className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 shadow-sm transition-all hover:bg-red-50"
                                title="Remove image"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] px-2 py-1 truncate">
                                Remote Link
                            </div>
                        </div>
                    ))}

                    {/* Pending Files Preview */}
                    {pendingFiles.map((file, index) => {
                        const objectUrl = objectUrls[index];
                        if (!objectUrl) return null; // Wait for useEffect
                        return (
                            <div key={`file-${index}`} className="relative aspect-square rounded-karu overflow-hidden border-2 border-karu-terracotta/30 group">
                                <img
                                    src={objectUrl}
                                    alt={`Upload preview ${index}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePending(index)}
                                    className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 shadow-sm transition-all hover:bg-red-50"
                                    title="Cancel upload"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="absolute bottom-0 inset-x-0 bg-karu-terracotta/90 text-white text-[10px] px-2 py-1 truncate">
                                    {(file.size / 1024 / 1024).toFixed(1)}MB • Pending
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
