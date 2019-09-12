'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Buffer, ipfs; // prettier-ignore

var {
  formatEther,
  parseEther,
  parseUnits,
  formatUnits,
  hexlify,
  getAddress
} = ethers.utils;

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fullName: '',
      selectedAccount: '',
      step: null,
      error: false,
      message: '',
      tier: '',
      panPurchased: 0
    };
    this.handleClickDonate = this.handleClickDonate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.token;
    this.tokenCapacitor;
    this.exchange;
    this.provider;
  } // Setup ipfs, call other setup functions


  componentDidMount() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // helpers
      if (typeof window.IpfsHttpClient !== 'undefined') {
        var Ipfs = window.IpfsHttpClient;
        Buffer = Ipfs.Buffer;
        ipfs = new Ipfs({
          host: 'ipfs.infura.io',
          port: 5001,
          protocol: 'https'
        });
      } else {
        _this.setState({
          error: 'Ipfs client did not setup correctly.'
        });
      } // setup ethereum


      yield _this.setSelectedAccount();
      yield _this.setContracts();
    })();
  } // Setup provider & selected account


  setSelectedAccount() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (typeof window.ethereum !== 'undefined') {
        if (!_this2.provider) {
          _this2.provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        var selectedAccount = (yield _this2.provider.listAccounts())[0]; // user not enabled for this app

        if (!selectedAccount) {
          window.ethereum.enable().then(enabled => {
            selectedAccount = enabled[0];
          }).catch(error => {
            if (error.stack.includes('User denied account authorization')) {
              alert('MetaMask not enabled. In order to donate pan, you must authorize this app.');
            }
          });
        }

        _this2.setState({
          selectedAccount
        });

        return selectedAccount;
      } else {
        alert('MetaMask not found. Please download MetaMask @ metamask.io');
      }
    })();
  } // Setup contracts


  setContracts() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (typeof _this3.provider !== 'undefined') {
        var {
          chainId
        } = yield _this3.provider.getNetwork();

        var signer = _this3.provider.getSigner(); // Addresses


        var tokenAddress = chainId === 4 ? '0x4912d6aBc68e4F02d1FdD6B79ed045C0A0BAf772' : chainId === 1 && '0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44';
        var tcAddress = chainId === 4 ? '0xA062C59F42a45f228BEBB6e7234Ed1ea14398dE7' : chainId === 1 && '0x9a7B675619d3633304134155c6c976E9b4c1cfB3';
        var exchangeAddress = chainId === 4 ? '0x25EAd1E8e3a9C38321488BC5417c999E622e36ea' : chainId === 1 && '0xF53bBFBff01c50F2D42D542b09637DcA97935fF7'; // Get codes

        var tokenCode = yield _this3.provider.getCode(tokenAddress);
        var tcCode = yield _this3.provider.getCode(tcAddress);
        var exchangeCode = yield _this3.provider.getCode(exchangeAddress); // prettier-ignore

        if (!tokenAddress || !tcAddress || !exchangeAddress || !tokenCode || !tcCode || !exchangeCode) {
          throw new Error('Invalid address or no code at address.');
        } // Init token, token capacitor, uniswap exchange contracts


        _this3.token = new ethers.Contract(tokenAddress, tokenAbi, signer);
        _this3.tokenCapacitor = new ethers.Contract(tcAddress, tcAbi, signer);
        _this3.exchange = new ethers.Contract(exchangeAddress, exchangeABI, signer);
      } else {
        // No provider yet
        var account = yield _this3.setSelectedAccount();

        if (account) {
          yield _this3.setContracts();
        } else {
          // Invalid provider / provider not enabled for this site
          _this3.setState({
            error: 'You must login to MetaMask.'
          });

          return;
        }
      }
    })();
  } // Sell order (exact input) -> calculates amount bought (output)


  quoteEthToPan(etherToSpend) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      console.log(''); // Sell ETH for PAN

      var ethAmount = utils.BN(etherToSpend); // ETH reserve

      var inputReserve = yield _this4.provider.getBalance(_this4.exchange.address);
      console.log("ETH reserve: ".concat(formatEther(inputReserve))); // PAN reserve

      var outputReserve = yield _this4.token.balanceOf(_this4.exchange.address);
      console.log("PAN reserve: ".concat(formatUnits(outputReserve, 18)));
      var numerator = ethAmount.mul(outputReserve).mul(997);
      var denominator = inputReserve.mul(1000).add(ethAmount.mul(997));
      var panToReceive = numerator.div(denominator);
      console.log("quote ".concat(formatEther(ethAmount), " ETH : ").concat(formatUnits(panToReceive.toString(), 18), " PAN")); // EQUIVALENT, DIRECT CHAIN CALL
      // PAN bought w/ input ETH
      // const panToReceive = await this.exchange.getEthToTokenInputPrice(ethAmount);
      // console.log(`${formatEther(ethAmount)} ETH -> ${formatUnits(panToReceive, 18)} PAN`);

      return panToReceive;
    })();
  } // Check that provider & contracts are setup correctly


  checkEthereum() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      var account;

      try {
        account = getAddress(_this5.state.selectedAccount);
      } catch (_unused) {
        account = yield _this5.setSelectedAccount();

        if (!account) {
          var errMsg = 'You must be logged into MetaMask.';

          _this5.setState({
            error: errMsg
          });

          alert(errMsg);
          throw new Error(errMsg);
        }
      }

      if (typeof _this5.token === 'undefined') {
        yield _this5.setContracts();

        if (typeof _this5.token === 'undefined') {
          var _errMsg = 'Contracts not set correctly.';

          _this5.setState({
            error: _errMsg
          });

          alert(_errMsg);
          throw new Error(_errMsg);
        }
      }
    })();
  }

  setTier(monthUSD) {
    console.log('monthUSD:', monthUSD);

    switch (monthUSD) {
      case '5':
        return 'Student';

      case '15':
        return 'Gold';

      case '50':
        return 'Platinum';

      case '150':
        return 'Diamond';

      case '500':
        return 'Ether';

      case '1500':
        return 'Elite';

      default:
        throw new Error('invalid tier');
    }
  } // Click handler for donations


  handleClickDonate(e) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      e.preventDefault(); // make sure ethereum is hooked up properly

      try {
        yield _this6.checkEthereum();
      } catch (error) {
        console.error(error);
        throw error;
      }

      var pledgeFullName = document.getElementById('pledge-full-name');
      var pledgeEmail = document.getElementById('pledge-email');
      var pledgeMonthlySelect = document.getElementById('pledge-tier-select');
      var pledgeTermSelect = document.getElementById('pledge-duration-select');

      if (pledgeFullName.value === '') {
        alert('You must enter a full name.');
        return;
      }

      if (pledgeEmail.value === '') {
        alert('You must enter an email address.');
        return;
      }

      if (pledgeMonthlySelect.value === '0') {
        alert('You must select a pledge tier.');
        return;
      }

      if (pledgeTermSelect.value === '0') {
        alert('You must select a pledge duration.');
        return;
      }

      var tier = _this6.setTier(pledgeMonthlySelect.value);

      _this6.setState({
        tier,
        email: pledgeEmail.value,
        fullName: pledgeFullName.value,
        step: 1,
        message: 'Adding metadata to IPFS...'
      }); // Calculate pledge total value (monthly * term)


      var pledgeMonthlyUSD = parseInt(pledgeMonthlySelect.value, 10);
      var pledgeTerm = parseInt(pledgeTermSelect.value, 10);
      var pledgeTotal = utils.BN(pledgeMonthlyUSD).mul(pledgeTerm); // Get USD price of 1 ETH

      var ethPrice = yield utils.fetchEthPrice(); // Convert USD to ETH, print

      var ethAmount = utils.quoteUsdToEth(pledgeTotal, ethPrice).toString();
      console.log("".concat(pledgeTotal, " USD -> ").concat(ethAmount, " ETH")); // Convert to wei, print

      var weiAmount = parseEther(ethAmount);
      var panValue = yield _this6.quoteEthToPan(weiAmount); // PAN bought w/ 1 ETH

      yield _this6.quoteEthToPan(parseEther('1')); // Build donation object

      var donation = {
        version: '1',
        memo: "Pledge donation via uniswap",
        usdValue: utils.BN(pledgeTotal).toString(),
        ethValue: weiAmount.toString(),
        pledgeMonthlyUSD,
        pledgeTerm
      };
      console.log('donation:', donation);

      try {
        // Add to ipfs
        var {
          endpoint,
          headers
        } = _this6.getEndpointAndHeaders();

        var url = "".concat(endpoint, "/api/ipfs");
        var data = yield fetch(url, {
          method: 'POST',
          body: JSON.stringify(donation),
          headers
        });
        var multihash = yield data.json();
        console.log('multihash:', multihash); // Purchase Panvala pan

        yield _this6.purchasePan(donation, panValue); // Donate Panvala pan

        var txHash = yield _this6.donatePan(multihash);

        if (txHash) {
          var txData = _objectSpread({}, donation, {
            txHash,
            multihash
          });

          yield _this6.postAutopilot(txData);
          pledgeFullName.value = '';
          pledgeEmail.value = '';
          pledgeMonthlySelect.value = '0';
          pledgeTermSelect.value = '0';
        }
      } catch (error) {
        console.error("ERROR: ".concat(error.message));

        if (error.message.includes('Request timed out')) {
          alert('Uh oh! Something went wrong. Please try again (IPFS timed out).');
        }

        return _this6.setState({
          step: null,
          message: error.message,
          error: error.message
        });
      }
    })();
  }

  getEndpointAndHeaders() {
    var urlRoute = window.location.href; // const endpoint = 'http://localhost:5001'

    var endpoint = urlRoute.includes('staging/donate') ? 'https://staging-api.panvala.com' : 'https://api.panvala.com';
    var corsHeaders = {
      'Access-Control-Allow-Origin': endpoint,
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type'
    };

    var headers = _objectSpread({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, corsHeaders);

    return {
      endpoint,
      headers
    };
  }

  postAutopilot(txData) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      var postData = {
        email: _this7.state.email,
        fullName: _this7.state.fullName,
        txHash: txData.txHash,
        memo: txData.memo,
        usdValue: txData.usdValue,
        ethValue: txData.ethValue,
        pledgeMonthlyUSD: txData.pledgeMonthlyUSD,
        pledgeTerm: txData.pledgeTerm,
        multihash: txData.multihash
      };

      var {
        endpoint,
        headers
      } = _this7.getEndpointAndHeaders();

      var url = "".concat(endpoint, "/api/website");
      var data = yield fetch(url, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers
      });
      var json = yield data.json();
      console.log('json:', json);
    })();
  }

  getGasPrice() {
    return _asyncToGenerator(function* () {
      var egsData = yield fetch('https://ethgasstation.info/json/ethgasAPI.json');
      var gasPrices = yield egsData.json();
      console.log('gasPrices:', gasPrices);
      var gasPrice;

      if (gasPrices.fast) {
        gasPrice = parseUnits((gasPrices.fast / 10).toString(), 'gwei');
      }

      return gasPrice.toHexString();
    })();
  } // Sell ETH, buy PAN


  purchasePan(donation, panValue) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      // TODO: subtract a percentage
      var minTokens = utils.BN(panValue).sub(5000);
      var block = yield _this8.provider.getBlock();
      var deadline = utils.BN(block.timestamp).add(3600); // add one hour
      // Buy Pan with Eth

      try {
        _this8.setState({
          message: 'Purchasing PAN from Uniswap...'
        });

        var gasPrice = yield _this8.getGasPrice();
        var tx = yield _this8.exchange.functions.ethToTokenSwapInput(minTokens, deadline, {
          value: hexlify(utils.BN(donation.ethValue)),
          gasLimit: hexlify(1e6),
          gasPrice: gasPrice || hexlify(12e9)
        });
        console.log('tx:', tx);

        _this8.setState({
          message: 'Waiting for transaction confirmation...'
        }); // Wait for tx to get mined


        yield _this8.provider.waitForTransaction(tx.hash); // TODO: maybe wait for blocks

        var receipt = yield _this8.provider.getTransactionReceipt(tx.hash);
        console.log('receipt:', receipt);
        console.log(); // Get new quote

        console.log('NEW QUOTE');
        yield _this8.quoteEthToPan(donation.ethValue);
        yield _this8.quoteEthToPan(parseEther('1')); // Progress to step 2

        return _this8.setState({
          panPurchased: panValue,
          step: 2,
          message: 'Checking allowance...'
        });
      } catch (error) {
        console.error("ERROR: ".concat(error.message));
      }
    })();
  } // Donate PAN -> token capacitor
  // Approve if necessary


  donatePan(multihash) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      // Exit if user did not complete ETH -> PAN swap
      if (!_this9.state.panPurchased) {
        return _this9.setState({
          step: null,
          message: ''
        });
      } // Check allowance


      var allowed = yield utils.checkAllowance(_this9.token, _this9.state.selectedAccount, _this9.tokenCapacitor.address, _this9.state.panPurchased);

      if (allowed) {
        _this9.setState({
          message: 'Donating PAN...'
        });

        var gasPrice = yield _this9.getGasPrice(); // Donate PAN to token capacitor

        var donateTx = yield _this9.tokenCapacitor.functions.donate(_this9.state.selectedAccount, _this9.state.panPurchased, Buffer.from(multihash), {
          gasLimit: hexlify(1e6),
          // 1 MM
          gasPrice: gasPrice || hexlify(12e9) // 12 GWei

        }); // Wait for tx to be mined

        yield _this9.provider.waitForTransaction(donateTx.hash);

        _this9.setState({
          step: 3,
          message: _this9.state.tier
        });

        return donateTx.hash;
      } else {
        _this9.setState({
          message: 'Approving tokens...'
        }); // Approve token capacitor


        yield _this9.token.functions.approve(_this9.tokenCapacitor.address, ethers.constants.MaxUint256); // Call donate again

        return _this9.donatePan(multihash, _this9.state.panPurchased);
      }
    })();
  }

  handleCancel() {
    this.setState({
      step: null,
      message: ''
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement(DonateButton, {
      handleClick: this.handleClickDonate
    }), React.createElement(WebsiteModal, {
      isOpen: true,
      step: this.state.step,
      message: this.state.message,
      handleCancel: this.handleCancel
    }));
  }

}

ReactDOM.render(React.createElement(Root, null), document.querySelector('#root_container'));