"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import IconPicker from "./IconPicker";

export default function ProfileForm({
  initialData,
}: {
  initialData: {
    image: string;
    name: string;
    role: string;
    location: string;
    email: string;
    whatsapp: string;
    linkCv: string;
    shortBio: string;
    longBio: string;
    availability: string;
    skill: string;
    summaries: any[];
    stats: any[];
    socialLinks: any[];
  };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.image || null,
  );

  const [summaries, setSummaries] = useState<any[]>(
    initialData.summaries || [],
  );
  const [stats, setStats] = useState<any[]>(initialData.stats || []);
  const [socialLinks, setSocialLinks] = useState<any[]>(
    initialData.socialLinks || [],
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    let imageUrl = initialData?.image || "";
    const imageFile = formData.get("imageFile") as File;

    if (imageFile && imageFile.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (!uploadRes.ok) {
          throw new Error("Gagal upload gambar");
        }

        const uploadResult = await uploadRes.json();
        imageUrl = uploadResult.url;
      } catch (err) {
        alert("Gagal upload gambar profile");
        setLoading(false);
        return;
      }
    }

    let cvUrl = initialData?.linkCv || "";
    const cvFile = formData.get("cvFile") as File;

    if (cvFile && cvFile.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", cvFile);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (!uploadRes.ok) {
          throw new Error("Gagal upload CV");
        }

        const uploadResult = await uploadRes.json();
        cvUrl = uploadResult.url;
      } catch (err) {
        alert("Gagal upload CV profile");
        setLoading(false);
        return;
      }
    }

    try {
      const payload = {
        name: formData.get("name"),
        role: formData.get("role"),
        location: formData.get("location"),
        email: formData.get("email"),
        whatsapp: formData.get("whatsapp"),
        link_cv: cvUrl,
        image: imageUrl,
        short_bio: formData.get("short_bio"),
        long_bio: formData.get("long_bio"),
        availability: formData.get("availability"),
        skill: formData.get("skill"),
        summaries: summaries,
        stats: stats,
        social_links: socialLinks,
      };

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Profile berhasil diupdate!");
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
      className="space-y-8 max-w-4xl bg-gray-800 p-8 rounded-xl ring-1 ring-white/10"
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">
            Nama
          </label>
          <input
            required
            type="text"
            name="name"
            defaultValue={initialData?.name}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">
            Role
          </label>
          <input
            required
            type="text"
            name="role"
            defaultValue={initialData?.role}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            defaultValue={initialData?.email}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">
            Location
          </label>
          <input
            required
            type="text"
            name="location"
            defaultValue={initialData?.location}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">
            WhatsApp Link
          </label>
          <input
            required
            type="url"
            name="whatsapp"
            defaultValue={initialData?.whatsapp}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">
            Availability
          </label>
          <select
            name="availability"
            defaultValue={initialData?.availability}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm [&>option]:bg-gray-800"
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">
            File CV (PDF)
          </label>
          <input
            type="file"
            name="cvFile"
            accept="application/pdf"
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-400"
          />
          {initialData?.linkCv && (
            <p className="mt-2 text-xs text-green-400">
              CV sudah terupload. Pilih file baru untuk menggantinya.
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-300">
            Hero Image
          </label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-400"
          />
          <p className="mt-2 text-xs text-gray-400">
            Gambar akan tampil di bagian About Me.
          </p>
          {previewImage && (
            <div className="mt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage}
                alt="Profile image preview"
                referrerPolicy="no-referrer"
                className="h-32 w-auto object-cover rounded"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">
          Short Bio
        </label>
        <textarea
          required
          name="short_bio"
          rows={2}
          defaultValue={initialData?.shortBio}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">
          Long Bio
        </label>
        <textarea
          required
          name="long_bio"
          rows={4}
          defaultValue={initialData?.longBio}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-300">
          Skill Summary
        </label>
        <textarea
          required
          name="skill"
          rows={3}
          defaultValue={initialData?.skill}
          className="mt-2 block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2"></div>

      <div className="space-y-6 border-t border-white/10 pt-6">
        <h3 className="text-lg font-medium text-white">Data Lanjutan</h3>

        {/* Feature Summaries */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium leading-6 text-gray-300">
              Feature Summaries
            </label>
            <button
              type="button"
              onClick={() =>
                setSummaries([
                  ...summaries,
                  { name: "", description: "", icon_name: "CheckCircleIcon" },
                ])
              }
              className="text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-2 py-1 rounded"
            >
              Add Summary
            </button>
          </div>
          {summaries.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-start bg-white/5 p-4 rounded-md relative pt-8"
            >
              <button
                type="button"
                onClick={() =>
                  setSummaries(summaries.filter((_, i) => i !== index))
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
                    const newArr = [...summaries];
                    newArr[index].icon_name = val;
                    setSummaries(newArr);
                  }}
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const newArr = [...summaries];
                      newArr[index].name = e.target.value;
                      setSummaries(newArr);
                    }}
                    className="block w-full rounded-md border-0 bg-gray-900 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    value={item.description}
                    onChange={(e) => {
                      const newArr = [...summaries];
                      newArr[index].description = e.target.value;
                      setSummaries(newArr);
                    }}
                    rows={2}
                    className="block w-full rounded-md border-0 bg-gray-900 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium leading-6 text-gray-300">
              Stats
            </label>
            <button
              type="button"
              onClick={() =>
                setStats([...stats, { id: Date.now(), name: "", value: "" }])
              }
              className="text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-2 py-1 rounded"
            >
              Add Stat
            </button>
          </div>
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-center bg-white/5 p-4 rounded-md relative pt-8"
            >
              <button
                type="button"
                onClick={() => setStats(stats.filter((_, i) => i !== index))}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs font-medium"
              >
                Remove
              </button>
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">Name</label>
                <input
                  required
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const newArr = [...stats];
                    newArr[index].name = e.target.value;
                    setStats(newArr);
                  }}
                  className="block w-full rounded-md border-0 bg-gray-900 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-400 mb-1">
                  Value
                </label>
                <input
                  required
                  type="text"
                  value={item.value}
                  onChange={(e) => {
                    const newArr = [...stats];
                    newArr[index].value = e.target.value;
                    setStats(newArr);
                  }}
                  className="block w-full rounded-md border-0 bg-gray-900 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 sm:text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium leading-6 text-gray-300">
              Social Links
            </label>
            <button
              type="button"
              onClick={() =>
                setSocialLinks([
                  ...socialLinks,
                  {
                    id: Date.now(),
                    href: "",
                    label: "",
                    description: "",
                    icon_name: "LinkIcon",
                  },
                ])
              }
              className="text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-2 py-1 rounded"
            >
              Add Link
            </button>
          </div>
          {socialLinks.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-start bg-white/5 p-4 rounded-md relative pt-8"
            >
              <button
                type="button"
                onClick={() =>
                  setSocialLinks(socialLinks.filter((_, i) => i !== index))
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
                    const newArr = [...socialLinks];
                    newArr[index].icon_name = val;
                    setSocialLinks(newArr);
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
                      onChange={(e) => {
                        const newArr = [...socialLinks];
                        newArr[index].label = e.target.value;
                        setSocialLinks(newArr);
                      }}
                      className="block w-full rounded-md border-0 bg-gray-900 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 sm:text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">
                      URL (href)
                    </label>
                    <input
                      required
                      type="url"
                      value={item.href}
                      onChange={(e) => {
                        const newArr = [...socialLinks];
                        newArr[index].href = e.target.value;
                        setSocialLinks(newArr);
                      }}
                      className="block w-full rounded-md border-0 bg-gray-900 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Description
                  </label>
                  <input
                    required
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const newArr = [...socialLinks];
                      newArr[index].description = e.target.value;
                      setSocialLinks(newArr);
                    }}
                    className="block w-full rounded-md border-0 bg-gray-900 py-1.5 px-3 text-white ring-1 ring-inset ring-white/10 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-500 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Profile"}
        </button>
      </div>
    </form>
  );
}
