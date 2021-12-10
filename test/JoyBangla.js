var JoyBangla = artifacts.require("JoyBangla")
contract("JoyBangla", function (accounts) {

    it("sets total supply upon development", function () {
        return JoyBangla.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, "sets total supply to 1,000,000");
        });
    });


});