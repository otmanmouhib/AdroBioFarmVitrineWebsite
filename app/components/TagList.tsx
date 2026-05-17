export default function TagList({ tags, max }: { tags?: string[]; max?: number }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  const shownTags = max ? tags.slice(0, max) : tags;

  return (
    <div className="chips">
      {shownTags.map((tag) => (
        <span key={tag} className="tagChip">#{tag}</span>
      ))}
    </div>
  );
}
