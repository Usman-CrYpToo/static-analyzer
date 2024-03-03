//SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.8.0;

contract test {
    event hello(string indexed a);
     uint256 num;
     bool k = true;
     uint256[5] num1;

     function setNum(uint256 _num ) public returns(bytes32){
         num += _num;
         num1[1] = num1[1] + _num;
         require(num > 0, "num > 0");
         if(k == true){
             k = false;
         }

     return  keccak256(abi.encodePacked("usman","usman"));
     }

     function getNum() public payable  returns(uint256){
             require(tx.origin == msg.sender, "tx.origin != msg.sender");
        for(int i = 0; i < 5; i++) {
            payable(msg.sender).transfer(msg.value);
        }
         return 1;
     }

     function approve(address _spender, uint256 _amount) public  returns(bool){
        require(tx.origin == msg.sender, "tx.origin != msg.sender");
        (bool success, ) =  _spender.call{value : _amount}("");
        return success;
     }
}