"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import IconPicker from "./IconPicker";

export default function ProjectForm({
  initialData,
  categories,
}: {
  initialData?: {
    id: number;
    title: string;
    description: string;
    image: string;
    video?: string;
    link?: string;
    year: number;
    category_id: number;
    featured: boolean;
  };
  categories: { id: number; name: string }[];
}) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [loading, setLoading] = useState(false);
  const existingImages = initialData?.image ? initialData.image.split(',').map(u => u.trim()) : [];
  const [previewImages, setPreviewImages] = useState<string[]>(existingImages);

  let initialLinks = [];
  try {
    if (initialData?.link) {
      if (initialData.link.startsWith('[')) {
        initialLinks = JSON.parse(initialData.link);
      } else {
        // Fallback for old single link
        initialLinks = [{ id: Date.now(), label: "Visit Project", href: initialData.link, icon_name: "LinkIcon" }];
      }
    }
  } catch (e) {
    initialLinks = [{ id: Date.now(), label: "Visit Project", href: initialData?.link || "", icon_name: "LinkIcon" }];
  }
  const [projectLinks, setProjectLinks] = useState<any[]>(initialLinks);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Create previews for new files
      setPreviewImages(files.map(file => URL.createObjectURL(file)));
    } else {
      setPreviewImages(existingImages);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    let imageUrl = initialData?.image || "";
    
    const imageFiles = formData.getAll("imageFiles") as File[];
    const validImageFiles = imageFiles.filter(f => f.size > 0);

    if (validImageFiles.length > 0) {
      const uploadedUrls: string[] = [];
      for (const file of validImageFiles) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        try {
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: uploadData,
          });
          if (!uploadRes.ok) throw new Error("Gagal upload gambar");
          const uploadResult = await uploadRes.json();
          uploadedUrls.push(uploadResult.url);
        } catch (err) {
          alert("Gagal upload salah satu gambar");
          setLoading(false);
          return;
        }
      }
      imageUrl = uploadedUrls.join(",");
    } else if (!isEdit && !imageUrl) {
      alert("Gambar wajib diisi untuk project baru");
      setLoading(false);
      return;
    }

    let videoUrl = initialData?.video || "";
    const videoFile = formData.get("videoFile") as File;
    const videoLink = formData.get("videoLink") as string;

    if (videoFile && videoFile.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", videoFile);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error("Gagal upload video");

        const uploadResult = await uploadRes.json();
        videoUrl = uploadResult.url;
      } catch (err) {
        alert("Gagal upload video");
        setLoading(false);
        return;
      }
    } else if (videoLink !== null && videoLink !== undefined) {
      videoUrl = videoLink;
    }

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      category_id: Number(formData.get("category_id")),
      image: imageUrl,
      video: videoUrl,
      link: projectLinks.length > 0 ? JSON.stringify(projectLinks) : "",
      year: Number(formData.get("year")),
      featured: formData.get("featured") === "on",
    };

    try {
      const url = isEdit ? `/api/projects/${initialData.id}` : "/api/projects";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/dashboard/projects");
        router.refresh();
      } else {
        const err = await res.json();
        alert("Error: " + (err.error || "Gagal menyimpan data"));
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl bg-gray-800 p-8 rounded-xl ring-1 ring-white/10"
    >
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">
          Judul Project
        </label>
        <input
          required
          type="text"
          name="title"
          defaultValue={initialData?.title}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">
          Deskripsi
        </label>
        <textarea
          required
          name="description"
          rows={4}
          defaultValue={initialData?.description}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
      </div>

      {/* Project Links */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium leading-6 text-gray-300">
            Project Links (Opsional)
          </label>
          <button
            type="button"
            onClick={() =>
              setProjectLinks([
                ...projectLinks,
                {
                  id: Date.now(),
                  href: "",
                  label: "Visit Link",
                  icon_name: "LinkIcon",
                },
              ])
            }
            className="text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-2 py-1 rounded"
          >
            Add Link
          </button>
        </div>
        <p className="text-xs text-gray-400">
          Tambahkan link eksternal terkait project ini (Instagram, YouTube, Website, dll).
        </p>
        
        {projectLinks.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 items-start bg-white/5 p-4 rounded-md relative pt-8"
          >
            <button
              type="button"
              onClick={() =>
                setProjectLinks(projectLinks.filter((_, i) => i !== index))
              }
              className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs font-medium"
            >
              Remove
            </button>
            <div className="w-48 shrink-0">
              <label className="block text-xs text-gray-400 mb-1">Icon</label>
              <IconPicker
                value={item.icon_name}
                onChange={(val) => {
                  const newArr = [...projectLinks];
                  newArr[index].icon_name = val;
                  setProjectLinks(newArr);
                }}
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 mb-1">
                    Label
                  </label>
                  <input
                    required
                    type="text"
                    value={item.label}
                    placeholder="e.g. Website, Instagram"
                    onChange={(e) => {
                      const newArr = [...projectLinks];
                      newArr[index].label = e.target.value;
                      setProjectLinks(newArr);
                    }}
                    className="block w-full rounded-md border-0 bg-gray-900 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 mb-1">
                    URL
                  </label>
                  <input
                    required
                    type="url"
                    value={item.href}
                    placeholder="https://..."
                    onChange={(e) => {
                      const newArr = [...projectLinks];
                      newArr[index].href = e.target.value;
                      setProjectLinks(newArr);
                    }}
                    className="block w-full rounded-md border-0 bg-gray-900 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">
            Kategori
          </label>
          <select
            name="category_id"
            defaultValue={initialData?.category_id || categories[0]?.id}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&>option]:bg-gray-800"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">
            Tahun
          </label>
          <input
            required
            type="number"
            name="year"
            defaultValue={initialData?.year || new Date().getFullYear()}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">
          Gambar Project
        </label>
        {previewImages.length > 0 && (
          <div className="mb-3 flex gap-3 overflow-x-auto pb-2">
            {previewImages.map((src, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={i}
                src={src}
                alt={`Preview ${i}`}
                referrerPolicy="no-referrer"
                className="h-32 w-auto object-cover rounded shrink-0"
              />
            ))}
          </div>
        )}
        <input
          type="file"
          name="imageFiles"
          accept="image/*"
          multiple
          required={!isEdit}
          onChange={handleImageChange}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-400"
        />
        {isEdit && (
          <p className="mt-2 text-xs text-gray-400">
            Pilih gambar baru untuk mengganti semua gambar saat ini. Anda bisa memilih lebih dari 1 gambar.
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-white/10">
        <label className="block text-sm font-medium leading-6 text-gray-300">
          Video Project (Opsional)
        </label>
        <p className="mt-1 text-xs text-gray-400 mb-4">
          Upload video ke Google Drive atau paste link YouTube. Jika keduanya dikosongkan, modal hanya akan menampilkan gambar.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium leading-6 text-gray-400">
              Opsi 1: Upload File Video
            </label>
            <input
              type="file"
              name="videoFile"
              accept="video/*"
              className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium leading-6 text-gray-400">
              Opsi 2: Link Video (YouTube / Google Drive)
            </label>
            <input
              type="url"
              name="videoLink"
              defaultValue={initialData?.video}
              placeholder="https://youtube.com/watch?v=..."
              className="mt-1 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={initialData?.featured}
          className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900"
        />
        <label htmlFor="featured" className="text-sm leading-6 text-gray-300">
          Tampilkan sebagai Featured Project di halaman utama
        </label>
      </div>

      <div className="flex justify-end gap-x-4 border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Project"}
        </button>
      </div>
    </form>
  );
}
