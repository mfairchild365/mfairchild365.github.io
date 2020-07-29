---
layout: post
hidden: true
title: "Troubles with Travis-ci, pa11y and Pyrus"
description: ""
category: 
tags: [travis-ci, pa11y, accessibility]
---

At my workplace we have a very strong goal of making everything that we build accessible.  One of the projects that we work on is an institution wide HTML/CSS/JS [framework](https://github.com/unl/wdntemplates/), which all of our websites are required to use.  I recently released a tool called [SiteMaster](https://github.com/unlsitemaster/site_master) which scans all of our websites and checks for errors such as broken links, HTML validity, and of course accessibility.

Using SiteMaster has brought to light several accessibility problems with our framework.  Developers would see these problems and ask how they could fix them, to which I have to reply "Well, you can't.  It is a problem that we had to fix."  This approach to fixing errors is too reactionary, we shouldn't be introducing accessibility errors at all.

So, how can we find and fix these errors in the framework?  Better yet, how can we prevent these errors from being introduced in the first pace?  The answer is continuous integration.  Continuous integration is essentially the idea that any time you push a change, or make a pull request, those changes are tested against an automatic suite of tests and reports back whether the change would introduce problems.

We are already using [Travis-ci](https://travis-ci.org/) as our continuous integration platform.  SiteMaster (our scanning tool) is using an accessibility tester called [pa11y](https://github.com/nature/pa11y), so all I had to do was was to integrate pa11y into our test suite.  Sounds easy enough, right?  Nope.  But luckily for you, I got things working so that you don't have to spend hours and hours getting it to work.
 
#The Test suite

We already have some tests using PHP, so our new test is naturally another .phpt test.

This is essentially how our test works:

1. Install dependencies, such as apache (and its configuration) and pa11y
2. Build the framework using `make`
3. Run `pa11y` on all of our example pages
4. Report back any errors

The problem that I was having was that even after successfully installing `pa11y` and `node`, the .phpt test would fail running them with errors like `pa11y not found` or `node not found` or even `/usr/bin/env: node: No such file or directory`.

This was very confusing, because node and pa11y installed without error, and I could even call them from the Travis `before_script` command.  But once my .phpt script tried to call the same tools, they would fail.  WHY!?  Turns out it is pyrus, the tool that I was using to run the tests.  `pyrus run-phpt` seems to clear out the environment for each .phpt test.

I was able to fix this by defining the environment $path in my .phpt script:

```
if (file_exists('/home/travis')) {
    //Set the $path for cli, so that tools can be found. (Travis doesn't do this for you)
    putenv("PATH=/usr/local/bin:/usr/bin:/bin");
}
```

And then calling pa11y like this:

```
$json = exec('node_modules/.bin/pa11y -r json http://localhost/examples/example.shtml');
```


#sidenotes

In case you are wondering, this is my .travis.yaml:

```
language: php
php:
  - 5.4
before_install:
   # configure apache virtual hosts
   - sudo apt-get update
   - sudo apt-get install apache2
   - sudo cp -f build/travis-ci-apache /etc/apache2/sites-available/default
   - sudo sed -e "s?%TRAVIS_BUILD_DIR%?$(pwd)?g" --in-place /etc/apache2/sites-available/default
   - sudo a2enmod include
   - sudo a2enmod headers
   - sudo apachectl configtest
   - sudo service apache2 restart
before_script: 
   - pyrus install -p pyrus.net/Pyrus_Developer-alpha
   # install dependancies for `make`
   - npm install -g requirejs
   - npm install -g less
   - npm install -g uglify-js
   # install `pa11y`
   - npm install pa11y
   # build the templates
   - make
   # import test dependencies
   - composer install --prefer-source
   # make `#!/usr/bin/env node` work -- used in pa11y
   - sudo ln -s `which node` /usr/local/bin/node
script: pyrus run-phpt -r tests || (find . -name *.out | xargs -t cat && exit 1)
branches:
  only:
    - develop
```

