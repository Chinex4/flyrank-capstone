type PlaceholderCardProps = {
  title: string;
  description: string;
  items?: string[];
};

export function PlaceholderCard({
  title,
  description,
  items = [],
}: PlaceholderCardProps) {
  return (
    <section className="placeholder-card" aria-labelledby={`${title}-heading`}>
      <div className="grid gap-4">
        <div>
          <h2 id={`${title}-heading`} className="text-2xl font-semibold">
            {title}
          </h2>
          <p className="mt-2 text-secondary-text">{description}</p>
        </div>
        {items.length > 0 ? (
          <div className="placeholder-grid">
            {items.map((item) => (
              <div className="metric-card" key={item}>
                <p className="text-sm font-medium text-primary-text">{item}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
