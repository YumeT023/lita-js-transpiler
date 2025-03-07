# lita.js

Transpiles [lita lang](https://github.com/fmaurica/lita) to javascript

### ✨ Npm typescript rollup

ready-to-publish npm package typescript template that uses rollup to bundle the final build

#### 💉 Use this template

Prerequisites: [Proplate](https://github.com/YumeT023/proplate)

```shell
proplate create --template https://github.com/YumeT023/npm-typescript-starter --dest output-dir
```

#### ✨ What does this template include ?

- **Everything is preconfigured. Feel free to edit them.**
- Code Formatter and linter is fully configured using [Prettier](https://prettier.io/) and [Eslint](https://eslint.org).
- Testing is already set-up using [Jest](https://jestjs.io). You can find a _sample_ in [src/**tests**/sample.ts](https://github.com/YumeT023/npm-typescript-starter/blob/main/src/__tests__/sample.ts).
- Bundling the build with `Rollup`
- Scripts:
  - `clean>` Removes the previous build output.
  - `build>` Builds the project (bundle .ts/.d.ts using rollup)
    - outputs: _mjs_ and _cjs_
  - `clean>` remove previous build output _dist_
  - `build-dts>` Emit declaration only
  - `clean-dts>` remove temp declaration file
  - `lint>` Lints the code style issues.
  - `lint:fix>` Fixes the code style issues.
  - `test>` Runs all the tests (_located in `src/__tests__`_)
  - `format>` Formats your codebase using **prettier**

#### 📝 Publish ?

This template is made so that you don't have to spend your time repeat the same configurations.
_remove `yarn.lock` if you use npm and use `npm` in the command line_

- `yarn build` Build the project to get the raw js outputs
- `yarn login` Login using your npm account
- `yarn publish` Publish the package to npm
