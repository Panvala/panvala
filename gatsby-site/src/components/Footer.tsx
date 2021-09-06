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
            <a className="dtc-ns db v-mid link w-100-ns w-60 pb0-ns pb2" href="/" title="Home">
              <img alt="" src={logoWhite} className="dib w-60" />
            </a>
            <div className="dt mv3">
              <a
                href="https://twitter.com/PanvalaHQ"
                rel="noopener noreferrer"
                target="_blank"
                className="link dim dtc pr4"
              >
                <img alt="" src={logoTwitter} className="w2" />
              </a>
              <a
                href="https://discord.gg/yZmYZbf"
                rel="noopener noreferrer"
                target="_blank"
                className="link dim dtc pr4"
              >
                <img alt="" src={logoDiscord} className="w2" />
              </a>
              <a
                href="https://github.com/Panvala/panvala"
                target="_blank"
                rel="noopener noreferrer"
                className="link dim dtc"
              >
                <img alt="" src={logoGithub} className="w2" />
              </a>
            </div>
          </div>
          <a
            href="https://tha.panvala.com"
            rel="noopener noreferrer"
            target="_blank"
            className="link dim white f6 fw7"
          >
            Join the Panvala community today
          </a>
        </div>
        <div className="dtc-ns db w-70-l w-70-m w-100 v-top tr-ns tl">
          <div className="dib v-top mr5-l mr3-m mr4 pr2 tl mt0-ns mt4">
            <h3 className="f3-l f5 ma0 white mb3">Individuals</h3>
            <a
              href="https://twitter.com/PanvalaHQ"
              rel="noopener noreferrer"
              target="_blank"
              className="link dim white-60 f5-l f6 db mb3-ns mb2"
            >
              Follow @PanvalaHQ on Twitter
            </a>
            <a
              href="https://app.uniswap.org/#/swap?outputCurrency=0xd56dac73a4d6766464b38ec6d91eb45ce7457c44&use=V2"
              rel="noopener noreferrer"
              target="_blank"
              className="link dim white-60 f5-l f6 db mb3-ns mb2"
            >
              Get PAN Tokens
            </a>
            <a href="https://tha.panvala.com/" target="_blank" className="link dim white-60 f5-l f6 db mb3-ns mb2">
              Join the THA
            </a>
          </div>
          <div className="dib v-top mr5-l mr3-m mr4 pr2 tl mt0-ns mt4">
            <h3 className="f3-l f5 ma0 white mb3">Communities</h3>
            <a href="mailto:membership@panvala.com?subject=We want to join the Panvala League!" target="_blank" className="link dim white-60 f5-l f6 db mb3-ns mb2">
              Join the Panvala League
            </a>
            <a href="/staking" className="link dim white-60 f5-l f6 db mb3-ns mb2">
              Stake PAN for Your Community
            </a>
          </div>
        </div>
      </nav>
      <hr className="hr-white" />
      <p className="ma0 f7 lh-text tc white-60 pb3">
        2020 © PANVALA |{' '}
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
