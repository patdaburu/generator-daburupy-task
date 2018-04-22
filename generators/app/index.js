'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `${chalk.red(
          'generator-daburupy-click'
        )} will help you get this python Luigi task project started!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        default: this.appname.replace(/\W/gi, '_') // Default to the project's folder name if the input is skipped.
      },
      {
        type: 'input',
        name: 'projectVersion',
        message: 'What is starting version of the project?',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Briefly describe the project.'
      },
      {
        type: 'list',
        name: 'pythonVersion',
        message: "What is the Python version you're targeting?",
        choices: ['2.7', '3.5', '3.6'],
        default: '3.6'
      },
      {
        type: 'input',
        name: 'authorName',
        message: "What is the author's name?"
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: "What is the author's email address?"
      },
      {
        type: 'list',
        name: 'license',
        message: 'Under what license will the project be published?',
        choices: ['None', 'MIT'],
        default: 'None'
      },
      {
        type: 'input',
        name: 'githubUser',
        message: 'What is the name of your github user?',
        default: null
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Create supplemental properties.
    const otherProps = {
      year: new Date().getFullYear(),
      uleq: '='.repeat(this.props.projectName.length),
      uldash: '-'.repeat(this.props.projectName.length),
      pyIfLicense: this.props.license === 'None' ? '# ' : '',
      taskName: this.props.projectName.replace(/(?:^|[-_])([a-z])/g, function(g) {
        return g.length > 1 ? g[1].toUpperCase() : g.toUpperCase();
      })
    };
    // Create the files at the root of the project.
    [
      'Makefile',
      'requirements.txt',
      'README',
      'README.md',
      'setup.cfg',
      'setup.py',
      'package.json',
      '.coveragerc',
      '.readthedocs.yml',
      'environment.yml',
      'bower.json',
      '.pylintrc'
    ].forEach(
      function(f) {
        this.fs.copyTpl(
          this.templatePath(f),
          this.destinationPath(f),
          Object.assign({}, this.props, otherProps)
        );
      }.bind(this)
    );
    // Copy the special files (like .gitignore) which might be ignored for packaging.
    ['gitignore'].forEach(
      function(f) {
        this.fs.copyTpl(this.templatePath(f), this.destinationPath('.' + f), this.props);
      }.bind(this)
    );
    // Copy the project directory templates.
    ['__init__.py', 'cli.py', 'tasks.py'].forEach(
      function(f) {
        const src = path.join('_project', f);
        const dest = path.join(this.props.projectName, f);
        this.fs.copyTpl(
          this.templatePath(src),
          this.destinationPath(dest),
          Object.assign({}, this.props, otherProps)
        );
      }.bind(this)
    );
    // Copy the unit test files.
    ['test_example.py'].forEach(
      function(f) {
        const src = path.join('tests', f);
        const dest = path.join('tests', f);
        this.fs.copyTpl(this.templatePath(src), this.destinationPath(dest), this.props);
      }.bind(this)
    );
    // Copy the root doc files.
    ['Makefile', 'make.bat'].forEach(
      function(f) {
        const src = path.join('docs', f);
        const dest = path.join('docs', f);
        this.fs.copyTpl(this.templatePath(src), this.destinationPath(dest), this.props);
      }.bind(this)
    );
    // Copy the doc source files.
    ['api.rst', 'conf.py', 'index.rst', 'requirements.rst'].forEach(
      function(f) {
        const src = path.join('docs', 'source', f);
        const dest = path.join('docs', 'source', f);
        this.fs.copyTpl(
          this.templatePath(src),
          this.destinationPath(dest),
          Object.assign({}, this.props, otherProps)
        );
      }.bind(this)
    );
    // Copy the doc static image files.
    ['logo.svg'].forEach(
      function(f) {
        const src = path.join('docs', 'source', '_static', 'images', f);
        const dest = path.join('docs', 'source', '_static', 'images', f);
        this.fs.copyTpl(this.templatePath(src), this.destinationPath(dest), this.props);
      }.bind(this)
    );
    // Copy the license file.
    const license = path.join('_licenses', this.props.license);
    this.fs.copyTpl(
      this.templatePath(license),
      this.destinationPath('LICENSE'),
      Object.assign({}, this.props, otherProps)
    );
  }

  install() {
    this.installDependencies();
  }

  end() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `${chalk.green(
          'Ready to go!'
        )} You can get started by running the commands below.  Have fun!`
      )
    );
    this.log(`${chalk.green('make venv')}`);
    this.log(`${chalk.green('source venv/bin/activate')}`);
    this.log(`${chalk.green('make install')}`);
    this.log(`${chalk.green('make build')}`);
    this.log(`${chalk.green(this.props.projectName + ' --help')}`);
  }
};
