---
title: "Introduction to Stellar for Go Developers"
desc: "Creating Accounts, Sending and Receiving Payments in Stellar Network with Go"
image: https://c1.staticflickr.com/5/4611/40211591542_9c55bc63e0_h.jpg
imageSize: contain
imageHeight: 400px
imageCaption: Stellar Concencus Protocol's whitepaper in my kitchen table. It was joy to read it.
date: "2018-02-14T16:00:00.000Z"
path: "/journal/introduction-to-stellar-for-go-developers"
---

Last year I was looking for alternative payment methods for my new project, [Kozmos](https://getkozmos.com), and stumbled up into
Stellar's whitepaper, got it printed nicely a printing shop in Ubud so I could highlight the parts that I liked.
It's been almost a year since then and I decided to write a few blog posts to share what I've learnt so far with others.

<div class="toc">

# Index of Contents

* [What is Stellar and SCP?](#what-is-stellar-and-scp)
* [Getting Started with Go](#getting-started-with-go)
* [Create Account](#create-account)
* [Send Money](#send-money)
* [Receive Money](#receive-money)
* [Final Words](#final-words)
</div>

<a name="what-is-stellar-and-scp"></a>
# What is Stellar?

Stellar is a non-profit foundation who built an open source, decentralized value exchange protocol.
It connects people, payment systems and banks with [Stellar Concensus Protocol](https://www.stellar.org/papers/stellar-consensus-protocol.pdf) (SCP)
which secures worldwide consensus, inspired from [Byzantine Agreement](https://en.wikipedia.org/wiki/Quantum_Byzantine_agreement).

SCP is free from central authority, so anyone can become a part of its worldwide database by providing a node.
How do we know if a node is not a bad player though ? Each node in the network specifies other nodes who they trust, and [stellar core](https://github.com/stellar/stellar-core/)
 dynamically forms universal agreement based on whom people trust most.

This concencus mechanism has bunch of advantages over Bitcoin and other PoW (Proof of Work) protocols;

* It doesn't waste resources.
* It's fast; takes a few seconds to reach concencus.
* Organizations who hold most computational power can't hack it. (See: [51% Attacks](https://learncryptography.com/cryptocurrency/51-attack))
* Small players (e.g non-profits) can play an important role to keep large players (e.g banks) honest.

If you're curious how it compares to other concencus mechanisms, [SCP whitepaper](https://www.stellar.org/papers/stellar-consensus-protocol.pdf) includes the following figure;

<center>

| Mechanism           | Decentralized Control | Low Latency | Flexible Trust | Asymptotic Security  |
| ---                 | ---                   | ---         | ---            | ---                 |
| Proof of Work       | ✓                     |             |                |                     |
| Proof of Stake      | ✓                     | maybe       |                | maybe               |
| Byzantine Agreement |                       | ✓           | ✓              | ✓                   |
| Tendermint          | ✓                     | ✓           |                | ✓                   |
| SCP                 | ✓                     | ✓           | ✓              | ✓                   |

</center>

To summarize, all blockchain projects aim to be a low-latency, secure and decentralized databases essentially. Although there are so many speculative
cryptocurrency projects with big promises in the market currently, Stellar is one of the a few truly innovative projects we got so far.

Now let's actually try using it.

<a name="getting-started-with-go"></a>
# Getting Started with Go

Stellar's network includes a client-facing HTTP API that connects real world applications to [stellar core](https://github.com/stellar/stellar-core/) nodes: [Horizon](https://github.com/stellar/horizon).
Currently there are JavaScript, Java, Ruby and Go SDKs in the official Stellar repository, we'll use Go in this post.

As a first step to interact with Stellar's network, we'll need to create our own public key and secret seed:

```go
package main

import (
	"github.com/stellar/go/keypair"
    "fmt"
)

func CreateKeypair() (*keypair.Full, error) {
	return keypair.Random()
}

func main() {
  keypair, err := CreateKeypair()
  if err != nil {
    panic(err)
  }

  fmt.Println("Secret seed: ", keypair.Seed())
  fmt.Println("Public Key: ", keypair.Address())
}
```

Now we're ready to create an account on the Stellar network.

<a name="create-account"></a>
# Create Account

Stellar's main network requires each account to have at least one lumen to
avoid spam. We'll use test network for development though, so Friendbot
can get us an account with a fat wallet:

```go
func CreateTestAccount(address string) error {
	resp, err := http.Get("https://horizon-testnet.stellar.org/friendbot?addr=" + address)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if _, err := ioutil.ReadAll(resp.Body); err != nil {
		return err
	}

	return nil
}
```

Stellar network supports tokens, similar to Ethereum, so each account can hold
more than one type of currency. We'll implement a `GetBalance` function to check
only one type of balance just to keep things simple.

```go
func GetBalance(address string) (string, error) {
	account, err := horizon.DefaultTestNetClient.LoadAccount(address)
	if err != nil {
		return "", err
	}

	for _, balance := range account.Balances {
		if balance.Type == "native" {
			return balance.Balance, nil
		}
	}

	return "", errors.New("Can't find native balance")
}
```

If we put all the the functions we defined together so far, we can now;

* Get a key pair to access Stellar network
* Create a test account
* Check the Lumens (a.k.a `native`) balance

```go
package main

import (
  "github.com/stellar/go/clients/horizon"
  "github.com/stellar/go/keypair"
  "io/ioutil"
  "net/http"
  "fmt"
)

func main () {
  keypair, err := CreateKeypair()
  if err != nil {
    panic(err)
  }

  if err := CreateTestAccount(keypair.Address()); err != nil {
    panic(err)
  }

  balance, err := GetBalance(keypair.Address())
  if err != nil {
    panic(err)
  }

  fmt.Println("Private seed: ", keypair.Seed())
  fmt.Println("Public Key (address): ", keypair.Address())
  fmt.Println("Current balance is: ", balance)
}
```

<a name="send-money"></a>
# Send Money

Having the seed key of source, and the public key of the destination, we can transfer funds between accounts in 4 steps;

* Verify destination account
* Build a payment transaction
* Sign the transaction with source seed key
* Submit transaction to the Stellar network

```go
func Transfer(sourceSeed, destinationAddr, amount, memoText string) error {
	// Verify destination account exists
	if _, err := horizon.DefaultTestNetClient.LoadAccount(destinationAddr); err != nil {
		return err
	}

	// Build & sign payment transaction
	tx, err := BuildPaymentTransaction(sourceSeed, destinationAddr, amount, memoText)
	if err != nil {
		return err
	}

	// Submit the transaction to the test network
	_, err = horizon.DefaultTestNetClient.SubmitTransaction(tx)
	return err
}
```

Looks simple, right ? Let's implement the function that builds and signs the payment transaction:

```go
func BuildPaymentTransaction(sourceSeed, destinationAddr, amount, memoText string) (string, error) {
    // Build payment transaction
	tx, err := build.Transaction(
		build.TestNetwork,
		build.SourceAccount{sourceSeed},
		build.AutoSequence{horizon.DefaultTestNetClient},
		build.MemoText{memoText},
		build.Payment(
			build.Destination{destinationAddr},
			build.NativeAmount{amount},
		),
	)

	if err != nil {
		return "", err
	}

	// Sign the transaction before submitting to the network
	signedTx, err := tx.Sign(sourceSeed)
	if err != nil {
		return "", err
	}

	return signedTx.Base64()
}
```

If we put together them, here is how we'd use them to transfer money between two accounts:

```go
package main

import (
	"github.com/stellar/go/build"
	"github.com/stellar/go/clients/horizon"
)

func main () {
    sourceSeed := "SCI2RW2WK2GBVU2HNB4ABFH52EHSMAR2PV2SLE4VFS6OFN4RZYELKOR4"
    destinationAddr := "GDAVIJXB6QXBKU66CBKOLHEMOUJOFQZKB7M3Y4IDXFTY2F5K6B25LDT4"

    err := Transfer(sourceSeed, destinationAddr, "500", "just testing")
	if err != nil {
		panic(err)
	}
}
```

<a name="receive-money"></a>
# Receive Money

All successful payments are added to your account automatically, so you actually don't have to do anything for receiving payment.
However, you may want to watch the network for payments.

Payments made to a specific address can be streamed in following steps;

* Create a [context](https://blog.golang.org/context)
* If saved, Load cursor from last token
* If not, define cursor to "now"
* Start listening for payments calling `StreamPayments` method

```go
package main

import (
	"context"
	"fmt"
	"github.com/stellar/go/clients/horizon"
)

func main() {
    // We'll watch for the payments made to this address
	const address = "GDAVIJXB6QXBKU66CBKOLHEMOUJOFQZKB7M3Y4IDXFTY2F5K6B25LDT4"

    // Run it in the background
	ctx := context.Background()

    // We didn't save the last paging token, so start from now
	cursor := horizon.Cursor("now")

	fmt.Println("Waiting for a payment...")

    // Wait for payments sent to the address
	err := horizon.DefaultTestNetClient.StreamPayments(ctx, address, &cursor, func(payment horizon.Payment) {
		fmt.Println("Payment Paging Token", payment.PagingToken)
		fmt.Println("Payment From", payment.From)
		fmt.Println("Payment To", payment.To)
		fmt.Println("Payment Asset Type", payment.AssetType)
		fmt.Println("Payment Asset Code", payment.AssetCode)
		fmt.Println("Payment Amount", payment.Amount)
		fmt.Println("Payment Memo", payment.Memo.Value)
	})

	if err != nil {
		panic(err)
	}
}
```

<a name="final-words"></a>
# Final Words

You can find these examples in [stellar-go-examples repository on Github](https://github.com/azer/stellar-go-examples). I'm planning to write another blog post soon for issuing tokens in Stellar platform, using the Go SDK just like this post.

If you have any questions or thoughts, you can reach me out via [e-mail](mailto:azer@roadbeats.com).
