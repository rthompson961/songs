**Download Dependencies**

```
composer install
yarn install
```

**Build Webpack Assets**

```
./node_modules/.bin/webpack --watch
```

**Start Server**

```
symfony serve -d
```

**Create database and load fixtures**

```
bin/console doctrine:database:create
bin/console doctrine:migration:migrate -n
bin/console doctrine:fixtures:load -n
```