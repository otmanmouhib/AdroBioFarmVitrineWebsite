export default function TagList({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="chips">
      {tags.map((tag) => (
        <span key={tag} className="tagChip">#{tag}</span>
      ))}
    </div>
  );
}
