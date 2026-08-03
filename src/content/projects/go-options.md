---
title: go-options
slug: go-options
summary: A lightweight, generic functional options library for Go with built-in validation support.
repository: https://github.com/ziflex/go-options
period: Since 2026
status: active
featured: true
homepage: true
category: Go infrastructure
technologies:
  - Go
  - Generics
  - Functional options
  - Validation
role: Creator and maintainer
order: 5
sources:
  - https://github.com/ziflex/go-options
  - https://github.com/ziflex/go-options/blob/main/README.md
  - https://github.com/ziflex/go-options/blob/main/options.go
  - https://github.com/ziflex/go-options/blob/main/errors.go
---

## What it is

go-options is a small generic library for applying functional options to Go values. An option receives a pointer to a configuration value and a reporting function, keeping mutation and validation inside the same typed operation.

The package can start from a type's zero value with `Apply` or update an existing value with `ApplyWithValues`.

## Validation alongside configuration

Options can report validation failures with field, value, and reason details. Application continues across the option set, then returns the configured value together with the collected failures joined into one error.

This keeps validation close to the option that owns the constraint without requiring every caller to assemble the reporting mechanism again.

## A shared functional-options contract

The functional-options pattern is simple, but its function types, application loop, and error handling are often repeated from package to package. go-options gives those mechanics one generic implementation while leaving each package responsible for its own configuration type and option functions.

## What it illustrates

go-options is a narrow abstraction around a familiar Go convention. It standardizes the reusable mechanics while keeping configuration values, mutations, and validation rules explicit in application code.

## Links

- [Source and package guide](https://github.com/ziflex/go-options)
