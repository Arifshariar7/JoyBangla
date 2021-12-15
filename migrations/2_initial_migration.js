const JoyBangla = artifacts.require("./JoyBangla.sol"); // contracts to communicte with client site application
const JoyBanglaSale = artifacts.require("./JoyBanglaSale.sol"); // contracts to communicte with client site application
module.exports = function (deployer) {
    deployer.deploy(JoyBangla, 1000000).then(function () {
        // Token price is 0.001 Ether
        var tokenPrice = 1000000000000000;
        return deployer.deploy(JoyBanglaSale, JoyBangla.address, tokenPrice);
    })
};