import Head from 'next/head';
import React from 'react';

interface Props {
  title?: string;
  titles?: string[];
  desc?: string;
  image?: string;
}

export default function Seo({
  title = 'Cafe Night',
  titles,
  desc,
  image = 'meta.png',
}: Props) {
  const fullTitle = titles ? `${titles?.join(' • ')} • ${title}` : title;
  const url = 'https://cafe.molodezh.com';
  const author = 'Molodezh';
  const handle = '@molodezh';

  return (
    <Head>
      {fullTitle && <title key='title'>{fullTitle}</title>}
      {fullTitle && <meta name='title' content={fullTitle} key='meta:title' />}
      {author && <meta name='author' content={author} key='meta:author' />}
      {fullTitle && <meta property='og:title' content={title} key='og:title' />}
      <meta property='og:url' content={url} key='og:url' />
      <meta property='og:type' content='website' key='og:type' />
      {desc && <meta property='og:description' content={desc} key='og:desc' />}
      {image && <meta property='og:image' content={image} key='og:image' />}
      <meta property='og:image:type' content='image/png' key='og:image:type' />
      <meta property='og:image:width' content='800' key='og:image:width' />

      {handle && <meta name='twitter:site' content={handle} key='tw:site' />}
      {fullTitle && (
        <meta name='twitter:title' content={fullTitle} key='tw:title' />
      )}
      {desc && <meta name='twitter:description' content={desc} key='tw:desc' />}
      {image && <meta name='twitter:image' content={image} key='tw:image' />}
      <meta name='twitter:card' content='summary_large_image' key='tw:card' />
      <meta name='viewport' content='width=device-width' />
      <link rel='icon' href='/favicon.png' />
    </Head>
  );
}
