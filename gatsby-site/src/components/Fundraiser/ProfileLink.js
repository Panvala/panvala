import React from 'react';
import copySvg from '../../img/copy.svg';

function copyT() {
  var copyText = document.querySelector('#input-copy');
  copyText.select();
  document.execCommand('copy');

  console.log('copyText:', copyText);
}

export function ProfileLink() {
  const link = 'https://link.io';
  return (
    <>
      <input readOnly id="input-copy" value={link} />
      <img src={copySvg} onClick={copyT} />
    </>
  );
}
