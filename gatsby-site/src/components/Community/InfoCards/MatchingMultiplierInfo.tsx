import React from 'react';

interface MatchingMultiplierInfoProps {
  image: any;
  title: string;
  multiplier: number;
}

const MatchingMultiplierInfo = (props: MatchingMultiplierInfoProps) => {
  const { image, title, multiplier } = props;

  const InfoText = () => (
    <>
      <div className="f6-ns f7 fw1">Matching</div>
      <div className="f2-ns f3 b pa1">{multiplier}x</div>
      <div className="f6-ns f7 fw1">Multiplier</div>
    </>
  );

  return (
    <>
      <div className="w-60-l w-80-m w-100 center-m bg-white ml5-l b--black-10 br3-ns bn-ns mv3-ns pa4-l pa3-m pa2 bt shadow-5">
        <div className="flex pv2-ns">
          <div className="w-100 ml3">
            <img className="h4-ns h3 pv2-ns" src={image} alt={title} />
            <div className="pt2-ns">
              <div className="f3 b pv2-ns">{title}</div>
              <p className="">Your donation earns <strong>{multiplier}x</strong> matching from Panvala on average!</p>
            </div>
          </div>
          <div className="h4 white relative">
            <div className="pa4 tc bg-blue dib-l dn-m dn mr3 mr0-ns br-100 absolute right-0" style={{ top: '-4.5rem' }}>
              <InfoText />
            </div>
            <div className="pa4 tc bg-blue dib-m dn-l dn mr3 mr0-ns br-100 absolute right-0" style={{ top: '-4.5rem' }}>
              <InfoText />
            </div>
            <div className="pa4 tc bg-blue dib dn-ns mr3 mr0-ns br-100 absolute right-0 top--2">
              <InfoText />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchingMultiplierInfo;
