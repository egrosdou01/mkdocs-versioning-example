# mkdocs-versioning-example

## Introduction
This repository demonstrates how to use [MkDocs](https://www.mkdocs.org/) with the [Mike](https://squidfunk.github.io/mkdocs-material/setup/setting-up-versioning/) plugin to enable versioning in your documentation.

## Prerequisites
1. Git installed
1. Python 3.x installed

## Getting Started

To manually install and work with the demo deployment, follow the steps below.

```bash
$ git clone <Clone this repository>
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install zensical==0.0.32
$ pip install git+https://github.com/squidfunk/mike.git
```

You can achieve the same by using the `requirements.txt` file.

```bash
$ git clone <Clone this repository>
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
```

### Local Access

To access the static page, execute ```mike serve```. The website will be available at ```http://localhost:8000```.

For a detailed walkthrough and additional context, refer to the [blog post](https://blog.grosdouli.dev/blog/mkdocs-mike-integration).