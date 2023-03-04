# Setup

---

# 01 Fallback
The security issue in this contract is in the `receive` function, which is a fallback function that is executed when a contract receives Ether without specifying any function to call.   

The `receive` function allows anyone to become the owner of the contract by sending a transaction with non-zero Ether value and having a non-zero contribution balance.

Vulnerable function
```
receive() external payable {
    require(msg.value > 0 && contributions[msg.sender] > 0);
    owner = msg.sender;
  }
```

The steps should be:
1. Deploy the Fallback contract to the local blockchain environment.
2. Call the Contribution function to verify that you have a contribution balance of 1000 Ether.
3. Send a transaction to the Fallback contract with a non-zero Ether value to trigger the receive function. Make sure to set the gas limit high enough to accommodate the execution of the function.
4. Verify that you are now the owner of the contract by calling the owner function.
5. Call the withdraw function to withdraw all funds from the contract to your account.

The solution:
The attack works by first sending a contribution of 0.0009 Ether to the contract to increase the contribution balance of the attacker.  
Then, it sends a transaction with 0.001 Ether to the contract address to trigger the receive function, which updates the owner variable to the attacker address, giving the attacker full control over the contract.  
Finally, the attacker calls the withdraw function to withdraw all funds from the contract to their account.
