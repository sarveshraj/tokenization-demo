require("dotenv").config(
    { path: "../.env" }
)
const MyToken = artifacts.require("MyToken");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

contract("Token Test", async (accounts) => {
    const [deployerAccount, receipient, anotherAccount] = accounts;

    beforeEach(async () => {
        this.myToken = await MyToken.new(process.env.INITIAL_TOKENS);
    })

    it("All tokens should be in my account", async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("Is possible to send tokens between accounts", async () => {
        const sendTokens = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(receipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(receipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    })

    it("Is not possible to send more tokens than available", async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();

        expect(instance.transfer(receipient, new BN(totalSupply + 1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    })
})