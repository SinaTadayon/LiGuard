// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

abstract contract BaseAssetEntity {
  bytes32 public constant LIVELY_CROWD_FOUNDING_ASSET_ROLE = keccak256(abi.encodePacked("LIVELY_CROWD_FOUNDING_ASSET_ROLE"));
  bytes32 public constant LIVELY_VALIDATORS_REWARDS_ASSET_ROLE = keccak256(abi.encodePacked("LIVELY_VALIDATORS_REWARDS_ASSET_ROLE"));
  bytes32 public constant LIVELY_PUBLIC_SALE_ASSET_ROLE = keccak256(abi.encodePacked("LIVELY_PUBLIC_SALE_ASSET_ROLE"));
  bytes32 public constant LIVELY_TREASURY_ASSET_ROLE = keccak256(abi.encodePacked("LIVELY_TREASURY_ASSET_ROLE"));
  bytes32 public constant LIVELY_FOUNDING_TEAM_ASSET_ROLE = keccak256(abi.encodePacked("LIVELY_FOUNDING_TEAM_ASSET_ROLE"));
  bytes32 public constant LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE = keccak256(abi.encodePacked("LIVELY_AUDIO_VIDEO_PROGRAM_ASSET_ROLE"));
}