import * as React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { StyleSheetManager } from 'styled-components';

import { Redoc, RedocStandalone } from './components/';
import { AppStore } from './services/AppStore';
import { debugTime, debugTimeEnd } from './utils/debug';
import { querySelector } from './utils/dom';
import type { StoreState } from './services';

configure({
  useProxies: 'ifavailable',
});

export { Redoc, AppStore } from '.';

export const version = __REDOC_VERSION__;
export const revision = __REDOC_REVISION__;

function attributesMap(element: Element) {
  const res = {};
  const elAttrs = element.attributes;
  // tslint:disable-next-line
  for (let i = 0; i < elAttrs.length; i++) {
    const attrib = elAttrs[i];
    res[attrib.name] = attrib.value;
  }
  return res;
}

function parseOptionsFromElement(element: Element) {
  const attrMap = attributesMap(element);
  const res = {};
  for (const attrName in attrMap) {
    const optionName = attrName.replace(/-(.)/g, (_, $1) => $1.toUpperCase());
    const optionValue = attrMap[attrName];
    res[optionName] = attrName === 'theme' ? JSON.parse(optionValue) : optionValue;
    // TODO: normalize options
  }
  return res;
}

export function init(
  specOrSpecUrl: string | any,
  options: any = {},
  element: Element | null = querySelector('redoc'),
  callback?: (e?: Error) => void,
) {
  if (element === null) {
    throw new Error('"element" argument is not provided and <redoc> tag is not found on the page');
  }

  let specUrl: string | undefined;
  let spec: object | undefined;

  if (typeof specOrSpecUrl === 'string') {
    specUrl = specOrSpecUrl;
  } else if (typeof specOrSpecUrl === 'object') {
    spec = specOrSpecUrl;
  }

  const root = createRoot(element!);
  root.render(
    <StyleSheetManager disableVendorPrefixes>
      {React.createElement(
        RedocStandalone,
        {
          spec,
          onLoaded: callback,
          specUrl,
          options: { ...options, ...parseOptionsFromElement(element) },
        },
        ['Loading...'],
      )}
    </StyleSheetManager>,
  );
}

export function destroy(element: Element | null = querySelector('redoc')): void {
  if (element) {
    createRoot(element).unmount();
  }
}

export function hydrate(
  state: StoreState,
  element: Element | null = querySelector('redoc'),
  callback?: () => void,
) {
  debugTime('Redoc create store');
  const store = AppStore.fromJS(state);
  debugTimeEnd('Redoc create store');

  debugTime('Redoc hydrate');
  hydrateRoot(
    element!,
    <StyleSheetManager disableVendorPrefixes>
      <Redoc store={store} />
    </StyleSheetManager>,
    { onRecoverableError: callback },
  );
  debugTimeEnd('Redoc hydrate');
}

/**
 * autoinit ReDoc if <redoc> tag is found on the page with "spec-url" attr
 * Skip if element already has content (SSR case)
 */
function autoInit() {
  const element = querySelector('redoc');
  if (!element) {
    return;
  }

  // Skip autoInit if element already has content (SSR case)
  if (element.children.length > 0) {
    return;
  }

  const specUrl = element.getAttribute('spec-url');
  if (specUrl) {
    init(specUrl, {}, element);
  }
}

autoInit();
