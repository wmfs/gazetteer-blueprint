## [1.17.1](https://github.com/wmfs/gazetteer-blueprint/compare/v1.17.0...v1.17.1) (2019-09-09)


### 🐛 Bug Fixes

* remove pin geometry col from view as not in model - not needed ([7c2f2f2](https://github.com/wmfs/gazetteer-blueprint/commit/7c2f2f2))

# [1.17.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.16.0...v1.17.0) (2019-09-06)


### ✨ Features

* create view sql script ([2a2838c](https://github.com/wmfs/gazetteer-blueprint/commit/2a2838c))

# [1.16.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.15.0...v1.16.0) (2019-08-29)


### ✨ Features

* adding findingAdvice and mapbookText to streets model ([9505b6d](https://github.com/wmfs/gazetteer-blueprint/commit/9505b6d))

# [1.15.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.14.0...v1.15.0) (2019-08-28)


### ✨ Features

* add routing node boolean to gazetteer model ([3a827a2](https://github.com/wmfs/gazetteer-blueprint/commit/3a827a2))

# [1.14.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.13.0...v1.14.0) (2019-08-05)


### ✨ Features

* add gazetteer alias ([c0c7360](https://github.com/wmfs/gazetteer-blueprint/commit/c0c7360))

# [1.13.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.12.0...v1.13.0) (2019-08-05)


### ✨ Features

* add alias to streets model ([cc653c4](https://github.com/wmfs/gazetteer-blueprint/commit/cc653c4))

# [1.12.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.11.0...v1.12.0) (2019-07-29)


### ✨ Features

* Add model for rendezvous points ([2a072cf](https://github.com/wmfs/gazetteer-blueprint/commit/2a072cf))

# [1.11.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.10.0...v1.11.0) (2019-07-24)


### ✨ Features

* **new postgres functions:** Postgres functions to convert between uprn and masking code ([0f528d2](https://github.com/wmfs/gazetteer-blueprint/commit/0f528d2))

# [1.10.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.9.0...v1.10.0) (2019-07-24)


### ✨ Features

* **new postgres functions:** Postgres functions to convert between uprn and masking code ([8275ad2](https://github.com/wmfs/gazetteer-blueprint/commit/8275ad2))


### 📦 Code Refactoring

* add command area label to gazetteer model ([915aadb](https://github.com/wmfs/gazetteer-blueprint/commit/915aadb))

# [1.9.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.8.0...v1.9.0) (2019-07-18)


### ✨ Features

* add masking number ([e05b39e](https://github.com/wmfs/gazetteer-blueprint/commit/e05b39e))

# [1.8.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.7.3...v1.8.0) (2019-07-16)


### ✨ Features

* property/streets can only have one response so change the primary key to uprn only ([af1e3a3](https://github.com/wmfs/gazetteer-blueprint/commit/af1e3a3))


### 🛠 Builds

* **deps-dev:** Update [@semantic-release](https://github.com/semantic-release)/git requirement ([a262311](https://github.com/wmfs/gazetteer-blueprint/commit/a262311))
* **deps-dev:** Update [@semantic-release](https://github.com/semantic-release)/git requirement ([fc98ed6](https://github.com/wmfs/gazetteer-blueprint/commit/fc98ed6))
* Publish to NPM restricted ([5042381](https://github.com/wmfs/gazetteer-blueprint/commit/5042381))
* **deps-dev:** Update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([eece665](https://github.com/wmfs/gazetteer-blueprint/commit/eece665))
* **deps-dev:** Update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([752b2cb](https://github.com/wmfs/gazetteer-blueprint/commit/752b2cb))
* **deps-dev:** Update mocha requirement from 5.2.0 to 6.1.4 ([86f024e](https://github.com/wmfs/gazetteer-blueprint/commit/86f024e))
* **deps-dev:** Update nyc requirement from 13.1.0 to 14.1.1 ([c492a13](https://github.com/wmfs/gazetteer-blueprint/commit/c492a13))
* **deps-dev:** Update rimraf requirement from 2.6.2 to 2.6.3 ([1ca5716](https://github.com/wmfs/gazetteer-blueprint/commit/1ca5716))
* **deps-dev:** Update semantic-release requirement ([7366eb0](https://github.com/wmfs/gazetteer-blueprint/commit/7366eb0))


### 📚 Documentation

* add circleci status [skip ci] ([a5b09a7](https://github.com/wmfs/gazetteer-blueprint/commit/a5b09a7))


### ⚙️ Continuous Integrations

* **circle:** Update CircleCI config - Travis migration ([f5920a7](https://github.com/wmfs/gazetteer-blueprint/commit/f5920a7))
* **travis:** remove Travis config ([13c8281](https://github.com/wmfs/gazetteer-blueprint/commit/13c8281))

## [1.7.3](https://github.com/wmfs/gazetteer-blueprint/compare/v1.7.2...v1.7.3) (2019-04-03)


### 🐛 Bug Fixes

* Alter Street State type from string to integer ([e5c04e2](https://github.com/wmfs/gazetteer-blueprint/commit/e5c04e2))
* Fix Provider label ([136317d](https://github.com/wmfs/gazetteer-blueprint/commit/136317d))

## [1.7.2](https://github.com/wmfs/gazetteer-blueprint/compare/v1.7.1...v1.7.2) (2019-03-05)


### 🐛 Bug Fixes

* **gazetteer-model:** Add a couple of audit raw annotations ([0c2cc4d](https://github.com/wmfs/gazetteer-blueprint/commit/0c2cc4d))

## [1.7.1](https://github.com/wmfs/gazetteer-blueprint/compare/v1.7.0...v1.7.1) (2019-03-05)


### 🐛 Bug Fixes

* **add-address-label:** postcode/postCode, we'll handle either now ([8e963c8](https://github.com/wmfs/gazetteer-blueprint/commit/8e963c8))
* **address-label:** Trim strings before concatenating ([57382f0](https://github.com/wmfs/gazetteer-blueprint/commit/57382f0))

# [1.7.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.6.2...v1.7.0) (2019-03-05)


### ✨ Features

* **functions:** add-address-label function, to build address label and add to event ([8c7703f](https://github.com/wmfs/gazetteer-blueprint/commit/8c7703f))


### 🐛 Bug Fixes

* **gazetteer-model:** Tweaked titles and descriptions ([4a2f51d](https://github.com/wmfs/gazetteer-blueprint/commit/4a2f51d))
* **streets:** Annotation tweak ([768e9bf](https://github.com/wmfs/gazetteer-blueprint/commit/768e9bf))

## [1.6.2](https://github.com/wmfs/gazetteer-blueprint/compare/v1.6.1...v1.6.2) (2019-03-04)


### 🐛 Bug Fixes

* trigger release ([b6ad574](https://github.com/wmfs/gazetteer-blueprint/commit/b6ad574))


### 🛠 Builds

* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.63.0 to 1.64.0 ([45c8628](https://github.com/wmfs/gazetteer-blueprint/commit/45c8628))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.64.0 to 1.66.0 ([0207ab3](https://github.com/wmfs/gazetteer-blueprint/commit/0207ab3))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([4bef1af](https://github.com/wmfs/gazetteer-blueprint/commit/4bef1af))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([f0274f3](https://github.com/wmfs/gazetteer-blueprint/commit/f0274f3))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([56df2c9](https://github.com/wmfs/gazetteer-blueprint/commit/56df2c9))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([7e1071d](https://github.com/wmfs/gazetteer-blueprint/commit/7e1071d))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([c5e5e1a](https://github.com/wmfs/gazetteer-blueprint/commit/c5e5e1a))
* **deps-dev:** update semantic-release requirement ([185122e](https://github.com/wmfs/gazetteer-blueprint/commit/185122e))
* **deps-dev:** update semantic-release requirement ([845cc97](https://github.com/wmfs/gazetteer-blueprint/commit/845cc97))
* **deps-dev:** Update semantic-release requirement ([#140](https://github.com/wmfs/gazetteer-blueprint/issues/140)) ([1b959c7](https://github.com/wmfs/gazetteer-blueprint/commit/1b959c7))


### 📦 Code Refactoring

* **models:** Add type hints and titles annotations to the models ([c9d8791](https://github.com/wmfs/gazetteer-blueprint/commit/c9d8791))


### ⚙️ Continuous Integrations

* **circle:** add circle CI config ([0109382](https://github.com/wmfs/gazetteer-blueprint/commit/0109382))
* **travis:** build on master only ([c8a956c](https://github.com/wmfs/gazetteer-blueprint/commit/c8a956c))
* **travis:** update notification config ([05b9b42](https://github.com/wmfs/gazetteer-blueprint/commit/05b9b42))
* **travis:** use node lts ([c5c5def](https://github.com/wmfs/gazetteer-blueprint/commit/c5c5def))

## [1.6.1](https://github.com/wmfs/gazetteer-blueprint/compare/v1.6.0...v1.6.1) (2018-11-21)


### 🐛 Bug Fixes

* Use postcode_locator as postcode if the actual postcode field is empty. ([0531cf2](https://github.com/wmfs/gazetteer-blueprint/commit/0531cf2))


### 🛠 Builds

* **deps-dev:** update [@semantic-release](https://github.com/semantic-release)/changelog requirement ([ea64a8f](https://github.com/wmfs/gazetteer-blueprint/commit/ea64a8f))
* **deps-dev:** update [@semantic-release](https://github.com/semantic-release)/git requirement ([5383003](https://github.com/wmfs/gazetteer-blueprint/commit/5383003))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.42.0 to 1.47.0 ([4ed04ce](https://github.com/wmfs/gazetteer-blueprint/commit/4ed04ce))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.47.0 to 1.48.0 ([eb39bc8](https://github.com/wmfs/gazetteer-blueprint/commit/eb39bc8))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.48.0 to 1.49.0 ([2a1d0f6](https://github.com/wmfs/gazetteer-blueprint/commit/2a1d0f6))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.49.0 to 1.50.0 ([0af3c55](https://github.com/wmfs/gazetteer-blueprint/commit/0af3c55))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.50.0 to 1.54.0 ([e2ddaef](https://github.com/wmfs/gazetteer-blueprint/commit/e2ddaef))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.54.0 to 1.56.0 ([53222c1](https://github.com/wmfs/gazetteer-blueprint/commit/53222c1))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.56.0 to 1.58.0 ([2ed7543](https://github.com/wmfs/gazetteer-blueprint/commit/2ed7543))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.58.0 to 1.59.0 ([55ee6ed](https://github.com/wmfs/gazetteer-blueprint/commit/55ee6ed))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.59.0 to 1.60.0 ([4777458](https://github.com/wmfs/gazetteer-blueprint/commit/4777458))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.60.0 to 1.61.0 ([ccead9a](https://github.com/wmfs/gazetteer-blueprint/commit/ccead9a))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.61.0 to 1.62.0 ([8f04d58](https://github.com/wmfs/gazetteer-blueprint/commit/8f04d58))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.62.0 to 1.63.0 ([dc03097](https://github.com/wmfs/gazetteer-blueprint/commit/dc03097))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([086ad14](https://github.com/wmfs/gazetteer-blueprint/commit/086ad14))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([2b9840c](https://github.com/wmfs/gazetteer-blueprint/commit/2b9840c))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([3c6b9d7](https://github.com/wmfs/gazetteer-blueprint/commit/3c6b9d7))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([3e70f17](https://github.com/wmfs/gazetteer-blueprint/commit/3e70f17))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([43cc686](https://github.com/wmfs/gazetteer-blueprint/commit/43cc686))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([acbad4a](https://github.com/wmfs/gazetteer-blueprint/commit/acbad4a))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([3b772f5](https://github.com/wmfs/gazetteer-blueprint/commit/3b772f5))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([8a78994](https://github.com/wmfs/gazetteer-blueprint/commit/8a78994))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([4a05c62](https://github.com/wmfs/gazetteer-blueprint/commit/4a05c62))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([53fa529](https://github.com/wmfs/gazetteer-blueprint/commit/53fa529))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([dff4bba](https://github.com/wmfs/gazetteer-blueprint/commit/dff4bba))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([08eb65d](https://github.com/wmfs/gazetteer-blueprint/commit/08eb65d))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([169c868](https://github.com/wmfs/gazetteer-blueprint/commit/169c868))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([4fa5672](https://github.com/wmfs/gazetteer-blueprint/commit/4fa5672))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([ae0ad3c](https://github.com/wmfs/gazetteer-blueprint/commit/ae0ad3c))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([b90d018](https://github.com/wmfs/gazetteer-blueprint/commit/b90d018))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([a81ad68](https://github.com/wmfs/gazetteer-blueprint/commit/a81ad68))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([78984c4](https://github.com/wmfs/gazetteer-blueprint/commit/78984c4))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([83011bb](https://github.com/wmfs/gazetteer-blueprint/commit/83011bb))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([8e2478c](https://github.com/wmfs/gazetteer-blueprint/commit/8e2478c))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([14d2482](https://github.com/wmfs/gazetteer-blueprint/commit/14d2482))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([ea162ca](https://github.com/wmfs/gazetteer-blueprint/commit/ea162ca))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([12f413d](https://github.com/wmfs/gazetteer-blueprint/commit/12f413d))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([f8035a3](https://github.com/wmfs/gazetteer-blueprint/commit/f8035a3))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([dee05c4](https://github.com/wmfs/gazetteer-blueprint/commit/dee05c4))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-test-helpers requirement ([cb8689b](https://github.com/wmfs/gazetteer-blueprint/commit/cb8689b))
* **deps-dev:** update nyc requirement from 13.0.1 to 13.1.0 ([4fd4a28](https://github.com/wmfs/gazetteer-blueprint/commit/4fd4a28))
* **deps-dev:** update semantic-release requirement ([e534d27](https://github.com/wmfs/gazetteer-blueprint/commit/e534d27))
* **deps-dev:** update semantic-release requirement ([eb3c162](https://github.com/wmfs/gazetteer-blueprint/commit/eb3c162))
* **deps-dev:** update semantic-release requirement ([401530f](https://github.com/wmfs/gazetteer-blueprint/commit/401530f))
* **deps-dev:** update semantic-release requirement ([9066303](https://github.com/wmfs/gazetteer-blueprint/commit/9066303))
* **deps-dev:** update semantic-release requirement ([a54f206](https://github.com/wmfs/gazetteer-blueprint/commit/a54f206))
* **deps-dev:** update semantic-release requirement ([81d8a3f](https://github.com/wmfs/gazetteer-blueprint/commit/81d8a3f))
* **deps-dev:** update semantic-release requirement ([77fb65c](https://github.com/wmfs/gazetteer-blueprint/commit/77fb65c))

# [1.6.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.5.0...v1.6.0) (2018-10-11)


### 🛠 Builds

* **deps:** Update chai from 4.1.2 to 4.2.0 ([370489b](https://github.com/wmfs/gazetteer-blueprint/commit/370489b))
* **deps-dev:** update [@semantic-release](https://github.com/semantic-release)/git requirement ([55f25ef](https://github.com/wmfs/gazetteer-blueprint/commit/55f25ef))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.21.0 to 1.23.0 ([45e2984](https://github.com/wmfs/gazetteer-blueprint/commit/45e2984))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.23.0 to 1.26.0 ([c73767f](https://github.com/wmfs/gazetteer-blueprint/commit/c73767f))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.26.0 to 1.26.1 ([aeb05dd](https://github.com/wmfs/gazetteer-blueprint/commit/aeb05dd))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.26.1 to 1.31.0 ([5bbfe12](https://github.com/wmfs/gazetteer-blueprint/commit/5bbfe12))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.31.0 to 1.32.0 ([62172b1](https://github.com/wmfs/gazetteer-blueprint/commit/62172b1))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.32.0 to 1.33.0 ([ac7a095](https://github.com/wmfs/gazetteer-blueprint/commit/ac7a095))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.33.0 to 1.34.0 ([abbf783](https://github.com/wmfs/gazetteer-blueprint/commit/abbf783))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.34.0 to 1.37.0 ([6bfa007](https://github.com/wmfs/gazetteer-blueprint/commit/6bfa007))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.37.0 to 1.39.0 ([fb75a4e](https://github.com/wmfs/gazetteer-blueprint/commit/fb75a4e))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.39.0 to 1.40.0 ([874f54b](https://github.com/wmfs/gazetteer-blueprint/commit/874f54b))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.40.0 to 1.42.0 ([cd5adae](https://github.com/wmfs/gazetteer-blueprint/commit/cd5adae))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([ecd74f0](https://github.com/wmfs/gazetteer-blueprint/commit/ecd74f0))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([1eee848](https://github.com/wmfs/gazetteer-blueprint/commit/1eee848))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([176bf21](https://github.com/wmfs/gazetteer-blueprint/commit/176bf21))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([e991138](https://github.com/wmfs/gazetteer-blueprint/commit/e991138))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([70188d3](https://github.com/wmfs/gazetteer-blueprint/commit/70188d3))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([724be42](https://github.com/wmfs/gazetteer-blueprint/commit/724be42))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([878e51e](https://github.com/wmfs/gazetteer-blueprint/commit/878e51e))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([2f2bc62](https://github.com/wmfs/gazetteer-blueprint/commit/2f2bc62))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([26e9d02](https://github.com/wmfs/gazetteer-blueprint/commit/26e9d02))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([991d0f0](https://github.com/wmfs/gazetteer-blueprint/commit/991d0f0))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([dbca90e](https://github.com/wmfs/gazetteer-blueprint/commit/dbca90e))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement ([851fb81](https://github.com/wmfs/gazetteer-blueprint/commit/851fb81))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([ef316a3](https://github.com/wmfs/gazetteer-blueprint/commit/ef316a3))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([ee815dd](https://github.com/wmfs/gazetteer-blueprint/commit/ee815dd))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([bdad8a3](https://github.com/wmfs/gazetteer-blueprint/commit/bdad8a3))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([64f7122](https://github.com/wmfs/gazetteer-blueprint/commit/64f7122))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([1e55df9](https://github.com/wmfs/gazetteer-blueprint/commit/1e55df9))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([223ed5f](https://github.com/wmfs/gazetteer-blueprint/commit/223ed5f))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([549a03b](https://github.com/wmfs/gazetteer-blueprint/commit/549a03b))
* **deps-dev:** update semantic-release requirement ([d462f66](https://github.com/wmfs/gazetteer-blueprint/commit/d462f66))
* **deps-dev:** update semantic-release requirement ([30513f5](https://github.com/wmfs/gazetteer-blueprint/commit/30513f5))
* **deps-dev:** update semantic-release requirement ([d75d94e](https://github.com/wmfs/gazetteer-blueprint/commit/d75d94e))
* **dev-deps:** Update semantic-release from 15.9.16 to 15.9.17 ([3afa085](https://github.com/wmfs/gazetteer-blueprint/commit/3afa085))

# [1.5.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.4.3...v1.5.0) (2018-09-06)


### ✨ Features

* Added wmfs.streets table ([ed4adc2](https://github.com/wmfs/gazetteer-blueprint/commit/ed4adc2))


### 🛠 Builds

* **deps-dev:** update [@semantic-release](https://github.com/semantic-release)/git requirement from 7.0.1 to 7.0.3 ([358d5e0](https://github.com/wmfs/gazetteer-blueprint/commit/358d5e0))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.14.0 to 1.16.2 ([cf6ca06](https://github.com/wmfs/gazetteer-blueprint/commit/cf6ca06))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.16.2 to 1.19.0 ([c3d526d](https://github.com/wmfs/gazetteer-blueprint/commit/c3d526d))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly requirement from 1.19.0 to 1.21.0 ([328f4f5](https://github.com/wmfs/gazetteer-blueprint/commit/328f4f5))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement from 1.15.0 to 1.23.0 ([3c69498](https://github.com/wmfs/gazetteer-blueprint/commit/3c69498))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement from 1.23.0 to 1.28.0 ([c601fa7](https://github.com/wmfs/gazetteer-blueprint/commit/c601fa7))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-etl-plugin requirement from 1.28.0 to 1.30.0 ([424625b](https://github.com/wmfs/gazetteer-blueprint/commit/424625b))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement ([ad4c467](https://github.com/wmfs/gazetteer-blueprint/commit/ad4c467))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement from 1.20.0 to 1.30.0 ([e145aca](https://github.com/wmfs/gazetteer-blueprint/commit/e145aca))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement from 1.30.0 to 1.35.0 ([6d9f63a](https://github.com/wmfs/gazetteer-blueprint/commit/6d9f63a))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-pg-plugin requirement from 1.35.0 to 1.39.0 ([4263c07](https://github.com/wmfs/gazetteer-blueprint/commit/4263c07))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-test-helpers requirement from 1.1.0 to 1.1.1 ([c61a1f9](https://github.com/wmfs/gazetteer-blueprint/commit/c61a1f9))
* **deps-dev:** update [@wmfs](https://github.com/wmfs)/tymly-test-helpers requirement from 1.1.1 to 1.1.3 ([3249d2f](https://github.com/wmfs/gazetteer-blueprint/commit/3249d2f))
* **deps-dev:** update codecov requirement from 3.0.4 to 3.1.0 ([ac9abbd](https://github.com/wmfs/gazetteer-blueprint/commit/ac9abbd))
* **deps-dev:** update nyc requirement from 12.0.2 to 13.0.1 ([6a02755](https://github.com/wmfs/gazetteer-blueprint/commit/6a02755))
* **deps-dev:** update semantic-release requirement from 15.9.5 to 15.9.9 ([27ac3bc](https://github.com/wmfs/gazetteer-blueprint/commit/27ac3bc))
* **deps-dev:** update semantic-release requirement from 15.9.9 to 15.9.12 ([70a7b59](https://github.com/wmfs/gazetteer-blueprint/commit/70a7b59))
* **dev-deps:** move to standard 12.0.1 ([53cb57c](https://github.com/wmfs/gazetteer-blueprint/commit/53cb57c))

## [1.4.3](https://github.com/wmfs/gazetteer-blueprint/compare/v1.4.2...v1.4.3) (2018-08-13)


### 🐛 Bug Fixes

* Admin area is on sourceRow not address ([39c1e5a](https://github.com/wmfs/gazetteer-blueprint/commit/39c1e5a))

## [1.4.2](https://github.com/wmfs/gazetteer-blueprint/compare/v1.4.1...v1.4.2) (2018-08-13)


### 🐛 Bug Fixes

* Map administrative_area onto post_county ([4c712dd](https://github.com/wmfs/gazetteer-blueprint/commit/4c712dd))

## [1.4.1](https://github.com/wmfs/gazetteer-blueprint/compare/v1.4.0...v1.4.1) (2018-08-13)


### 🐛 Bug Fixes

* Correct (I hope) street name 2 ([ae8455b](https://github.com/wmfs/gazetteer-blueprint/commit/ae8455b))


### 💎 Styles

* Lint fix ([2e8320e](https://github.com/wmfs/gazetteer-blueprint/commit/2e8320e))

# [1.4.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.3.0...v1.4.0) (2018-08-09)


### ✨ Features

* Split out routing table. ([e558ed0](https://github.com/wmfs/gazetteer-blueprint/commit/e558ed0))

# [1.3.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.2.3...v1.3.0) (2018-08-08)


### ✨ Features

* Split SSI table out in its own right. ([94efe56](https://github.com/wmfs/gazetteer-blueprint/commit/94efe56))

## [1.2.3](https://github.com/wmfs/gazetteer-blueprint/compare/v1.2.2...v1.2.3) (2018-08-07)


### 🐛 Bug Fixes

* Pull location out into a table in its own right. ([71656a6](https://github.com/wmfs/gazetteer-blueprint/commit/71656a6))

## [1.2.2](https://github.com/wmfs/gazetteer-blueprint/compare/v1.2.1...v1.2.2) (2018-08-07)


### 🐛 Bug Fixes

* Pulled responses table out in its own right ([a435a09](https://github.com/wmfs/gazetteer-blueprint/commit/a435a09))

## [1.2.1](https://github.com/wmfs/gazetteer-blueprint/compare/v1.2.0...v1.2.1) (2018-08-07)


### 🐛 Bug Fixes

* **gazetteerModel:** If we use find where uprn equals blah then handle returned array ([260d79d](https://github.com/wmfs/gazetteer-blueprint/commit/260d79d))

# [1.2.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.1.0...v1.2.0) (2018-08-06)


### ✨ Features

* Pulled alarms table out in its own right, rather than as a child of gazetteer. ([362f2e9](https://github.com/wmfs/gazetteer-blueprint/commit/362f2e9))


### ♻️ Chores

* semantic-release 15.9.2 -> 15.9.5 ([7cbbbdb](https://github.com/wmfs/gazetteer-blueprint/commit/7cbbbdb))

# [1.1.0](https://github.com/wmfs/gazetteer-blueprint/compare/v1.0.0...v1.1.0) (2018-08-01)


### ✨ Features

* Add counter to gazetteer PK.  Add originHashSum and dataSource columns to all child tables. ([46b23c5](https://github.com/wmfs/gazetteer-blueprint/commit/46b23c5))


### 📚 Documentation

* Added do-nothing index.js so we can resolve the module ([464bd70](https://github.com/wmfs/gazetteer-blueprint/commit/464bd70))

# 1.0.0 (2018-08-01)


### ✨ Features

* Initial release ([93ea7db](https://github.com/wmfs/gazetteer-blueprint/commit/93ea7db))


### 🚨 Tests

* Correct include paths ([cbe7f15](https://github.com/wmfs/gazetteer-blueprint/commit/cbe7f15))
* Pulled tests across from addressbox ([7dabe59](https://github.com/wmfs/gazetteer-blueprint/commit/7dabe59))
