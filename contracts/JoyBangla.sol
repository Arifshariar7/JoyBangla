pragma solidity >=0.4.22 <0.9.0;

contract JoyBangla{
    //name
    string public name="JoyBangla";
    //symbol & standard
    string public symbol="JB";
    string public standard="JoyBangla Token v1.0";

    // Read the total number of tokens
    uint256 public totalSupply;
    mapping(address=>uint256) public balanceOf; 
    mapping(address=>mapping(address=>uint256)) public allowance;
///Events
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value

    
    );
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    //Constructor

    constructor (uint256 _initialSupply) public{
    //Set total number of tokens

        balanceOf[msg.sender]=_initialSupply;
        totalSupply=_initialSupply;
        //allocate the initial supply 
    }
    //Transfer
    function transfer(address _to,uint256 _value) public returns (bool success){
            //Exception if account doesnt have enough
            require(balanceOf[msg.sender]>=_value);
            //Transfer the balance
            balanceOf[msg.sender]-=_value;
            balanceOf[_to]+=_value;   
            //Transfer Event 
            emit Transfer(msg.sender, _to, _value);
            // Return a boolean
            return true;
 

    }
    //approve
    function approve(address _spender,uint256 _value) public returns (bool success){
        //allowance
        allowance[msg.sender][_spender] = _value;

        //event
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    //transferForm
    function transferFrom(address _from,address _to,uint256  _value) public returns (bool success){
    //require from has enough balance
        require(_value <= balanceOf[_from]);

    //require allowance  big enough
        require(_value <= allowance[_from][msg.sender]);
    //change the balance
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;


    //update the allowance
        allowance[_from][msg.sender] -= _value;

    //Transfer event
        emit Transfer(_from, _to, _value);
    //return a boolean
        return true;
    }


}