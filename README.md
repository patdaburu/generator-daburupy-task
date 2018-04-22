# generator-daburupy-click
`daburupy-task` a [Yeoman](http://yeoman.io) generator for a basic python [Luigi](https://luigi.readthedocs.io/en/stable/) task project that includes pytest, [Sphinx](http://www.sphinx-doc.org/en/master/), a `Makefile` and a few other standard pieces to get your project going.

It also includes a using [Click](http://click.pocoo.org/5/) application you can use to run your task if you need to do so.

If you haven't used yeoman templates before, take a look at the [Getting Started with Yeoman](http://yeoman.io/learning/) article on the project page.

## Get ready, get set...

### Install `npm`
If you haven't already installed [npm](https://www.npmjs.com/get-npm), you'll need to do that first.  

One pretty easy way to install `npm` and `node` is with [nvm](http://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/).  If you want to go this route, use `curl` to kick off the install script:

```bash
curl https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
At the time of this writing, **0.3.88** was the current version, but it may well have changed since then.  Go to the [Github project page](https://github.com/creationix/nvm/releases) to find the latest release.

After installing, you'll need to close and reopen your terminal, or run the following command:

```bash
source ~/.bashrc
```

You can then verify that `nvm` installed correctly by running the following command:

```bash
nvm --version
```

Lastly, just install node.

```bash
nvm install node
```


### Install `yeoman`
If you haven't already installed  [Yeoman](http://yeoman.io/learning/), perform the following steps:

```bash
npm install -g yo
```

### Install `bower`
If you haven't already installed  [Bower](https://bower.io/), perform the following steps:

```bash
npm install -g bower
```

## Install the `daburupy-task` Generator

```bash
npm install -g generator-daburupy-task
```

## Create Your Project

From a command prompt go into the directory in which you'd love to start your new python project and execute the template generator.

```bash
cd /my/target/directory
yo daburupy-task
```

The generator will ask you a few questions and, based on your answers, generate your new project.

## Project Files

The new project will contain a couple of files that we describe briefly in this section.

### cli.py

This is a  [Click](http://click.pocoo.org/5/) command-line application you can use to run your task, or submit it to a running instance of [the Luigi daemon](http://luigi.readthedocs.io/en/stable/central_scheduler.html?highlight=luigid), also known as `luigid`.  You can also modify it as your project develops.

### tasks.py

This is the module that contains the task that was created when you generated the project.

### luigi.cfg

This is a sample [Lugi configuration file](http://luigi.readthedocs.io/en/stable/configuration.html) that you can ship with your library.

## Next Steps

Once the project skeleton has been generated, you can use the `Makefile` to create your virtual environment.

```bash
make venv
```
Now that you have a virtual environment, go ahead and activate it.

```bash
source venv/bin/activate
```

At this point, you can install the project's required modules, run the example test and generate the project's [Sphinx](http://www.sphinx-doc.org/en/master/) documentation.

```bash
make install
make test
make docs
```

## Build and Run the Application

This template includes some starter code for your [Click](http://click.pocoo.org/5/) application, and you should be able to build and run it at this point.

To *install* the application into your virtual environment, you can use the `Makefile`.

```bash
make build
```

At this point, you should have an executable that is the same as your project's name.  To verify it's good to go, run it with the `--help` flag.

```
<my-project-name> --help
```



## Start Coding

If everything else went well, you can start coding your project.
