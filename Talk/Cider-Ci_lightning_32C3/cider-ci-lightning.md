% Cider-CI multi-service integration tests
% eins78

## Cider-CI

> Multi-service
integration tests

## Traditional CI:

**Continous *build*s**

- single shell script
- hooks *around* that script ("before", "after", …)

**Problems**

- hard to make faster/parallelize
- hard to set up manage complex setups

## Cider-CI approach

- complex, but explicit configuration
- very little assumptions about your workflow
- pro: hackability
- con: simples cases are relatively verbose


## Cider-CI overview

- **Projects** have a **git repo**
- **repo** contains configuration for 1 or more **Jobs**
- each **Job** has 1 or more **Tasks** that *run in parallel*
- each **Task** has 1 or more (shell) **Scripts** that *run in order*

- *Jobs* can be **triggered** from branches and **depend** on each other
- *Tasks* can be re-tried
- *Scripts* can **depend** on each other

## Details, quick walkthrough

(Excerpt from much longer Talk about Cider-CI)

- HTML: <http://drtom.ch/talks/2015/CL/>
- PDF: <http://drtom.ch/talks/2015/CL/slides.pdf>


<!-- ###### notes

- jobs: "Lint", "Test", "Build", "Release", "Deploy", …
- tasks: in a Job "Unit Tests", this would all individual cases



## Git-aware

- commits are linked to `tree-id` (hash of contents)
- no retesting for squashing commits, merge-commits; reverting of HEAD

-->

## Complex example (CI-ception)

![Cider-CI is itself a multi-service application and runs its own integration tests](./CI-ception.png)


## API

REST-ful API to implement any workflow you want

- nightly builds/deploys

## Try it out

Try Cider-CI, open source, installs with two commands:

- <http://docs.cider-ci.info/introduction/quick-start/>
- or read the sources: <https://github.com/cider-ci/cider-ci>

Or come talk to me on Day 2 and 3.
See the wiki, but most likely I will be at the freifunk assembly

THX!
