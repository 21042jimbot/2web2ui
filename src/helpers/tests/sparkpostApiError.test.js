import SparkpostApiError from '../sparkpostApiError';

function createTestError(sugar = {}) {
  const error = new Error('Oh No!');
  return new SparkpostApiError(Object.assign(error, sugar));
}

describe('SparkpostApiError', () => {
  it('instance of SparkpostApiError', () => {
    const error = createTestError();
    expect(error).toBeInstanceOf(SparkpostApiError);
  });

  it('instance of Error', () => {
    const error = createTestError();
    expect(error).toBeInstanceOf(Error);
  });

  it('returns error name', () => {
    const error = createTestError();
    expect(error).toHaveProperty('name', 'SparkpostApiError');
  });

  it('returns error message', () => {
    const error = createTestError({ response: { status: 400 } });
    expect(error).toHaveProperty('message', 'Oh No!');
  });

  it('returns a network error if no axios response', () => {
    const error = createTestError();
    expect(error).toHaveProperty(
      'message',
      'You may be having network issues or an adblocker may be blocking part of the app.',
    );
  });

  it('returns api error message', () => {
    const error = createTestError({
      response: {
        data: {
          errors: [
            {
              message: 'Something specific!',
            },
          ],
        },
      },
    });

    expect(error).toHaveProperty('message', 'Something specific!');
  });

  it('returns api error description', () => {
    const error = createTestError({
      response: {
        data: {
          errors: [
            {
              description: 'Something really specific!',
            },
          ],
        },
      },
    });

    expect(error).toHaveProperty('message', 'Something really specific!');
  });

  it('returns extra properties', () => {
    const error = createTestError({
      extra: 'shh',
    });
    expect(error).toHaveProperty('extra');
  });
});
