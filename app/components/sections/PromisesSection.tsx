import { Icon, type IconName } from "@/app/components/ui/Icon";

const promises: Array<{ icon: IconName; title: string; description: string }> = [
  { icon: "truck", title: "Free Shipping", description: "On orders over £30" },
  { icon: "leaf", title: "Eco-Certified", description: "100% sustainable materials" },
  { icon: "star", title: "Highly Rated", description: "Trusted by customers" },
  { icon: "check", title: "30-Day Returns", description: "Hassle-free guarantee" },
];

export function PromisesSection() {
  return (
    <section className="bg-brand-pale/30 backdrop-blur-xl mt-20 md:mt-24 py-16 md:py-20 px-6 md:px-[var(--spacing-horizontal)]">
      <div className="max-w-[var(--max-width)] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        {promises.map((item) => (
          <div key={item.title} className="text-center">
            <div className="mx-auto mb-4 text-brand-mid flex justify-center">
              <Icon name={item.icon} size={40} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-base font-semibold text-brand-deep mb-1.5">
              {item.title}
            </h3>
            <p className="text-sm text-mid-gray">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
