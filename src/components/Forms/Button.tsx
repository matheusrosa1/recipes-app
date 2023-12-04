export type ButtonProps = {
  dataTestId: string;
  onClick: () => void;
  buttonLabel: string;
  disabled?: boolean;
  id?: string;
};

export function Button({
  dataTestId,
  onClick,
  buttonLabel,
  disabled = false,
  id = '',
}: ButtonProps) {
  return (
    <button
      // className="btn-category"
      data-testid={ dataTestId }
      onClick={ onClick }
      disabled={ disabled }
      id={ id }
    >
      {buttonLabel}
    </button>
  );
}
