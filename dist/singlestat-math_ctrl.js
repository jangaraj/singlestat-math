System.register(["lodash", "jquery", "jquery.flot", "./lib/flot/jquery.flot.gauge", "jquery.flot.time", "jquery.flot.crosshair", "./css/panel_singlestatmath.css!", "./lib/mathjs/math", "app/core/utils/kbn", "app/core/config", "app/core/time_series2", "app/plugins/sdk", "@grafana/data"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, jquery_1, math_1, kbn_1, config_1, time_series2_1, sdk_1, data_1, SingleStatMathCtrl;
    var __moduleName = context_1 && context_1.id;
    function getColorForValue(thresholds, value) {
        var color = '';
        if (value === null) {
            return color;
        }
        for (var i = thresholds.length - 1; i >= 0; i--) {
            var aThreshold = thresholds[i];
            color = aThreshold.color;
            if (value >= aThreshold.value) {
                return aThreshold.color;
            }
        }
        return color;
    }
    exports_1("getColorForValue", getColorForValue);
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            },
            function (math_1_1) {
                math_1 = math_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (time_series2_1_1) {
                time_series2_1 = time_series2_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (data_1_1) {
                data_1 = data_1_1;
            }
        ],
        execute: function () {
            SingleStatMathCtrl = (function (_super) {
                __extends(SingleStatMathCtrl, _super);
                function SingleStatMathCtrl($scope, $injector, $location, linkSrv) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.$location = $location;
                    _this.linkSrv = linkSrv;
                    _this.dataType = 'timeseries';
                    _this.valueNameOptions = [
                        { value: 'min', text: 'Min' },
                        { value: 'max', text: 'Max' },
                        { value: 'avg', text: 'Average' },
                        { value: 'current', text: 'Current' },
                        { value: 'total', text: 'Total' },
                        { value: 'name', text: 'Name' },
                        { value: 'first', text: 'First' },
                        { value: 'delta', text: 'Delta' },
                        { value: 'diff', text: 'Difference' },
                        { value: 'range', text: 'Range' },
                        { value: 'last_time', text: 'Time of last point' },
                    ];
                    _this.panelDefaults = {
                        links: [],
                        datasource: null,
                        maxDataPoints: 100,
                        interval: null,
                        targets: [{}],
                        cacheTimeout: null,
                        defaultColor: 'rgb(117, 117, 117)',
                        thresholds: '',
                        format: 'none',
                        tooltip: {
                            show: true
                        },
                        sortOrder: 'asc',
                        prefix: '',
                        postfix: '',
                        nullText: null,
                        valueMaps: [{ value: 'null', op: '=', text: 'No data' }],
                        mappingTypes: [{ name: 'value to text', value: 1 }, { name: 'range to text', value: 2 }],
                        rangeMaps: [{ from: 'null', to: 'null', text: 'N/A' }],
                        mappingType: 1,
                        nullPointMode: 'connected',
                        valueName: 'avg',
                        prefixFontSize: '50%',
                        valueFontSize: '80%',
                        postfixFontSize: '50%',
                        math: '',
                        colorBackground: false,
                        circleBackground: false,
                        valueMappingColorBackground: '#767171',
                        colorValue: false,
                        sparkline: {
                            show: false,
                            full: false,
                            lineColor: 'rgb(31, 120, 193)',
                            fillColor: 'rgba(31, 118, 189, 0.18)',
                        },
                        gauge: {
                            show: false,
                            minValue: 0,
                            maxValue: 100,
                            thresholdMarkers: true,
                            thresholdLabels: false,
                        },
                        sortOrderOptions: [
                            { value: 'asc', text: 'Ascending' },
                            { value: 'desc', text: 'Descending' },
                        ],
                        tableColumn: '',
                    };
                    lodash_1.default.defaults(_this.panel, _this.panelDefaults);
                    _this.events.on(data_1.PanelEvents.dataReceived, _this.onDataReceived.bind(_this));
                    _this.events.on(data_1.PanelEvents.dataError, _this.onDataError.bind(_this));
                    _this.events.on(data_1.PanelEvents.dataSnapshotLoad, _this.onDataReceived.bind(_this));
                    _this.events.on(data_1.PanelEvents.editModeInitialized, _this.onInitEditMode.bind(_this));
                    _this.onSparklineColorChange = _this.onSparklineColorChange.bind(_this);
                    _this.onSparklineFillChange = _this.onSparklineFillChange.bind(_this);
                    var t = _this.panel.thresholds;
                    if (typeof t === 'string' || t instanceof String) {
                        _this.oldThreshesChange(t);
                    }
                    return _this;
                }
                SingleStatMathCtrl.prototype.onInitEditMode = function () {
                    this.fontSizes = ['20%', '30%', '50%', '70%', '80%', '100%', '110%', '120%', '150%', '170%', '200%'];
                    this.addEditorTab('Options', 'public/plugins/blackmirror1-singlestat-math-panel/editor.html', 2);
                    this.addEditorTab('Value Mappings', 'public/plugins/blackmirror1-singlestat-math-panel/mappings.html', 3);
                    this.unitFormats = kbn_1.default.getUnitFormats();
                };
                SingleStatMathCtrl.prototype.oldThreshesChange = function (threshes) {
                    var array = null;
                    try {
                        array = JSON.parse("[" + threshes + "]");
                    }
                    catch (err) {
                        console.log("JSON parse failed" + err.message);
                    }
                    if (array === null) {
                        array = threshes.split(",");
                    }
                    this.thresholds = [];
                    for (var i = 0; i < array.length; i++) {
                        var useColor = this.panel.defaultColor;
                        if (typeof this.panel.colors !== "undefined") {
                            if (i < this.panel.colors.length) {
                                useColor = this.panel.colors[i];
                            }
                        }
                        this.thresholds.push({
                            color: useColor,
                            value: Number(array[i]),
                        });
                    }
                    this.panel["thresholds"] = this.thresholds;
                };
                SingleStatMathCtrl.prototype.sortMyThreshes = function (control) {
                    if (this.panel.sortOrder === 'asc') {
                        control.panel.thresholds = lodash_1.default.orderBy(control.panel.thresholds, ["value"], ["asc"]);
                    }
                    else if (this.panel.sortOrder === 'desc') {
                        control.panel.thresholds = lodash_1.default.orderBy(control.panel.thresholds, ["value"], ["desc"]);
                    }
                    this.$scope.ctrl.refresh();
                };
                SingleStatMathCtrl.prototype.setUnitFormat = function (subItem) {
                    this.panel.format = subItem.value;
                    this.refresh();
                };
                SingleStatMathCtrl.prototype.onDataError = function (err) {
                    this.onDataReceived([]);
                };
                SingleStatMathCtrl.prototype.onEditorRemoveThreshold = function (index) {
                    this.panel.thresholds.splice(index, 1);
                    this.render();
                };
                SingleStatMathCtrl.prototype.onEditorAddThreshold = function () {
                    this.panel.thresholds.push({ color: this.panel.defaultColor });
                    this.render();
                };
                SingleStatMathCtrl.prototype.onDataReceived = function (dataList) {
                    var data = {};
                    if (dataList.length > 0 && dataList[0].type === 'table') {
                        this.dataType = 'table';
                        var tableData = dataList.map(this.tableHandler.bind(this));
                        this.setTableValues(tableData, data);
                    }
                    else {
                        this.dataType = 'timeseries';
                        this.series = dataList.map(this.seriesHandler.bind(this));
                        this.setValues(data);
                    }
                    this.data = data;
                    this.render();
                };
                SingleStatMathCtrl.prototype.seriesHandler = function (seriesData) {
                    var series = new time_series2_1.default({
                        datapoints: seriesData.datapoints || [],
                        alias: seriesData.target,
                    });
                    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
                    return series;
                };
                SingleStatMathCtrl.prototype.tableHandler = function (tableData) {
                    var datapoints = [];
                    var columnNames = {};
                    tableData.columns.forEach(function (column, columnIndex) {
                        columnNames[columnIndex] = column.text;
                    });
                    this.tableColumnOptions = columnNames;
                    if (!lodash_1.default.find(tableData.columns, ['text', this.panel.tableColumn])) {
                        this.setTableColumnToSensibleDefault(tableData);
                    }
                    tableData.rows.forEach(function (row) {
                        var datapoint = {};
                        row.forEach(function (value, columnIndex) {
                            var key = columnNames[columnIndex];
                            datapoint[key] = value;
                        });
                        datapoints.push(datapoint);
                    });
                    return datapoints;
                };
                SingleStatMathCtrl.prototype.setTableColumnToSensibleDefault = function (tableData) {
                    if (tableData.columns.length === 1) {
                        this.panel.tableColumn = tableData.columns[0].text;
                    }
                    else {
                        this.panel.tableColumn = lodash_1.default.find(tableData.columns, function (col) {
                            return col.type !== 'time';
                        }).text;
                    }
                };
                SingleStatMathCtrl.prototype.setTableValues = function (tableData, data) {
                    if (!tableData || tableData.length === 0) {
                        return;
                    }
                    if (tableData[0].length === 0 || tableData[0][0][this.panel.tableColumn] === undefined) {
                        return;
                    }
                    var datapoint = tableData[0][0];
                    data.value = datapoint[this.panel.tableColumn];
                    if (lodash_1.default.isString(data.value)) {
                        data.valueFormatted = lodash_1.default.escape(data.value);
                        data.value = 0;
                        data.valueRounded = 0;
                    }
                    else {
                        var decimalInfo = this.getDecimalsForValue(data.value);
                        var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                        data.valueFormatted = formatFunc(datapoint[this.panel.tableColumn], decimalInfo.decimals, decimalInfo.scaledDecimals);
                        data.valueRounded = kbn_1.default.roundValue(data.value, this.panel.decimals || 0);
                    }
                    this.setValueMapping(data);
                };
                SingleStatMathCtrl.prototype.canChangeFontSize = function () {
                    return this.panel.gauge.show;
                };
                SingleStatMathCtrl.prototype.onSparklineColorChange = function (newColor) {
                    this.panel.sparkline.lineColor = newColor;
                    this.render();
                };
                SingleStatMathCtrl.prototype.onSparklineFillChange = function (newColor) {
                    this.panel.sparkline.fillColor = newColor;
                    this.render();
                };
                SingleStatMathCtrl.prototype.getDecimalsForValue = function (value) {
                    if (lodash_1.default.isNumber(this.panel.decimals)) {
                        return { decimals: this.panel.decimals, scaledDecimals: null };
                    }
                    var delta = value / 2;
                    var dec = -Math.floor(Math.log(delta) / Math.LN10);
                    var magn = Math.pow(10, -dec), norm = delta / magn, size;
                    if (norm < 1.5) {
                        size = 1;
                    }
                    else if (norm < 3) {
                        size = 2;
                        if (norm > 2.25) {
                            size = 2.5;
                            ++dec;
                        }
                    }
                    else if (norm < 7.5) {
                        size = 5;
                    }
                    else {
                        size = 10;
                    }
                    size *= magn;
                    if (Math.floor(value) === value) {
                        dec = 0;
                    }
                    var result = {};
                    result.decimals = Math.max(0, dec);
                    result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;
                    return result;
                };
                SingleStatMathCtrl.prototype.setValues = function (data) {
                    var _this = this;
                    data.flotpairs = [];
                    if (this.series.length > 1 || this.panel.math.length) {
                        var lastPoint_1 = [];
                        var lastValue_1 = [];
                        this.series.forEach(function (element, index) {
                            lastPoint_1[index] = lodash_1.default.last(element.datapoints);
                            lastValue_1[index] = lodash_1.default.isArray(lastPoint_1[index]) ? lastPoint_1[index][0] : null;
                        });
                        if (this.panel.valueName === 'name') {
                            data.value = 0;
                            data.valueRounded = 0;
                            data.valueFormatted = this.series[0].alias;
                        }
                        else if (lodash_1.default.isString(lastValue_1[0])) {
                            data.value = 0;
                            data.valueFormatted = lodash_1.default.escape(lastValue_1[0]);
                            data.valueRounded = 0;
                        }
                        else if (this.panel.valueName === 'last_time') {
                            var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                            data.value = lastPoint_1[0][1];
                            data.valueRounded = data.value;
                            data.valueFormatted = formatFunc(data.value, 0, 0);
                        }
                        else {
                            if (this.panel.math.length) {
                                var mathFunction = this.panel.math;
                                this.series.forEach(function (element) {
                                    mathFunction = mathFunction.replace(new RegExp(element.alias, 'gi'), String(element.stats[_this.panel.valueName]));
                                });
                                try {
                                    mathFunction = mathFunction.replace(new RegExp('[A-za-z]+', 'gi'), String(0));
                                    data.value = math_1.default.eval(mathFunction);
                                    data.flotpairs = this.series[0].flotpairs;
                                }
                                catch (e) {
                                    data.value = 0;
                                    data.flotpairs = [0, 0];
                                }
                            }
                            else {
                                data.value = this.series[0].stats[this.panel.valueName];
                                data.flotpairs = this.series[0].flotpairs;
                            }
                            var decimalInfo = this.getDecimalsForValue(data.value);
                            var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                            data.valueFormatted = formatFunc(data.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                            data.valueRounded = kbn_1.default.roundValue(data.value, decimalInfo.decimals);
                        }
                        if (this.series && this.series.length > 0) {
                            data.scopedVars = lodash_1.default.extend({}, this.panel.scopedVars);
                            data.scopedVars['__name'] = { value: this.series[0].label };
                        }
                    }
                    if (this.series && this.series.length > 0 && this.series.length < 2 && !this.panel.math.length) {
                        var lastPoint = lodash_1.default.last(this.series[0].datapoints);
                        var lastValue = lodash_1.default.isArray(lastPoint) ? lastPoint[0] : null;
                        if (this.panel.valueName === 'name') {
                            data.value = 0;
                            data.valueRounded = 0;
                            data.valueFormatted = this.series[0].alias;
                        }
                        else if (lodash_1.default.isString(lastValue)) {
                            data.value = 0;
                            data.valueFormatted = lodash_1.default.escape(lastValue);
                            data.valueRounded = 0;
                        }
                        else if (this.panel.valueName === 'last_time') {
                            var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                            data.value = lastPoint[1];
                            data.valueRounded = data.value;
                            data.valueFormatted = formatFunc(data.value, 0, 0);
                        }
                        else {
                            data.value = this.series[0].stats[this.panel.valueName];
                            data.flotpairs = this.series[0].flotpairs;
                            var decimalInfo = this.getDecimalsForValue(data.value);
                            var formatFunc = kbn_1.default.valueFormats[this.panel.format];
                            data.valueFormatted = formatFunc(data.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                            data.valueRounded = kbn_1.default.roundValue(data.value, decimalInfo.decimals);
                        }
                        data.scopedVars = lodash_1.default.extend({}, this.panel.scopedVars);
                        data.scopedVars['__name'] = { value: this.series[0].label };
                    }
                    this.setValueMapping(data);
                };
                SingleStatMathCtrl.prototype.setValueMapping = function (data) {
                    if (this.panel.mappingType === 1) {
                        for (var i = 0; i < this.panel.valueMaps.length; i++) {
                            var map = this.panel.valueMaps[i];
                            if (map.value === 'null') {
                                if (data.value === null || data.value === void 0) {
                                    data.valueFormatted = map.text;
                                    return;
                                }
                                continue;
                            }
                            var value = parseFloat(map.value);
                            if (value === data.valueRounded) {
                                data.valueFormatted = map.text;
                                return;
                            }
                        }
                    }
                    else if (this.panel.mappingType === 2) {
                        for (var i = 0; i < this.panel.rangeMaps.length; i++) {
                            var map = this.panel.rangeMaps[i];
                            if (map.from === 'null' && map.to === 'null') {
                                if (data.value === null || data.value === void 0) {
                                    data.valueFormatted = map.text;
                                    return;
                                }
                                continue;
                            }
                            var from = parseFloat(map.from);
                            var to = parseFloat(map.to);
                            if (to >= data.valueRounded && from <= data.valueRounded) {
                                data.valueFormatted = map.text;
                                return;
                            }
                        }
                    }
                    if (data.value === null || data.value === void 0) {
                        data.valueFormatted = 'no value';
                    }
                };
                SingleStatMathCtrl.prototype.removeValueMap = function (map) {
                    var index = lodash_1.default.indexOf(this.panel.valueMaps, map);
                    this.panel.valueMaps.splice(index, 1);
                    this.render();
                };
                SingleStatMathCtrl.prototype.addValueMap = function () {
                    this.panel.valueMaps.push({ value: '', op: '=', text: '' });
                };
                SingleStatMathCtrl.prototype.removeRangeMap = function (rangeMap) {
                    var index = lodash_1.default.indexOf(this.panel.rangeMaps, rangeMap);
                    this.panel.rangeMaps.splice(index, 1);
                    this.render();
                };
                SingleStatMathCtrl.prototype.addRangeMap = function () {
                    this.panel.rangeMaps.push({ from: '', to: '', text: '' });
                };
                SingleStatMathCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    var $location = this.$location;
                    var linkSrv = this.linkSrv;
                    var $timeout = this.$timeout;
                    var panel = ctrl.panel;
                    var templateSrv = this.templateSrv;
                    var data, linkInfo;
                    elem = elem.find('.singlestatmath-panel');
                    function getPanelContainer() {
                        return elem.closest('.panel-container');
                    }
                    function applyColoringThresholds(value, valueString) {
                        if (!panel.colorValue) {
                            return valueString;
                        }
                        var color = getColorForValue(panel.thresholds, data.value);
                        if (data.value == null) {
                            color = panel.valueMappingColorBackground;
                        }
                        if (color) {
                            return '<span style="color:' + color + '">' + valueString + '</span>';
                        }
                        return valueString;
                    }
                    function getSpan(className, fontSize, value) {
                        value = templateSrv.replace(value, data.scopedVars);
                        return '<span class="' + className + '" style="font-size:' + fontSize + '">' + value + '</span>';
                    }
                    function getBigValueHtml() {
                        var body = '<div class="singlestatmath-panel-value-container">';
                        if (panel.prefix) {
                            var prefix = applyColoringThresholds(data.value, panel.prefix);
                            body += getSpan('singlestatmath-panel-prefix', panel.prefixFontSize, prefix);
                        }
                        var value = applyColoringThresholds(data.value, data.valueFormatted);
                        body += getSpan('singlestatmath-panel-value', panel.valueFontSize, value);
                        if (panel.postfix) {
                            var postfix = applyColoringThresholds(data.value, panel.postfix);
                            body += getSpan('singlestatmath-panel-postfix', panel.postfixFontSize, postfix);
                        }
                        body += '</div>';
                        return body;
                    }
                    function getValueText() {
                        var result = panel.prefix ? templateSrv.replace(panel.prefix, data.scopedVars) : '';
                        result += data.valueFormatted;
                        result += panel.postfix ? templateSrv.replace(panel.postfix, data.scopedVars) : '';
                        return result;
                    }
                    function addGauge() {
                        var width = elem.width();
                        var height = elem.height();
                        var dimension = Math.min(width, height * 1.3);
                        ctrl.invalidGaugeRange = false;
                        if (panel.gauge.minValue > panel.gauge.maxValue) {
                            ctrl.invalidGaugeRange = true;
                            return;
                        }
                        var plotCanvas = jquery_1.default('<div></div>');
                        var plotCss = {
                            top: '10px',
                            margin: 'auto',
                            position: 'relative',
                            height: height * 0.9 + 'px',
                            width: dimension + 'px',
                        };
                        plotCanvas.css(plotCss);
                        var thresholds = [];
                        for (var i = 0; i < panel.thresholds.length; i++) {
                            thresholds.push({
                                value: panel.thresholds[i].value,
                                color: panel.thresholds[i].color,
                            });
                        }
                        thresholds.push({
                            value: panel.gauge.maxValue,
                            color: panel.thresholds[panel.thresholds.length - 1],
                        });
                        var bgColor = config_1.default.bootData.user.lightTheme ? 'rgb(230,230,230)' : 'rgb(38,38,38)';
                        var fontScale = parseInt(panel.valueFontSize) / 100;
                        var fontSize = Math.min(dimension / 5, 100) * fontScale;
                        var gaugeWidthReduceRatio = panel.gauge.thresholdLabels ? 1.5 : 1;
                        var gaugeWidth = Math.min(dimension / 6, 60) / gaugeWidthReduceRatio;
                        var thresholdMarkersWidth = gaugeWidth / 5;
                        var thresholdLabelFontSize = fontSize / 2.5;
                        var options = {
                            series: {
                                gauges: {
                                    gauge: {
                                        min: panel.gauge.minValue,
                                        max: panel.gauge.maxValue,
                                        background: { color: bgColor },
                                        border: { color: null },
                                        shadow: { show: false },
                                        width: gaugeWidth,
                                    },
                                    frame: { show: false },
                                    label: { show: false },
                                    layout: { margin: 0, thresholdWidth: 0 },
                                    cell: { border: { width: 0 } },
                                    threshold: {
                                        values: thresholds,
                                        label: {
                                            show: panel.gauge.thresholdLabels,
                                            margin: thresholdMarkersWidth + 1,
                                            font: { size: thresholdLabelFontSize },
                                        },
                                        show: panel.gauge.thresholdMarkers,
                                        width: thresholdMarkersWidth,
                                    },
                                    value: {
                                        color: panel.colorValue ? getColorForValue(panel.thresholds, data.valueRounded) : null,
                                        formatter: function () {
                                            return getValueText();
                                        },
                                        font: {
                                            size: fontSize,
                                            family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                        },
                                    },
                                    show: true,
                                },
                            },
                        };
                        elem.append(plotCanvas);
                        var plotSeries = {
                            data: [[0, data.valueRounded]],
                        };
                        jquery_1.default.plot(plotCanvas, [plotSeries], options);
                    }
                    function addSparkline() {
                        var width = elem.width() + 20;
                        if (width < 30) {
                            setTimeout(addSparkline, 30);
                            return;
                        }
                        var height = ctrl.height;
                        var plotCanvas = jquery_1.default('<div></div>');
                        var plotCss = {};
                        plotCss.position = 'absolute';
                        if (panel.sparkline.full) {
                            plotCss.bottom = '5px';
                            plotCss.left = '-5px';
                            plotCss.width = width - 10 + 'px';
                            var dynamicHeightMargin = height <= 100 ? 5 : Math.round(height / 100) * 15 + 5;
                            plotCss.height = height - dynamicHeightMargin + 'px';
                        }
                        else {
                            plotCss.bottom = '0px';
                            plotCss.left = '-5px';
                            plotCss.width = width - 10 + 'px';
                            plotCss.height = Math.floor(height * 0.25) + 'px';
                        }
                        plotCanvas.css(plotCss);
                        var options = {
                            legend: { show: false },
                            series: {
                                lines: {
                                    show: true,
                                    fill: 1,
                                    lineWidth: 1,
                                    fillColor: panel.sparkline.fillColor,
                                },
                            },
                            yaxes: { show: false },
                            xaxis: {
                                show: false,
                                mode: 'time',
                                min: ctrl.range.from.valueOf(),
                                max: ctrl.range.to.valueOf(),
                            },
                            grid: { hoverable: false, show: false },
                        };
                        elem.append(plotCanvas);
                        var plotSeries = {
                            data: data.flotpairs,
                            color: panel.sparkline.lineColor,
                        };
                        jquery_1.default.plot(plotCanvas, [plotSeries], options);
                    }
                    function render() {
                        if (!ctrl.data) {
                            return;
                        }
                        data = ctrl.data;
                        var body = panel.gauge.show ? '' : getBigValueHtml();
                        var color = '';
                        if (panel.colorBackground) {
                            if (data.value == null) {
                                color = panel.valueMappingColorBackground;
                            }
                            else {
                                color = getColorForValue(panel.thresholds, data.value);
                            }
                            if (color) {
                                getPanelContainer().css('background-color', color);
                                if (scope.fullscreen) {
                                    elem.css('background-color', color);
                                }
                                else {
                                    elem.css('background-color', '');
                                }
                            }
                        }
                        else {
                            getPanelContainer().css('background-color', '');
                            elem.css('background-color', '');
                            panel.circleBackground = false;
                        }
                        if (panel.circleBackground) {
                            var circleHeight = getPanelContainer().height() - 40;
                            var circleWidth = getPanelContainer().width() - 30;
                            jquery_1.default(getPanelContainer()).addClass('circle');
                            getPanelContainer().css('background-color', '');
                            if (circleWidth >= circleHeight) {
                                elem.css({
                                    'border-radius': 50 + '%',
                                    'width': circleHeight + 'px',
                                    'height': circleHeight + 'px',
                                    'background-color': color
                                });
                            }
                            else {
                                elem.css({
                                    'border-radius': 50 + '%',
                                    'width': circleWidth + 'px',
                                    'height': circleWidth + 'px',
                                    'background-color': color
                                });
                            }
                        }
                        else {
                            jquery_1.default(getPanelContainer().removeClass('circle'));
                            elem.css({ 'border-radius': '0', width: '', height: '' });
                        }
                        elem.html(body);
                        if (panel.sparkline.show) {
                            addSparkline();
                        }
                        if (panel.gauge.show) {
                            addGauge();
                        }
                        elem.toggleClass('pointer', panel.links.length > 0);
                        if (panel.links.length > 0) {
                            linkInfo = linkSrv.getPanelLinkAnchorInfo(panel.links[0], data.scopedVars);
                        }
                        else {
                            linkInfo = null;
                        }
                    }
                    function hookupDrilldownLinkTooltip() {
                        if (ctrl.panel.description) {
                            var drilldownTooltip = jquery_1.default('<div id="tooltip" class="" style="background:white;margin:auto;color:black;width:200px;box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);"><h6 style="color:black;">'
                                + ctrl.panel.title + '</h6>' + ctrl.panel.description + '</div>"');
                        }
                        else {
                            var drilldownTooltip = jquery_1.default('<div id="tooltip" class="" style="background:white;margin:auto;color:black;width:200px;box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);"><h6 style="color:black;">'
                                + ctrl.panel.title + '</h6>No Description</div>"');
                        }
                        elem.mouseleave(function () {
                            $timeout(function () {
                                drilldownTooltip.detach();
                            });
                        });
                        elem.click(function (evt) {
                            if (!linkInfo) {
                                return;
                            }
                            if (jquery_1.default(evt).parents('.panel-header').length > 0) {
                                return;
                            }
                            if (linkInfo.target === '_blank') {
                                window.open(linkInfo.href, '_blank');
                                return;
                            }
                            if (linkInfo.href.indexOf('http') === 0) {
                                window.location.href = linkInfo.href;
                            }
                            else {
                                $timeout(function () {
                                    $location.url(linkInfo.href);
                                });
                            }
                            drilldownTooltip.detach();
                        });
                        elem.mousemove(function (e) {
                            if (!ctrl.panel.tooltip.show) {
                                return;
                            }
                            drilldownTooltip.place_tt(e.pageX, e.pageY - 50);
                        });
                    }
                    hookupDrilldownLinkTooltip();
                    this.events.on(data_1.PanelEvents.render, function () {
                        render();
                        ctrl.renderingCompleted();
                    });
                };
                SingleStatMathCtrl.templateUrl = 'public/plugins/blackmirror1-singlestat-math-panel/module.html';
                return SingleStatMathCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("SingleStatMathCtrl", SingleStatMathCtrl);
            exports_1("PanelCtrl", SingleStatMathCtrl);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlc3RhdC1tYXRoX2N0cmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2luZ2xlc3RhdC1tYXRoX2N0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXcxQkEsU0FBUyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsS0FBSztRQUN6QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDdkIsSUFBSSxLQUFLLElBQUksVUFBVSxDQUFDLEtBQUssRUFBRTtnQkFDN0IsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDO2FBQ3pCO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQW4xQmdDLHNDQUFnQjtnQkFnRi9DLDRCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFVLE9BQU87b0JBQWpFLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQW9CekI7b0JBckJzQyxlQUFTLEdBQVQsU0FBUyxDQUFBO29CQUFVLGFBQU8sR0FBUCxPQUFPLENBQUE7b0JBN0VqRSxjQUFRLEdBQUcsWUFBWSxDQUFDO29CQVF4QixzQkFBZ0IsR0FBVTt3QkFDeEIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7d0JBQzdCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJ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QUFDO2dDQUMvQixDQUFDLENBQUMsQ0FBQzs2QkFDSjs0QkFFRCxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDNUIsQ0FBQyxDQUFDLENBQUM7d0JBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFTLENBQUM7NEJBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0NBQzVCLE9BQU87NkJBQ1I7NEJBS0QsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDbkQsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztvQkFFRCwwQkFBMEIsRUFBRSxDQUFDO29CQU83QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBVyxDQUFDLE1BQU0sRUFBRTt3QkFDakMsTUFBTSxFQUFFLENBQUM7d0JBQ1QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBQzVCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBbDBCTSw4QkFBVyxHQUFHLCtEQUErRCxDQUFDO2dCQW0wQnZGLHlCQUFDO2FBQUEsQUFwMEJELENBQWlDLHNCQUFnQjs7O1FBdTFCakQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgJ2pxdWVyeS5mbG90JztcclxuaW1wb3J0ICcuL2xpYi9mbG90L2pxdWVyeS5mbG90LmdhdWdlJztcclxuaW1wb3J0ICdqcXVlcnkuZmxvdC50aW1lJztcclxuaW1wb3J0ICdqcXVlcnkuZmxvdC5jcm9zc2hhaXInO1xyXG5pbXBvcnQgJy4vY3NzL3BhbmVsX3NpbmdsZXN0YXRtYXRoLmNzcyEnO1xyXG5pbXBvcnQgbWF0aCBmcm9tICcuL2xpYi9tYXRoanMvbWF0aCdcclxuXHJcbmltcG9ydCBrYm4gZnJvbSAnYXBwL2NvcmUvdXRpbHMva2JuJztcclxuaW1wb3J0IGNvbmZpZyBmcm9tICdhcHAvY29yZS9jb25maWcnO1xyXG5pbXBvcnQgVGltZVNlcmllcyBmcm9tICdhcHAvY29yZS90aW1lX3NlcmllczInO1xyXG5pbXBvcnQgeyBNZXRyaWNzUGFuZWxDdHJsLCBQYW5lbEN0cmwgfSBmcm9tICdhcHAvcGx1Z2lucy9zZGsnO1xyXG4vL2ltcG9ydCB7IHN0cmljdCB9IGZyb20gJ2Fzc2VydCc7XHJcbmltcG9ydCB7IFBhbmVsRXZlbnRzIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XHJcblxyXG5jbGFzcyBTaW5nbGVTdGF0TWF0aEN0cmwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIHtcclxuICBzdGF0aWMgdGVtcGxhdGVVcmwgPSAncHVibGljL3BsdWdpbnMvYmxhY2ttaXJyb3IxLXNpbmdsZXN0YXQtbWF0aC1wYW5lbC9tb2R1bGUuaHRtbCc7XHJcblxyXG4gIGRhdGFUeXBlID0gJ3RpbWVzZXJpZXMnO1xyXG4gIHNlcmllczogYW55W107XHJcbiAgZGF0YTogYW55O1xyXG4gIGZvbnRTaXplczogYW55W107XHJcbiAgdW5pdEZvcm1hdHM6IGFueVtdO1xyXG4gIGludmFsaWRHYXVnZVJhbmdlOiBib29sZWFuO1xyXG4gIHBhbmVsOiBhbnk7XHJcbiAgZXZlbnRzOiBhbnk7XHJcbiAgdmFsdWVOYW1lT3B0aW9uczogYW55W10gPSBbXHJcbiAgICB7IHZhbHVlOiAnbWluJywgdGV4dDogJ01pbicgfSxcclxuICAgIHsgdmFsdWU6ICdtYXgnLCB0ZXh0OiAnTWF4JyB9LFxyXG4gICAgeyB2YWx1ZTogJ2F2ZycsIHRleHQ6ICdBdmVyYWdlJyB9LFxyXG4gICAgeyB2YWx1ZTogJ2N1cnJlbnQnLCB0ZXh0OiAnQ3VycmVudCcgfSxcclxuICAgIHsgdmFsdWU6ICd0b3RhbCcsIHRleHQ6ICdUb3RhbCcgfSxcclxuICAgIHsgdmFsdWU6ICduYW1lJywgdGV4dDogJ05hbWUnIH0sXHJcbiAgICB7IHZhbHVlOiAnZmlyc3QnLCB0ZXh0OiAnRmlyc3QnIH0sXHJcbiAgICB7IHZhbHVlOiAnZGVsdGEnLCB0ZXh0OiAnRGVsdGEnIH0sXHJcbiAgICB7IHZhbHVlOiAnZGlmZicsIHRleHQ6ICdEaWZmZXJlbmNlJyB9LFxyXG4gICAgeyB2YWx1ZTogJ3JhbmdlJywgdGV4dDogJ1JhbmdlJyB9LFxyXG4gICAgeyB2YWx1ZTogJ2xhc3RfdGltZScsIHRleHQ6ICdUaW1lIG9mIGxhc3QgcG9pbnQnIH0sXHJcbiAgXTtcclxuICB0YWJsZUNvbHVtbk9wdGlvbnM6IGFueTtcclxuICB0aHJlc2hvbGRzOiBhbnlbXTtcclxuXHJcbiAgLy8gU2V0IGFuZCBwb3B1bGF0ZSBkZWZhdWx0c1xyXG4gIHBhbmVsRGVmYXVsdHMgPSB7XHJcbiAgICBsaW5rczogW10sXHJcbiAgICBkYXRhc291cmNlOiBudWxsLFxyXG4gICAgbWF4RGF0YVBvaW50czogMTAwLFxyXG4gICAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgICB0YXJnZXRzOiBbe31dLFxyXG4gICAgY2FjaGVUaW1lb3V0OiBudWxsLFxyXG4gICAgZGVmYXVsdENvbG9yOiAncmdiKDExNywgMTE3LCAxMTcpJyxcclxuICAgIHRocmVzaG9sZHM6ICcnLFxyXG4gICAgZm9ybWF0OiAnbm9uZScsXHJcbiAgICB0b29sdGlwOiB7XHJcbiAgICAgIHNob3c6IHRydWVcclxuICAgIH0sXHJcbiAgICBzb3J0T3JkZXI6ICdhc2MnLFxyXG4gICAgcHJlZml4OiAnJyxcclxuICAgIHBvc3RmaXg6ICcnLFxyXG4gICAgbnVsbFRleHQ6IG51bGwsXHJcbiAgICB2YWx1ZU1hcHM6IFt7IHZhbHVlOiAnbnVsbCcsIG9wOiAnPScsIHRleHQ6ICdObyBkYXRhJyB9XSxcclxuICAgIG1hcHBpbmdUeXBlczogW3sgbmFtZTogJ3ZhbHVlIHRvIHRleHQnLCB2YWx1ZTogMSB9LCB7IG5hbWU6ICdyYW5nZSB0byB0ZXh0JywgdmFsdWU6IDIgfV0sXHJcbiAgICByYW5nZU1hcHM6IFt7IGZyb206ICdudWxsJywgdG86ICdudWxsJywgdGV4dDogJ04vQScgfV0sXHJcbiAgICBtYXBwaW5nVHlwZTogMSxcclxuICAgIG51bGxQb2ludE1vZGU6ICdjb25uZWN0ZWQnLFxyXG4gICAgdmFsdWVOYW1lOiAnYXZnJyxcclxuICAgIHByZWZpeEZvbnRTaXplOiAnNTAlJyxcclxuICAgIHZhbHVlRm9udFNpemU6ICc4MCUnLFxyXG4gICAgcG9zdGZpeEZvbnRTaXplOiAnNTAlJyxcclxuICAgIG1hdGg6ICcnLFxyXG4gICAgY29sb3JCYWNrZ3JvdW5kOiBmYWxzZSxcclxuICAgIGNpcmNsZUJhY2tncm91bmQ6IGZhbHNlLFxyXG4gICAgdmFsdWVNYXBwaW5nQ29sb3JCYWNrZ3JvdW5kOiAnIzc2NzE3MScsXHJcbiAgICBjb2xvclZhbHVlOiBmYWxzZSxcclxuICAgIHNwYXJrbGluZToge1xyXG4gICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgZnVsbDogZmFsc2UsXHJcbiAgICAgIGxpbmVDb2xvcjogJ3JnYigzMSwgMTIwLCAxOTMpJyxcclxuICAgICAgZmlsbENvbG9yOiAncmdiYSgzMSwgMTE4LCAxODksIDAuMTgpJyxcclxuICAgIH0sXHJcbiAgICBnYXVnZToge1xyXG4gICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgbWluVmFsdWU6IDAsXHJcbiAgICAgIG1heFZhbHVlOiAxMDAsXHJcbiAgICAgIHRocmVzaG9sZE1hcmtlcnM6IHRydWUsXHJcbiAgICAgIHRocmVzaG9sZExhYmVsczogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgc29ydE9yZGVyT3B0aW9uczogW1xyXG4gICAgICB7IHZhbHVlOiAnYXNjJywgdGV4dDogJ0FzY2VuZGluZyd9LFxyXG4gICAgICB7IHZhbHVlOiAnZGVzYycsIHRleHQ6ICdEZXNjZW5kaW5nJ30sXHJcbiAgICBdLFxyXG4gICAgdGFibGVDb2x1bW46ICcnLFxyXG4gIH07XHJcblxyXG4gIC8qKiBAbmdJbmplY3QgKi9cclxuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3RvciwgcHJpdmF0ZSAkbG9jYXRpb24sIHByaXZhdGUgbGlua1Nydikge1xyXG4gICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCB0aGlzLnBhbmVsRGVmYXVsdHMpO1xyXG5cclxuICAgIC8vdGhpcy5ldmVudHMub24oJ2RhdGEtcmVjZWl2ZWQnLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oUGFuZWxFdmVudHMuZGF0YVJlY2VpdmVkLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgLy90aGlzLmV2ZW50cy5vbignZGF0YS1lcnJvcicsIHRoaXMub25EYXRhRXJyb3IuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihQYW5lbEV2ZW50cy5kYXRhRXJyb3IsIHRoaXMub25EYXRhRXJyb3IuYmluZCh0aGlzKSk7XHJcbiAgICAvL3RoaXMuZXZlbnRzLm9uKCdkYXRhLXNuYXBzaG90LWxvYWQnLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oUGFuZWxFdmVudHMuZGF0YVNuYXBzaG90TG9hZCwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcclxuICAgIC8vdGhpcy5ldmVudHMub24oJ2luaXQtZWRpdC1tb2RlJywgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFBhbmVsRXZlbnRzLmVkaXRNb2RlSW5pdGlhbGl6ZWQsIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5vblNwYXJrbGluZUNvbG9yQ2hhbmdlID0gdGhpcy5vblNwYXJrbGluZUNvbG9yQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uU3BhcmtsaW5lRmlsbENoYW5nZSA9IHRoaXMub25TcGFya2xpbmVGaWxsQ2hhbmdlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgLy9HcmFiIHByZXZpb3VzIHZlcnNpb24gdGhyZXNob2xkcyBhbmQgc3RvcmUgaW50byBuZXcgZm9ybWF0XHJcbiAgICB2YXIgdCA9IHRoaXMucGFuZWwudGhyZXNob2xkcztcclxuICAgIGlmICh0eXBlb2YgdCA9PT0gJ3N0cmluZycgfHwgdCBpbnN0YW5jZW9mIFN0cmluZykge1xyXG4gICAgICB0aGlzLm9sZFRocmVzaGVzQ2hhbmdlKHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Jbml0RWRpdE1vZGUoKSB7XHJcbiAgICB0aGlzLmZvbnRTaXplcyA9IFsnMjAlJywgJzMwJScsICc1MCUnLCAnNzAlJywgJzgwJScsICcxMDAlJywgJzExMCUnLCAnMTIwJScsICcxNTAlJywgJzE3MCUnLCAnMjAwJSddO1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoJ09wdGlvbnMnLCAncHVibGljL3BsdWdpbnMvYmxhY2ttaXJyb3IxLXNpbmdsZXN0YXQtbWF0aC1wYW5lbC9lZGl0b3IuaHRtbCcsIDIpO1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoJ1ZhbHVlIE1hcHBpbmdzJywgJ3B1YmxpYy9wbHVnaW5zL2JsYWNrbWlycm9yMS1zaW5nbGVzdGF0LW1hdGgtcGFuZWwvbWFwcGluZ3MuaHRtbCcsIDMpO1xyXG4gICAgdGhpcy51bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gIH1cclxuXHJcbiAgb2xkVGhyZXNoZXNDaGFuZ2UodGhyZXNoZXMpIHtcclxuICAgIHZhciBhcnJheSA9IG51bGw7XHJcbiAgICB0cnkge1xyXG4gICAgICBhcnJheSA9IEpTT04ucGFyc2UoXCJbXCIgKyB0aHJlc2hlcyArIFwiXVwiKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkpTT04gcGFyc2UgZmFpbGVkXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoYXJyYXkgPT09IG51bGwpIHtcclxuICAgICAgLy8gdXNlIHNwbGl0IG1ldGhvZCBpbnN0ZWFkXHJcbiAgICAgIGFycmF5ID0gdGhyZXNoZXMuc3BsaXQoXCIsXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50aHJlc2hvbGRzID0gW107IC8vaW5zdGFudGlhdGUgYSBuZXcgZGVmaW5lZCBkaWN0aW9uYXJ5XHJcblxyXG4gICAgLy9wdXNoIG9sZCBpdGVtcyBpbnRvIG5ldyBkaWN0aW9uYXJ5XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCB1c2VDb2xvciA9IHRoaXMucGFuZWwuZGVmYXVsdENvbG9yO1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMucGFuZWwuY29sb3JzICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgaWYgKGkgPCB0aGlzLnBhbmVsLmNvbG9ycy5sZW5ndGgpIHtcclxuICAgICAgICAgIHVzZUNvbG9yID0gdGhpcy5wYW5lbC5jb2xvcnNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMudGhyZXNob2xkcy5wdXNoKHtcclxuICAgICAgICBjb2xvcjogdXNlQ29sb3IsXHJcbiAgICAgICAgdmFsdWU6IE51bWJlcihhcnJheVtpXSksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vT3ZlcndyaXRlIEpTT05cclxuICAgIHRoaXMucGFuZWxbXCJ0aHJlc2hvbGRzXCJdID0gdGhpcy50aHJlc2hvbGRzO1xyXG4gIH1cclxuXHJcbiAgc29ydE15VGhyZXNoZXMoY29udHJvbCkge1xyXG4gICAgaWYodGhpcy5wYW5lbC5zb3J0T3JkZXIgPT09ICdhc2MnKSB7XHJcbiAgICAgIGNvbnRyb2wucGFuZWwudGhyZXNob2xkcyA9IF8ub3JkZXJCeShjb250cm9sLnBhbmVsLnRocmVzaG9sZHMsIFtcInZhbHVlXCJdLCBbXCJhc2NcIl0pO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBhbmVsLnNvcnRPcmRlciA9PT0gJ2Rlc2MnKSB7XHJcbiAgICAgIGNvbnRyb2wucGFuZWwudGhyZXNob2xkcyA9IF8ub3JkZXJCeShjb250cm9sLnBhbmVsLnRocmVzaG9sZHMsIFtcInZhbHVlXCJdLCBbXCJkZXNjXCJdKTtcclxuICAgIH1cclxuICAgIHRoaXMuJHNjb3BlLmN0cmwucmVmcmVzaCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0VW5pdEZvcm1hdChzdWJJdGVtKSB7XHJcbiAgICB0aGlzLnBhbmVsLmZvcm1hdCA9IHN1Ykl0ZW0udmFsdWU7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9XHJcblxyXG4gIG9uRGF0YUVycm9yKGVycikge1xyXG4gICAgdGhpcy5vbkRhdGFSZWNlaXZlZChbXSk7XHJcbiAgfVxyXG5cclxuICBvbkVkaXRvclJlbW92ZVRocmVzaG9sZChpbmRleCkge1xyXG4gICAgdGhpcy5wYW5lbC50aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSlcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBvbkVkaXRvckFkZFRocmVzaG9sZCgpIHtcclxuICAgIHRoaXMucGFuZWwudGhyZXNob2xkcy5wdXNoKHtjb2xvcjogdGhpcy5wYW5lbC5kZWZhdWx0Q29sb3J9KVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIG9uRGF0YVJlY2VpdmVkKGRhdGFMaXN0KSB7XHJcbiAgICBjb25zdCBkYXRhOiBhbnkgPSB7fTtcclxuICAgIGlmIChkYXRhTGlzdC5sZW5ndGggPiAwICYmIGRhdGFMaXN0WzBdLnR5cGUgPT09ICd0YWJsZScpIHtcclxuICAgICAgdGhpcy5kYXRhVHlwZSA9ICd0YWJsZSc7XHJcbiAgICAgIGNvbnN0IHRhYmxlRGF0YSA9IGRhdGFMaXN0Lm1hcCh0aGlzLnRhYmxlSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgICAgdGhpcy5zZXRUYWJsZVZhbHVlcyh0YWJsZURhdGEsIGRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kYXRhVHlwZSA9ICd0aW1lc2VyaWVzJztcclxuICAgICAgdGhpcy5zZXJpZXMgPSBkYXRhTGlzdC5tYXAodGhpcy5zZXJpZXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgICB0aGlzLnNldFZhbHVlcyhkYXRhKTtcclxuICAgIH1cclxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgc2VyaWVzSGFuZGxlcihzZXJpZXNEYXRhKSB7XHJcbiAgICB2YXIgc2VyaWVzID0gbmV3IFRpbWVTZXJpZXMoe1xyXG4gICAgICBkYXRhcG9pbnRzOiBzZXJpZXNEYXRhLmRhdGFwb2ludHMgfHwgW10sXHJcbiAgICAgIGFsaWFzOiBzZXJpZXNEYXRhLnRhcmdldCxcclxuICAgIH0pO1xyXG5cclxuICAgIHNlcmllcy5mbG90cGFpcnMgPSBzZXJpZXMuZ2V0RmxvdFBhaXJzKHRoaXMucGFuZWwubnVsbFBvaW50TW9kZSk7XHJcbiAgICByZXR1cm4gc2VyaWVzO1xyXG4gIH1cclxuXHJcbiAgdGFibGVIYW5kbGVyKHRhYmxlRGF0YSkge1xyXG4gICAgY29uc3QgZGF0YXBvaW50cyA9IFtdO1xyXG4gICAgY29uc3QgY29sdW1uTmFtZXMgPSB7fTtcclxuXHJcbiAgICB0YWJsZURhdGEuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGNvbHVtbkluZGV4KSA9PiB7XHJcbiAgICAgIGNvbHVtbk5hbWVzW2NvbHVtbkluZGV4XSA9IGNvbHVtbi50ZXh0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy50YWJsZUNvbHVtbk9wdGlvbnMgPSBjb2x1bW5OYW1lcztcclxuICAgIGlmICghXy5maW5kKHRhYmxlRGF0YS5jb2x1bW5zLCBbJ3RleHQnLCB0aGlzLnBhbmVsLnRhYmxlQ29sdW1uXSkpIHtcclxuICAgICAgdGhpcy5zZXRUYWJsZUNvbHVtblRvU2Vuc2libGVEZWZhdWx0KHRhYmxlRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFibGVEYXRhLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xyXG4gICAgICBjb25zdCBkYXRhcG9pbnQgPSB7fTtcclxuXHJcbiAgICAgIHJvdy5mb3JFYWNoKCh2YWx1ZSwgY29sdW1uSW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBrZXkgPSBjb2x1bW5OYW1lc1tjb2x1bW5JbmRleF07XHJcbiAgICAgICAgZGF0YXBvaW50W2tleV0gPSB2YWx1ZTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkYXRhcG9pbnRzLnB1c2goZGF0YXBvaW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkYXRhcG9pbnRzO1xyXG4gIH1cclxuXHJcbiAgc2V0VGFibGVDb2x1bW5Ub1NlbnNpYmxlRGVmYXVsdCh0YWJsZURhdGEpIHtcclxuICAgIGlmICh0YWJsZURhdGEuY29sdW1ucy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgdGhpcy5wYW5lbC50YWJsZUNvbHVtbiA9IHRhYmxlRGF0YS5jb2x1bW5zWzBdLnRleHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnRhYmxlQ29sdW1uID0gXy5maW5kKHRhYmxlRGF0YS5jb2x1bW5zLCBjb2wgPT4ge1xyXG4gICAgICAgIHJldHVybiBjb2wudHlwZSAhPT0gJ3RpbWUnO1xyXG4gICAgICB9KS50ZXh0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VGFibGVWYWx1ZXModGFibGVEYXRhLCBkYXRhKSB7XHJcbiAgICBpZiAoIXRhYmxlRGF0YSB8fCB0YWJsZURhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGFibGVEYXRhWzBdLmxlbmd0aCA9PT0gMCB8fCB0YWJsZURhdGFbMF1bMF1bdGhpcy5wYW5lbC50YWJsZUNvbHVtbl0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YXBvaW50ID0gdGFibGVEYXRhWzBdWzBdO1xyXG4gICAgZGF0YS52YWx1ZSA9IGRhdGFwb2ludFt0aGlzLnBhbmVsLnRhYmxlQ29sdW1uXTtcclxuXHJcbiAgICBpZiAoXy5pc1N0cmluZyhkYXRhLnZhbHVlKSkge1xyXG4gICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gXy5lc2NhcGUoZGF0YS52YWx1ZSk7XHJcbiAgICAgIGRhdGEudmFsdWUgPSAwO1xyXG4gICAgICBkYXRhLnZhbHVlUm91bmRlZCA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBkZWNpbWFsSW5mbyA9IHRoaXMuZ2V0RGVjaW1hbHNGb3JWYWx1ZShkYXRhLnZhbHVlKTtcclxuICAgICAgY29uc3QgZm9ybWF0RnVuYyA9IGtibi52YWx1ZUZvcm1hdHNbdGhpcy5wYW5lbC5mb3JtYXRdO1xyXG4gICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhcclxuICAgICAgICBkYXRhcG9pbnRbdGhpcy5wYW5lbC50YWJsZUNvbHVtbl0sXHJcbiAgICAgICAgZGVjaW1hbEluZm8uZGVjaW1hbHMsXHJcbiAgICAgICAgZGVjaW1hbEluZm8uc2NhbGVkRGVjaW1hbHNcclxuICAgICAgKTtcclxuICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSBrYm4ucm91bmRWYWx1ZShkYXRhLnZhbHVlLCB0aGlzLnBhbmVsLmRlY2ltYWxzIHx8IDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0VmFsdWVNYXBwaW5nKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgY2FuQ2hhbmdlRm9udFNpemUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYW5lbC5nYXVnZS5zaG93O1xyXG4gIH1cclxuXHJcbiAgb25TcGFya2xpbmVDb2xvckNoYW5nZShuZXdDb2xvcikge1xyXG4gICAgdGhpcy5wYW5lbC5zcGFya2xpbmUubGluZUNvbG9yID0gbmV3Q29sb3I7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgb25TcGFya2xpbmVGaWxsQ2hhbmdlKG5ld0NvbG9yKSB7XHJcbiAgICB0aGlzLnBhbmVsLnNwYXJrbGluZS5maWxsQ29sb3IgPSBuZXdDb2xvcjtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXREZWNpbWFsc0ZvclZhbHVlKHZhbHVlKSB7XHJcbiAgICBpZiAoXy5pc051bWJlcih0aGlzLnBhbmVsLmRlY2ltYWxzKSkge1xyXG4gICAgICByZXR1cm4geyBkZWNpbWFsczogdGhpcy5wYW5lbC5kZWNpbWFscywgc2NhbGVkRGVjaW1hbHM6IG51bGwgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVsdGEgPSB2YWx1ZSAvIDI7XHJcbiAgICB2YXIgZGVjID0gLU1hdGguZmxvb3IoTWF0aC5sb2coZGVsdGEpIC8gTWF0aC5MTjEwKTtcclxuXHJcbiAgICB2YXIgbWFnbiA9IE1hdGgucG93KDEwLCAtZGVjKSxcclxuICAgICAgbm9ybSA9IGRlbHRhIC8gbWFnbiwgLy8gbm9ybSBpcyBiZXR3ZWVuIDEuMCBhbmQgMTAuMFxyXG4gICAgICBzaXplO1xyXG5cclxuICAgIGlmIChub3JtIDwgMS41KSB7XHJcbiAgICAgIHNpemUgPSAxO1xyXG4gICAgfSBlbHNlIGlmIChub3JtIDwgMykge1xyXG4gICAgICBzaXplID0gMjtcclxuICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciAyLjUsIHJlcXVpcmVzIGFuIGV4dHJhIGRlY2ltYWxcclxuICAgICAgaWYgKG5vcm0gPiAyLjI1KSB7XHJcbiAgICAgICAgc2l6ZSA9IDIuNTtcclxuICAgICAgICArK2RlYztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChub3JtIDwgNy41KSB7XHJcbiAgICAgIHNpemUgPSA1O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2l6ZSA9IDEwO1xyXG4gICAgfVxyXG5cclxuICAgIHNpemUgKj0gbWFnbjtcclxuXHJcbiAgICAvLyByZWR1Y2Ugc3RhcnRpbmcgZGVjaW1hbHMgaWYgbm90IG5lZWRlZFxyXG4gICAgaWYgKE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSkge1xyXG4gICAgICBkZWMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciByZXN1bHQ6IGFueSA9IHt9O1xyXG4gICAgcmVzdWx0LmRlY2ltYWxzID0gTWF0aC5tYXgoMCwgZGVjKTtcclxuICAgIHJlc3VsdC5zY2FsZWREZWNpbWFscyA9IHJlc3VsdC5kZWNpbWFscyAtIE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLkxOMTApICsgMjtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgc2V0VmFsdWVzKGRhdGEpIHtcclxuICAgIGRhdGEuZmxvdHBhaXJzID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMuc2VyaWVzLmxlbmd0aCA+IDEgfHwgdGhpcy5wYW5lbC5tYXRoLmxlbmd0aCkge1xyXG4gICAgICBsZXQgbGFzdFBvaW50ID0gW107XHJcbiAgICAgIGxldCBsYXN0VmFsdWUgPSBbXTtcclxuICAgICAgdGhpcy5zZXJpZXMuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICBsYXN0UG9pbnRbaW5kZXhdID0gXy5sYXN0KGVsZW1lbnQuZGF0YXBvaW50cyk7XHJcbiAgICAgICAgbGFzdFZhbHVlW2luZGV4XSA9IF8uaXNBcnJheShsYXN0UG9pbnRbaW5kZXhdKSA/IGxhc3RQb2ludFtpbmRleF1bMF0gOiBudWxsO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnBhbmVsLnZhbHVlTmFtZSA9PT0gJ25hbWUnKSB7XHJcbiAgICAgICAgZGF0YS52YWx1ZSA9IDA7XHJcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSAwO1xyXG4gICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSB0aGlzLnNlcmllc1swXS5hbGlhcztcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAoXy5pc1N0cmluZyhsYXN0VmFsdWVbMF0pKSB7XHJcbiAgICAgICAgZGF0YS52YWx1ZSA9IDA7XHJcbiAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IF8uZXNjYXBlKGxhc3RWYWx1ZVswXSk7XHJcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSAwO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGFuZWwudmFsdWVOYW1lID09PSAnbGFzdF90aW1lJykge1xyXG4gICAgICAgIGxldCBmb3JtYXRGdW5jID0ga2JuLnZhbHVlRm9ybWF0c1t0aGlzLnBhbmVsLmZvcm1hdF07XHJcbiAgICAgICAgZGF0YS52YWx1ZSA9IGxhc3RQb2ludFswXVsxXTtcclxuICAgICAgICBkYXRhLnZhbHVlUm91bmRlZCA9IGRhdGEudmFsdWU7XHJcbiAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdEZ1bmMoZGF0YS52YWx1ZSwgMCwgMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFuZWwubWF0aC5sZW5ndGgpe1xyXG4gICAgICAgICAgdmFyIG1hdGhGdW5jdGlvbiA9IHRoaXMucGFuZWwubWF0aDtcclxuICAgICAgICAgIHRoaXMuc2VyaWVzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIG1hdGhGdW5jdGlvbiA9IG1hdGhGdW5jdGlvbi5yZXBsYWNlKG5ldyBSZWdFeHAoZWxlbWVudC5hbGlhcywgJ2dpJyksIFN0cmluZyhlbGVtZW50LnN0YXRzW3RoaXMucGFuZWwudmFsdWVOYW1lXSkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBtYXRoRnVuY3Rpb24gPSBtYXRoRnVuY3Rpb24ucmVwbGFjZShuZXcgUmVnRXhwKCdbQS16YS16XSsnLCAnZ2knKSwgU3RyaW5nKDApKTtcclxuICAgICAgICAgICAgZGF0YS52YWx1ZSA9IG1hdGguZXZhbChtYXRoRnVuY3Rpb24pO1xyXG4gICAgICAgICAgICBkYXRhLmZsb3RwYWlycyA9IHRoaXMuc2VyaWVzWzBdLmZsb3RwYWlycztcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy9FcnJvciBldmFsdWF0aW5nIGZ1bmN0aW9uLiBEZWZhdWx0aW5nIHRvIHplcm8uXHJcbiAgICAgICAgICAgIGRhdGEudmFsdWUgPSAwO1xyXG4gICAgICAgICAgICBkYXRhLmZsb3RwYWlycyA9IFswLDBdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgZGF0YS52YWx1ZSA9IHRoaXMuc2VyaWVzWzBdLnN0YXRzW3RoaXMucGFuZWwudmFsdWVOYW1lXTtcclxuICAgICAgICAgIGRhdGEuZmxvdHBhaXJzID0gdGhpcy5zZXJpZXNbMF0uZmxvdHBhaXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRlY2ltYWxJbmZvID0gdGhpcy5nZXREZWNpbWFsc0ZvclZhbHVlKGRhdGEudmFsdWUpO1xyXG4gICAgICAgIGxldCBmb3JtYXRGdW5jID0ga2JuLnZhbHVlRm9ybWF0c1t0aGlzLnBhbmVsLmZvcm1hdF07XHJcbiAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdEZ1bmMoZGF0YS52YWx1ZSwgZGVjaW1hbEluZm8uZGVjaW1hbHMsIGRlY2ltYWxJbmZvLnNjYWxlZERlY2ltYWxzKTtcclxuICAgICAgICBkYXRhLnZhbHVlUm91bmRlZCA9IGtibi5yb3VuZFZhbHVlKGRhdGEudmFsdWUsIGRlY2ltYWxJbmZvLmRlY2ltYWxzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQWRkICRfX25hbWUgdmFyaWFibGUgZm9yIHVzaW5nIGluIHByZWZpeCBvciBwb3N0Zml4XHJcbiAgICAgIGlmKHRoaXMuc2VyaWVzICYmIHRoaXMuc2VyaWVzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIGRhdGEuc2NvcGVkVmFycyA9IF8uZXh0ZW5kKHt9LCB0aGlzLnBhbmVsLnNjb3BlZFZhcnMpO1xyXG4gICAgICAgIGRhdGEuc2NvcGVkVmFyc1snX19uYW1lJ10gPSB7IHZhbHVlOiB0aGlzLnNlcmllc1swXS5sYWJlbCB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNlcmllcyAmJiB0aGlzLnNlcmllcy5sZW5ndGggPiAwICYmIHRoaXMuc2VyaWVzLmxlbmd0aCA8IDIgJiYgIXRoaXMucGFuZWwubWF0aC5sZW5ndGgpIHtcclxuICAgICAgbGV0IGxhc3RQb2ludCA9IF8ubGFzdCh0aGlzLnNlcmllc1swXS5kYXRhcG9pbnRzKTtcclxuICAgICAgbGV0IGxhc3RWYWx1ZSA9IF8uaXNBcnJheShsYXN0UG9pbnQpID8gbGFzdFBvaW50WzBdIDogbnVsbDtcclxuXHJcbiAgICAgIGlmICh0aGlzLnBhbmVsLnZhbHVlTmFtZSA9PT0gJ25hbWUnKSB7XHJcbiAgICAgICAgZGF0YS52YWx1ZSA9IDA7XHJcbiAgICAgICAgZGF0YS52YWx1ZVJvdW5kZWQgPSAwO1xyXG4gICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSB0aGlzLnNlcmllc1swXS5hbGlhcztcclxuICAgICAgfSBlbHNlIGlmIChfLmlzU3RyaW5nKGxhc3RWYWx1ZSkpIHtcclxuICAgICAgICBkYXRhLnZhbHVlID0gMDtcclxuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gXy5lc2NhcGUobGFzdFZhbHVlKTtcclxuICAgICAgICBkYXRhLnZhbHVlUm91bmRlZCA9IDA7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wYW5lbC52YWx1ZU5hbWUgPT09ICdsYXN0X3RpbWUnKSB7XHJcbiAgICAgICAgbGV0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3RoaXMucGFuZWwuZm9ybWF0XTtcclxuICAgICAgICBkYXRhLnZhbHVlID0gbGFzdFBvaW50WzFdO1xyXG4gICAgICAgIGRhdGEudmFsdWVSb3VuZGVkID0gZGF0YS52YWx1ZTtcclxuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhkYXRhLnZhbHVlLCAwLCAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkYXRhLnZhbHVlID0gdGhpcy5zZXJpZXNbMF0uc3RhdHNbdGhpcy5wYW5lbC52YWx1ZU5hbWVdO1xyXG4gICAgICAgIGRhdGEuZmxvdHBhaXJzID0gdGhpcy5zZXJpZXNbMF0uZmxvdHBhaXJzO1xyXG5cclxuICAgICAgICBsZXQgZGVjaW1hbEluZm8gPSB0aGlzLmdldERlY2ltYWxzRm9yVmFsdWUoZGF0YS52YWx1ZSk7XHJcbiAgICAgICAgbGV0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3RoaXMucGFuZWwuZm9ybWF0XTtcclxuICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhkYXRhLnZhbHVlLCBkZWNpbWFsSW5mby5kZWNpbWFscywgZGVjaW1hbEluZm8uc2NhbGVkRGVjaW1hbHMpO1xyXG4gICAgICAgIGRhdGEudmFsdWVSb3VuZGVkID0ga2JuLnJvdW5kVmFsdWUoZGF0YS52YWx1ZSwgZGVjaW1hbEluZm8uZGVjaW1hbHMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBZGQgJF9fbmFtZSB2YXJpYWJsZSBmb3IgdXNpbmcgaW4gcHJlZml4IG9yIHBvc3RmaXhcclxuICAgICAgZGF0YS5zY29wZWRWYXJzID0gXy5leHRlbmQoe30sIHRoaXMucGFuZWwuc2NvcGVkVmFycyk7XHJcbiAgICAgIGRhdGEuc2NvcGVkVmFyc1snX19uYW1lJ10gPSB7IHZhbHVlOiB0aGlzLnNlcmllc1swXS5sYWJlbCB9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRWYWx1ZU1hcHBpbmcoZGF0YSk7XHJcbiAgfVxyXG5cclxuICBzZXRWYWx1ZU1hcHBpbmcoZGF0YSkge1xyXG4gICAgLy8gY2hlY2sgdmFsdWUgdG8gdGV4dCBtYXBwaW5ncyBpZiBpdHMgZW5hYmxlZFxyXG4gICAgaWYgKHRoaXMucGFuZWwubWFwcGluZ1R5cGUgPT09IDEpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhbmVsLnZhbHVlTWFwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBtYXAgPSB0aGlzLnBhbmVsLnZhbHVlTWFwc1tpXTtcclxuICAgICAgICAvLyBzcGVjaWFsIG51bGwgY2FzZVxyXG4gICAgICAgIGlmIChtYXAudmFsdWUgPT09ICdudWxsJykge1xyXG4gICAgICAgICAgaWYgKGRhdGEudmFsdWUgPT09IG51bGwgfHwgZGF0YS52YWx1ZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBtYXAudGV4dDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB2YWx1ZS9udW1iZXIgdG8gdGV4dCBtYXBwaW5nXHJcbiAgICAgICAgdmFyIHZhbHVlID0gcGFyc2VGbG9hdChtYXAudmFsdWUpO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gZGF0YS52YWx1ZVJvdW5kZWQpIHtcclxuICAgICAgICAgIGRhdGEudmFsdWVGb3JtYXR0ZWQgPSBtYXAudGV4dDtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5wYW5lbC5tYXBwaW5nVHlwZSA9PT0gMikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFuZWwucmFuZ2VNYXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IG1hcCA9IHRoaXMucGFuZWwucmFuZ2VNYXBzW2ldO1xyXG4gICAgICAgIC8vIHNwZWNpYWwgbnVsbCBjYXNlXHJcbiAgICAgICAgaWYgKG1hcC5mcm9tID09PSAnbnVsbCcgJiYgbWFwLnRvID09PSAnbnVsbCcpIHtcclxuICAgICAgICAgIGlmIChkYXRhLnZhbHVlID09PSBudWxsIHx8IGRhdGEudmFsdWUgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gbWFwLnRleHQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmFsdWUvbnVtYmVyIHRvIHJhbmdlIG1hcHBpbmdcclxuICAgICAgICB2YXIgZnJvbSA9IHBhcnNlRmxvYXQobWFwLmZyb20pO1xyXG4gICAgICAgIHZhciB0byA9IHBhcnNlRmxvYXQobWFwLnRvKTtcclxuICAgICAgICBpZiAodG8gPj0gZGF0YS52YWx1ZVJvdW5kZWQgJiYgZnJvbSA8PSBkYXRhLnZhbHVlUm91bmRlZCkge1xyXG4gICAgICAgICAgZGF0YS52YWx1ZUZvcm1hdHRlZCA9IG1hcC50ZXh0O1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRhLnZhbHVlID09PSBudWxsIHx8IGRhdGEudmFsdWUgPT09IHZvaWQgMCkge1xyXG4gICAgICBkYXRhLnZhbHVlRm9ybWF0dGVkID0gJ25vIHZhbHVlJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZVZhbHVlTWFwKG1hcCkge1xyXG4gICAgdmFyIGluZGV4ID0gXy5pbmRleE9mKHRoaXMucGFuZWwudmFsdWVNYXBzLCBtYXApO1xyXG4gICAgdGhpcy5wYW5lbC52YWx1ZU1hcHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBhZGRWYWx1ZU1hcCgpIHtcclxuICAgIHRoaXMucGFuZWwudmFsdWVNYXBzLnB1c2goeyB2YWx1ZTogJycsIG9wOiAnPScsIHRleHQ6ICcnIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlUmFuZ2VNYXAocmFuZ2VNYXApIHtcclxuICAgIHZhciBpbmRleCA9IF8uaW5kZXhPZih0aGlzLnBhbmVsLnJhbmdlTWFwcywgcmFuZ2VNYXApO1xyXG4gICAgdGhpcy5wYW5lbC5yYW5nZU1hcHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBhZGRSYW5nZU1hcCgpIHtcclxuICAgIHRoaXMucGFuZWwucmFuZ2VNYXBzLnB1c2goeyBmcm9tOiAnJywgdG86ICcnLCB0ZXh0OiAnJyB9KTtcclxuICB9XHJcblxyXG4gIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XHJcbiAgICB2YXIgJGxvY2F0aW9uID0gdGhpcy4kbG9jYXRpb247XHJcbiAgICB2YXIgbGlua1NydiA9IHRoaXMubGlua1NydjtcclxuICAgIHZhciAkdGltZW91dCA9IHRoaXMuJHRpbWVvdXQ7XHJcbiAgICB2YXIgcGFuZWwgPSBjdHJsLnBhbmVsO1xyXG4gICAgdmFyIHRlbXBsYXRlU3J2ID0gdGhpcy50ZW1wbGF0ZVNydjtcclxuICAgIHZhciBkYXRhLCBsaW5rSW5mbztcclxuICAgIC8vdmFyICRwYW5lbENvbnRhaW5lciA9IGVsZW0uZmluZCgnLnBhbmVsLWNvbnRhaW5lcicpO1xyXG4gICAgZWxlbSA9IGVsZW0uZmluZCgnLnNpbmdsZXN0YXRtYXRoLXBhbmVsJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UGFuZWxDb250YWluZXIoKSB7XHJcbiAgICAgIHJldHVybiBlbGVtLmNsb3Nlc3QoJy5wYW5lbC1jb250YWluZXInKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcHBseUNvbG9yaW5nVGhyZXNob2xkcyh2YWx1ZSwgdmFsdWVTdHJpbmcpIHtcclxuICAgICAgaWYgKCFwYW5lbC5jb2xvclZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlU3RyaW5nO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgY29sb3IgPSBnZXRDb2xvckZvclZhbHVlKHBhbmVsLnRocmVzaG9sZHMsIGRhdGEudmFsdWUpO1xyXG5cclxuICAgICAgaWYgKGRhdGEudmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbG9yID0gcGFuZWwudmFsdWVNYXBwaW5nQ29sb3JCYWNrZ3JvdW5kO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY29sb3IpIHtcclxuICAgICAgICByZXR1cm4gJzxzcGFuIHN0eWxlPVwiY29sb3I6JyArIGNvbG9yICsgJ1wiPicgKyB2YWx1ZVN0cmluZyArICc8L3NwYW4+JztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlU3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNwYW4oY2xhc3NOYW1lLCBmb250U2l6ZSwgdmFsdWUpIHtcclxuICAgICAgdmFsdWUgPSB0ZW1wbGF0ZVNydi5yZXBsYWNlKHZhbHVlLCBkYXRhLnNjb3BlZFZhcnMpO1xyXG4gICAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICdcIiBzdHlsZT1cImZvbnQtc2l6ZTonICsgZm9udFNpemUgKyAnXCI+JyArIHZhbHVlICsgJzwvc3Bhbj4nO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEJpZ1ZhbHVlSHRtbCgpIHtcclxuICAgICAgdmFyIGJvZHkgPSAnPGRpdiBjbGFzcz1cInNpbmdsZXN0YXRtYXRoLXBhbmVsLXZhbHVlLWNvbnRhaW5lclwiPic7XHJcblxyXG4gICAgICBpZiAocGFuZWwucHJlZml4KSB7XHJcbiAgICAgICAgdmFyIHByZWZpeCA9IGFwcGx5Q29sb3JpbmdUaHJlc2hvbGRzKGRhdGEudmFsdWUsIHBhbmVsLnByZWZpeCk7XHJcbiAgICAgICAgYm9keSArPSBnZXRTcGFuKCdzaW5nbGVzdGF0bWF0aC1wYW5lbC1wcmVmaXgnLCBwYW5lbC5wcmVmaXhGb250U2l6ZSwgcHJlZml4KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHZhbHVlID0gYXBwbHlDb2xvcmluZ1RocmVzaG9sZHMoZGF0YS52YWx1ZSwgZGF0YS52YWx1ZUZvcm1hdHRlZCk7XHJcbiAgICAgIGJvZHkgKz0gZ2V0U3Bhbignc2luZ2xlc3RhdG1hdGgtcGFuZWwtdmFsdWUnLCBwYW5lbC52YWx1ZUZvbnRTaXplLCB2YWx1ZSk7XHJcblxyXG4gICAgICBpZiAocGFuZWwucG9zdGZpeCkge1xyXG4gICAgICAgIHZhciBwb3N0Zml4ID0gYXBwbHlDb2xvcmluZ1RocmVzaG9sZHMoZGF0YS52YWx1ZSwgcGFuZWwucG9zdGZpeCk7XHJcbiAgICAgICAgYm9keSArPSBnZXRTcGFuKCdzaW5nbGVzdGF0bWF0aC1wYW5lbC1wb3N0Zml4JywgcGFuZWwucG9zdGZpeEZvbnRTaXplLCBwb3N0Zml4KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYm9keSArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgIHJldHVybiBib2R5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFZhbHVlVGV4dCgpIHtcclxuICAgICAgdmFyIHJlc3VsdCA9IHBhbmVsLnByZWZpeCA/IHRlbXBsYXRlU3J2LnJlcGxhY2UocGFuZWwucHJlZml4LCBkYXRhLnNjb3BlZFZhcnMpIDogJyc7XHJcbiAgICAgIHJlc3VsdCArPSBkYXRhLnZhbHVlRm9ybWF0dGVkO1xyXG4gICAgICByZXN1bHQgKz0gcGFuZWwucG9zdGZpeCA/IHRlbXBsYXRlU3J2LnJlcGxhY2UocGFuZWwucG9zdGZpeCwgZGF0YS5zY29wZWRWYXJzKSA6ICcnO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRHYXVnZSgpIHtcclxuICAgICAgdmFyIHdpZHRoID0gZWxlbS53aWR0aCgpO1xyXG4gICAgICB2YXIgaGVpZ2h0ID0gZWxlbS5oZWlnaHQoKTtcclxuICAgICAgLy8gQWxsb3cgdG8gdXNlIGEgYml0IG1vcmUgc3BhY2UgZm9yIHdpZGUgZ2F1Z2VzXHJcbiAgICAgIHZhciBkaW1lbnNpb24gPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0ICogMS4zKTtcclxuXHJcbiAgICAgIGN0cmwuaW52YWxpZEdhdWdlUmFuZ2UgPSBmYWxzZTtcclxuICAgICAgaWYgKHBhbmVsLmdhdWdlLm1pblZhbHVlID4gcGFuZWwuZ2F1Z2UubWF4VmFsdWUpIHtcclxuICAgICAgICBjdHJsLmludmFsaWRHYXVnZVJhbmdlID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBwbG90Q2FudmFzID0gJCgnPGRpdj48L2Rpdj4nKTtcclxuICAgICAgdmFyIHBsb3RDc3MgPSB7XHJcbiAgICAgICAgdG9wOiAnMTBweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnYXV0bycsXHJcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKiAwLjkgKyAncHgnLFxyXG4gICAgICAgIHdpZHRoOiBkaW1lbnNpb24gKyAncHgnLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcGxvdENhbnZhcy5jc3MocGxvdENzcyk7XHJcblxyXG4gICAgICB2YXIgdGhyZXNob2xkcyA9IFtdO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhbmVsLnRocmVzaG9sZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aHJlc2hvbGRzLnB1c2goe1xyXG4gICAgICAgICAgdmFsdWU6IHBhbmVsLnRocmVzaG9sZHNbaV0udmFsdWUsXHJcbiAgICAgICAgICBjb2xvcjogcGFuZWwudGhyZXNob2xkc1tpXS5jb2xvcixcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICB0aHJlc2hvbGRzLnB1c2goe1xyXG4gICAgICAgIHZhbHVlOiBwYW5lbC5nYXVnZS5tYXhWYWx1ZSxcclxuICAgICAgICBjb2xvcjogcGFuZWwudGhyZXNob2xkc1twYW5lbC50aHJlc2hvbGRzLmxlbmd0aCAtIDFdLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHZhciBiZ0NvbG9yID0gY29uZmlnLmJvb3REYXRhLnVzZXIubGlnaHRUaGVtZSA/ICdyZ2IoMjMwLDIzMCwyMzApJyA6ICdyZ2IoMzgsMzgsMzgpJztcclxuXHJcbiAgICAgIHZhciBmb250U2NhbGUgPSBwYXJzZUludChwYW5lbC52YWx1ZUZvbnRTaXplKSAvIDEwMDtcclxuICAgICAgdmFyIGZvbnRTaXplID0gTWF0aC5taW4oZGltZW5zaW9uIC8gNSwgMTAwKSAqIGZvbnRTY2FsZTtcclxuICAgICAgLy8gUmVkdWNlIGdhdWdlIHdpZHRoIGlmIHRocmVzaG9sZCBsYWJlbHMgZW5hYmxlZFxyXG4gICAgICB2YXIgZ2F1Z2VXaWR0aFJlZHVjZVJhdGlvID0gcGFuZWwuZ2F1Z2UudGhyZXNob2xkTGFiZWxzID8gMS41IDogMTtcclxuICAgICAgdmFyIGdhdWdlV2lkdGggPSBNYXRoLm1pbihkaW1lbnNpb24gLyA2LCA2MCkgLyBnYXVnZVdpZHRoUmVkdWNlUmF0aW87XHJcbiAgICAgIHZhciB0aHJlc2hvbGRNYXJrZXJzV2lkdGggPSBnYXVnZVdpZHRoIC8gNTtcclxuICAgICAgdmFyIHRocmVzaG9sZExhYmVsRm9udFNpemUgPSBmb250U2l6ZSAvIDIuNTtcclxuXHJcbiAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgIHNlcmllczoge1xyXG4gICAgICAgICAgZ2F1Z2VzOiB7XHJcbiAgICAgICAgICAgIGdhdWdlOiB7XHJcbiAgICAgICAgICAgICAgbWluOiBwYW5lbC5nYXVnZS5taW5WYWx1ZSxcclxuICAgICAgICAgICAgICBtYXg6IHBhbmVsLmdhdWdlLm1heFZhbHVlLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHsgY29sb3I6IGJnQ29sb3IgfSxcclxuICAgICAgICAgICAgICBib3JkZXI6IHsgY29sb3I6IG51bGwgfSxcclxuICAgICAgICAgICAgICBzaGFkb3c6IHsgc2hvdzogZmFsc2UgfSxcclxuICAgICAgICAgICAgICB3aWR0aDogZ2F1Z2VXaWR0aCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnJhbWU6IHsgc2hvdzogZmFsc2UgfSxcclxuICAgICAgICAgICAgbGFiZWw6IHsgc2hvdzogZmFsc2UgfSxcclxuICAgICAgICAgICAgbGF5b3V0OiB7IG1hcmdpbjogMCwgdGhyZXNob2xkV2lkdGg6IDAgfSxcclxuICAgICAgICAgICAgY2VsbDogeyBib3JkZXI6IHsgd2lkdGg6IDAgfSB9LFxyXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZXM6IHRocmVzaG9sZHMsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IHBhbmVsLmdhdWdlLnRocmVzaG9sZExhYmVscyxcclxuICAgICAgICAgICAgICAgIG1hcmdpbjogdGhyZXNob2xkTWFya2Vyc1dpZHRoICsgMSxcclxuICAgICAgICAgICAgICAgIGZvbnQ6IHsgc2l6ZTogdGhyZXNob2xkTGFiZWxGb250U2l6ZSB9LFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgc2hvdzogcGFuZWwuZ2F1Z2UudGhyZXNob2xkTWFya2VycyxcclxuICAgICAgICAgICAgICB3aWR0aDogdGhyZXNob2xkTWFya2Vyc1dpZHRoLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgIGNvbG9yOiBwYW5lbC5jb2xvclZhbHVlID8gZ2V0Q29sb3JGb3JWYWx1ZShwYW5lbC50aHJlc2hvbGRzLCBkYXRhLnZhbHVlUm91bmRlZCkgOiBudWxsLFxyXG4gICAgICAgICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VmFsdWVUZXh0KCk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBmb250OiB7XHJcbiAgICAgICAgICAgICAgICBzaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgICAgIGZhbWlseTogJ1wiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZicsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGVsZW0uYXBwZW5kKHBsb3RDYW52YXMpO1xyXG5cclxuICAgICAgdmFyIHBsb3RTZXJpZXMgPSB7XHJcbiAgICAgICAgZGF0YTogW1swLCBkYXRhLnZhbHVlUm91bmRlZF1dLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgJC5wbG90KHBsb3RDYW52YXMsIFtwbG90U2VyaWVzXSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU3BhcmtsaW5lKCkge1xyXG4gICAgICB2YXIgd2lkdGggPSBlbGVtLndpZHRoKCkgKyAyMDtcclxuICAgICAgaWYgKHdpZHRoIDwgMzApIHtcclxuICAgICAgICAvLyBlbGVtZW50IGhhcyBub3QgZ290dGVuIGl0J3Mgd2lkdGggeWV0XHJcbiAgICAgICAgLy8gZGVsYXkgc3BhcmtsaW5lIHJlbmRlclxyXG4gICAgICAgIHNldFRpbWVvdXQoYWRkU3BhcmtsaW5lLCAzMCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgaGVpZ2h0ID0gY3RybC5oZWlnaHQ7XHJcbiAgICAgIHZhciBwbG90Q2FudmFzID0gJCgnPGRpdj48L2Rpdj4nKTtcclxuICAgICAgdmFyIHBsb3RDc3M6IGFueSA9IHt9O1xyXG4gICAgICBwbG90Q3NzLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHJcbiAgICAgIGlmIChwYW5lbC5zcGFya2xpbmUuZnVsbCkge1xyXG4gICAgICAgIHBsb3RDc3MuYm90dG9tID0gJzVweCc7XHJcbiAgICAgICAgcGxvdENzcy5sZWZ0ID0gJy01cHgnO1xyXG4gICAgICAgIHBsb3RDc3Mud2lkdGggPSB3aWR0aCAtIDEwICsgJ3B4JztcclxuICAgICAgICB2YXIgZHluYW1pY0hlaWdodE1hcmdpbiA9IGhlaWdodCA8PSAxMDAgPyA1IDogTWF0aC5yb3VuZChoZWlnaHQgLyAxMDApICogMTUgKyA1O1xyXG4gICAgICAgIHBsb3RDc3MuaGVpZ2h0ID0gaGVpZ2h0IC0gZHluYW1pY0hlaWdodE1hcmdpbiArICdweCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGxvdENzcy5ib3R0b20gPSAnMHB4JztcclxuICAgICAgICBwbG90Q3NzLmxlZnQgPSAnLTVweCc7XHJcbiAgICAgICAgcGxvdENzcy53aWR0aCA9IHdpZHRoIC0gMTAgKyAncHgnO1xyXG4gICAgICAgIHBsb3RDc3MuaGVpZ2h0ID0gTWF0aC5mbG9vcihoZWlnaHQgKiAwLjI1KSArICdweCc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBsb3RDYW52YXMuY3NzKHBsb3RDc3MpO1xyXG5cclxuICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXHJcbiAgICAgICAgc2VyaWVzOiB7XHJcbiAgICAgICAgICBsaW5lczoge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICBmaWxsOiAxLFxyXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDEsXHJcbiAgICAgICAgICAgIGZpbGxDb2xvcjogcGFuZWwuc3BhcmtsaW5lLmZpbGxDb2xvcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB5YXhlczogeyBzaG93OiBmYWxzZSB9LFxyXG4gICAgICAgIHhheGlzOiB7XHJcbiAgICAgICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgICAgIG1vZGU6ICd0aW1lJyxcclxuICAgICAgICAgIG1pbjogY3RybC5yYW5nZS5mcm9tLnZhbHVlT2YoKSxcclxuICAgICAgICAgIG1heDogY3RybC5yYW5nZS50by52YWx1ZU9mKCksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBncmlkOiB7IGhvdmVyYWJsZTogZmFsc2UsIHNob3c6IGZhbHNlIH0sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBlbGVtLmFwcGVuZChwbG90Q2FudmFzKTtcclxuXHJcbiAgICAgIHZhciBwbG90U2VyaWVzID0ge1xyXG4gICAgICAgIGRhdGE6IGRhdGEuZmxvdHBhaXJzLFxyXG4gICAgICAgIGNvbG9yOiBwYW5lbC5zcGFya2xpbmUubGluZUNvbG9yLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgJC5wbG90KHBsb3RDYW52YXMsIFtwbG90U2VyaWVzXSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgICBpZiAoIWN0cmwuZGF0YSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBkYXRhID0gY3RybC5kYXRhO1xyXG4gICAgICB2YXIgYm9keSA9IHBhbmVsLmdhdWdlLnNob3cgPyAnJyA6IGdldEJpZ1ZhbHVlSHRtbCgpO1xyXG4gICAgICB2YXIgY29sb3IgPSAnJztcclxuICAgICAgaWYgKHBhbmVsLmNvbG9yQmFja2dyb3VuZCkge1xyXG4gICAgICAgIGlmIChkYXRhLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgIGNvbG9yID0gcGFuZWwudmFsdWVNYXBwaW5nQ29sb3JCYWNrZ3JvdW5kOyAvL251bGwgb3IgZ3JleSB2YWx1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb2xvciA9IGdldENvbG9yRm9yVmFsdWUocGFuZWwudGhyZXNob2xkcywgZGF0YS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2xvcikge1xyXG4gICAgICAgICAgZ2V0UGFuZWxDb250YWluZXIoKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XHJcbiAgICAgICAgICBpZiAoc2NvcGUuZnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICBlbGVtLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbG9yKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW0uY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBnZXRQYW5lbENvbnRhaW5lcigpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcnKTtcclxuICAgICAgICBlbGVtLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcnKTtcclxuICAgICAgICBwYW5lbC5jaXJjbGVCYWNrZ3JvdW5kID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgLy8gQ29udmVydCB0byBDaXJjbGVcclxuICAgICAgaWYgKHBhbmVsLmNpcmNsZUJhY2tncm91bmQpIHtcclxuICAgICAgICBsZXQgY2lyY2xlSGVpZ2h0ID0gZ2V0UGFuZWxDb250YWluZXIoKS5oZWlnaHQoKSAtIDQwO1xyXG4gICAgICAgIGxldCBjaXJjbGVXaWR0aCA9IGdldFBhbmVsQ29udGFpbmVyKCkud2lkdGgoKSAtIDMwO1xyXG5cclxuICAgICAgICAkKGdldFBhbmVsQ29udGFpbmVyKCkpLmFkZENsYXNzKCdjaXJjbGUnKTtcclxuICAgICAgICBnZXRQYW5lbENvbnRhaW5lcigpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcnKTtcclxuXHJcbiAgICAgICAgaWYgKGNpcmNsZVdpZHRoID49IGNpcmNsZUhlaWdodCkge1xyXG4gICAgICAgICAgZWxlbS5jc3Moe1xyXG4gICAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6IDUwICsgJyUnLFxyXG4gICAgICAgICAgICAnd2lkdGgnOiBjaXJjbGVIZWlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAnaGVpZ2h0JzogY2lyY2xlSGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBjb2xvclxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGVsZW0uY3NzKHtcclxuICAgICAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiA1MCArICclJyxcclxuICAgICAgICAgICAgJ3dpZHRoJzogY2lyY2xlV2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICAnaGVpZ2h0JzogY2lyY2xlV2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChnZXRQYW5lbENvbnRhaW5lcigpLnJlbW92ZUNsYXNzKCdjaXJjbGUnKSk7XHJcbiAgICAgICAgZWxlbS5jc3MoeyAnYm9yZGVyLXJhZGl1cyc6ICcwJywgd2lkdGg6ICcnLCBoZWlnaHQ6ICcnIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbGVtLmh0bWwoYm9keSk7XHJcblxyXG4gICAgICBpZiAocGFuZWwuc3BhcmtsaW5lLnNob3cpIHtcclxuICAgICAgICBhZGRTcGFya2xpbmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhbmVsLmdhdWdlLnNob3cpIHtcclxuICAgICAgICBhZGRHYXVnZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbGVtLnRvZ2dsZUNsYXNzKCdwb2ludGVyJywgcGFuZWwubGlua3MubGVuZ3RoID4gMCk7XHJcblxyXG4gICAgICBpZiAocGFuZWwubGlua3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGxpbmtJbmZvID0gbGlua1Nydi5nZXRQYW5lbExpbmtBbmNob3JJbmZvKHBhbmVsLmxpbmtzWzBdLCBkYXRhLnNjb3BlZFZhcnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxpbmtJbmZvID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhvb2t1cERyaWxsZG93bkxpbmtUb29sdGlwKCkge1xyXG4gICAgICAvLyBkcmlsbGRvd24gbGluayB0b29sdGlwXHJcblxyXG4gICAgICBpZiAoY3RybC5wYW5lbC5kZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHZhciBkcmlsbGRvd25Ub29sdGlwID0gJCgnPGRpdiBpZD1cInRvb2x0aXBcIiBjbGFzcz1cIlwiIHN0eWxlPVwiYmFja2dyb3VuZDp3aGl0ZTttYXJnaW46YXV0bztjb2xvcjpibGFjazt3aWR0aDoyMDBweDtib3gtc2hhZG93OiAwIDNweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpO1wiPjxoNiBzdHlsZT1cImNvbG9yOmJsYWNrO1wiPicgXHJcbiAgICAgICsgY3RybC5wYW5lbC50aXRsZSArICc8L2g2PicgKyBjdHJsLnBhbmVsLmRlc2NyaXB0aW9uICsgJzwvZGl2PlwiJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGRyaWxsZG93blRvb2x0aXAgPSAkKCc8ZGl2IGlkPVwidG9vbHRpcFwiIGNsYXNzPVwiXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOndoaXRlO21hcmdpbjphdXRvO2NvbG9yOmJsYWNrO3dpZHRoOjIwMHB4O2JveC1zaGFkb3c6IDAgM3B4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XCI+PGg2IHN0eWxlPVwiY29sb3I6YmxhY2s7XCI+JyBcclxuICAgICAgKyBjdHJsLnBhbmVsLnRpdGxlICsgJzwvaDY+Tm8gRGVzY3JpcHRpb248L2Rpdj5cIicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbGVtLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBkcmlsbGRvd25Ub29sdGlwLmRldGFjaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGVsZW0uY2xpY2soZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICAgICAgaWYgKCFsaW5rSW5mbykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZ25vcmUgdGl0bGUgY2xpY2tzIGluIHRpdGxlXHJcbiAgICAgICAgaWYgKCQoZXZ0KS5wYXJlbnRzKCcucGFuZWwtaGVhZGVyJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxpbmtJbmZvLnRhcmdldCA9PT0gJ19ibGFuaycpIHtcclxuICAgICAgICAgIHdpbmRvdy5vcGVuKGxpbmtJbmZvLmhyZWYsICdfYmxhbmsnKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsaW5rSW5mby5ocmVmLmluZGV4T2YoJ2h0dHAnKSA9PT0gMCkge1xyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rSW5mby5ocmVmO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnVybChsaW5rSW5mby5ocmVmKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJpbGxkb3duVG9vbHRpcC5kZXRhY2goKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBlbGVtLm1vdXNlbW92ZShmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCFjdHJsLnBhbmVsLnRvb2x0aXAuc2hvdykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9kcmlsbGRvd25Ub29sdGlwLnRleHQoZGF0YS52YWx1ZUZvcm1hdHRlZCk7XHJcbiAgICAgICAgLy9kcmlsbGRvd25Ub29sdGlwLnRleHQoJ2NsaWNrIHRvIGdvIHRvOiAnICsgbGlua0luZm8udGl0bGUpO1xyXG4gICAgICAgIC8vZHJpbGxkb3duVG9vbHRpcC50ZXh0KGN0cmwucGFuZWwuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGRyaWxsZG93blRvb2x0aXAucGxhY2VfdHQoZS5wYWdlWCwgZS5wYWdlWSAtIDUwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaG9va3VwRHJpbGxkb3duTGlua1Rvb2x0aXAoKTtcclxuICAgIC8qXHJcbiAgICB0aGlzLmV2ZW50cy5vbigncmVuZGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJlbmRlcigpO1xyXG4gICAgICBjdHJsLnJlbmRlcmluZ0NvbXBsZXRlZCgpO1xyXG4gICAgfSk7XHJcbiAgICAqL1xyXG4gICAgdGhpcy5ldmVudHMub24oUGFuZWxFdmVudHMucmVuZGVyLCBmdW5jdGlvbigpIHtcclxuICAgICAgcmVuZGVyKCk7XHJcbiAgICAgIGN0cmwucmVuZGVyaW5nQ29tcGxldGVkKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvbG9yRm9yVmFsdWUodGhyZXNob2xkcywgdmFsdWUpIHtcclxuICBsZXQgY29sb3IgPSAnJztcclxuICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBjb2xvcjtcclxuICB9XHJcbiAgZm9yIChsZXQgaSA9IHRocmVzaG9sZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGxldCBhVGhyZXNob2xkID0gdGhyZXNob2xkc1tpXTtcclxuICAgIGNvbG9yID0gYVRocmVzaG9sZC5jb2xvcjtcclxuICAgICAgaWYgKHZhbHVlID49IGFUaHJlc2hvbGQudmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gYVRocmVzaG9sZC5jb2xvcjtcclxuICAgICAgfVxyXG4gIH1cclxuICByZXR1cm4gY29sb3I7XHJcbn1cclxuXHJcbmV4cG9ydCB7U2luZ2xlU3RhdE1hdGhDdHJsLCBTaW5nbGVTdGF0TWF0aEN0cmwgYXMgUGFuZWxDdHJsLCBnZXRDb2xvckZvclZhbHVlfVxyXG4vLyBleHBvcnQgeyBTaW5nbGVTdGF0Q3RybCwgU2luZ2xlU3RhdEN0cmwgYXMgUGFuZWxDdHJsLCBnZXRDb2xvckZvclZhbHVlIH07XHJcbiJdfQ==