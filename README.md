# Setup

---

# 01 Fallback
The security issue in this contract is in the `receive` function, which is a fallback function that is executed when a contract receives Ether without specifying any function to call.   

The receive function allows anyone to become the owner of the contract by sending a transaction with non-zero Ether value and having a non-zero contribution balance.
