import { Multiply } from '@assets/svg/icon';

export const MultiplyButton = ({ click, disabled, className, children }) => {
  return (
    <button
      onClick={
        disabled
          ? () => {
              return false;
            }
          : click
      }
      type="button"
      className={`${className} hover:bg-gray-300 active:bg-gray-300`}
      disabled={disabled}
    >
      {children}
      <Multiply className="w-7 h-7 text-orange" />
    </button>
  );
};
