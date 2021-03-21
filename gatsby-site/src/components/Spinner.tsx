import React from 'react';

interface SpinnerProps {
  background?: string;
  color?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  [key: string]: any;
}

const Spinner = (props: SpinnerProps) => {
  const {
    background,
    color,
    width,
    height,
    marginTop,
    ...passedInProps
  } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="lds-rolling"
      style={{
        background: background || 'none',
        width: width || '20px',
        height: height || '20px',
        marginTop: marginTop || '1rem',
      }}
      {...passedInProps}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        ng-attr-stroke="{{config.color}}"
        ng-attr-stroke-width="{{config.width}}"
        ng-attr-r="{{config.radius}}"
        ng-attr-stroke-dasharray="{{config.dasharray}}"
        stroke={color || '#67D0CA'}
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="rotate(17.3945 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default Spinner;
