type FolioLabelProps = {
  section: string;
  detail?: string;
  index?: string;
};

export function FolioLabel({ detail, index, section }: FolioLabelProps) {
  return (
    <p className="folio-label">
      {index ? <span className="folio-label__index">{index}</span> : null}
      <span>{section}</span>
      {detail ? <span className="folio-label__detail">{detail}</span> : null}
    </p>
  );
}
