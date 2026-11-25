export interface PageHeadingProps {
  title: string;
  className?: string;
}

export function PageHeading({ title, className = "" }: PageHeadingProps) {
  return (
    <header className={`mb-12 md:mb-16 ${className}`}>
      <h1>{title}</h1>
    </header>
  );
}
