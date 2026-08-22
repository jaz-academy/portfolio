"use client";

import { motion } from "framer-motion";
import { getIconComponent } from "@/utils/iconMapper";

interface InteractiveSkillCardProps {
  feature: {
    name: string;
    description: string;
    icon_name: string;
  };
  index: number;
}

export default function InteractiveSkillCard({ feature, index }: InteractiveSkillCardProps) {
  const Icon = getIconComponent(feature.icon_name);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="relative pl-16 rounded-2xl p-4 transition-colors hover:bg-white/5 cursor-pointer group"
    >
      <dt className="text-base/7 font-semibold text-white">
        <div className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-lg bg-indigo-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg group-hover:shadow-indigo-500/50">
          <Icon aria-hidden="true" className="size-6 text-white" />
        </div>
        {feature.name}
      </dt>
      <dd className="mt-2 text-base/7 text-gray-400 group-hover:text-gray-300 transition-colors">
        {feature.description}
      </dd>
    </motion.div>
  );
}
