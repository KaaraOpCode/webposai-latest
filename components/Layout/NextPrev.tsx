import React from 'react';

interface NextPrevProps {
  onNext?: () => void;
  onPrev?: () => void;
  disableNext?: boolean;
  disablePrev?: boolean;
  nextLabel?: string;
  prevLabel?: string;
}

export default function NextPrev({
  onNext,
  onPrev,
  disableNext = false,
  disablePrev = false,
  nextLabel = 'Next',
  prevLabel = 'Previous',
}: NextPrevProps) {
  return (
    <div className="flex justify-between items-center space-x-4 mt-6">
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {prevLabel}
      </button>

      <button
        onClick={onNext}
        disabled={disableNext}
        className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {nextLabel}
      </button>
    </div>
  );
}
