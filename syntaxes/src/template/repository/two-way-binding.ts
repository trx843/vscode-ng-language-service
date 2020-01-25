/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {GrammarDefinition} from '../../types';

export const twoWayBinding: GrammarDefinition = {
  begin: /(\[\s*\(\s*@?[-_a-zA-Z0-9.$]*\s*\)\s*\])(=)(["'])/,
  beginCaptures: {
    1: {
      name: 'entity.other.attribute-name.html entity.other.ng-binding-name.two-way.html',
      patterns: [
        {include: '#bindingKey'},
      ],
    },
    2: {name: 'punctuation.separator.key-value.html'},
    3: {name: 'string.quoted.html punctuation.definition.string.begin.html'},
  },
  end: /\3/,
  endCaptures: {
    0: {name: 'string.quoted.html punctuation.definition.string.end.html'},
  },
  name: 'meta.ng-binding.two-way.html',
  contentName: 'source.js',
  patterns: [
    {include: 'source.js'},
  ],
};