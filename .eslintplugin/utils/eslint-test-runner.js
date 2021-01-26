import { Linter } from 'eslint';

// note, experimented with RuleTester, too much magic and no easy way to set each test description
// see, https://eslint.org/docs/developer-guide/nodejs-api#ruletester

// Using:
// https://eslint.org/docs/developer-guide/nodejs-api#sourcecode
// &
// https://eslint.org/docs/developer-guide/nodejs-api#linter-definerules
// &
// https://eslint.org/docs/developer-guide/nodejs-api#linter-verify
const runner = (title, rule, { valid = {}, invalid = {} } = {}) => {
  describe(title, () => {
    const linter = new Linter();

    linter.defineRules({ [title]: rule });

    Object.keys(valid).forEach(description => {
      it(description, () => {
        const result = linter.verify(
          valid[description].code,
          {
            rules: { [title]: 'error' },
            parserOptions: {
              ecmaVersion: 2020,
              sourceType: 'module',
              ecmaFeatures: {
                  jsx: true
              }
            },
          },
          {
            filename: valid[description].filename
          },
        );


        console.log('result: ', result);
        expect(result.length === 0).toEqual(true);
      });
    });

    Object.keys(invalid).forEach(description => {
      it(description, () => {
        const result = linter.verify(
          invalid[description].code,
          {
            rules: { [title]: 'error' },
            parserOptions: {
              ecmaVersion: 2020,
              sourceType: 'module',
              ecmaFeatures: {
                  jsx: true
              }
            },
          },
          {
            filename: invalid[description].filename
          },
        );

        expect(result.length).toBeGreaterThan(0);
        expect(result[0].message).toEqual(invalid[description].errors[0].message);
      });
    });
  });
};

module.exports = runner;
