# Contributing to Catalog Contracts

We appreciate and value community input + contributions to `catalog-contracts`. Please take 5' to review the items listed below to make sure that your contributions are ready for review as soon as possible.

## Contribution guidelines

Upgradeable smart contracts are carefully maintained to ensure nothing breaks. Community PRs are **not** guaranteed to be merged.

-   Please adhere to a consistent code style.
-   Please submit a relevant issue for your PR.

## Creating Pull Requests (PRs)

As a contributor, you are expected to fork this repository, work on your own fork and then submit pull requests. The pull requests will be reviewed and eventually merged into the main repo. See ["Fork-a-Repo"](https://help.github.com/articles/fork-a-repo/) for how this works.

## A typical workflow

1. Make sure your fork is up to date with the main repository:

```
cd catalog-contracts
git remote add upstream https://github.com/catalogworks/catalog-contracts.git
git fetch upstream
git pull --rebase upstream main
```

NOTE: The directory `catalog-contracts` represents your fork's local copy.

1. Branch out from `master` into `username/relavant-bug-title`:

```
git checkout -b username/relavant-bug-title
```

1. Make your changes, add your files, commit, and push to your fork.

```
git add .
git commit "Fixed relevant bug"
git push origin username/relavant-bug-title
```

4. Run tests, linter, etc. This can be done by running local continuous integration and make sure it passes.

```bash
yarn test
yarn lint:fix
```

5. Go to [github.com/catalogworks/catalog-contracts](https://github.com/catalogworks/catalog-contracts) in your web browser and issue a new pull request.

_IMPORTANT_ Read the PR template very carefully and be sure to include a descriptive overview of your PR, and instructions on how to properly test it.

1. Maintainers will review your code and possibly ask for changes before your code is pulled in to the main repository. We'll check that all tests pass, review the coding style, and check for general code correctness. If everything is OK, we'll merge your pull request and your code will be part of `catalog-contacts`.

_IMPORTANT_ Please pay attention to the maintainer's feedback, since it's a necessary step to keep up with the standards Catalog attains to.

## All set!

If you have any questions, feel free to post them to github.com/catalogworks/catalog-contracts/issues.

Thanks for your time and code!

[guidelines]: GUIDELINES.md
