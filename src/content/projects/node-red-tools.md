---
title: Node-RED Tools
slug: node-red-tools
summary: An ecosystem of reusable Node-RED integrations and testing tools, created from project work involving Node-RED.
repository: https://github.com/node-red-tools
website: https://github.com/node-red-tools
organization: node-red-tools
period: Since 2020
status: maintained
featured: true
homepage: true
category: Integration ecosystems
technologies:
  - JavaScript
  - Node-RED
  - OpenAPI
  - MongoDB
  - Testing
role: Organization and package creator
order: 5
sources:
  - https://github.com/node-red-tools
  - https://github.com/node-red-tools/node-red-contrib-openapi
  - https://github.com/node-red-tools/node-red-contrib-mongodb4
  - https://github.com/node-red-tools/test-helpers
  - https://github.com/node-red-tools/node-red-contrib-amqp
  - https://github.com/node-red-tools/node-red-contrib-redis
  - https://github.com/node-red-tools/node-red-contrib-ajv
---

## What it is

Node-RED Tools is an organization of reusable nodes and development utilities for Node-RED. I created the organization and its packages while working on a project involving Node-RED, turning project-specific integration work into components that could stand on their own.

The collection spans service descriptions, data stores, validation, messaging, and the mechanics of testing nodes outside a running editor.

## Original tools

The original work includes OpenAPI nodes for building flows around API definitions, MongoDB integration, and test helpers for exercising Node-RED nodes. Together they cover both the runtime boundary—connecting visual flows to other systems—and the development boundary—making those integrations easier to verify.

These packages treat a visual programming environment as a real software platform, with reusable interfaces and test infrastructure rather than one-off flow wiring.

## Adopted and maintained integrations

The organization also houses adopted forks for AMQP, Redis, and AJV integration. Those projects began elsewhere and are presented as maintained adaptations, not original packages. Keeping that distinction visible matters: stewardship and authorship are different kinds of work.

## What it illustrates

Node-RED Tools represents integration work at several layers: protocols and storage, visual-development ergonomics, package boundaries, and repeatable testing. The common thread is turning a connection between systems into a dependable developer interface.

## Representative repositories

- [OpenAPI nodes](https://github.com/node-red-tools/node-red-contrib-openapi)
- [MongoDB nodes](https://github.com/node-red-tools/node-red-contrib-mongodb4)
- [Node-RED test helpers](https://github.com/node-red-tools/test-helpers)
- [The Node-RED Tools organization](https://github.com/node-red-tools)
