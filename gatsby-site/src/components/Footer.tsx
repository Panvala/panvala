import * as React from 'react';

import logoWhite from '../img/logo-white.png';
import logoTwitter from '../img/twitter.png';
import logoDiscord from '../img/discord.png';
import logoGithub from '../img/github.png';
import privacyPolicy from '../img/docs/panvala-privacy-policy.pdf';

export default () => (
  <>
    <section className="bg-gradient">
      <nav className="dt w-70-l w-80-m w-90 border-box pv4 center dt h-100">
        <div className="dtc-ns db flex-ns flex-column-ns justify-between-ns h-100-ns w-100-l w-100-m">
          <div className="w-100">
            <a className="dtc-ns db v-mid link w-100-ns w-60 pb0-ns pb2" href="https://panvala.com" title="Home">
              <img alt="" src={logoWhite} className="dib w-60" />
            </a>
          </div>
        </div>
        <div className="dtc-ns db w-70-l w-70-m w-100 v-top tr-ns tl">
          
        </div>
      </nav>
      <hr className="hr-white" />
      <p className="ma0 f7 lh-text tc white-60 pb3">
        2022 © PANVALA |{' '}
        <a
          href={privacyPolicy}
          target="_blank"
          rel="noopener noreferrer"
          className="link dim white-60"
        >
          Privacy Policy
        </a>
      </p>
    </section>
  </>
);
