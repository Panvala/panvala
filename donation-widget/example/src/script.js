import debug from './debug';

debug('boot');

let notification;
let button;
window.onload = onLoad;

function onLoad() {
  showExampleCode();

  notification = document.querySelector('.notification');
  button = document.querySelector('button');
  button.onclick = onStartDonation;
}

function onStartDonation(e) {
  e.preventDefault();
  e.stopPropagation();

  debug('donating..');

  const close = window.panvala({
    to: '0xcADB5e3FC3AdeF3Dd9edD1C6F1C0b3149d3901B8',
    defaultUSDAmount: 50,
    async onDonate(transactionHash) {
      debug('donated %s!', transactionHash);

      button.innerHTML = 'Donated <span style="font-family: none;">✓</span>';
      await notify(
        'success',
        'Thank you!',
        'Waiting for transaction to be mined..'
      );
      button.innerHTML = 'Donate';
      close();
    },
    onError(e) {
      close();
      debug('charge error %s', e.message);
      notify('error', 'An unexpected error occured.', e.message);
    },
    onCancel() {
      debug('user cancelled donation');
    },
  });
}

async function notify(type, title, message) {
  const [titleEl, messageEl] = notification.querySelectorAll('div');
  titleEl.innerText = title;
  messageEl.innerText = message;

  showNotification(type, true);
  await sleep(4000);
  showNotification(type, false);
}

function showNotification(type, show) {
  const types = ['success', 'error'];
  types.forEach(t => {
    notification.classList[t === type ? 'add' : 'remove'](t);
  });
  notification.classList[show ? 'remove' : 'add']('hidden');
  button.innerHTML = show
    ? 'Donated <span style="font-family: none;">✓</span>'
    : 'Donate';
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showExampleCode() {
  const jsHost =
    process.env.NODE_ENV === 'production'
      ? 'https://panvala-example.surge.sh/js/script.js'
      : 'http://localhost:3401/script.js';
  document.querySelector('code').innerText = `
<button id='donation-button'>Donate</button>

<script src='${jsHost}'></script>
<script>
  const button = document.getElementById('donation-button');
  button.onclick = function() {
    const closeModal = window.panvala({
      to: '0x..',
      defaultUSDAmount: 50,
      onDonate(transactionHash) {
        console.log('donated at %s!', transactionHash);
        closeModal();
      },
    });
  };
</script>`;
}
