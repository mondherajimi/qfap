# How to contribute

## Maintainer

Hans Lemuet <hans@etaminstudio.com>

## Git workflow

We follow the workflow described here: https://gist.github.com/Spone/f4e7f915df96069b5923

## Fix a bug or improve existing code

First, clone the repository:

    $ git clone git@git.etaminstud.io:paris/quefaire-livingstyleguide.git

If this command fails, you probably have to add your SSH key here: https://git.etaminstud.io/profile/keys and try again.

By default, you will be on the `master` branch.

    $ cd styleguide
    $ git status
    # On branch master
    nothing to commit, working directory clean

Let's create a branch for your contribution, based on `master`.
For this example, we call it `my-contribution`. Please use a specific name, using the name of the module / component / layout / template your are improving as a prefix.

    $ git checkout -b my-contribution

Now you can make your changes. Most of the time you want to modify files in the `src` directory.
Do *not* call `npm run build`. The build will be updated by the maintainer of the repository when pushing a new version.

Once your changes are made, describe them at the beginning of the `CHANGELOG.md` file, and commit them.

    $ git add CHANGELOG.md src/
    $ git commit -m "A short message explaining your changes"

Rebase to make sure you will keep changes made by other developers on your branch and `master`.

    $ git fetch origin
    $ git rebase origin/my-contribution
    $ git rebase origin/master

Then, push your new branch to the remote repository.

    $ git push origin my-contribution

You can now get back to the `master` branch.

    $ git checkout master

We want the maintainer of the repository to merge our changes, so we'll now create a "merge request".
Login to https://git.etaminstud.io/paris/quefaire-livingstyleguide/merge_requests

Click on "+ New Merge Request".

On the left side ("Source branch"), pick your branch (`my-contribution` in our example). Leave `master` as the "Target branch".

Click on "Compare branches".

Set an explicit title. If necessary, add more information about your changes in the "Description" field.

Assign the merge request to the maintainer.

Click on "Submit merge request".

The maintainer will now review your request and merge it to the repository. He will then release a new version of the styleguide (including a new build).

Once this is done, you can update your local repository:

    $ git pull origin master

You can also delete your local branch, which is no longer useful:

    $ git branch -d my-contribution

Thanks for your contribution!

## Release a new version

Create the release branch, `X.X.X` being your new version number

    $ git checkout -b release-X.X.X master

Check that all changes from previous version are documented in `CHANGELOG.md`

Bump the version number in the following files:

    package.json
    src/_data.json
    src/javascript/main.js

Update the `CHANGELOG.md` to add the new version number above the last changes

Build the styleguide:

    $ npm run build

Then add everything and commit (`X.X.X` being your new version number):

    $ git add .
    $ git commit -m "New build X.X.X"

Merge it to master and tag it

    $ git checkout master
    $ git merge --no-ff release-X.X.X
    $ git tag -a X.X.X

Then delete the release branch

    $ git branch -d release-X.X.X

Push it!

    $ git push origin master
    $ git push origin --tags
