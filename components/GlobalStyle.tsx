import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        /* Colors */
        --black: hsl(256deg 72% 12%);
        --purple: purple;

        /* Code block styles */
        --prism-theme-white: #fff;
        --prism-theme-background: hsl(222deg 51% 13%);
        --prism-theme-char: #d8dee9;
        --prism-theme-comment: #b2b2b2;
        --prism-theme-keyword: #c5a5c5;
        --prism-theme-primitive: #5a9bcf;
        --prism-theme-string: #8dc891;
        --prism-theme-variable: #d7deea;
        --prism-theme-boolean: #ff8b50;
        --prism-theme-punctuation: #88c6be;
        --prism-theme-tag: #fc929e;
        --prism-theme-function: #79b6f2;
        --prism-theme-className: #fac863;
        --prism-theme-method: #6699cc;
        --prism-theme-operator: #fc929e;
        --prism-theme-highlight: #353b45;
        --code-font-family: 'Ubuntu Mono';

        /* Measurements */
        --highlight-before-width: 0.43em;
        --nav-height: 5.6rem;
    }

    * {
        box-sizing: border-box;
    }

    html {
        -webkit-font-smoothing: antialiased;
    }

    @media (max-width: 900px) {
        html {
            font-size: 90%;
        }
    }

    @media (max-width: 700px) {
        html {
            font-size: 84%;
        }
    }

    @media (max-width: 540px) {
        html {
            font-size: 78%;
        }
    }

    html,
    body {
        padding: 0;
        margin: 0;
        color: var(--black);
        font-family: 'century', serif;
    }

    strong {
        font-weight: 600;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        color: var(--black);
        line-height: 1.1;
        font-family: 'Oswald';
        text-transform: uppercase;
    }

    h1 {
        color: var(--black);
        font-size: 4rem;
        font-weight: 700;
        letter-spacing: 1.8px;
    }

    @media (max-width: 540px) {
        h1 {
            font-size: 2.8rem;
        }
    }

    h2 {
        font-size: 2.8rem;
        font-weight: 600;
    }

    h3 {
        font-size: 2rem;
        font-weight: 700;
    }

    h2,
    h3,
    h4 {
        margin: 1.3rem 0 0.7rem;
    }

    p {
        font-size: 1.3rem;
        font-weight: 400;
        line-height: 1.6;
        margin-block-start: 0;
        margin-block-end: 1.5em;
    }

    code {
        background: hsl(350deg 43% 82% / 0.2);
        color: var(--black);
        font-family: var(--code-font-family);
        border-radius: 4px;
        white-space: pre-wrap;
    }

    p > code {
        font-size: 1.1rem;
        padding: 0.2rem 0.4rem;
    }

    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }

    ul {
        padding: 0;
    }

    .external-link {
        color: hsl(327deg 100% 60%);
        text-decoration: underline;
        font-weight: inherit;
    }

    .external-link:hover,
    .external-link:visited,
    .external-link:active {
        color: var(--purple);
    }

    ol {
        padding-inline-start: 1.5rem;
    }

    /* ======================================================= */
    /* ==================  PRISM THEME  ====================== */
    /* ======================================================= */

    code[class*='language-'],
    pre[class*='language-'] {
        color: var(--prism-theme-white);
        background: none;
        font-family: var(--code-font-family), Consolas, Monaco, 'Andale Mono', monospace;
        font-size: 1.12rem;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        tab-size: 4;
        hyphens: none;
        scrollbar-width: none; /* needed for Firefox */
    }

    /* Code blocks */
    pre[class*='language-'] {
        padding: 1.5rem;
        margin: 0px 0px 2.5em;
        overflow: auto;
        border-radius: 0 0 10px 10px;
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
        background: var(--prism-theme-background);
    }

    pre[class*='language-']::-webkit-scrollbar {
        display: none; /* Hides scrollbar but allows scrolling */
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
        padding: 0.1em;
        border-radius: 10px;
        white-space: normal;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: var(--prism-theme-comment);
    }

    .token.punctuation {
        color: var(--prism-theme-punctuation);
    }

    .namespace {
        opacity: 0.7;
    }

    .token.property,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: var(--prism-theme-primitive);
    }

    .token.function {
        color: var(--prism-theme-function);
    }

    .token.boolean {
        color: var(--prism-theme-boolean);
    }

    .token.tag {
        color: var(--prism-theme-tag);
    }

    .token.attr-name {
        color: var(--prism-theme-keyword);
    }

    .token.string {
        color: var(--prism-theme-string);
    }

    .token.selector,
    .token.char,
    .token.builtin,
    .token.inserted {
        color: var(--prism-theme-char);
    }

    .token.operator,
    .token.entity,
    .token.url,
    /* .language-css .token.string,
    .style .token.string, */
    .token.variable {
        color: var(--prism-theme-variable);
    }

    .token.atrule,
    .token.class-name {
        color: var(--prism-theme-className);
    }

    .token.attr-value {
        color: var(--prism-theme-string);
    }

    .token.keyword {
        color: var(--prism-theme-keyword);
    }

    /* .token.regex, */
    .token.important {
        font-weight: 400;
    }

    .token.bold {
        font-weight: 700;
    }

    .token.italic {
        font-style: italic;
    }

    .token.entity {
        cursor: help;
    }

    /* Highlight line! */
    .mdx-marker {
        background: var(--prism-theme-highlight);
        position: relative;
        left: -0.57em;
        padding-left: 0.57em;
        /* Add width of padding left and right, and width of highlight */
        width: calc(100% + 1.14em + 0.43em);
    }

    .mdx-marker::before {
        content: '';
        height: 100%;
        width: 0.43em;
        left: -0.43em;
        background: #8b9fc6;
        position: absolute;
    }

    /* ======================================================= */
    /* ================  PRISM THEME END  ==================== */
    /* ======================================================= */

    /* UTILS */
    .center-space-between {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h1::selection,
    h2::selection,
    h3::selection,
    h4::selection,
    h5::selection {
        background: none;
        text-shadow: 3px 3px #d894a0;
    }
`
