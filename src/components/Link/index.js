import React from 'react';
import NextLink from 'next/link';

export default function Link({ href, children, ...props }) {
  return (
    <NextLink href={href} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a {...props}>{children}</a>
    </NextLink>
  );
}