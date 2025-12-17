import { motion } from "framer-motion";
import { Activity, Dumbbell, Heart, Scale, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgLight: string;
}

const SERVICES: Service[] = [
  {
    icon: Activity,
    title: "Affinement et tonification",
    description:
      "Programme ciblé pour affiner la silhouette et tonifier les zones clés grâce à l'EMS.",
    color: "from-emerald-500 via-teal-500 to-cyan-600",
    bgLight: "bg-emerald-500/10",
  },
  {
    icon: Dumbbell,
    title: "Performance sportive",
    description:
      "Accompagnement pour développer ta force, ton explosivité et ta résistance à l'effort.",
    color: "from-blue-500 via-cyan-500 to-sky-600",
    bgLight: "bg-sky-500/10",
  },
  {
    icon: Heart,
    title: "Bien-être et récupération",
    description:
      "Séances dédiées à la récupération musculaire et à la détente après l'effort.",
    color: "from-pink-500 via-rose-500 to-fuchsia-600",
    bgLight: "bg-rose-500/10",
  },
  {
    icon: Scale,
    title: "Gestion du poids",
    description:
      "Programme structuré pour accompagner la perte de poids et le maintien des résultats.",
    color: "from-orange-500 via-amber-500 to-yellow-600",
    bgLight: "bg-amber-500/10",
  },
];

export default function Services() {
  return (
    <section className="mt-24 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-3 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 px-4 py-2 text-xs font-semibold text-orange-600 ring-1 ring-orange-200/50">
          Nos services
        </span>
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Des programmes complets pour
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            vos membres
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-base text-gray-600">
          ElectroMed s&apos;adapte à chaque objectif : perte de poids, performance
          sportive ou simple bien-être.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2">
        {SERVICES.map((service: Service, index: number) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-sm p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:border-transparent hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Animated background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
              />
              <div
                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${service.color} opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`}
              />

              <div className="relative flex items-start gap-6">
                <div className="relative">
                  <div
                    className={`flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl`}
                  >
                    <Icon className="h-9 w-9 transition-transform group-hover:scale-110" />
                  </div>
                  <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 blur-xl transition-opacity group-hover:opacity-30`} />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all">
                      {service.title}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-gray-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-purple-500 group-hover:scale-110" />
                  </div>
                  <p className="text-base leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
