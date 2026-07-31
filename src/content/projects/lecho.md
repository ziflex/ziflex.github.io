---
title: lecho
slug: lecho
summary: A Zerolog integration for Echo that keeps structured request logging and application context connected.
repository: https://github.com/ziflex/lecho
period: Since 2019
status: maintained
featured: true
homepage: true
category: Go infrastructure
technologies:
  - Go
  - Echo
  - Zerolog
  - HTTP middleware
role: Creator and maintainer
order: 2
sources:
  - https://github.com/ziflex/lecho
  - https://github.com/ziflex/lecho/blob/master/README.md
---

## What it is

lecho connects the Echo web framework with Zerolog. It provides an Echo-compatible logger, structured request middleware, and helpers for moving loggers through request contexts.

It is intentionally an integration rather than a new logging system: Echo remains the web framework, Zerolog remains the structured logging engine, and lecho makes their contracts fit.

## Request context as a boundary

HTTP logging becomes useful when application events can be associated with the request that produced them. lecho’s middleware attaches request information and makes the request-scoped logger available to handlers. Correlation identifiers and structured fields can stay with the context rather than being rebuilt for each message.

## Interoperability over replacement

The package implements the interfaces Echo expects while retaining access to Zerolog’s API. That balance is the core of the project: make two established tools work together without hiding either one behind an oversized abstraction.

## What it illustrates

lecho represents a recurring concern in this workshop: integrations should reduce ceremony while preserving the behavior and vocabulary of the systems they connect.

## Links

- [Source and usage guide](https://github.com/ziflex/lecho)
