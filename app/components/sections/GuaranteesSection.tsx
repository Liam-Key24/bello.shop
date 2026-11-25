import { GlassCard } from "@/app/components/ui/GlassCard";
import { Icon, type IconName } from "@/app/components/ui/Icon";

const guarantees: Array<{ icon: IconName; title: string; description: string }> = [
  {
    icon: "check",
    title: "Quality Guarantee",
    description:
      "Every product is carefully tested and built to last. If you're not completely satisfied, we'll make it right.",
  },
  {
    icon: "globe",
    title: "Carbon Neutral",
    description:
      "We offset 100% of our shipping emissions and use plastic-free packaging for all our deliveries.",
  },
  {
    icon: "heart",
    title: "Give Back",
    description:
      "5% of every purchase supports environmental conservation projects around the world.",
  },
];

export function GuaranteesSection() {
  return (
    <section className="px-6 md:px-[var(--spacing-horizontal)] py-20 md:py-[140px]">
      <div className="max-w-[var(--max-width)] mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2>Our Promise</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {guarantees.map((item) => (
            <GlassCard key={item.title} padding="lg" className="text-center">
              <div className="mx-auto mb-6 text-brand flex justify-center">
                <Icon name={item.icon} size={56} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl text-charcoal mb-4">
                {item.title}
              </h3>
              <p className="text-base text-mid-gray leading-relaxed">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
