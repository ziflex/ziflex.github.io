---
title: throttle
slug: throttle
summary: A thread-safe fixed-window rate limiter for Go clients, including an HTTP transport wrapper.
repository: https://github.com/ziflex/throttle
period: Since 2024
status: maintained
featured: true
homepage: false
category: Go infrastructure
technologies:
  - Go
  - Rate limiting
  - HTTP
  - Concurrency
role: Creator and maintainer
order: 7
sources:
  - https://github.com/ziflex/throttle
  - https://github.com/ziflex/throttle/blob/main/throttle.go
  - https://github.com/ziflex/throttle/blob/main/roundtripper.go
---

## What it is

throttle is a small Go package for limiting client-side work to a fixed number of operations per time window. It is safe for concurrent callers and includes an `http.RoundTripper` wrapper for applying the limit to outgoing HTTP requests.

## The actual algorithm

The implementation uses a fixed-window counter. It tracks the beginning of the current window and the number of accepted operations inside it. Once the window expires, the counter resets; when the current window is full, callers wait for the next one.

This description follows the source. It deliberately avoids the repository README’s inconsistent use of “sliding window.”

## A composable HTTP boundary

The transport wrapper applies waiting before delegating to another `http.RoundTripper`. That keeps throttling at the network boundary and allows it to compose with the standard Go HTTP client instead of requiring request sites to remember a separate limiter call.

## What it illustrates

throttle is focused current work: a concurrency primitive with a small API, explicit algorithm, and an adapter for the standard interface where it is most useful.

## Links

- [Source on GitHub](https://github.com/ziflex/throttle)
