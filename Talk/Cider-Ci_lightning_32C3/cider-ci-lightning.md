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

- **Project** has *1* **(git) Repo**
- **Repo** contains configuration for *1+* **Jobs**
- each **Job** runs *1+* **Tasks** *in parallel*
- each **Task** runs *1+* (shell) **Scripts** *in order*
- *Jobs* can be **triggered** from branches and **depend** on each other
- *Tasks* can be re-tried
- *Scripts* can **depend** on each other

<!-- scripts: declaring script deps also declares their order -->

## Details, quick walkthrough

(Excerpt from much longer Talk about Cider-CI)

- HTML: <http://drtom.ch/talks/2015/CL/>
- PDF: <http://drtom.ch/talks/2015/CL/slides.pdf>

## INSERT SLIDES HERE

## What is it good at?

- **fast**: run lots of tasks in parallel & *retry* them
    - *instead of* `sh tests/*`
- **declarative** dependencies for tasks
    - *instead of, or like very flexible "hooks"*
- continous delivery: trigger and run different kinds of jobs
    - *instead of* `make test && make build && …`
    - Job "Test", triggers Job "Release", triggers "Deploy", …
    - Job: **"Good To Merge"**
        - *depends on* "Lint", "Unit Test", "Feature Tests"

## What does it not do?

- **Access management**
    - always trusts the repository, control (push) access there
- **Secrets management**
    - set up your own infrastructure and/or excutors
- *but:* executors can be told to only accept code from "blessed" repos

<!-- If you dont trust your contributors, release/deploy from a special
repository and manage push access to it. -->


<!-- Notes/Examples for Slides

- jobs:
    - "Lint", "Test", "Build", "Release", "Deploy", …
    - or different plattforms/matrix: "Build_32", "Build_64"
    - or "Good To Merge" - runs nothing but depends on specific jobs

- Tasks: in a Job "Unit Tests", this would all individual cases/files

- git:
    - commits are linked to `tree-id` (hash of contents)
    - no retesting for squashing commits, merge-commits; reverting of HEAD

-->

## Complex example (CI-ception)

![Cider-CI tests itself](./CI-ception.png)


## API

REST-ful API to implement any workflow you want

- "nightly" builds and deploys
- integrate with external services

## Try it out

Try Cider-CI, open source, installs with two commands:

- <http://docs.cider-ci.info/introduction/quick-start/>
- or read the sources: <https://github.com/cider-ci/cider-ci>

Run either a single instance for your organization or one per project.

(Re-) use your existing infrastructure or run on-demand on AWS.

Or come talk to me on Day 2 and 3.  
See the wiki, but most likely I will be at the freifunk assembly.

THX!


<style>
/* icons from font awesome */
@import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,400italic,600italic|Source+Code+Pro:400,600,500|Grand+Hotel);
@import url(http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css);
.reveal i.fa {
  font-style: normal;
  font-family: FontAwesome;
}
.reveal i.fa-3x {
  font-size: 1.5em;
}
/* for overriding 'simple' theme */
.reveal {
  font-size: 1.5em;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  color: #444;
}
b, strong {
  font-weight: 700;
}
.reveal h1,
.reveal h2,
.reveal h3,
.reveal h4,
.reveal h5,
.reveal h6 {
  letter-spacing: inherit;
  text-transform: inherit;
  font-family: inherit;
  font-weight: inherit;
  color: #444;
}
.reveal pre, .reveal code {
	font-family: "Source Code Pro", monospace;
  font-weight: 500;
  box-shadow: none;
}
.reveal strong code {
  font-weight: 700;
}
.reveal pre.small {
  font-size: 0.5em;
}
.reveal ul, .reveal ul ul {
  list-style-type: none;
  text-align: inherit;
  margin: 0;
}
.reveal ol li {
  list-style-type: none;
  counter-increment: list;
  margin-left: 1em;
}
.reveal ul li::before, ol li::before {
  content: "→ ";
  color: #888;
  font-weight: 700;
  margin-left: -1em;
}
.reveal ol li::before {
  content: counter(list) ". ";
}
.reveal ul ul li::before {
  content: "・ ";
}
.cursive, code.cursive {
  font-family: 'Grand Hotel', cursive;
  letter-spacing: 0;
}
.reveal small {
  vertical-align: baseline;
}
.reveal section img {
  border: none;
  box-shadow: none;
}
.reveal .controls div.navigate-left,
.reveal .controls div.navigate-left.enabled {
  border-right-color: hsl(200, 100%, 25%); }

.reveal .controls div.navigate-right,
.reveal .controls div.navigate-right.enabled {
  border-left-color: hsl(200, 100%, 25%); }

.reveal .controls div.navigate-up,
.reveal .controls div.navigate-up.enabled {
  border-bottom-color: hsl(200, 100%, 25%); }

.reveal .controls div.navigate-down,
.reveal .controls div.navigate-down.enabled {
  border-top-color: hsl(200, 100%, 25%); }

.reveal .controls div.navigate-left.enabled:hover {
  border-right-color: hsl(200, 100%, 40%); }

.reveal .controls div.navigate-right.enabled:hover {
  border-left-color: hsl(200, 100%, 40%); }

.reveal .controls div.navigate-up.enabled:hover {
  border-bottom-color: hsl(200, 100%, 40%); }

.reveal .controls div.navigate-down.enabled:hover {
  border-top-color: hsl(200, 100%, 40%); }

.reveal .progress {
  height: 0.8%;
  background: hsl(200, 100%, 25%);
}
.reveal .progress span {
  background: #fff;
}
</style>
