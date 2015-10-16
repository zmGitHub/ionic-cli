# Contributing

Questions, bug reports, feedback, etc. can be sent to our [Github Issues](https://github.com/driftyco/ionic-cli/issues).

Pull requests are welcome.

## Local Development

The CLI depends heavily on `ionic-app-lib` ([on Github](https://github.com/driftyco/ionic-app-lib)), which provides a library for working with Ionic apps and is the core of the Ionic CLI and [Lab](http://lab.ionic.io/). When developing, you will likely be committing to both the CLI and App Lib repos.

1. Fork both `ionic-cli` and `ionic-app-lib` and then clone:

    ```bash
    $ git clone git@github.com:[you]/ionic-cli.git
    $ git clone git@github.com:[you]/ionic-app-lib.git
    ```

1. Install the dependencies of both with `npm install`.
1. Link the App Lib in your global `node_modules` directory:

    ```bash
    $ cd ionic-app-lib
    $ npm link
    ```

1. Tell the CLI to use the globally linked `ionic-app-lib` package:

    ```bash
    $ cd ionic-cli
    $ npm link ionic-app-lib
    ```

## Git Branches

**`develop`** Development branch. **You should branch off here.**

**`master`** Stable branch.

### Usage

We develop changes in the `develop` branch of both repos. You should make your
changes in the `develop` branch and then create a pull request off of our
`develop` branch. Once the code is accepted, we will create a tag for the
release and publish it to NPM. Once in NPM, the code is considered "stable" and
is merged into `master`.

## Pull Requests

1. Create a new local branch.

    ```bash
    $ git checkout -b name-of-feature develop
    ```

1. Commit your changes.
1. Push up your changes to your fork with `git push origin name-of-feature`.
1. Before submitting a pull request, run the linter and tests, fixing any errors.

    ```bash
    $ gulp lint
    $ gulp test
    ```

1. Submit your pull request.
