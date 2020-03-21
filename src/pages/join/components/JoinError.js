import React from 'react';
import { UnstyledLink } from 'src/components/matchbox';

export default function JoinError({ errors, data }) {
  let status;
  let message;

  const genericError = <span>Something went wrong. Please try again in a few minutes.</span>;

  try {
    message = errors.response.data.errors[0].message;
    status = errors.response.status;
  } catch (e) {
    return genericError;
  }

  if (status === 400 && message.match(/\brecaptcha\b/i)) {
    return 'There was an error with your reCAPTCHA response, please try again.';
  } else if ((status === 400 || status === 403) && message.match(/^invalid email/i)) {
    return 'Email address is not valid.';
  } else if (status === 409 && message.match(/^AWS Account already exists/i)) {
    return "It looks like you've already created a SparkPost account through the AWS Marketplace. There may be a brief delay for your AWS account info to synchronize. Please wait a few minutes and then sign in.";
  } else if (status === 409 && message.match(/\bemail\b/i)) {
    return (
      <span>
        It looks like you already have a SparkPost account using {data.email}.&nbsp;
        <UnstyledLink to="/auth">Sign in</UnstyledLink>
      </span>
    );
  } else if (status === 403 && message.match(/^forbidden/i)) {
    return 'SparkPost is not currently available in your location.';
  } else {
    return genericError;
  }
}
