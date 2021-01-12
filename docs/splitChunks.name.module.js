 let a = {
    dependencies: [
      CommonJsRequireDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        request: 'strip-ansi',
        userRequest: 'strip-ansi',
        range: [Array]
      },
      CommonJsRequireDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        request: './socket',
        userRequest: './socket',
        range: [Array]
      },
      CommonJsRequireDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        request: './overlay',
        userRequest: './overlay',
        range: [Array]
      },
      CommonJsRequireDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        request: './utils/log',
        userRequest: './utils/log',
        range: [Array]
      },
      CommonJsRequireDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        request: './utils/sendMessage',
        userRequest: './utils/sendMessage',
        range: [Array]
      },
      CommonJsRequireDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        request: './utils/reloadApp',
        userRequest: './utils/reloadApp',
        range: [Array]
      },
      CommonJsRequireDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        request: './utils/createSocketUrl',
        userRequest: './utils/createSocketUrl',
        range: [Array]
      },
      RequireContextDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        options: [Object],
        userRequest: 'webpack/hot',
        critical: false,
        hadGlobalOrStickyRegExp: false,
        request: undefined,
        range: [Array],
        valueRange: undefined,
        replaces: undefined
      }
    ],
    blocks: [],
    type: 'javascript/auto',
    context: 'D:\\codes\\git\\chensuiyi\\yipack-cli\\node_modules\\webpack-dev-server\\client',
    needId: true,
    debugId: 1002,
    resolveOptions: {},
    factoryMeta: undefined,
    useSourceMap: true,
    useSimpleSourceMap: false,
    _warnings: undefined,
    _errors: undefined,
    buildMeta: {},
    buildInfo: {
      cacheable: true,
      parsed: true,
      fileDependencies: undefined,
      contextDependencies: undefined,
      missingDependencies: undefined,
      buildDependencies: undefined,
      hash: 'f2ee20f0132442342a9f118ecf2b4f1e',
      assets: undefined,
      assetsInfo: undefined,
      strict: true,
      snapshot: Snapshot {
        _flags: 769,
        startTime: 1610436277458,
        fileTimestamps: undefined,
        fileHashes: undefined,
        fileTshs: undefined,
        contextTimestamps: undefined,
        contextHashes: undefined,
        contextTshs: undefined,
        missingExistence: undefined,
        managedItemInfo: [Map],
        managedFiles: [Set],
        managedContexts: undefined,
        managedMissing: undefined,
        children: undefined
      }
    },
    presentationalDependencies: [
      ConstDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        expression: '',
        range: [Array],
        runtimeRequirements: null
      },
      RequireHeaderDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        range: [Array]
      },
      RequireHeaderDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        range: [Array]
      },
      RequireHeaderDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        range: [Array]
      },
      RequireHeaderDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        range: [Array]
      },
      RequireHeaderDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        range: [Array]
      },
      RequireHeaderDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        range: [Array]
      },
      RequireHeaderDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        range: [Array]
      },
      CachedConstDependency {
        weak: false,
        optional: false,
        loc: [SourceLocation],
        expression: '"?http://127.0.0.1"',
        range: [Array],
        identifier: '__resourceQuery'
      }
    ],
    request: 'D:\\codes\\git\\chensuiyi\\yipack-cli\\node_modules\\webpack-dev-server\\client\\index.js?http://127.0.0.1',
    userRequest: 'D:\\codes\\git\\chensuiyi\\yipack-cli\\node_modules\\webpack-dev-server\\client\\index.js?http://127.0.0.1',
    rawRequest: 'D:\\codes\\git\\chensuiyi\\yipack-cli\\node_modules\\webpack-dev-server\\client\\index.js?http://127.0.0.1',
    binary: false,
    parser: JavascriptParser {
      hooks: {
        evaluateTypeof: [HookMap],
        evaluate: [HookMap],
        evaluateIdentifier: [HookMap],
        evaluateDefinedIdentifier: [HookMap],
        evaluateCallExpressionMember: [HookMap],
        isPure: [HookMap],
        preStatement: [SyncBailHook],
        blockPreStatement: [SyncBailHook],
        statement: [SyncBailHook],
        statementIf: [SyncBailHook],
        classExtendsExpression: [SyncBailHook],
        classBodyElement: [SyncBailHook],
        label: [HookMap],
        import: [SyncBailHook],
        importSpecifier: [SyncBailHook],
        export: [SyncBailHook],
        exportImport: [SyncBailHook],
        exportDeclaration: [SyncBailHook],
        exportExpression: [SyncBailHook],
        exportSpecifier: [SyncBailHook],
        exportImportSpecifier: [SyncBailHook],
        preDeclarator: [SyncBailHook],
        declarator: [SyncBailHook],
        varDeclaration: [HookMap],
        varDeclarationLet: [HookMap],
        varDeclarationConst: [HookMap],
        varDeclarationVar: [HookMap],
        pattern: [HookMap],
        canRename: [HookMap],
        rename: [HookMap],
        assign: [HookMap],
        assignMemberChain: [HookMap],
        typeof: [HookMap],
        importCall: [SyncBailHook],
        topLevelAwait: [SyncBailHook],
        call: [HookMap],
        callMemberChain: [HookMap],
        memberChainOfCallMemberChain: [HookMap],
        callMemberChainOfCallMemberChain: [HookMap],
        optionalChaining: [SyncBailHook],
        new: [HookMap],
        expression: [HookMap],
        expressionMemberChain: [HookMap],
        unhandledExpressionMemberChain: [HookMap],
        expressionConditionalOperator: [SyncBailHook],
        expressionLogicalOperator: [SyncBailHook],
        program: [SyncBailHook],
        finish: [SyncBailHook]
      },
      sourceType: 'auto',
      scope: undefined,
      state: undefined,
      comments: undefined,
      semicolons: undefined,
      statementPath: undefined,
      prevStatement: undefined,
      currentTagData: undefined
    },
    generator: JavascriptGenerator {},
    resource: 'D:\\codes\\git\\chensuiyi\\yipack-cli\\node_modules\\webpack-dev-server\\client\\index.js?http://127.0.0.1',
    matchResource: undefined,
    loaders: [],
    error: null,
    _source: OriginalSource {
      _value: "'use strict';\n" +
        '/* global __resourceQuery WorkerGlobalScope self */\n' +
        '\n' +
        '/* eslint prefer-destructuring: off */\n' +
        '\n' +
        "var stripAnsi = require('strip-ansi');\n" +
        '\n' +
        "var socket = require('./socket');\n" +
        '\n' +
        "var overlay = require('./overlay');\n" +
        '\n' +
        "var _require = require('./utils/log'),\n" +
        '    log = _require.log,\n' +
        '    setLogLevel = _require.setLogLevel;\n' +
        '\n' +
        "var sendMessage = require('./utils/sendMessage');\n" +
        '\n' +
        "var reloadApp = require('./utils/reloadApp');\n" +
        '\n' +
        "var createSocketUrl = require('./utils/createSocketUrl');\n" +
        '\n' +
        'var status = {\n' +
        '  isUnloading: false,\n' +
        "  currentHash: ''\n" +
        '};\n' +
        'var options = {\n' +
        '  hot: false,\n' +
        '  hotReload: true,\n' +
        '  liveReload: false,\n' +
        '  initial: true,\n' +
        '  useWarningOverlay: false,\n' +
        '  useErrorOverlay: false,\n' +
        '  useProgress: false\n' +
        '};\n' +
        'var socketUrl = createSocketUrl(__resourceQuery);\n' +
        "self.addEventListener('beforeunload', function () {\n" +
        '  status.isUnloading = true;\n' +
        '});\n' +
        '\n' +
        "if (typeof window !== 'undefined') {\n" +
        '  var qs = window.location.search.toLowerCase();\n' +
        "  options.hotReload = qs.indexOf('hotreload=false') === -1;\n" +
        '}\n' +
        '\n' +
        'var onSocketMessage = {\n' +
        '  hot: function hot() {\n' +
        '    options.hot = true;\n' +
        "    log.info('[WDS] Hot Module Replacement enabled.');\n" +
        '  },\n' +
        '  liveReload: function liveReload() {\n' +
        '    options.liveReload = true;\n' +
        "    log.info('[WDS] Live Reloading enabled.');\n" +
        '  },\n' +
        '  invalid: function invalid() {\n' +
        "    log.info('[WDS] App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.\n" +
        '\n' +
        '    if (options.useWarningOverlay || options.useErrorOverlay) {\n' +
        '      overlay.clear();\n' +
        '    }\n' +
        '\n' +
        "    sendMessage('Invalid');\n" +
        '  },\n' +
        '  hash: function hash(_hash) {\n' +
        '    status.currentHash = _hash;\n' +
        '  },\n' +
        "  'still-ok': function stillOk() {\n" +
        "    log.info('[WDS] Nothing changed.');\n" +
        '\n' +
        '    if (options.useWarningOverlay || options.useErrorOverlay) {\n' +
        '      overlay.clear();\n' +
        '    }\n' +
        '\n' +
        "    sendMessage('StillOk');\n" +
        '  },\n' +
        "  'log-level': function logLevel(level) {\n" +
        "    var hotCtx = require.context('webpack/hot', false, /^\\.\\/log$/);\n" +
        '\n' +
        "    if (hotCtx.keys().indexOf('./log') !== -1) {\n" +
        "      hotCtx('./log').setLogLevel(level);\n" +
        '    }\n' +
        '\n' +
        '    setLogLevel(level);\n' +
        '  },\n' +
        '  overlay: function overlay(value) {\n' +
        "    if (typeof document !== 'undefined') {\n" +
        "      if (typeof value === 'boolean') {\n" +
        '        options.useWarningOverlay = false;\n' +
        '        options.useErrorOverlay = value;\n' +
        '      } else if (value) {\n' +
        '        options.useWarningOverlay = value.warnings;\n' +
        '        options.useErrorOverlay = value.errors;\n' +
        '      }\n' +
        '    }\n' +
        '  },\n' +
        '  progress: function progress(_progress) {\n' +
        "    if (typeof document !== 'undefined') {\n" +
        '      options.useProgress = _progress;\n' +
        '    }\n' +
        '  },\n' +
        "  'progress-update': function progressUpdate(data) {\n" +
        '    if (options.useProgress) {\n' +
        '      log.info("[WDS] ".concat(data.percent, "% - ").concat(data.msg, "."));\n' +
        '    }\n' +
        '\n' +
        "    sendMessage('Progress', data);\n" +
        '  },\n' +
        '  ok: function ok() {\n' +
        "    sendMessage('Ok');\n" +
        '\n' +
        '    if (options.useWarningOverlay || options.useErrorOverlay) {\n' +
        '      overlay.clear();\n' +
        '    }\n' +
        '\n' +
        '    if (options.initial) {\n' +
        '      return options.initial = false;\n' +
        '    } // eslint-disable-line no-return-assign\n' +
        '\n' +
        '\n' +
        '    reloadApp(options, status);\n' +
        '  },\n' +
        "  'content-changed': function contentChanged() {\n" +
        "    log.info('[WDS] Content base changed. Reloading...');\n" +
        '    self.location.reload();\n' +
        '  },\n' +
        '  warnings: function warnings(_warnings) {\n' +
        "    log.warn('[WDS] Warnings while compiling.');\n" +
        '\n' +
        '    var strippedWarnings = _warnings.map(function (warning) {\n' +
        '      return stripAnsi(warning);\n' +
        '    });\n' +
        '\n' +
        "    sendMessage('Warnings', strippedWarnings);\n" +
        '\n' +
        '    for (var i = 0; i < strippedWarnings.length; i++) {\n' +
        '      log.warn(strippedWarnings[i]);\n' +
        '    }\n' +
        '\n' +
        '    if (options.useWarningOverlay) {\n' +
        '      overlay.showMessage(_warnings);\n' +
        '    }\n' +
        '\n' +
        '    if (options.initial) {\n' +
        '      return options.initial = false;\n' +
        '    } // eslint-disable-line no-return-assign\n' +
        '\n' +
        '\n' +
        '    reloadApp(options, status);\n' +
        '  },\n' +
        '  errors: function errors(_errors) {\n' +
        "    log.error('[WDS] Errors while compiling. Reload prevented.');\n" +
        '\n' +
        '    var strippedErrors = _errors.map(function (error) {\n' +
        '      return stripAnsi(error);\n' +
        '    });\n' +
        '\n' +
        "    sendMessage('Errors', strippedErrors);\n" +
        '\n' +
        '    for (var i = 0; i < strippedErrors.length; i++) {\n' +
        '      log.error(strippedErrors[i]);\n' +
        '    }\n' +
        '\n' +
        '    if (options.useErrorOverlay) {\n' +
        '      overlay.showMessage(_errors);\n' +
        '    }\n' +
        '\n' +
        '    options.initial = false;\n' +
        '  },\n' +
        '  error: function error(_error) {\n' +
        '    log.error(_error);\n' +
        '  },\n' +
        '  close: function close() {\n' +
        "    log.error('[WDS] Disconnected!');\n" +
        "    sendMessage('Close');\n" +
        '  }\n' +
        '};\n' +
        'socket(socketUrl, onSocketMessage);',
      _valueAsBuffer: <Buffer 27 75 73 65 20 73 74 72 69 63 74 27 3b 0a 2f 2a 20 67 6c 6f 62 61 6c 20 5f 5f 72 65 73 6f 75 72 63 65 51 75 65 72 79 20 57 6f 72 6b 65 72
  47 6c 6f 62 ... 4340 more bytes>,
      _name: 'webpack://../../chensuiyi/yipack-cli/node_modules/webpack-dev-server/client/index.js?http://127.0.0.1'
    },
    _sourceSizes: Map { 'javascript' => 4390 },
    _lastSuccessfulBuildMeta: {},
    _forceBuild: false,
    _isEvaluatingSideEffects: false,
    _addedSideEffectsBailout: WeakSet { <items unknown> },
    _ast: null
  }