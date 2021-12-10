const Migrations = artifacts.require("JoyBangla"); // contracts to communicte with client site application

module.exports = function (deployer) {
    deployer.deploy(Migrations);
};