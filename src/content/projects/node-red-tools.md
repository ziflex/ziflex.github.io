---
title: Node-RED Tools
slug: node-red-tools
summary: An open-source Node-RED integration ecosystem created and maintained by Timofei Voronov from 2020 to 2022, now archived.
website: https://github.com/node-red-tools
websiteLabel: Organization
organization: Node-RED Tools
period: 2020–2022
temporalCoverage: 2020/2022
status: archived
featured: false
homepage: false
category: Integration ecosystems
technologies:
  - JavaScript
  - Node-RED
  - OpenAPI
  - MongoDB
  - Testing
role: Created and maintained by Timofei Voronov
order: 5
sources:
  - https://github.com/node-red-tools
  - https://github.com/node-red-tools/node-red-contrib-openapi
  - https://github.com/node-red-tools/node-red-contrib-mongodb
  - https://github.com/node-red-tools/test-helpers
  - https://github.com/node-red-tools/node-red-contrib-amqp
  - https://github.com/node-red-tools/node-red-contrib-redis
  - https://github.com/node-red-tools/node-red-contrib-ajv
---

## What it was

Node-RED Tools was an open-source ecosystem of reusable nodes and development utilities for Node-RED. It was active from 2020 to 2022 and is now archived.

I created the organization and its packages while working on a project involving Node-RED, turning project-specific integration work into components that could stand on their own. The collection spanned service descriptions, data stores, validation, messaging, and the mechanics of testing nodes outside a running editor.

## Original tools

The original work included OpenAPI nodes for building flows around API definitions, MongoDB integration, and test helpers for exercising Node-RED nodes. Together they covered both the runtime boundary—connecting visual flows to other systems—and the development boundary—making those integrations easier to verify.

These packages treated a visual programming environment as a real software platform, with reusable interfaces and test infrastructure rather than one-off flow wiring.

## Adopted integrations

During the same period, the organization also housed adopted forks for AMQP, Redis, and AJV integration. Those projects began elsewhere and were adaptations rather than original packages. Keeping that distinction visible matters: stewardship and authorship are different kinds of work.

## What it illustrates

Node-RED Tools brought together protocols and storage, visual-development ergonomics, package boundaries, and repeatable testing around one common thread: turning a connection between systems into a dependable developer interface.

## Representative repositories

- [OpenAPI nodes](https://github.com/node-red-tools/node-red-contrib-openapi)
- [MongoDB nodes](https://github.com/node-red-tools/node-red-contrib-mongodb)
- [Node-RED test helpers](https://github.com/node-red-tools/test-helpers)
- [The Node-RED Tools organization](https://github.com/node-red-tools)
