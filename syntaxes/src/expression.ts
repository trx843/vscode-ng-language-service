/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { GrammarDefinition } from './types';

export const Expression: GrammarDefinition = {
  scopeName: 'expression.ng',
  injectionSelector: 'L:text.html -comment',
  patterns: [{include: '#ngExpression'}],
  repository: {
    ngExpression: {
      name: 'meta.expression.ng',
      patterns: [
        {
          include: '#string',
        },
        {
          include: '#literal',
        },
        {
          include: '#ternaryExpression',
        },
        {
          include: '#expressionOperator',
        },
        {
          include: '#functionCall',
        },
        {
          include: '#identifiers',
        },
        {
          include: '#parenExpression',
        },
        {
          include: '#punctuationComma',
        },
        {
          include: '#punctuationAccessor',
        },
      ],
    },

    arrayLiteral: {
      name: 'meta.array.literal.ts',
      begin: /\[/,
      beginCaptures: {
        0: {
          name: 'meta.brace.square.ts',
        },
      },
      end: /\]/,
      endCaptures: {
        0: {
          name: 'meta.brace.square.ts',
        },
      },
      patterns: [
        {
          include: '#ngExpression',
        },
        {
          include: '#punctuationComma',
        },
      ],
    },

    booleanLiteral: {
      patterns: [
        {
          name: 'constant.language.boolean.true.ts',
          match: /(?<!\.|\$)\btrue\b(?!\$)/,
        },
        {
          name: 'constant.language.boolean.false.ts',
          match: /(?<!\.|\$)\bfalse\b(?!\$)/,
        },
      ],
    },

    expressionOperator: {
      patterns: [
        {
          match: /((?<!\|)\|(?!\|))\s?([a-zA-Z0-9\-\_\$]*)/,
          captures: {
            1: {
              name: 'keyword.operator.logical.ts',
            },
            2: {
              name: 'entity.name.function.pipe.ng',
            },
          },
        },
        {
          name: 'storage.type.ts',
          match: /(?<!\.|\$)\b(let)\b(?!\$)/,
        },
        {
          name: 'keyword.control.flow.ts',
          match: /(?<!\.|\$)\b(await)\b(?!\$)/,
        },
        {
          name: 'keyword.operator.expression.delete.ts',
          match: /(?<!\.|\$)\bdelete\b(?!\$)/,
        },
        {
          name: 'keyword.operator.expression.in.ts',
          match: /(?<!\.|\$)\bin\b(?!\$)/,
        },
        {
          name: 'keyword.operator.expression.of.ts',
          match: /(?<!\.|\$)\bof\b(?!\$)/,
        },
        {
          name: 'keyword.control.if.ts',
          match: /(?<!\.|\$)\bif\b(?!\$)/,
        },
        {
          name: 'keyword.control.else.ts',
          match: /(?<!\.|\$)\belse\b(?!\$)/,
        },
        {
          name: 'keyword.control.then.ts',
          match: /(?<!\.|\$)\bthen\b(?!\$)/,
        },
        {
          name: 'keyword.operator.expression.instanceof.ts',
          match: /(?<!\.|\$)\binstanceof\b(?!\$)/,
        },
        {
          name: 'keyword.operator.new.ts',
          match: /(?<!\.|\$)\bnew\b(?!\$)/,
        },
        {
          name: 'keyword.operator.expression.void.ts',
          match: /(?<!\.|\$)\bvoid\b(?!\$)/,
        },
        {
          begin: /(?<!\.|\$)\bas\b(?!\$)/,
          beginCaptures: {
            0: {
              name: 'keyword.control.as.ts',
            },
          },
          end: /(?=$|"|[;,:})\]])/,
          patterns: [
            {
              include: '#type',
            },
          ],
        },
        {
          name: 'keyword.operator.assignment.compound.ts',
          match: /\*=|(?<!\()\/=|%=|\+=|\-=/,
        },
        {
          name: 'keyword.operator.assignment.compound.bitwise.ts',
          match: /\&=|\^=|<<=|>>=|>>>=|\|=/,
        },
        {
          name: 'keyword.operator.bitwise.shift.ts',
          match: /<<|>>>|>>/,
        },
        {
          name: 'keyword.operator.comparison.ts',
          match: /===|!==|==|!=/,
        },
        {
          name: 'keyword.operator.relational.ts',
          match: /<=|>=|<>|<|>/,
        },
        {
          name: 'keyword.operator.logical.ts',
          match: /\!|&&|\|\|/,
        },
        {
          name: 'keyword.operator.bitwise.ts',
          match: /\&|~|\^|\|/,
        },
        {
          name: 'keyword.operator.assignment.ts',
          match: /\=/,
        },
        {
          name: 'keyword.operator.decrement.ts',
          match: /--/,
        },
        {
          name: 'keyword.operator.increment.ts',
          match: /\+\+/,
        },
        {
          name: 'keyword.operator.arithmetic.ts',
          match: /\%|\*|\/|-|\+/,
        },
        {
          match: /(?<=[_$[:alnum:]])\s*(\/)(?![\/*])/,
          captures: {
            1: {
              name: 'keyword.operator.arithmetic.ts',
            },
          },
        },
        {
          include: '#typeofOperator',
        },
      ],
    },

    functionCall: {
      begin: /(?=(\??\.\s*)?([_$[:alpha:]][_$[:alnum:]]*)\s*(<([^<>]|\<[^<>]+\>)+>\s*)?\()/,
      end: /(?<=\))(?!(\??\.\s*)?([_$[:alpha:]][_$[:alnum:]]*)\s*(<([^<>]|\<[^<>]+\>)+>\s*)?\()/,
      patterns: [
        {
          name: 'punctuation.accessor.ts',
          match: /\?/,
        },
        {
          name: 'punctuation.accessor.ts',
          match: /\./,
        },
        {
          name: 'entity.name.function.ts',
          match: /([_$[:alpha:]][_$[:alnum:]]*)/,
        },
        {
          name: 'meta.type.parameters.ts',
          begin: /\</,
          beginCaptures: {
            0: {
              name: 'punctuation.definition.typeparameters.begin.ts',
            },
          },
          end: /\>/,
          endCaptures: {
            0: {
              name: 'punctuation.definition.typeparameters.end.ts',
            },
          },
          patterns: [
            {
              include: '#type',
            },
            {
              include: '#punctuationComma',
            },
          ],
        },
        {
          include: '#parenExpression',
        },
      ],
    },

    functionParameters: {
      name: 'meta.parameters.ts',
      begin: /\(/,
      beginCaptures: {
        0: {
          name: 'punctuation.definition.parameters.begin.ts',
        },
      },
      end: /\)/,
      endCaptures: {
        0: {
          name: 'punctuation.definition.parameters.end.ts',
        },
      },
      patterns: [
        {
          include: '#decorator',
        },
        {
          include: '#parameterName',
        },
        {
          include: '#variableInitializer',
        },
        {
          name: 'punctuation.separator.parameter.ts',
          match: /,/,
        },
      ],
    },

    identifiers: {
      patterns: [
        {
          name: 'support.class.ts',
          match: /([_$[:alpha:]][_$[:alnum:]]*)(?=\s*\.\s*prototype\b(?!\$))/,
        },
        {
          match:
              '(?x)([?!]?\\.)\\s*(?:\n([[:upper:]][_$[:digit:][:upper:]]*)|\n([_$[:alpha:]][_$[:alnum:]]*)\n)(?=\\s*\\.\\s*[_$[:alpha:]][_$[:alnum:]]*)',
          captures: {
            1: {
              name: 'punctuation.accessor.ts',
            },
            2: {
              name: 'constant.other.object.property.ts',
            },
            3: {
              name: 'variable.other.object.property.ts',
            },
          },
        },
        {
          match:
              '(?x)(?:([?!]?\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*=\\s*((async\\s+)|(function\\s*[(<])|(function\\s+)|([_$[:alpha:]][_$[:alnum:]]*\\s*=>)|((<([^<>]|\\<[^<>]+\\>)+>\\s*)?\\(([^()]|\\([^()]*\\))*\\)(\\s*:\\s*(.)*)?\\s*=>)))',
          captures: {
            1: {
              name: 'punctuation.accessor.ts',
            },
            2: {
              name: 'entity.name.function.ts',
            },
          },
        },
        {
          match: '([?!]?\\.)\\s*([[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])',
          captures: {
            1: {
              name: 'punctuation.accessor.ts',
            },
            2: {
              name: 'constant.other.property.ts',
            },
          },
        },
        {
          match: '([?!]?\\.)\\s*([_$[:alpha:]][_$[:alnum:]]*)',
          captures: {
            1: {
              name: 'punctuation.accessor.ts',
            },
            2: {
              name: 'variable.other.property.ts',
            },
          },
        },
        {
          match:
              '(?x)(?:\n([[:upper:]][_$[:digit:][:upper:]]*)|\n([_$[:alpha:]][_$[:alnum:]]*)\n)(?=\\s*\\.\\s*[_$[:alpha:]][_$[:alnum:]]*)',
          captures: {
            1: {
              name: 'constant.other.object.ts',
            },
            2: {
              name: 'variable.other.object.ts',
            },
          },
        },
        {
          name: 'constant.character.other',
          match: '([[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])',
        },
        {
          name: 'variable.other.readwrite.ts',
          match: '[_$[:alpha:]][_$[:alnum:]]*',
        },
      ],
    },

    literal: {
      name: 'literal.ts',
      patterns: [
        {
          include: '#numericLiteral',
        },
        {
          include: '#booleanLiteral',
        },
        {
          include: '#nullLiteral',
        },
        {
          include: '#undefinedLiteral',
        },
        {
          include: '#numericConstantLiteral',
        },
        {
          include: '#arrayLiteral',
        },
        {
          include: '#thisLiteral',
        },
      ],
    },

    nullLiteral: {
      name: 'constant.language.null.ts',
      match: /(?<!\.|\$)\bnull\b(?!\$)/,
    },

    numericLiteral: {
      patterns: [
        {
          name: 'constant.numeric.hex.ts',
          match: /\b(?<!\$)0(x|X)[0-9a-fA-F]+\b(?!\$)/,
        },
        {
          name: 'constant.numeric.binary.ts',
          match: /\b(?<!\$)0(b|B)[01]+\b(?!\$)/,
        },
        {
          name: 'constant.numeric.octal.ts',
          match: /\\b(?<!\$)0(o|O)?[0-7]+\b(?!\$)/,
        },
        {
          match:
              '(?x)\n(?<!\\$)(?:\n(?:\\b[0-9]+(\\.)[0-9]+[eE][+-]?[0-9]+\\b)|#1.1E+3\n(?:\\b[0-9]+(\\.)[eE][+-]?[0-9]+\\b)|#1.E+3\n(?:\\B(\\.)[0-9]+[eE][+-]?[0-9]+\\b)|#.1E+3\n(?:\\b[0-9]+[eE][+-]?[0-9]+\\b)|#1E+3\(?:\\b[0-9]+(\\.)[0-9]+\\b)|#1.1\n(?:\\b[0-9]+(\\.)\\B)|#1.\n(?:\\B(\\.)[0-9]+\\b)|#.1\n (?:\\b[0-9]+\\b(?!\\.))#1\n)(?!\\$)',
          captures: {
            0: {
              name: 'constant.numeric.decimal.ts',
            },
            1: {
              name: 'meta.delimiter.decimal.period.ts',
            },
            2: {
              name: 'meta.delimiter.decimal.period.ts',
            },
            3: {
              name: 'meta.delimiter.decimal.period.ts',
            },
            4: {
              name: 'meta.delimiter.decimal.period.ts',
            },
            5: {
              name: 'meta.delimiter.decimal.period.ts',
            },
            6: {
              name: 'meta.delimiter.decimal.period.ts',
            },
          },
        },
      ],
    },

    numericConstantLiteral: {
      patterns: [
        {
          name: 'constant.language.nan.ts',
          match: /(?<!\.|\$)\bNaN\b(?!\$)/,
        },
        {
          name: 'constant.language.infinity.ts',
          match: /(?<!\.|\$)\bInfinity\b(?!\$)/,
        },
      ],
    },

    parameterName: {
      patterns: [
        {
          match:
              '(?x)(?:\\s*\\b(readonly)\\s+)?(?:\\s*\\b(public|private|protected)\\s+)?(\\.\\.\\.)?\\s*(?<!=|:)([_$[:alpha:]][_$[:alnum:]]*)\\s*(\\??)(?=\\s* (=\\s*( (async\\s+) | (function\\s*[(<]) | (function\\s+) | ([_$[:alpha:]][_$[:alnum:]]*\\s*=>) | ((<([^<>]|\\<[^<>]+\\>)+>\\s*)?\\(([^()]|\\([^()]*\\))*\\)(\\s*:\\s*(.)*)?\\s*=>)) ) | (:\\s*( (<) | ([(]\\s*( ([)]) | (\\.\\.\\.) | ([_$[:alnum:]]+\\s*( ([:,?=])| ([)]\\s*=>) )) ))) ))',
          captures: {
            1: {
              name: 'storage.modifier.ts',
            },
            2: {
              name: 'storage.modifier.ts',
            },
            3: {
              name: 'keyword.operator.rest.ts',
            },
            4: {
              name: 'entity.name.function.ts',
            },
            5: {
              name: 'keyword.operator.optional.ts',
            },
          },
        },
        {
          match:
              /(?:\s*\b(readonly)\s+)?(?:\s*\b(public|private|protected)\s+)?(\.\.\.)?\s*(?<!=|:)([_$[:alpha:]][_$[:alnum:]]*)\s*(\??)/,
          captures: {
            1: {
              name: 'storage.modifier.ts',
            },
            2: {
              name: 'storage.modifier.ts',
            },
            3: {
              name: 'keyword.operator.rest.ts',
            },
            4: {
              name: 'variable.parameter.ts',
            },
            5: {
              name: 'keyword.operator.optional.ts',
            },
          },
        },
      ],
    },

    parenExpression: {
      begin: /\(/,
      beginCaptures: {
        0: {
          name: 'meta.brace.round.ts',
        },
      },
      end: /\)/,
      endCaptures: {
        0: {
          name: 'meta.brace.round.ts',
        },
      },
      patterns: [
        {
          include: '#ngExpression',
        },
        {
          include: '#punctuationComma',
        },
      ],
    },

    punctuationAccessor: {
      name: 'punctuation.accessor.ts',
      match: /\?\.|\!\.|\./,
    },

    punctuationComma: {
      name: 'punctuation.separator.comma.ts',
      match: /,/,
    },

    punctuationSemicolon: {
      name: 'punctuation.terminator.statement.ts',
      match: /;/,
    },

    qstringDouble: {
      name: 'string.quoted.double.ts',
      begin: /"/,
      beginCaptures: {
        0: {
          name: 'punctuation.definition.string.begin.ts',
        },
      },
      end: /(")|((?:[^\\\n])$)/,
      endCaptures: {
        1: {
          name: 'punctuation.definition.string.end.ts',
        },
        2: {
          name: 'invalid.illegal.newline.ts',
        },
      },
      patterns: [
        {
          include: '#stringCharacterEscape',
        },
      ],
    },

    qstringSingle: {
      name: 'string.quoted.single.ts',
      begin: /'/,
      beginCaptures: {
        0: {
          name: 'punctuation.definition.string.begin.ts',
        },
      },
      end: /(\')|((?:[^\\\n])$)/,
      endCaptures: {
        1: {
          name: 'punctuation.definition.string.end.ts',
        },
        2: {
          name: 'invalid.illegal.newline.ts',
        },
      },
      patterns: [
        {
          include: '#stringCharacterEscape',
        },
      ],
    },

    stringCharacterEscape: {
      name: 'constant.character.escape.ts',
      match: /\\(x\h{2}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.|$)/,
    },

    ternaryExpression: {
      begin: /(?=\?)(?!\?\.)/,
      end: /(?=$|"|[;,})\]])/,
      patterns: [
        {
          include: '#ternaryOperator',
        },
        {
          include: '#ngExpression',
        },
      ],
    },

    ternaryOperator: {
      begin: /(\?)(?!\.)/,
      beginCaptures: {
        0: {
          name: 'keyword.operator.ternary.ts',
        },
      },
      end: /(:)/,
      endCaptures: {
        0: {
          name: 'keyword.operator.ternary.ts',
        },
      },
      patterns: [
        {
          include: '#ngExpression',
        },
      ],
    },

    thisLiteral: {
      name: 'variable.language.this.ts',
      match: /(?<!\.|\$)\bthis\b(?!\$)/,
    },

    string: {
      patterns: [
        {
          include: '#qstringSingle',
        },
        {
          include: '#qstringDouble',
        },
      ],
    },

    typeAnnotation: {
      name: 'meta.type.annotation.ts',
      begin: /:/,
      beginCaptures: {
        0: {
          name: 'keyword.operator.type.annotation.ts',
        },
      },
      end: /(?=$|[,);\}\]]|\/\/|")|(?==[^>])|(?<=[\}>\]\)]|[_$[:alpha:]])\s*(?=\{)/,
      patterns: [
        {
          include: '#type',
        },
      ],
    },

    typeBuiltinLiterals: {
      name: 'support.type.builtin.ts',
      match: /(?<!\.|\$)\b(this|true|false|undefined|null)\b(?!\$)/,
    },

    typeFnTypeParameters: {
      patterns: [
        {
          name: 'meta.type.constructor.ts',
          match: /(?<!\.|\$)\b(new)\b(?=\s*\<)/,
          captures: {
            1: {
              name: 'keyword.control.new.ts',
            },
          },
        },
        {
          name: 'meta.type.constructor.ts',
          begin: /(?<!\.|\$)\b(new)\b\s*(?=\()/,
          beginCaptures: {
            1: {
              name: 'keyword.control.new.ts',
            },
          },
          end: /(?<=\))/,
          patterns: [
            {
              include: '#functionParameters',
            },
          ],
        },
        {
          name: 'meta.type.function.ts',
          include: '#typeofOperator',
          begin: /(?<=\>)\s*(?=\()/,
          end: /(?<=\))/,
          patterns: [
            {
              include: '#functionParameters',
            },
          ],
        },
        {
          name: 'meta.type.function.ts',
          begin: '(?x)((?=[(]\\s*(([)])|(\\.\\.\\.)|([_$[:alnum:]]+\\s*(([:,?=])|([)]\\s*=>))))))',
          end: /(?<=\))/,
          patterns: [
            {
              include: '#functionParameters',
            },
          ],
        },
      ],
    },

    typeName: {
      patterns: [
        {
          match: /([_$[:alpha:]][_$[:alnum:]]*)\s*([?!]?\.)/,
          captures: {
            1: {
              name: 'entity.name.type.module.ts',
            },
            2: {
              name: 'punctuation.accessor.ts',
            },
          },
        },
        {
          name: 'entity.name.type.ts',
          match: /[_$[:alpha:]][_$[:alnum:]]*/,
        },
      ],
    },

    typeObjectMembers: {
      patterns: [
        {
          include: '#typeAnnotation',
        },
        {
          include: '#punctuationComma',
        },
        {
          include: '#punctuationSemicolon',
        },
      ],
    },

    typeObject: {
      name: 'meta.object.type.ts',
      begin: /\{/,
      beginCaptures: {
        0: {
          name: 'punctuation.definition.block.ts',
        },
      },
      end: /\}/,
      endCaptures: {
        0: {
          name: 'punctuation.definition.block.ts',
        },
      },
      patterns: [
        {
          include: '#typeObjectMembers',
        },
      ],
    },

    typeOperators: {
      patterns: [
        {
          include: '#typeofOperator',
        },
        {
          name: 'keyword.operator.type.ts',
          match: /[&|]/,
        },
        {
          name: 'keyword.operator.expression.keyof.ts',
          match: /(?<!\.|\$)\bkeyof\b(?!\$)/,
        },
      ],
    },

    typeParenOrFunctionParameters: {
      name: 'meta.type.paren.cover.ts',
      begin: /\(/,
      beginCaptures: {
        0: {
          name: 'meta.brace.round.ts',
        },
      },
      end: /\)/,
      endCaptures: {
        0: {
          name: 'meta.brace.round.ts',
        },
      },
      patterns: [
        {
          include: '#type',
        },
        {
          include: '#functionParameters',
        },
      ],
    },

    typeTuple: {
      name: 'meta.type.tuple.ts',
      begin: /\[/,
      beginCaptures: {
        0: {
          name: 'meta.brace.square.ts',
        },
      },
      end: /\]/,
      endCaptures: {
        0: {
          name: 'meta.brace.square.ts',
        },
      },
      patterns: [
        {
          include: '#type',
        },
        {
          include: '#punctuationComma',
        },
      ],
    },

    type: {
      name: 'meta.type.ts',
      patterns: [
        {
          include: '#string',
        },
        {
          include: '#numericLiteral',
        },
        {
          include: '#typeBuiltinLiterals',
        },
        {
          include: '#typeTuple',
        },
        {
          include: '#typeObject',
        },
        {
          include: '#typeOperators',
        },
        {
          include: '#typeFnTypeParameters',
        },
        {
          include: '#typeParenOrFunctionParameters',
        },
        {
          include: '#typeName',
        },
      ],
    },

    typeofOperator: {
      name: 'keyword.operator.expression.typeof.ts',
      match: /(?<!\.|\$)\btypeof\b(?!\$)/,
    },

    undefinedLiteral: {
      name: 'constant.language.undefined.ts',
      match: /(?<!\.|\$)\bundefined\b(?!\$)/,
    },

    variableInitializer: {
      begin: /(?<!=|!)(=)(?!=)/,
      beginCaptures: {
        1: {
          name: 'keyword.operator.assignment.ts',
        },
      },
      end: /(?=$|[,);}\]])/,
      patterns: [
        {
          include: '#ngExpression',
        },
      ],
    },
  },
};
