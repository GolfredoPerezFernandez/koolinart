export const auctionsAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "auctionType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "auctionEndTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "increment",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "AuctionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "highestBid",
				"type": "uint256"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "auctionEndPeriod",
				"type": "uint64"
			}
		],
		"name": "AuctionPeriodUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "auctionSettler",
				"type": "address"
			}
		],
		"name": "AuctionSettled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftOwner",
				"type": "address"
			}
		],
		"name": "AuctionWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ethAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "erc20Token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "BidMade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			}
		],
		"name": "BidPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			}
		],
		"name": "BidWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "newBuyNowPrice",
				"type": "uint128"
			}
		],
		"name": "BuyNowPriceUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "HighestBidTaken",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newMinPrice",
				"type": "uint256"
			}
		],
		"name": "MinimumPriceUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftSeller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "nftHighestBid",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftHighestBidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftRecipient",
				"type": "address"
			}
		],
		"name": "NFTTransferredAndSellerPaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftSeller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "erc20Token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "minPrice",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "buyNowPrice",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "auctionBidPeriod",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "bidIncreasePercentage",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "feeRecipients",
				"type": "address[]"
			},
			{
				"indexed": false,
				"internalType": "uint32[]",
				"name": "feePercentages",
				"type": "uint32[]"
			}
		],
		"name": "NftAuctionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftSeller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "erc20Token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "buyNowPrice",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "whitelistedBuyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "feeRecipients",
				"type": "address[]"
			},
			{
				"indexed": false,
				"internalType": "uint32[]",
				"name": "feePercentages",
				"type": "uint32[]"
			}
		],
		"name": "SaleCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "newWhitelistedBuyer",
				"type": "address"
			}
		],
		"name": "WhitelistedBuyerUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "erc20Token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "minPrice",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "uint128",
				"name": "buyNowPrice",
				"type": "uint128"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "feeRecipients",
				"type": "address[]"
			},
			{
				"indexed": false,
				"internalType": "uint32[]",
				"name": "feePercentages",
				"type": "uint32[]"
			}
		],
		"name": "createDefaultNftAuctionEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_erc20Token",
				"type": "address"
			},
			{
				"internalType": "uint128",
				"name": "_minPrice",
				"type": "uint128"
			},
			{
				"internalType": "uint128",
				"name": "_buyNowPrice",
				"type": "uint128"
			},
			{
				"internalType": "address[]",
				"name": "_feeRecipients",
				"type": "address[]"
			},
			{
				"internalType": "uint32[]",
				"name": "_feePercentages",
				"type": "uint32[]"
			}
		],
		"name": "createDefaultNftAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_erc20Token",
				"type": "address"
			},
			{
				"internalType": "uint128",
				"name": "_minPrice",
				"type": "uint128"
			},
			{
				"internalType": "uint128",
				"name": "_buyNowPrice",
				"type": "uint128"
			},
			{
				"internalType": "uint32",
				"name": "_auctionBidPeriod",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "_bidIncreasePercentage",
				"type": "uint32"
			},
			{
				"internalType": "address[]",
				"name": "_feeRecipients",
				"type": "address[]"
			},
			{
				"internalType": "uint32[]",
				"name": "_feePercentages",
				"type": "uint32[]"
			}
		],
		"name": "createNewNftAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_erc20Token",
				"type": "address"
			},
			{
				"internalType": "uint128",
				"name": "_buyNowPrice",
				"type": "uint128"
			},
			{
				"internalType": "address",
				"name": "_whitelistedBuyer",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_feeRecipients",
				"type": "address[]"
			},
			{
				"internalType": "uint32[]",
				"name": "_feePercentages",
				"type": "uint32[]"
			}
		],
		"name": "createSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "defaultAuctionBidPeriod",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "defaultBidIncreasePercentage",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getERC20Token",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getHighestBid",
		"outputs": [
			{
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"internalType": "uint128",
				"name": "highestBid",
				"type": "uint128"
			},
			{
				"internalType": "address",
				"name": "erc20Token",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getNftHighestBid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getNftHighestBidder",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_erc20Token",
				"type": "address"
			},
			{
				"internalType": "uint128",
				"name": "_tokenAmount",
				"type": "uint128"
			}
		],
		"name": "makeBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_erc20Token",
				"type": "address"
			},
			{
				"internalType": "uint128",
				"name": "_tokenAmount",
				"type": "uint128"
			},
			{
				"internalType": "address",
				"name": "_nftRecipient",
				"type": "address"
			}
		],
		"name": "makeCustomBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maximumMinPricePercentage",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minimumSettableIncreasePercentage",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nftContractAuctions",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "bidIncreasePercentage",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "auctionBidPeriod",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "auctionEnd",
				"type": "uint64"
			},
			{
				"internalType": "uint128",
				"name": "minPrice",
				"type": "uint128"
			},
			{
				"internalType": "uint128",
				"name": "buyNowPrice",
				"type": "uint128"
			},
			{
				"internalType": "uint128",
				"name": "nftHighestBid",
				"type": "uint128"
			},
			{
				"internalType": "address",
				"name": "nftHighestBidder",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "nftSeller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "whitelistedBuyer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "nftRecipient",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "ERC20Token",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOfNFT",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "settleAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "takeHighestBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint128",
				"name": "_newBuyNowPrice",
				"type": "uint128"
			}
		],
		"name": "updateBuyNowPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint128",
				"name": "_newMinPrice",
				"type": "uint128"
			}
		],
		"name": "updateMinimumPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_newWhitelistedBuyer",
				"type": "address"
			}
		],
		"name": "updateWhitelistedBuyer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawAllFailedCredits",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "withdrawAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "withdrawBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const tokenErc721Abi2 = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "initialOwner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ERC721EnumerableForbiddenBatchMint",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "ERC721OutOfBoundsIndex",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EnforcedPause",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ExpectedPause",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "by",
				"type": "address"
			}
		],
		"name": "ContractPaused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "by",
				"type": "address"
			}
		],
		"name": "ContractUnpaused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "by",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "TokenBurned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "TokenMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export const tokenErc721Abi = [{"inputs":[{"internalType":"address","name":"defaultAdmin","type":"address"},{"internalType":"address","name":"pauser","type":"address"},{"internalType":"address","name":"minter","type":"address"},{"internalType":"string","name":"nameCollection","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessControlBadConfirmation","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"neededRole","type":"bytes32"}],"name":"AccessControlUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ERC721EnumerableForbiddenBatchMint","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"ERC721OutOfBoundsIndex","type":"error"},{"inputs":[],"name":"EnforcedPause","type":"error"},{"inputs":[],"name":"ExpectedPause","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"callerConfirmation","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"string","name":"uri","type":"string"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}]

