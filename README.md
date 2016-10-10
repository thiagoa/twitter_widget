# Twitter widget

## Getting Started

After you have cloned this repo, run this setup script to set up your machine
with the necessary dependencies to run and test this app:

    % ./bin/setup

It assumes you have a machine equipped with Ruby, Postgres, etc.
## Deploying

If you have previously run the `./bin/setup` script,
you can deploy to staging and production with:

    $ ./bin/deploy staging
    $ ./bin/deploy production

We currently use the following buildpacks:

- heroku/nodejs
- heroku/ruby
- https://github.com/febeling/webpack-rails-buildpack.git

Please be sure to configure these buildpacks in the same sequence
presented here in both staging and production, or else the deploy will
not work.
