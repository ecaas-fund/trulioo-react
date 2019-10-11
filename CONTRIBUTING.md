# Contributing to `trulioo-react`

Thanks for contributing to trulioo-react!

### Run tests:

`npm test`

Run tests from a specific folder i.e. `"src/tests/snapshot" and "src/tests/unit"`:

`npm test -- src/tests/snapshot src/tests/unit`

Run a certain test by title

`npm test src/tests/unit/TruliooForm.test.jsx -- -t "mapStateToProps"`

Integration tests (`src/tests/integration`) require EmbedID endpoints to be executed successfully.

To generate test coverage report:

`npm test -- --coverage`

Please add your tests under `src/tests/*` for the file(s) you are trying to update.