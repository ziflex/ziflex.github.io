---
title: Ferret
slug: ferret
summary: A declarative language and embeddable runtime for structured data access and browser automation.
repository: https://github.com/MontFerret/ferret
website: https://ferretlang.org/
organization: MontFerret
period: Since 2018
status: active
featured: true
homepage: true
category: Language and runtime
technologies:
  - Go
  - Language design
  - Browser automation
  - Embedding
role: Creator and maintainer
order: 1
sources:
  - https://github.com/MontFerret/ferret
  - https://github.com/MontFerret/ferret/blob/main/README.md
  - https://ferretlang.org/
---

## What it is

Ferret is a declarative query language and runtime for collecting structured data from web pages and HTTP endpoints. A query describes the data to retrieve and transform; the runtime coordinates browser sessions, network access, iteration, and result construction.

The project began in 2018 and is now developing a v2 language and execution model. Its own website explains the product and documentation in depth. This page is about the engineering thread it represents.

## A language, not a script wrapper

Ferret has its own syntax, parser, compiler, runtime, standard library, and tools. The language brings navigation, data access, transformation, and automation into one execution model instead of treating browser control as a sequence of opaque driver calls.

That boundary changes the design problem. Error behavior, cancellation, values, iteration, module interfaces, and resource ownership all become parts of the language contract.

## Built to live inside other systems

The Go runtime can be embedded and extended. Applications can register functions and modules, choose the browser and network capabilities they expose, and pass values into a query. Ferret therefore works as both a command-line tool and a component in a larger service.

Embedding keeps the core deliberately separate from any single deployment shape. It also makes the public API, lifecycle, and policy boundaries as important as the surface syntax.

## The culmination of a longer thread

Earlier projects on this site focus on small developer primitives, integration boundaries, and infrastructure libraries. Ferret gathers those interests into a larger system: a language interface over complex machinery, with attention to extension points and the experience of the person operating it.

It is the flagship project here, but not the whole workshop. The same concern—removing friction without disguising the underlying system—appears throughout the archive.

## Links

- [Ferret website](https://ferretlang.org/)
- [Documentation](https://docs.ferret.dev/)
- [Source on GitHub](https://github.com/MontFerret/ferret)
