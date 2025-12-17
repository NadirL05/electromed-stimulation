import { motion } from "framer-motion";
import { Activity, Dumbbell, Heart, Scale, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const SERVICES: Service[] = [
  {
    icon: Scale,
    title: "Perte de poids",
    description:
      "Programme intensif pour brûler les graisses et sculpter votre silhouette en seulement 20 minutes.",
    color: "bg-orange-500",
  },
  {
    icon: Dumbbell,
    title: "Renforcement musculaire",
    description:
      "Développez votre masse musculaire et votre force avec notre technologie EMS de pointe.",
    color: "bg-purple-600",
  },
  {
    icon: Activity,
    title: "Performance sportive",
    description:
      "Améliorez votre explosivité et votre endurance pour atteindre vos objectifs sportifs.",
    color: "bg-blue-500",
  },
  {
    icon: Heart,
    title: "Bien-être & Récupération",
    description:
      "Détendez vos muscles et accélérez votre récupération après l'effort.",
    color: "bg-emerald-500",
  },
];

export default function Services() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold text-purple-600 uppercase tracking-wider">
          Nos programmes
        </span>
        <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
          Un programme pour <span className="text-orange-500">chaque objectif</span>
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-gray-600">
          L'électrostimulation s'adapte à vos besoins : perte de poids, performance ou récupération.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service: Service, index: number) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${service.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {service.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-orange-500 opacity-0 transition-opacity group-hover:opacity-100">
                En savoir plus
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
