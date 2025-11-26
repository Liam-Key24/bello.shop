/**
 * Product title - displays product name
 */
export default function ProductTitle({ name }: { name: string }) {
  return <h1 className="text-5xl font-bold mb-2">{name}</h1>;
}

