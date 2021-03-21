import * as React from 'react';

function DonateButton({ handleClick, text, disabled }: any) {
  return (
    <div>
      <input
        type="submit"
        name="submit"
        onClick={handleClick}
        className="f6 link pointer dim bn br-pill pv3 ph4 white bg-teal fw7 mt4"
        disabled={disabled}
        value={text ? text : 'Donate'}
      />
    </div>
  );
}

export default DonateButton;
