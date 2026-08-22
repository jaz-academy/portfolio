"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  AcademicCapIcon, 
  EnvelopeIcon, 
  ArrowRightOnRectangleIcon 
} from "@heroicons/react/24/outline";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      {/* Floating Button (Terlihat terus menerus) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-gray-900/80 px-4 py-2 text-sm font-medium text-gray-400 shadow-xl backdrop-blur-md transition-all hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="hidden sm:inline">Search</span>
        <kbd className="rounded-md bg-white/10 px-2 py-1 text-xs font-sans">
          ⌘K
        </kbd>
      </button>

      {/* Modal Command Palette */}
      {open && (
        <div className="relative z-50">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-0 flex items-start justify-center pt-[20vh] sm:pt-[25vh] p-4">
        <Command 
          className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-2xl ring-1 ring-white/5"
        >
          <div className="flex items-center border-b border-white/10 px-3">
            <Command.Input 
              placeholder="Type a command or search..." 
              className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm text-white placeholder-gray-400 focus:outline-none"
              autoFocus
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 text-sm text-gray-300">
            <Command.Empty className="py-6 text-center text-sm text-gray-400">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="px-2 text-xs font-medium text-gray-500 py-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#home"))}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 select-none hover:bg-white/10 aria-selected:bg-indigo-500/20 aria-selected:text-indigo-400"
              >
                <HomeIcon className="size-4" />
                Go to Home
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#about"))}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 select-none hover:bg-white/10 aria-selected:bg-indigo-500/20 aria-selected:text-indigo-400"
              >
                <UserIcon className="size-4" />
                Go to About
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#projects"))}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 select-none hover:bg-white/10 aria-selected:bg-indigo-500/20 aria-selected:text-indigo-400"
              >
                <BriefcaseIcon className="size-4" />
                Go to Projects
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#skills"))}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 select-none hover:bg-white/10 aria-selected:bg-indigo-500/20 aria-selected:text-indigo-400"
              >
                <AcademicCapIcon className="size-4" />
                Go to Education & Learning
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#contact"))}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 select-none hover:bg-white/10 aria-selected:bg-indigo-500/20 aria-selected:text-indigo-400"
              >
                <EnvelopeIcon className="size-4" />
                Go to Contact
              </Command.Item>
            </Command.Group>

            <Command.Group heading="System" className="px-2 text-xs font-medium text-gray-500 py-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/login"))}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 select-none hover:bg-white/10 aria-selected:bg-indigo-500/20 aria-selected:text-indigo-400"
              >
                <ArrowRightOnRectangleIcon className="size-4" />
                Login to Dashboard
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
    )}
    </>
  );
}
