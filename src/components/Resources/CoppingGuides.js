import React, { Fragment } from 'react';

const CoppingGuides = () => {
  return (
    <Fragment>
      <p className="section-title">Multiple People Jig</p>
      <a
        href="https://www.youtube.com/channel/UCN8OxuBrKg6YJ-Kv4UB5Hjg"
        target="_blank"
        rel="noopener noreferrer"
      >
        (Credits to Keith Adam)
      </a>
      <div className="vid-container">
        <iframe
          width="460"
          height="315"
          className="jig1"
          src="https://www.youtube.com/embed/e9nzZRzkNSE?showinfo=0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="Multiple People Jig"
          allowFullScreen
        />
      </div>
      <p className="section-title">Copping Manual</p>
      <p>
        There's not much to be said about copping manual. It's all about
        practice and being as fast as possible. Some useful tools to give you an
        edge include using your browsers autofill feature or extensions
        like&nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://chrome.google.com/webstore/detail/autofill/nlmmgnhgdeffjkdckmikfpnddkbbfkkk?hl=en"
        >
          autofill
        </a>{' '}
        and
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://chrome.google.com/webstore/detail/autofill-for-chrome-by-fi/ojhegjfmbbpahdggoekcbmejnifimeca?hl=en"
        >
          &nbsp;fillr
        </a>
      </p>
      <p>
        Here's a guide by&nbsp;
        <a
          href="https://www.youtube.com/channel/UCS9mgvjxQN-cEXN4b8VJUWg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chop Suey&nbsp;
        </a>
        on how to set up autofill (the process applies for other sites)
      </p>
      <div className="vid-container">
        <iframe
          width="460"
          height="315"
          className="jig1"
          src="https://www.youtube.com/embed/zOPjFCR2nb4?showinfo=0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="Autofill guide"
          allowFullScreen
        />
      </div>
    </Fragment>
  );
};

export default CoppingGuides;
