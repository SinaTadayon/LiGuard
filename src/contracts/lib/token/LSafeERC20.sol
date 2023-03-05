// SPDX-License-Identifier: MIT
// LivelyVerse Contracts (last updated v2.0.1)
// Authors: OpenZeppelin, Sina Tadayon, https://github.com/SinaTadayon

pragma solidity 0.8.19;

import "../../token/lively/IERC20.sol";
import "../../token/lively/IERC20Extra.sol";
import "../../token/lively/IERC20Lock.sol";
import "../LAddress.sol";

/**
 * @title LSafeERC20
 * @dev Wrappers around ERC20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library LSafeERC20 {
  using LAddress for address;

  function safeTransfer(
    IERC20 token,
    address to,
    uint256 value
  ) internal {
    _callOptionalReturn(address(token), abi.encodeWithSelector(token.transfer.selector, to, value));
  }

  function batchTransfer(IERC20Extra token, IERC20Extra.BatchTransferRequest[] calldata request) internal {
    _callOptionalReturn(address(token), abi.encodeWithSelector(token.batchTransfer.selector, request));
  }

  function safeTransferFrom(
    IERC20 token,
    address from,
    address to,
    uint256 value
  ) internal {
    _callOptionalReturn(address(token), abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
  }

  function batchTransferFrom(IERC20Extra token, IERC20Extra.BatchTransferFromRequest[] calldata request) internal {
    _callOptionalReturn(address(token), abi.encodeWithSelector(token.batchTransferFrom.selector, request));
  }

  function safeApprove(
    IERC20 token,
    address spender,
    uint256 value
  ) internal {
    _callOptionalReturn(address(token), abi.encodeWithSelector(token.approve.selector, spender, value));
  }

  function safeIncreaseAllowance(
    IERC20Extra token,
    address spender,
    uint256 value
  ) internal returns (uint256) {
    bytes memory returndata = _callMandatoryReturn(
      address(token),
      abi.encodeWithSelector(token.increaseAllowance.selector, spender, value)
    );
    return abi.decode(returndata, (uint256));
  }

  function safeDecreaseAllowance(
    IERC20Extra token,
    address spender,
    uint256 value
  ) internal returns (uint256) {
    bytes memory returndata = _callMandatoryReturn(
      address(token),
      abi.encodeWithSelector(token.decreaseAllowance.selector, spender, value)
    );
    return abi.decode(returndata, (uint256));
  }

  function safePermit(
    IERC20Extra token,
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    bytes calldata signature
  ) internal {
    uint256 nonceBefore = token.nonce(owner);
    token.permit(owner, spender, value, deadline, signature);
    uint256 nonceAfter = token.nonce(owner);
    require(nonceAfter == nonceBefore + 1, "SafeERC20Extra: Permit Failed");
  }

  function lockToken(IERC20Lock token, IERC20Lock.LockTokenRequest[] calldata lockRequest)
    internal
    returns (bytes32[] memory)
  {
    bytes memory returndata = _callMandatoryReturn(
      address(token),
      abi.encodeWithSelector(token.lockToken.selector, lockRequest)
    );
    return abi.decode(returndata, (bytes32[]));
  }

  /**
   * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
   * on the return value: the return value is optional (but if data is returned, it must not be false).
   * @param token The token targeted by the call.
   * @param data The call data (encoded using abi.encode or one of its variants).
   */
  function _callOptionalReturn(address token, bytes memory data) private {
    // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
    // we're implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that
    // the target address contains contract code and also asserts for success in the low-level call.

    bytes memory returndata = address(token).functionCall(data, "SafeERC20: Call Failed");
    if (returndata.length > 0) {
      // Return data is optional
      require(abi.decode(returndata, (bool)), "SafeERC20: Operation Failed");
    }
  }

  function _callMandatoryReturn(address token, bytes memory data) private returns (bytes memory) {
    return address(token).functionCall(data, "SafeERC20: Call Failed");
  }
}
