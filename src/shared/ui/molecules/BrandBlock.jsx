export default function BrandBlock({ title, subtitle }) {
  return (
    <div className="brand">
      <strong>{title}</strong>
      {subtitle ? <span>{subtitle}</span> : null}
    </div>
  );
}
