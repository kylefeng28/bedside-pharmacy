# UNC Bedside SICU Pocket Pharmacy App

COMP 523 Project Spring 2019

[Website](http://drugreference.web.unc.edu/)

## Getting started
### Installing the tools
First, install all necessary tools:

- Node.js
- [Expo](https://expo.io/): for easy testing on your phone
    - [Register for an Expo account](https://expo.io/signup)
    - Install the cli tool: `$ npm install -g expo-cli`
    - Download the Expo app for your phone as well

These aren't required, but will make your life easier. Try to find plugins for your favorite editor for these things:

- TypeScript support: compilation errors
- TSLint: TypeScript linting
- EditorConfig: for consistent spacing between editors

### Setting up the project
Clone this repo, and install dependencies needed:

```
$ cd react-native
$ npm install
```

### Running the project
**Expo**:
```
npm start
```

The first time you run this, it should ask you to login to your Expo account. It should start a dev server, and you can then scan the QR code with your phone to see changes appear on your phone.

See `package.json` to see what these commands do.

## File structure
- `package.json`: contains a list of dependencies and scripts used by the project
- **Entry points**:
    - `App.ts` (not `src/App.tsx`) is the entry point for mobile (used by Expo)
    - `src/index.js` is the entry point for web (used by react-scripts)

## Troubleshooting
**react-native StyleSheet problems**:
The `patches` directory has patches in a few things for the react-native typescript bindings. If npm doesn't patch it for you automatically, run this:

```
npx patch-package @types/react-native
```
