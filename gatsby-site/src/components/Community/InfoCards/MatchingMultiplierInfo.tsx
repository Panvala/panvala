import React from 'react';

interface MatchingMultiplierInfoProps {
  image: any;
  title: string;
  multiplier: string;
}

const MatchingMultiplierInfo = (props: MatchingMultiplierInfoProps) => {
  const { image, title, multiplier } = props;

  return (
    <div className="w-60-l bg-white ml5 br3 mv3 pa4 shadow-5">
      <div className="flex pv2">
        <div className="w-50-l h4 ml3">
          <img className="h-100" src={image} alt={title} />
        </div>
        <div className="w-50-l h4 white relative">
          <div className="pa4 tc bg-blue dib br-100 absolute right-0" style={{ top: '-4.5rem' }}>
            <div className="f6 fw1">Matching</div>
            <div className="f2 b pa1">{multiplier}x</div>
            <div className="f6 fw1">Multiplier</div>
          </div>
        </div>
      </div>
      <div className="ml3 pv2">
        <h2>{title}</h2>
        <p>Your donation earns <strong>{multiplier}x</strong> matching from Panvala on average!</p>
      </div>
    </div>
  );
};

export default MatchingMultiplierInfo;
