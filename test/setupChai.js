"use strict";

var chai = require("chai");
const bitNumber = web3.utils.BN;
const chaiBitNumber = require("chai-bn")(bitNumber);

chai.use(chaiBitNumber);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

module.exports = chai;