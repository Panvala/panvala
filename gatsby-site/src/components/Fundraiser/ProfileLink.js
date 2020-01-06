import React from 'react';
import copySvg from '../../img/copy.svg';

function copyT() {
  var copyText = document.querySelector('#input-copy');
  copyText.select();
  document.execCommand('copy');

  console.log('copyText:', copyText);
}

export function ProfileLink(props) {
  return (
    <>
      <input readOnly id="input-copy" value={props.href} />
      <img src={copySvg} onClick={copyT} />
    </>
  );
}
