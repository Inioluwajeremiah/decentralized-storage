const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Decentralized File Storage", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function DecStorageFixture() {
    
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const DecStorage = await ethers.getContractFactory("DecStorage");
    const decStorage = await DecStorage.deploy();

    return { decStorage, owner, otherAccount };
  }

  describe("Deployment", function () {
    console.log("user account", userAccount.address);
    it ("Add file", async () => {
      const {decStorage, owner} = await loadFixture(DecStorageFixture);
      await (expect(decStorage.createPost("file meta data"))).
      to.emit(decStorage, "addFile").withArgs(1, "file meta data");

      expect(await decStorage.blogCounter()).to.equal(1);

      const files = await decStorage.files(1)

      expect(files.id).to.equal(1)
      expect(files.filemetadata).to.equal("post meta data")

    })

    it ("Test for input validation at createPost", async () => {
      const {decStorage, userAccount} = await loadFixture(DecStorageFixture);

      await (expect(decStorage.createPost(""))).to.be.revertedWith("metadata is required")
    })
  });
});
