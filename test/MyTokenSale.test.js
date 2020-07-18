require("dotenv").config(
    { path: "../.env" }
)
const MyTokenSale = artifacts.require("MyTokenSale");
const MyToken = artifacts.require("MyToken");
const KycContract = artifacts.require("KycContract");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

contract("Token Sale Test", async (accounts) => {
    const [deployerAccount, receipient, anotherAccount] = accounts;

    it("Should not have any tokens in my deployer account", async () => {
        let instance = await MyToken.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("tokens should be in token sale smart contract by default", async () => {
        let instance = await MyToken.deployed();
        return expect(instance.balanceOf(MyTokenSale.address)).to.eventually.be.a.bignumber.equal(process.env.INITIAL_TOKENS);
    });

    it("should be possible to transfer tokens", async () => {
        let tokenInstance = await MyToken.deployed();
        let tokenSaleInstance = await MyTokenSale.deployed();
        let kycContractInstance = await KycContract.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        await kycContractInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.eventually.be.fulfilled;
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(balanceBefore + 1));
    })
})