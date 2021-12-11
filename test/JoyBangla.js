var JoyBangla = artifacts.require("JoyBangla")
contract("JoyBangla", function (accounts) {
    it("initialize the contract with the current value", function () {
        return JoyBangla.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.name();

        }).then(function (name) {
            assert.equal(name, "JoyBangla", "has the correct name")
            return tokenInstance.symbol();
        }).then(function (symbol) {
            assert.equal(symbol, "JB", "has the correct symbol")

        });
    });

    it("allocates total supply upon development", function () {
        return JoyBangla.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, "sets total supply to 1,000,000");
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function (adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, "it allocates the initial supply to the admin balance");

        });
    });

    it('transfers token ownership', function () {
        return JoyBangla.deployed().then(function (instance) {
            tokenInstance = instance;
            // Test `require` statement first by transferring something larger than the sender's balance
            return tokenInstance.transfer.call(accounts[1], 999999999999);
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 2500, {
                from: accounts[0]
            });
        }).then(function (success) {
            assert.equal(success, true, 'it returns true');
            return tokenInstance.transfer(accounts[1], 2500, {
                from: accounts[0]
            });
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 2500, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function (balance) {
            assert.equal(balance.toNumber(), 2500, 'adds the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function (balance) {
            assert.equal(balance.toNumber(), 997500, 'deducts the amount from the sending account');
        });
    });
});