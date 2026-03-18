import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    Upload,
    Image as ImageIcon,
    Download,
    Sparkles,
    ChevronLeft,
    Trash2,
    Loader2,
    Scissors
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BackgroundRemover = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const processImage = async () => {
        if (!imageFile) return;
        setIsProcessing(true);

        const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
        if (!apiKey) {
            alert("Error: Hugging Face API key is missing. Please set VITE_HUGGINGFACE_API_KEY in your .env file.");
            setIsProcessing(false);
            return;
        }

        try {
            // We use native fetch because the @huggingface/inference SDK was causing OOM errors during Vite build
            const response = await fetch(
                "/api/hf/models/briaai/RMBG-1.4",
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                    method: "POST",
                    body: imageFile, // Sending the File directly as binary payload
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Hugging Face API Error:", errorText);

                // Check if it's a model loading error
                try {
                    const errorJson = JSON.parse(errorText);
                    if (errorJson.error && errorJson.error.includes("loading")) {
                        throw new Error(`Model is currently loading. Please wait ${Math.ceil(errorJson.estimated_time || 20)} seconds and try again.`);
                    }
                } catch (e) {
                    // Not JSON, just continue
                }

                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setResult(url);
        } catch (error) {
            console.error("Background removal failed:", error);
            const errorMessage = error instanceof Error ? error.message : "Background removal failed.";
            alert(`Background removal failed: ${errorMessage}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setImage(null);
        setImageFile(null);
        setResult(null);
    };

    return (
        <div className="bg-slate-50 h-full">

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <Link to="/ai-tools" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4">
                            <ChevronLeft size={18} />
                            <span className="text-sm font-medium">Back to AI Tools</span>
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-bold font-display text-slate-900">
                            AI Background <span className="text-primary">Remover</span>
                        </h1>
                        <p className="text-slate-600 mt-2">Remove backgrounds from any image in seconds with AI.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Upload Area */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-full flex flex-col">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Upload size={20} className="text-primary" />
                                    Upload Image
                                </h2>

                                {!image ? (
                                    <label className="flex-1 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-12 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                                        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <ImageIcon size={32} />
                                        </div>
                                        <p className="text-slate-900 font-bold mb-1">Click to upload</p>
                                        <p className="text-slate-500 text-sm">or drag and drop</p>
                                        <p className="text-slate-400 text-[10px] mt-4 uppercase tracking-widest">PNG, JPG, WEBP up to 10MB</p>
                                    </label>
                                ) : (
                                    <div className="flex-1 relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
                                        <img src={image} alt="Original" className="w-full h-full object-contain" />
                                        <button
                                            onClick={reset}
                                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-xl shadow-lg hover:bg-red-50 transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                )}

                                {image && !result && (
                                    <button
                                        onClick={processImage}
                                        disabled={isProcessing}
                                        className="w-full mt-6 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Removing Background...
                                            </>
                                        ) : (
                                            <>
                                                <Scissors size={20} />
                                                Remove Background
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Result Area */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-full flex flex-col">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Sparkles size={20} className="text-primary" />
                                    AI Result
                                </h2>

                                <div className="flex-1 border-2 border-slate-100 rounded-3xl bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
                                    {/* Checkerboard pattern for transparency preview */}
                                    <div className="absolute inset-0 opacity-5" style={{
                                        backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
                                        backgroundSize: '20px 20px',
                                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                    }} />

                                    {result ? (
                                        <div className="relative z-10 w-full h-full p-4">
                                            <img src={result} alt="Result" className="w-full h-full object-contain drop-shadow-2xl" />
                                        </div>
                                    ) : (
                                        <div className="relative z-10 text-center p-12">
                                            <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                                <Sparkles size={32} />
                                            </div>
                                            <p className="text-slate-400 font-medium">Your result will appear here</p>
                                        </div>
                                    )}
                                </div>

                                {result && (
                                    <button
                                        onClick={() => {
                                            const a = document.createElement("a");
                                            a.href = result;
                                            a.download = "background_removed.png";
                                            a.click();
                                        }}
                                        className="w-full mt-6 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                                    >
                                        <Download size={20} />
                                        Download PNG
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                <Scissors size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Precision Cut</h3>
                            <p className="text-slate-500 text-sm">Our AI detects subjects with pixel-perfect accuracy, even with complex hair or edges.</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-200">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                <ImageIcon size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">High Resolution</h3>
                            <p className="text-slate-500 text-sm">Download your images in the same resolution you uploaded. No quality loss.</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-200">
                            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                                <Sparkles size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">100% Free</h3>
                            <p className="text-slate-500 text-sm">No hidden costs or subscriptions. Unlimited background removals for everyone.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BackgroundRemover;
