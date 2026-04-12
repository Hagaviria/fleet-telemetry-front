export default function SectionIntro({ title, description }) {
  return (
    <div className="panel-header">
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
