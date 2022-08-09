import styled, { extensionsHook } from '../styled-components';

export const PrismDiv = styled.div`
  /**
 * CIO Dark theme
 * 
 * bgPrimary    #23232f
 * bgSecondary  #343446
 * 
 * text01       #ffffff
 * text02       #c7c7d4
 * text03       #a7a8b7
 * 
 * purple       #c4a8ff
 * teal         #10cca6
 * yellow       #f5d44e
 * blue         #00c9e3
 * raspberry    #ff95ca
 * clementine   #ff9e5e
 * 
 * greenBg      #156352
 * greenFg      #e6faf3
 * redBg        #69002c
 * redFg        #ffedf0
 */

  /* Set the main properties of the code, code blocks, and inline code */
  code[class*='language-'],
  pre[class*='language-'] {
    background: #23232f;
    color: #ffffff;
    font-family: Monaco, Menlo, 'Andale Mono', 'Ubuntu Mono', monospace; /* this is the default */
    /* The following properties are standard, please leave them as they are */
    font-size: 1em;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    /* The default is 4, but you could change it if you really, really want to */
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    /* The following properties are also standard */
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Optional: What the code looks like when highlighted */
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection,
  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection {
    background: #343446;
    /* color: unset; */
  }

  code[class*='language-']::selection,
  code[class*='language-'] ::selection,
  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection {
    background: #343446;
    /* color: unset; */
  }

  /* Properties specific to code blocks */
  pre[class*='language-'] {
    padding: 1em; /* this is standard */
    margin: 0.5em 0; /* this is the default */
    overflow: auto; /* this is standard */
    /* border-radius: unset; */
  }

  /* Properties specific to inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em; /* this is the default */
    /* border-radius: unset; */
    white-space: normal; /* this is standard */
  }

  /**
 * These are the minimum tokens you must style, you can rearrange them and/or style more tokens as you want
 * The concepts behind these standard tokens, as well as some examples, can be found here: https://prismjs.com/tokens.html
 */

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #a7a8b7;
  }

  .token.punctuation {
    color: #ffffff;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property {
    color: #ffffff;
  }

  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #f5d44e;
  }

  .token.boolean {
    color: #f5d44e;
  }

  .token.number {
    color: #00c9e3;
  }

  .token.attr-name {
    color: #ff95ca;
  }

  .token.selector,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #10cca6;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #10cca6;
  }

  .token.atrule,
  .token.attr-value,
  .token.function,
  .token.class-name {
    color: #c4a8ff;
  }

  .token.keyword {
    color: #ff95ca;
  }

  .token.regex,
  .token.important {
    color: #ff9e5e;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  ${extensionsHook('Prism')};
`;
