"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getIconComponent } from "@/utils/iconMapper";

// Menggunakan type any sementara agar tidak bentrok jika type Project di database berbeda sedikit
interface ProjectImageCardProps {
  project: any;
  className: string;
}

export default function ProjectImageCard({
  project,
  className,
}: ProjectImageCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // Dummy initial likes for demo purposes (e.g., length of title * 3)
  const initialLikes = (project.title?.length || 5) * 3;
  const [likes, setLikes] = useState(initialLikes);

  let projectLinks = [];
  if (project.link) {
    try {
      if (project.link.startsWith('[')) {
        projectLinks = JSON.parse(project.link);
      } else {
        projectLinks = [{ label: "Visit Project", href: project.link, icon_name: "LinkIcon" }];
      }
    } catch (e) {
      projectLinks = [{ label: "Visit Project", href: project.link, icon_name: "LinkIcon" }];
    }
  }

  const images = typeof project.image === 'string' ? project.image.split(',').map((u: string) => u.trim()).filter(Boolean) : [];
  const primaryImage = images.length > 0 ? images[0] : '';
  
  const hasVideo = !!project.video;
  const totalSlides = (hasVideo ? 1 : 0) + images.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  let isYoutube = false;
  let youtubeEmbedUrl = "";
  if (hasVideo) {
    if (project.video.includes('youtube.com') || project.video.includes('youtu.be')) {
      isYoutube = true;
      const videoIdMatch = project.video.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (videoIdMatch && videoIdMatch[1]) {
        youtubeEmbedUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1&mute=1`;
      } else {
        youtubeEmbedUrl = project.video;
      }
    }
  }

  return (
    <>
      {/* Kartu Gambar yang bisa diklik */}
      <figure
        onClick={() => setIsOpen(true)}
        className={`group relative min-h-80 cursor-pointer overflow-hidden rounded-lg ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={primaryImage}
          alt={project.imageAlt || project.title}
          className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
          <div>
            <p className="text-sm font-semibold text-indigo-400">{project.category || 'Uncategorized'}</p>
            <p className="text-lg font-bold text-white">{project.title}</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15"
        />
      </figure>

      {/* Modal Dialog */}
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-50" onClose={() => {
          setIsOpen(false);
          // reset carousel to first slide on close
          setTimeout(() => setCurrentSlide(0), 300);
        }}>
          {/* Latar Belakang Gelap */}
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-gray-900 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl ring-1 ring-white/10">
                  
                  {/* Tombol Close */}
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-10">
                    <button
                      type="button"
                      className="rounded-md bg-gray-900/50 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Konten Modal */}
                  <div className="flex flex-col">
                    {/* Gambar Header Modal Carousel */}
                    <div className="relative h-64 sm:h-96 w-full bg-black group">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {(() => {
                           const isVideoSlide = hasVideo && currentSlide === 0;
                           const imageIndex = hasVideo ? currentSlide - 1 : currentSlide;
                           
                           if (isVideoSlide) {
                             return isYoutube ? (
                               <iframe
                                 src={youtubeEmbedUrl}
                                 allow="autoplay; encrypted-media"
                                 allowFullScreen
                                 className="absolute inset-0 size-full"
                               />
                             ) : (
                               <video
                                 src={project.video}
                                 autoPlay
                                 loop
                                 muted
                                 playsInline
                                 className="absolute inset-0 size-full object-cover"
                               />
                             );
                           } else {
                             return (
                               /* eslint-disable-next-line @next/next/no-img-element */
                               <img 
                                 src={images[imageIndex]} 
                                 alt={`${project.title} - ${imageIndex + 1}`} 
                                 className="absolute inset-0 size-full object-cover"
                               />
                             );
                           }
                        })()}
                      </div>
                      
                      {/* Controls */}
                      {totalSlides > 1 && (
                        <>
                          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {Array.from({ length: totalSlides }).map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentSlide(idx);
                                }}
                                className={`h-2 w-2 rounded-full ${idx === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      {/* Gradient Overlay bawah gambar agar teks terlihat jelas jika diletakkan di atas */}
                      {(!hasVideo || currentSlide > 0) && <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none"></div>}
                    </div>

                    {/* Deskripsi */}
                    <div className="px-6 py-8 sm:px-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                          {project.category || 'Project'}
                        </span>
                        {project.year && (
                          <span className="text-sm text-gray-400">{project.year}</span>
                        )}
                      </div>
                      
                      <DialogTitle as="h3" className="text-3xl font-bold leading-6 text-white mb-6">
                        {project.title}
                      </DialogTitle>
                      
                      <div className="prose prose-invert max-w-none text-gray-300">
                        <p className="whitespace-pre-wrap leading-relaxed">{project.description}</p>
                      </div>

                      <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
                        {/* Optimistic UI Like Button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (isLiked) {
                              setIsLiked(false);
                              setLikes((prev) => prev - 1);
                            } else {
                              setIsLiked(true);
                              setLikes((prev) => prev + 1);
                            }
                            // Di sini normalnya kita menembak API (fetch POST), tapi UI sudah update seketika!
                          }}
                          className={`group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                            isLiked 
                              ? 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/50 hover:bg-rose-500/30' 
                              : 'bg-white/5 text-gray-400 ring-1 ring-white/10 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={isLiked ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`size-5 transition-transform group-active:scale-75 ${isLiked ? 'text-rose-500' : ''}`}
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                          <span>{likes}</span>
                        </button>

                        <div className="flex gap-4 items-center">
                          {projectLinks.map((linkObj: any, idx: number) => {
                            const Icon = getIconComponent(linkObj.icon_name);
                            return (
                              <a
                                key={idx}
                                href={linkObj.href.startsWith('http') ? linkObj.href : `https://${linkObj.href}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex justify-center items-center gap-2 rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                              >
                                <Icon className="size-4" />
                                {linkObj.label}
                              </a>
                            );
                          })}
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                            onClick={() => setIsOpen(false)}
                          >
                            Tutup
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
