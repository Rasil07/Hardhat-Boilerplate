const { expect } = require("chai");

describe("Token Contract", () => {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  //   it("Deployment should assign total supply of tokens to the owner", async () => {
  //     const [owner] = await ethers.getSigners();

  //     const Token = await ethers.getContractFactory("Token");

  //     const hardhatToken = await Token.deploy();

  //     const ownerBalance = await hardhatToken.balanceOf(owner.address);

  //     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  //   });
  beforeEach(async () => {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    hardhatToken = await Token.deploy();
  });

  describe("Deployment", () => {
    it("should set the right owner", async () => {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign total supply of tokens to the owner", async () => {
      const ownerBalacne = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalacne);
    });
  });

  describe("Transactions", () => {
    it("Should transfer tokens between addresses", async () => {
      await hardhatToken.transfer(addr1.address, 50);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    });

    it("Should fail if sender doesnt have enough tokens ", async () => {
      const inititalOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await hardhatToken.balanceOf(owner.address)).to.equals(
        inititalOwnerBalance
      );
    });
  });
});
