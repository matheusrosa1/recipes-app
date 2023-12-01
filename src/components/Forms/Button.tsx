export type ButtonProps = {
  dataTestId: string;
  onClick: () => void;
  buttonLabel: string;
};

export function Button(props: ButtonProps) {
  const { dataTestId, onClick, buttonLabel } = props;
  return (
    <button
      className="btn-category"
      data-testid={ dataTestId }
      onClick={ onClick }
    >
      {buttonLabel}
    </button>
  );
}
