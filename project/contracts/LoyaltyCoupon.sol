// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LoyaltyCoupon is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _couponIds;

    struct Organization {
        string name;
        address admin;
        bool isActive;
    }

    struct Coupon {
        uint256 id;
        uint256 orgId;
        address userWallet;
        uint256 discountAmount;
        bool isUsed;
        string email;
    }

    mapping(uint256 => Organization) public organizations;
    mapping(uint256 => Coupon) public coupons;
    mapping(address => uint256[]) public userCoupons;
    Counters.Counter private _orgIds;

    event OrganizationCreated(uint256 orgId, string name, address admin);
    event CouponCreated(uint256 couponId, uint256 orgId, string email, uint256 discountAmount);
    event CouponClaimed(uint256 couponId, address userWallet);
    event CouponUsed(uint256 couponId);

    constructor() Ownable(msg.sender) {}

    function createOrganization(string memory name) external returns (uint256) {
        _orgIds.increment();
        uint256 newOrgId = _orgIds.current();
        
        organizations[newOrgId] = Organization(name, msg.sender, true);
        
        emit OrganizationCreated(newOrgId, name, msg.sender);
        return newOrgId;
    }

    function createCoupon(uint256 orgId, string memory email, uint256 discountAmount) external returns (uint256) {
        require(organizations[orgId].admin == msg.sender, "Not organization admin");
        require(organizations[orgId].isActive, "Organization not active");

        _couponIds.increment();
        uint256 newCouponId = _couponIds.current();

        coupons[newCouponId] = Coupon(
            newCouponId,
            orgId,
            address(0),
            discountAmount,
            false,
            email
        );

        emit CouponCreated(newCouponId, orgId, email, discountAmount);
        return newCouponId;
    }

    function claimCoupon(uint256 couponId) external {
        require(coupons[couponId].userWallet == address(0), "Coupon already claimed");
        require(!coupons[couponId].isUsed, "Coupon already used");

        coupons[couponId].userWallet = msg.sender;
        userCoupons[msg.sender].push(couponId);

        emit CouponClaimed(couponId, msg.sender);
    }

    function useCoupon(uint256 couponId) external {
        require(coupons[couponId].userWallet == msg.sender, "Not coupon owner");
        require(!coupons[couponId].isUsed, "Coupon already used");

        coupons[couponId].isUsed = true;
        emit CouponUsed(couponId);
    }

    function getUserCoupons(address user) external view returns (uint256[] memory) {
        return userCoupons[user];
    }

    function getCouponDetails(uint256 couponId) external view returns (Coupon memory) {
        return coupons[couponId];
    }
}