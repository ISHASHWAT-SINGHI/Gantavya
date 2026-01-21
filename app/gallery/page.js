'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X, ZoomIn } from 'lucide-react'

// Placeholder images from Unsplash (Tech/Event themed)
const photos = [
    { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop', alt: 'Tech Event Crowd', span: 'col-span-2 row-span-2' },
    { id: 2, src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop', alt: 'Coding Hackathon', span: 'col-span-1 row-span-1' },
    { id: 3, src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', alt: 'Cybersecurity', span: 'col-span-1 row-span-1' },
    { id: 4, src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop', alt: 'Robotics Workshop', span: 'col-span-1 row-span-2' },
    { id: 5, src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop', alt: 'Team Collaboration', span: 'col-span-1 row-span-1' },
    { id: 6, src: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=2070&auto=format&fit=crop', alt: 'Hardware Projects', span: 'col-span-2 row-span-1' },
    { id: 7, src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop', alt: 'Student Group', span: 'col-span-1 row-span-1' },
    { id: 8, src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop', alt: 'Lab Work', span: 'col-span-1 row-span-1' },
    { id: 9, src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop', alt: 'Presentation', span: 'col-span-1 row-span-1' },
]

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState(null)

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden pb-20">
            <Navbar />

            <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-orange-500/5 pointer-events-none" />

            <div className="pt-24 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Gallery</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Moments from our past events. Witness the innovation and energy.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
                    {photos.map((photo, idx) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`relative group overflow-hidden rounded-xl border border-gray-800 ${photo.span}`}
                            onClick={() => setSelectedImage(photo)}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                                <div className="text-center p-4">
                                    <p className="text-white font-bold text-lg mb-2">{photo.alt}</p>
                                    <ZoomIn className="w-8 h-8 text-cyan-400 mx-auto" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-5xl bg-black/90 border-gray-800 p-0 overflow-hidden">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    {selectedImage && (
                        <div className="relative w-full h-[80vh]">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white text-xl font-bold text-center">{selectedImage.alt}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
        </div>
    )
}