export const tokenERC20Abi =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const tokenAbicode = "60a06040523480156200001157600080fd5b506040516200586538038062005865833981016040819052620000349162000629565b600054610100900460ff1615808015620000555750600054600160ff909116105b806200008557506200007230620001ed60201b62001f3e1760201c565b15801562000085575060005460ff166001145b620000ee5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff19166001179055801562000112576000805461ff0019166101001790555b6200011e8383620001fc565b3360808190526101f780546001600160a01b03191682179055620001459060009062000268565b620001717f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a63362000268565b6200019d7f8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c3362000268565b8015620001e4576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050620006d0565b6001600160a01b03163b151590565b600054610100900460ff16620002585760405162461bcd60e51b815260206004820152602b60248201526000805160206200584583398151915260448201526a6e697469616c697a696e6760a81b6064820152608401620000e5565b62000264828262000274565b5050565b62000264828262000302565b600054610100900460ff16620002d05760405162461bcd60e51b815260206004820152602b60248201526000805160206200584583398151915260448201526a6e697469616c697a696e6760a81b6064820152608401620000e5565b8151620002e690610193906020850190620004b6565b508051620002fd90610194906020840190620004b6565b505050565b6200031982826200034160201b62001f4d1760201c565b600082815261016160209081526040909120620002fd91839062001ff2620003e9821b17901c565b600082815261012f602090815260408083206001600160a01b038516845290915290205460ff166200026457600082815261012f602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620003a562000409565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600062000400836001600160a01b03841662000425565b90505b92915050565b6000620004206200047760201b620020071760201c565b905090565b60008181526001830160205260408120546200046e5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000403565b50600062000403565b3360009081526099602052604081205460ff16156200049d575060131936013560601c90565b62000420620004b260201b620020311760201c565b3390565b828054620004c49062000693565b90600052602060002090601f016020900481019282620004e8576000855562000533565b82601f106200050357805160ff191683800117855562000533565b8280016001018555821562000533579182015b828111156200053357825182559160200191906001019062000516565b506200054192915062000545565b5090565b5b8082111562000541576000815560010162000546565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200058457600080fd5b81516001600160401b0380821115620005a157620005a16200055c565b604051601f8301601f19908116603f01168101908282118183101715620005cc57620005cc6200055c565b81604052838152602092508683858801011115620005e957600080fd5b600091505b838210156200060d5785820183015181830184015290820190620005ee565b838211156200061f5760008385830101525b9695505050505050565b600080604083850312156200063d57600080fd5b82516001600160401b03808211156200065557600080fd5b620006638683870162000572565b935060208501519150808211156200067a57600080fd5b50620006898582860162000572565b9150509250929050565b600181811c90821680620006a857607f821691505b60208210811415620006ca57634e487b7160e01b600052602260045260246000fd5b50919050565b608051615152620006f36000396000818161097401526125e501526151526000f3fe6080604052600436106103335760003560e01c80636352211e116101b0578063b24f2d39116100ec578063d45573f611610095578063e15916341161006f578063e159163414610a2b578063e8a3d48514610a4b578063e985e9c514610a60578063eb13554f14610aaa57600080fd5b8063d45573f614610996578063d547741f146109cc578063de903774146109ec57600080fd5b8063ca15c873116100c6578063ca15c87314610921578063cb2ef6f714610941578063cf8267b11461096257600080fd5b8063b24f2d39146108b2578063b88d4fde146108e1578063c87b56dd1461090157600080fd5b8063938e3d7b11610159578063a0a8e46011610133578063a0a8e46014610834578063a217fddf14610850578063a22cb46514610865578063ac9650d81461088557600080fd5b8063938e3d7b146107df57806395d89b41146107ff5780639bcf7a151461081457600080fd5b80638da5cb5b1161018a5780638da5cb5b146107635780639010d07c1461077857806391d148541461079857600080fd5b80636352211e146107035780636f4f28371461072357806370a082311461074357600080fd5b80632a55205a1161027f57806342842e0e116102285780634f6ccce7116102025780634f6ccce71461066a57806352258eaf1461068a578063572b6c05146106aa578063600dd5ea146106e357600080fd5b806342842e0e146105e857806342966c68146106085780634cc157df1461062857600080fd5b80632f745c59116102595780632f745c591461059157806336568abe146105b15780633b1475a7146105d157600080fd5b80632a55205a1461051f5780632c4510f81461055e5780632f2ff15d1461057157600080fd5b806313af4035116102e157806322dcd13e116102bb57806322dcd13e1461048e57806323b872dd146104ce578063248a9ca3146104ee57600080fd5b806313af40351461043857806318160ddd146104585780631e7ac4881461046e57600080fd5b8063079fe40e11610312578063079fe40e146103bd578063081812fc146103f6578063095ea7b31461041657600080fd5b806275a3171461033857806301ffc9a71461036b57806306fdde031461039b575b600080fd5b34801561034457600080fd5b50610358610353366004614465565b610acb565b6040519081526020015b60405180910390f35b34801561037757600080fd5b5061038b6103863660046144d0565b610b0b565b6040519015158152602001610362565b3480156103a757600080fd5b506103b0610b50565b6040516103629190614545565b3480156103c957600080fd5b506101f9546103de906001600160a01b031681565b6040516001600160a01b039091168152602001610362565b34801561040257600080fd5b506103de610411366004614558565b610be3565b34801561042257600080fd5b50610436610431366004614571565b610c0b565b005b34801561044457600080fd5b5061043661045336600461459d565b610d54565b34801561046457600080fd5b506101c754610358565b34801561047a57600080fd5b50610436610489366004614571565b610e3a565b34801561049a57600080fd5b506101fc546104b690600160801b90046001600160801b031681565b6040516001600160801b039091168152602001610362565b3480156104da57600080fd5b506104366104e93660046145ba565b610f11565b3480156104fa57600080fd5b50610358610509366004614558565b600090815261012f602052604090206001015490565b34801561052b57600080fd5b5061053f61053a3660046145fb565b610f9f565b604080516001600160a01b039093168352602083019190915201610362565b61035861056c366004614636565b610fdc565b34801561057d57600080fd5b5061043661058c366004614692565b61118f565b34801561059d57600080fd5b506103586105ac366004614571565b6111b5565b3480156105bd57600080fd5b506104366105cc366004614692565b61125e565b3480156105dd57600080fd5b506103586101f85481565b3480156105f457600080fd5b506104366106033660046145ba565b6112fa565b34801561061457600080fd5b50610436610623366004614558565b611315565b34801561063457600080fd5b50610648610643366004614558565b61139e565b604080516001600160a01b03909316835261ffff909116602083015201610362565b34801561067657600080fd5b50610358610685366004614558565b61140e565b34801561069657600080fd5b506103586106a53660046146c2565b6114b4565b3480156106b657600080fd5b5061038b6106c536600461459d565b6001600160a01b031660009081526099602052604090205460ff1690565b3480156106ef57600080fd5b506104366106fe366004614571565b6115dc565b34801561070f57600080fd5b506103de61071e366004614558565b6116ad565b34801561072f57600080fd5b5061043661073e36600461459d565b611713565b34801561074f57600080fd5b5061035861075e36600461459d565b61176a565b34801561076f57600080fd5b506103de611805565b34801561078457600080fd5b506103de6107933660046145fb565b611860565b3480156107a457600080fd5b5061038b6107b3366004614692565b600091825261012f602090815260408084206001600160a01b0393909316845291905290205460ff1690565b3480156107eb57600080fd5b506104366107fa3660046146f7565b611880565b34801561080b57600080fd5b506103b061189e565b34801561082057600080fd5b5061043661082f366004614739565b6118ae565b34801561084057600080fd5b5060405160018152602001610362565b34801561085c57600080fd5b50610358600081565b34801561087157600080fd5b5061043661088036600461476e565b611992565b34801561089157600080fd5b506108a56108a036600461479c565b6119a4565b6040516103629190614811565b3480156108be57600080fd5b506101fb546101fc546001600160a01b03909116906001600160801b0316610648565b3480156108ed57600080fd5b506104366108fc36600461493c565b611a99565b34801561090d57600080fd5b506103b061091c366004614558565b611b28565b34801561092d57600080fd5b5061035861093c366004614558565b611bcb565b34801561094d57600080fd5b506a546f6b656e45524337323160a81b610358565b34801561096e57600080fd5b506103de7f000000000000000000000000000000000000000000000000000000000000000081565b3480156109a257600080fd5b506101fa546101fc546001600160a01b0390911690600160801b90046001600160801b0316610648565b3480156109d857600080fd5b506104366109e7366004614692565b611be3565b3480156109f857600080fd5b50610a0c610a07366004614636565b611c09565b6040805192151583526001600160a01b03909116602083015201610362565b348015610a3757600080fd5b50610436610a46366004614a71565b611c84565b348015610a5757600080fd5b506103b0611eaf565b348015610a6c57600080fd5b5061038b610a7b366004614b84565b6001600160a01b0391821660009081526101986020908152604080832093909416825291909152205460ff1690565b348015610ab657600080fd5b506101fa546103de906001600160a01b031681565b60007f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6610af781612035565b610b02858585612046565b95945050505050565b6000610b16826120d0565b80610b4a57506001600160e01b031982167f2a55205a00000000000000000000000000000000000000000000000000000000145b92915050565b60606101938054610b6090614bb2565b80601f0160208091040260200160405190810160405280929190818152602001828054610b8c90614bb2565b8015610bd95780601f10610bae57610100808354040283529160200191610bd9565b820191906000526020600020905b815481529060010190602001808311610bbc57829003601f168201915b5050505050905090565b6000610bee8261210e565b50600090815261019760205260409020546001600160a01b031690565b6000610c16826116ad565b9050806001600160a01b0316836001600160a01b03161415610ca55760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b806001600160a01b0316610cb7612173565b6001600160a01b03161480610cd35750610cd381610a7b612173565b610d455760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610c9c565b610d4f838361217d565b505050565b6000610d5f81612035565b6001600160a01b03821660009081527fe9104285c6851efcbc5e0e70440200efbdcab556a1c8784776780f8bb44f2931602052604090205460ff16610de65760405162461bcd60e51b815260206004820152601b60248201527f6e6577206f776e6572206e6f74206d6f64756c652061646d696e2e00000000006044820152606401610c9c565b6101f780546001600160a01b038481166001600160a01b0319831681179093556040519116919082907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7690600090a3505050565b6000610e4581612035565b612710821115610e975760405162461bcd60e51b815260206004820152600d60248201527f627073203c3d2031303030302e000000000000000000000000000000000000006044820152606401610c9c565b6101fc80546001600160801b031667ffffffffffffffff8416600160801b021790556101fa80546001600160a01b0319166001600160a01b0385169081179091556040518381527fe2497bd806ec41a6e0dd992c29a72efc0ef8fec9092d1978fd4a1e00b2f18304906020015b60405180910390a2505050565b610f22610f1c612173565b826121ec565b610f945760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f7665640000000000000000000000000000000000006064820152608401610c9c565b610d4f83838361226c565b600080600080610fae8661139e565b90945084925061ffff169050612710610fc78287614bfd565b610fd19190614c1c565b925050509250929050565b6000600260015414156110315760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610c9c565b6002600155600061104181612035565b600061104e868686612447565b9050600080611060602089018961459d565b6001600160a01b0316146110805761107b602088018861459d565b611088565b611088612173565b90506110a08161109b60808a018a614c3e565b612046565b935060006110b46040890160208a0161459d565b6001600160a01b0316146111245760405180604001604052808860200160208101906110e0919061459d565b6001600160a01b03908116825260408a8101356020938401526000888152610200845220835181546001600160a01b03191692169190911781559101516001909101555b61113561113088614c85565b612561565b83816001600160a01b0316836001600160a01b03167f110d160a1bedeea919a88fbc4b2a9fb61b7e664084391b6ca2740db66fef80fe8a6040516111799190614dc2565b60405180910390a4505060018055509392505050565b600082815261012f60205260409020600101546111ab81612035565b610d4f8383612786565b60006111c08361176a565b82106112345760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e64730000000000000000000000000000000000000000006064820152608401610c9c565b506001600160a01b039190911660009081526101c560209081526040808320938352929052205490565b611266612173565b6001600160a01b0316816001600160a01b0316146112ec5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c6600000000000000000000000000000000006064820152608401610c9c565b6112f682826127a9565b5050565b610d4f83838360405180602001604052806000815250611a99565b611320610f1c612173565b6113925760405162461bcd60e51b815260206004820152603060248201527f4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f766564000000000000000000000000000000006064820152608401610c9c565b61139b816127cc565b50565b600081815261020060209081526040808320815180830190925280546001600160a01b0316808352600190910154928201929092528291156113e65780516020820151611404565b6101fb546101fc546001600160a01b03909116906001600160801b03165b9250925050915091565b600061141a6101c75490565b821061148e5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e647300000000000000000000000000000000000000006064820152608401610c9c565b6101c782815481106114a2576114a2614ed2565b90600052602060002001549050919050565b6000600260015414156115095760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610c9c565b60026001557f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661153881612035565b600080611548602086018661459d565b6001600160a01b03161461156857611563602085018561459d565b611570565b611570612173565b90506115838161109b6080870187614c3e565b925082816001600160a01b0316336001600160a01b03167f110d160a1bedeea919a88fbc4b2a9fb61b7e664084391b6ca2740db66fef80fe876040516115c99190614dc2565b60405180910390a4505060018055919050565b60006115e781612035565b6127108211156116395760405162461bcd60e51b815260206004820152601260248201527f65786365656420726f79616c74792062707300000000000000000000000000006044820152606401610c9c565b6101fb80546001600160a01b0319166001600160a01b0385169081179091556101fc80546fffffffffffffffffffffffffffffffff19166001600160801b0385161790556040518381527f90d7ec04bcb8978719414f82e52e4cb651db41d0e6f8cea6118c2191e6183adb90602001610f04565b600081815261019560205260408120546001600160a01b031680610b4a5760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610c9c565b600061171e81612035565b6101f980546001600160a01b0319166001600160a01b0384169081179091556040517f299d17e95023f496e0ffc4909cff1a61f74bb5eb18de6f900f4155bfa1b3b33390600090a25050565b60006001600160a01b0382166117e85760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e657200000000000000000000000000000000000000000000006064820152608401610c9c565b506001600160a01b03166000908152610196602052604090205490565b6101f7546001600160a01b031660009081527fe9104285c6851efcbc5e0e70440200efbdcab556a1c8784776780f8bb44f2931602052604081205460ff1661184d5750600090565b6101f7546001600160a01b03165b905090565b6000828152610161602052604081206118799083612875565b9392505050565b600061188b81612035565b6118986101fd84846142f1565b50505050565b60606101948054610b6090614bb2565b60006118b981612035565b61271082111561190b5760405162461bcd60e51b815260206004820152601260248201527f65786365656420726f79616c74792062707300000000000000000000000000006044820152606401610c9c565b6040805180820182526001600160a01b03858116808352602080840187815260008a81526102008352869020945185546001600160a01b031916941693909317845591516001909301929092559151848152909186917f7365cf4122f072a3365c20d54eff9b38d73c096c28e1892ec8f5b0e403a0f12d910160405180910390a350505050565b6112f661199d612173565b8383612881565b60608167ffffffffffffffff8111156119bf576119bf614873565b6040519080825280602002602001820160405280156119f257816020015b60608152602001906001900390816119dd5790505b50905060005b82811015611a9257611a6230858584818110611a1657611a16614ed2565b9050602002810190611a289190614c3e565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061295192505050565b828281518110611a7457611a74614ed2565b60200260200101819052508080611a8a90614ee8565b9150506119f8565b5092915050565b611aaa611aa4612173565b836121ec565b611b1c5760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f7665640000000000000000000000000000000000006064820152608401610c9c565b61189884848484612a53565b60008181526101ff60205260409020805460609190611b4690614bb2565b80601f0160208091040260200160405190810160405280929190818152602001828054611b7290614bb2565b8015611bbf5780601f10611b9457610100808354040283529160200191611bbf565b820191906000526020600020905b815481529060010190602001808311611ba257829003601f168201915b50505050509050919050565b600081815261016160205260408120610b4a90612adc565b600082815261012f6020526040902060010154611bff81612035565b610d4f83836127a9565b6000806000611c19868686612ae6565b61012087013560009081526101fe602052604090205490915060ff16158015611c7957506001600160a01b03811660009081527fa2a71de801f4f5af590dd1e71778408c512ca00170a88b45ca00ba943b31e98e602052604090205460ff165b969095509350505050565b600054610100900460ff1615808015611ca45750600054600160ff909116105b80611cbe5750303b158015611cbe575060005460ff166001145b611d305760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152608401610c9c565b6000805460ff191660011790558015611d53576000805461ff0019166101001790555b611d5b612b42565b611dbd6040518060400160405280600b81526020016a546f6b656e45524337323160a81b8152506040518060400160405280600181526020017f3100000000000000000000000000000000000000000000000000000000000000815250612bb7565b611dc687612c2c565b6101fb80546001600160a01b03199081166001600160a01b03888116919091179092556101fc80546fffffffffffffffffffffffffffffffff19166001600160801b0388161790556101fa805482168584161790556101f980549091169188169190911790558751611e40906101fd9060208b0190614375565b506101fc80546001600160801b03808616600160801b0291161790558015611ea2576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050505050505050505050565b6101fd8054611ebd90614bb2565b80601f0160208091040260200160405190810160405280929190818152602001828054611ee990614bb2565b8015611f365780601f10611f0b57610100808354040283529160200191611f36565b820191906000526020600020905b815481529060010190602001808311611f1957829003601f168201915b505050505081565b6001600160a01b03163b151590565b600082815261012f602090815260408083206001600160a01b038516845290915290205460ff166112f657600082815261012f602090815260408083206001600160a01b03851684529091529020805460ff19166001179055611fae612173565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000611879836001600160a01b038416612ca8565b3360009081526099602052604081205460ff161561202c575060131936013560601c90565b503390565b3390565b61139b81612041612173565b612cf7565b6101f8805490600190600061205b8385614f03565b909155505060008181526101ff6020526040902061207a9084846142f1565b506120858482612d78565b80846001600160a01b03167f9d89e36eadf856db0ad9ffb5a569e07f95634dddd9501141ecf04820484ad0dc85856040516120c1929190614f1b565b60405180910390a39392505050565b60006001600160e01b031982167f780e9d63000000000000000000000000000000000000000000000000000000001480610b4a5750610b4a82612ec9565b600081815261019560205260409020546001600160a01b031661139b5760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610c9c565b600061185b612007565b60008181526101976020526040902080546001600160a01b0319166001600160a01b03841690811790915581906121b3826116ad565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806121f8836116ad565b9050806001600160a01b0316846001600160a01b0316148061224057506001600160a01b038082166000908152610198602090815260408083209388168352929052205460ff165b806122645750836001600160a01b031661225984610be3565b6001600160a01b0316145b949350505050565b826001600160a01b031661227f826116ad565b6001600160a01b0316146122fb5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e65720000000000000000000000000000000000000000000000000000006064820152608401610c9c565b6001600160a01b0382166123765760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610c9c565b612381838383612f3b565b61238c60008261217d565b6001600160a01b0383166000908152610196602052604081208054600192906123b6908490614f2f565b90915550506001600160a01b0382166000908152610196602052604081208054600192906123e5908490614f03565b90915550506000818152610195602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000806000612457868686611c09565b91509150816124a85760405162461bcd60e51b815260206004820152601160248201527f696e76616c6964207369676e61747572650000000000000000000000000000006044820152606401610c9c565b426124ba610100880160e08901614f46565b6001600160801b0316111580156124eb5750426124df61012088016101008901614f46565b6001600160801b031610155b6125375760405162461bcd60e51b815260206004820152600f60248201527f72657175657374206578706972656400000000000000000000000000000000006044820152606401610c9c565b61012086013560009081526101fe60205260409020805460ff191660011790559150509392505050565b60a081015161256d5750565b60a08101516101fc546000906127109061259790600160801b90046001600160801b031684614bfd565b6125a19190614c1c565b6040517f85b49ad000000000000000000000000000000000000000000000000000000000815230600482015260006024820181905291925081906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906385b49ad0906044016040805180830381865afa15801561262b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061264f9190614f61565b909250905060006127106126638387614bfd565b61266d9190614c1c565b60c08701519091506001600160a01b031673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee14156126e8578434146126e85760405162461bcd60e51b815260206004820152601660248201527f6d7573742073656e6420746f74616c2070726963652e000000000000000000006044820152606401610c9c565b60608601516000906001600160a01b031615612708578660600151612716565b6101f9546001600160a01b03165b905061273b8760c00151612728612173565b6101fa546001600160a01b031688612f46565b6127528760c0015161274b612173565b8685612f46565b61277d8760c00151612762612173565b838561276e8a8c614f2f565b6127789190614f2f565b612f46565b50505050505050565b6127908282611f4d565b600082815261016160205260409020610d4f9082611ff2565b6127b38282612f90565b600082815261016160205260409020610d4f9082613033565b60006127d7826116ad565b90506127e581600084612f3b565b6127f060008361217d565b6001600160a01b03811660009081526101966020526040812080546001929061281a908490614f2f565b90915550506000828152610195602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60006118798383613048565b816001600160a01b0316836001600160a01b031614156128e35760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610c9c565b6001600160a01b0383811660008181526101986020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b60606001600160a01b0383163b6129d05760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f60448201527f6e747261637400000000000000000000000000000000000000000000000000006064820152608401610c9c565b600080846001600160a01b0316846040516129eb9190614f8f565b600060405180830381855af49150503d8060008114612a26576040519150601f19603f3d011682016040523d82523d6000602084013e612a2b565b606091505b5091509150610b0282826040518060600160405280602781526020016150f660279139613072565b612a5e84848461226c565b612a6a848484846130ab565b6118985760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610c9c565b6000610b4a825490565b600061226483838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612b3c9250612b30915088905061321f565b80519060200120613359565b906133c2565b600054610100900460ff16612bad5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610c9c565b612bb56133e6565b565b600054610100900460ff16612c225760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610c9c565b6112f68282613457565b600054610100900460ff16612c975760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610c9c565b612c9f6134dc565b61139b81613547565b6000818152600183016020526040812054612cef57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610b4a565b506000610b4a565b600082815261012f602090815260408083206001600160a01b038516845290915290205460ff166112f657612d36816001600160a01b0316601461361a565b612d4183602061361a565b604051602001612d52929190614fab565b60408051601f198184030181529082905262461bcd60e51b8252610c9c91600401614545565b6001600160a01b038216612dce5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610c9c565b600081815261019560205260409020546001600160a01b031615612e345760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610c9c565b612e4060008383612f3b565b6001600160a01b038216600090815261019660205260408120805460019290612e6a908490614f03565b90915550506000818152610195602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006001600160e01b031982167f80ac58cd000000000000000000000000000000000000000000000000000000001480612f2c57506001600160e01b031982167f5b5e139f00000000000000000000000000000000000000000000000000000000145b80610b4a5750610b4a826137fb565b610d4f838383613839565b80612f5057611898565b6001600160a01b03841673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1415612f8457612f7f82826138f3565b611898565b61189884848484613996565b600082815261012f602090815260408083206001600160a01b038516845290915290205460ff16156112f657600082815261012f602090815260408083206001600160a01b03851684529091529020805460ff19169055612fef612173565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6000611879836001600160a01b0384166139ef565b600082600001828154811061305f5761305f614ed2565b9060005260206000200154905092915050565b60608315613081575081611879565b8251156130915782518084602001fd5b8160405162461bcd60e51b8152600401610c9c9190614545565b60006001600160a01b0384163b1561321457836001600160a01b031663150b7a026130d4612173565b8786866040518563ffffffff1660e01b81526004016130f6949392919061502c565b6020604051808303816000875af1925050508015613131575060408051601f3d908101601f1916820190925261312e91810190615068565b60015b6131e1573d80801561315f576040519150601f19603f3d011682016040523d82523d6000602084013e613164565b606091505b5080516131d95760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610c9c565b805181602001fd5b6001600160e01b0319167f150b7a0200000000000000000000000000000000000000000000000000000000149050612264565b506001949350505050565b60607f86633b4ffa94b7c3d316ca70d7d2700f3fdfa7a7806efd31499b513d9176692e61324f602084018461459d565b61325f604085016020860161459d565b6040850135613274608087016060880161459d565b6132816080880188614c3e565b60405161328f929190615085565b60405190819003902060a08801356132ad60e08a0160c08b0161459d565b6132be6101008b0160e08c01614f46565b6132d06101208c016101008d01614f46565b60408051602081019b909b526001600160a01b03998a16908b015296881660608a0152608089019590955292861660a088015260c087019190915260e08601529092166101008401526001600160801b03918216610120808501919091529116610140830152830135610160820152610180016040516020818303038152906040529050919050565b6000610b4a613366613ae2565b836040517f19010000000000000000000000000000000000000000000000000000000000006020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b60008060006133d18585613b5d565b915091506133de81613ba3565b509392505050565b600054610100900460ff166134515760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610c9c565b60018055565b600054610100900460ff166134c25760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610c9c565b815160209283012081519190920120603391909155603455565b600054610100900460ff16612bb55760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610c9c565b600054610100900460ff166135b25760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610c9c565b60005b81518110156112f6576001609960008484815181106135d6576135d6614ed2565b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff19169115159190911790558061361281614ee8565b9150506135b5565b60606000613629836002614bfd565b613634906002614f03565b67ffffffffffffffff81111561364c5761364c614873565b6040519080825280601f01601f191660200182016040528015613676576020820181803683370190505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106136ad576136ad614ed2565b60200101906001600160f81b031916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106136f8576136f8614ed2565b60200101906001600160f81b031916908160001a905350600061371c846002614bfd565b613727906001614f03565b90505b60018111156137ac577f303132333435363738396162636465660000000000000000000000000000000085600f166010811061376857613768614ed2565b1a60f81b82828151811061377e5761377e614ed2565b60200101906001600160f81b031916908160001a90535060049490941c936137a581615095565b905061372a565b5083156118795760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610c9c565b60006001600160e01b031982167f5a05180f000000000000000000000000000000000000000000000000000000001480610b4a5750610b4a82613d5e565b6001600160a01b03831661389657613891816101c7805460008381526101c860205260408120829055600182018355919091527fff6df30967a6a678f565c59a19e91e5c0dbb20cfe9f9bf26d7da6dea0fffa24c0155565b6138b9565b816001600160a01b0316836001600160a01b0316146138b9576138b98382613dc5565b6001600160a01b0382166138d057610d4f81613e67565b826001600160a01b0316826001600160a01b031614610d4f57610d4f8282613f1c565b6000826001600160a01b03168260405160006040518083038185875af1925050503d8060008114613940576040519150601f19603f3d011682016040523d82523d6000602084013e613945565b606091505b5050905080610d4f5760405162461bcd60e51b815260206004820152601c60248201527f6e617469766520746f6b656e207472616e73666572206661696c6564000000006044820152606401610c9c565b816001600160a01b0316836001600160a01b031614156139b557611898565b6001600160a01b0383163014156139da57612f7f6001600160a01b0385168383613f62565b6118986001600160a01b038516848484613ff3565b60008181526001830160205260408120548015613ad8576000613a13600183614f2f565b8554909150600090613a2790600190614f2f565b9050818114613a8c576000866000018281548110613a4757613a47614ed2565b9060005260206000200154905080876000018481548110613a6a57613a6a614ed2565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080613a9d57613a9d6150ac565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610b4a565b6000915050610b4a565b600061185b7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f613b1160335490565b6034546040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b600080825160411415613b945760208301516040840151606085015160001a613b8887828585614044565b94509450505050613b9c565b506000905060025b9250929050565b6000816004811115613bb757613bb76150c2565b1415613bc05750565b6001816004811115613bd457613bd46150c2565b1415613c225760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610c9c565b6002816004811115613c3657613c366150c2565b1415613c845760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610c9c565b6003816004811115613c9857613c986150c2565b1415613cf15760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610c9c565b6004816004811115613d0557613d056150c2565b141561139b5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610c9c565b60006001600160e01b031982167f7965db0b000000000000000000000000000000000000000000000000000000001480610b4a57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b0319831614610b4a565b60006001613dd28461176a565b613ddc9190614f2f565b60008381526101c66020526040902054909150808214613e32576001600160a01b03841660009081526101c56020908152604080832085845282528083205484845281842081905583526101c690915290208190555b5060009182526101c6602090815260408084208490556001600160a01b0390941683526101c581528383209183525290812055565b6101c754600090613e7a90600190614f2f565b60008381526101c860205260408120546101c78054939450909284908110613ea457613ea4614ed2565b90600052602060002001549050806101c78381548110613ec657613ec6614ed2565b60009182526020808320909101929092558281526101c890915260408082208490558582528120556101c7805480613f0057613f006150ac565b6001900381819060005260206000200160009055905550505050565b6000613f278361176a565b6001600160a01b0390931660009081526101c56020908152604080832086845282528083208590559382526101c69052919091209190915550565b6040516001600160a01b038316602482015260448101829052610d4f9084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff166001600160e01b031990931692909217909152614131565b6040516001600160a01b03808516602483015283166044820152606481018290526118989085907f23b872dd0000000000000000000000000000000000000000000000000000000090608401613fa7565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561407b5750600090506003614128565b8460ff16601b1415801561409357508460ff16601c14155b156140a45750600090506004614128565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156140f8573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661412157600060019250925050614128565b9150600090505b94509492505050565b6000614186826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166142169092919063ffffffff16565b805190915015610d4f57808060200190518101906141a491906150d8565b610d4f5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610c9c565b60606122648484600085856001600160a01b0385163b6142785760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610c9c565b600080866001600160a01b031685876040516142949190614f8f565b60006040518083038185875af1925050503d80600081146142d1576040519150601f19603f3d011682016040523d82523d6000602084013e6142d6565b606091505b50915091506142e6828286613072565b979650505050505050565b8280546142fd90614bb2565b90600052602060002090601f01602090048101928261431f5760008555614365565b82601f106143385782800160ff19823516178555614365565b82800160010185558215614365579182015b8281111561436557823582559160200191906001019061434a565b506143719291506143e9565b5090565b82805461438190614bb2565b90600052602060002090601f0160209004810192826143a35760008555614365565b82601f106143bc57805160ff1916838001178555614365565b82800160010185558215614365579182015b828111156143655782518255916020019190600101906143ce565b5b8082111561437157600081556001016143ea565b6001600160a01b038116811461139b57600080fd5b803561441e816143fe565b919050565b60008083601f84011261443557600080fd5b50813567ffffffffffffffff81111561444d57600080fd5b602083019150836020828501011115613b9c57600080fd5b60008060006040848603121561447a57600080fd5b8335614485816143fe565b9250602084013567ffffffffffffffff8111156144a157600080fd5b6144ad86828701614423565b9497909650939450505050565b6001600160e01b03198116811461139b57600080fd5b6000602082840312156144e257600080fd5b8135611879816144ba565b60005b838110156145085781810151838201526020016144f0565b838111156118985750506000910152565b600081518084526145318160208601602086016144ed565b601f01601f19169290920160200192915050565b6020815260006118796020830184614519565b60006020828403121561456a57600080fd5b5035919050565b6000806040838503121561458457600080fd5b823561458f816143fe565b946020939093013593505050565b6000602082840312156145af57600080fd5b8135611879816143fe565b6000806000606084860312156145cf57600080fd5b83356145da816143fe565b925060208401356145ea816143fe565b929592945050506040919091013590565b6000806040838503121561460e57600080fd5b50508035926020909101359150565b6000610140828403121561463057600080fd5b50919050565b60008060006040848603121561464b57600080fd5b833567ffffffffffffffff8082111561466357600080fd5b61466f8783880161461d565b9450602086013591508082111561468557600080fd5b506144ad86828701614423565b600080604083850312156146a557600080fd5b8235915060208301356146b7816143fe565b809150509250929050565b6000602082840312156146d457600080fd5b813567ffffffffffffffff8111156146eb57600080fd5b6122648482850161461d565b6000806020838503121561470a57600080fd5b823567ffffffffffffffff81111561472157600080fd5b61472d85828601614423565b90969095509350505050565b60008060006060848603121561474e57600080fd5b8335925060208401356145ea816143fe565b801515811461139b57600080fd5b6000806040838503121561478157600080fd5b823561478c816143fe565b915060208301356146b781614760565b600080602083850312156147af57600080fd5b823567ffffffffffffffff808211156147c757600080fd5b818501915085601f8301126147db57600080fd5b8135818111156147ea57600080fd5b8660208260051b85010111156147ff57600080fd5b60209290920196919550909350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561486657603f19888603018452614854858351614519565b94509285019290850190600101614838565b5092979650505050505050565b634e487b7160e01b600052604160045260246000fd5b604051610140810167ffffffffffffffff811182821017156148ad576148ad614873565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156148dc576148dc614873565b604052919050565b600067ffffffffffffffff8311156148fe576148fe614873565b614911601f8401601f19166020016148b3565b905082815283838301111561492557600080fd5b828260208301376000602084830101529392505050565b6000806000806080858703121561495257600080fd5b843561495d816143fe565b9350602085013561496d816143fe565b925060408501359150606085013567ffffffffffffffff81111561499057600080fd5b8501601f810187136149a157600080fd5b6149b0878235602084016148e4565b91505092959194509250565b600082601f8301126149cd57600080fd5b611879838335602085016148e4565b600082601f8301126149ed57600080fd5b8135602067ffffffffffffffff821115614a0957614a09614873565b8160051b614a188282016148b3565b9283528481018201928281019087851115614a3257600080fd5b83870192505b848310156142e6578235614a4b816143fe565b82529183019190830190614a38565b80356001600160801b038116811461441e57600080fd5b6000806000806000806000806000806101408b8d031215614a9157600080fd5b614a9a8b614413565b995060208b013567ffffffffffffffff80821115614ab757600080fd5b614ac38e838f016149bc565b9a5060408d0135915080821115614ad957600080fd5b614ae58e838f016149bc565b995060608d0135915080821115614afb57600080fd5b614b078e838f016149bc565b985060808d0135915080821115614b1d57600080fd5b50614b2a8d828e016149dc565b965050614b3960a08c01614413565b9450614b4760c08c01614413565b9350614b5560e08c01614a5a565b9250614b646101008c01614a5a565b9150614b736101208c01614413565b90509295989b9194979a5092959850565b60008060408385031215614b9757600080fd5b8235614ba2816143fe565b915060208301356146b7816143fe565b600181811c90821680614bc657607f821691505b6020821081141561463057634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000816000190483118215151615614c1757614c17614be7565b500290565b600082614c3957634e487b7160e01b600052601260045260246000fd5b500490565b6000808335601e19843603018112614c5557600080fd5b83018035915067ffffffffffffffff821115614c7057600080fd5b602001915036819003821315613b9c57600080fd5b60006101408236031215614c9857600080fd5b614ca0614889565b614ca983614413565b8152614cb760208401614413565b602082015260408301356040820152614cd260608401614413565b6060820152608083013567ffffffffffffffff811115614cf157600080fd5b614cfd368286016149bc565b60808301525060a083013560a0820152614d1960c08401614413565b60c0820152614d2a60e08401614a5a565b60e0820152610100614d3d818501614a5a565b9082015261012092830135928101929092525090565b6000808335601e19843603018112614d6a57600080fd5b830160208101925035905067ffffffffffffffff811115614d8a57600080fd5b803603831315613b9c57600080fd5b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60208152614de360208201614dd684614413565b6001600160a01b03169052565b6000614df160208401614413565b6001600160a01b03811660408401525060408301356060830152614e1760608401614413565b6001600160a01b038116608084015250614e346080840184614d53565b6101408060a0860152614e4c61016086018385614d99565b925060a086013560c0860152614e6460c08701614413565b6001600160a01b03811660e08701529150614e8160e08701614a5a565b9150610100614e9a818701846001600160801b03169052565b614ea5818801614a5a565b925050610120614ebf818701846001600160801b03169052565b9590950135939094019290925250919050565b634e487b7160e01b600052603260045260246000fd5b6000600019821415614efc57614efc614be7565b5060010190565b60008219821115614f1657614f16614be7565b500190565b602081526000612264602083018486614d99565b600082821015614f4157614f41614be7565b500390565b600060208284031215614f5857600080fd5b61187982614a5a565b60008060408385031215614f7457600080fd5b8251614f7f816143fe565b6020939093015192949293505050565b60008251614fa18184602087016144ed565b9190910192915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614fe38160178501602088016144ed565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516150208160288401602088016144ed565b01602801949350505050565b60006001600160a01b0380871683528086166020840152508360408301526080606083015261505e6080830184614519565b9695505050505050565b60006020828403121561507a57600080fd5b8151611879816144ba565b8183823760009101908152919050565b6000816150a4576150a4614be7565b506000190190565b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b6000602082840312156150ea57600080fd5b81516118798161476056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a264697066735822122001345f69734d058cd98d577093086463625d98b68dade10a176eef13ffbb474464736f6c634300080b0033496e697469616c697a61626c653a20636f6e7472616374206973206e6f742069"


