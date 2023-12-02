export type ButtonProps = {
  dataTestId: string;
  onClick: () => void;
  buttonLabel: string;
  disabled?: boolean;
};

export function Button({
  dataTestId,
  onClick,
  buttonLabel,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      // className="btn-category"
      data-testid={ dataTestId }
      onClick={ onClick }
      disabled={ disabled }
    >
      {buttonLabel}
    </button>
  );
}
