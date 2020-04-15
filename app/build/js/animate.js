

(function (){

    const supportedCssTransformProperties = ['rotate', 'scale'];

    function getPairOfKeysScenarioByNumber(numberOfScenario) {
        var previousNumberOfScenario = numberOfScenario - 1;
        if (previousNumberOfScenario < 0) {
            previousNumberOfScenario = numberOfScenario;
        }
        return { previous: previousNumberOfScenario, current: numberOfScenario };
    }


    function Animate (config) {

        this.cssProps = {};

        this.DR = {
            target: null,
            targetImg: null,
        };

        this.basePoint = config.basePoint;
        this.scenarios = config.scenarios;
        this.cssApplyMap = config.cssApplyMap;
        this.availableCssProperties = Object.keys(config.scenarios[0].css);

        this.cb = {
            onInit: (config.callbacks && config.callbacks.onInit) || function() {}
        };

    }


    Animate.prototype.init = function() {


        var that = this;

        console.log("TCL: Animate.prototype.init -> this", this)

        that.updateState();

        $(window).scroll(function() {
            that.updateState();
        });


        this.cb.onInit();
    };


    Animate.prototype.updateState = function() {
        var scroll = $(window).scrollTop();

        var that = this;
        var relatedBasePoint = that.getRelatedBasePoint(scroll);

        that.scenarios.forEach(function(config, index) {
            var currentConfig = config;
            var nextConfigIndex = index + 1;
            var nextConfig = that.scenarios[nextConfigIndex];

            if ((currentConfig && relatedBasePoint >= currentConfig.breakpoint) && (nextConfig && relatedBasePoint < nextConfig.breakpoint)) {
                that.executeScenario(nextConfigIndex, relatedBasePoint);
            }
        });

    }

    Animate.prototype.applyScenarioSingleProperty = function(numberOfScenario, propertyName, relatedBasePoint) {

        var keys = getPairOfKeysScenarioByNumber(numberOfScenario);

        var relatedBasePointRange = this.scenarios[keys.current].breakpoint - this.scenarios[keys.previous].breakpoint;
        var localRelatedBasePoint = relatedBasePoint - this.scenarios[keys.previous].breakpoint;

        var previousValue = this.scenarios[keys.previous].css[propertyName];
        var desiredPoint = this.scenarios[keys.current].css[propertyName];
        var modifiedRangeValue = previousValue - desiredPoint;

        var delta = relatedBasePointRange ? (modifiedRangeValue / relatedBasePointRange) : 0;
        this.cssProps[propertyName] = previousValue - localRelatedBasePoint * delta;
    }

    Animate.prototype.executeScenario = function(numberOfScenario, relatedBasePoint) {
        var that = this;
        this.availableCssProperties.forEach(function(cssProperty) {
            that.applyScenarioSingleProperty(numberOfScenario, cssProperty, relatedBasePoint);
        });
        this.refreshStyles();
    };

    Animate.prototype.getRelatedBasePoint = function(scroll) {
        var basePointTargetOffset = this.basePoint.target.offset().top;

        var scrollPercent = scroll * 100 / basePointTargetOffset;

        var result = scrollPercent;

        var debugData = {
            scroll,
            scrollPercent,
            basePointTargetOffset,
        };
        console.log(`========= debugData: ======> `, JSON.stringify(debugData));

        return result;
    }


    Animate.prototype.refreshStyles = function() {
        if (this.cssProps.bgR !== undefined) {
            this.cssHandlerBg();
        }
        if (this.cssProps.top !== undefined) {
            this.cssHandlerTop();
        }
        if (this.cssProps.topPX !== undefined) {
            this.cssHandlerTopPX();
        }
        if (this.cssProps.left !== undefined) {
            this.cssHandlerLeft();
        }
        if (this.cssProps.marginLeft !== undefined) {
            this.cssHandlerMarginLeft();
        }
        if (this.cssProps.marginTop !== undefined) {
            this.cssHandlerMarginTop();
        }
        if (this.cssProps.opacity !== undefined) {
            this.cssHandlerOpacity();
        }
        if (this.cssProps.heightPercent !== undefined) {
            this.cssHandlerHeightPercent();
        }
        if (this.cssProps.rotate !== undefined || this.cssProps.scale !== undefined) {
            this.cssHandlerTransform();
        }
    };


    Animate.prototype.cssHandlerBg = function() {
        var target = this.cssApplyMap['bg'];
        target.css({'background-color': 'rgb(' + this.cssProps.bgR + ',' + this.cssProps.bgG + ',' + this.cssProps.bgB + ')'});
    };
    Animate.prototype.cssHandlerTop = function() {
        var target = this.cssApplyMap['top'];
        target.css({'top': this.cssProps.top + 'vh'});
    };

    Animate.prototype.cssHandlerTopPX = function() {
        var target = this.cssApplyMap['topPX'];
        target.css({'top': this.cssProps.topPX + 'px'});
    };


    Animate.prototype.cssHandlerHeightPercent = function() {
        var target = this.cssApplyMap['heightPercent'];
        target.css({'height': this.cssProps.heightPercent + '%'});
    };

    Animate.prototype.cssHandlerLeft = function() {
        var target = this.cssApplyMap['left'];
        target.css({'left': this.cssProps.left + 'vw'});
    };
    Animate.prototype.cssHandlerMarginLeft = function() {
        var target = this.cssApplyMap['marginLeft'];
        target.css({'margin-left': this.cssProps.marginLeft + 'px'});
    };
    Animate.prototype.cssHandlerMarginTop = function() {
        var target = this.cssApplyMap['marginTop'];
        target.css({'margin-top': this.cssProps.marginTop + 'px'});
    };

    Animate.prototype.cssHandlerOpacity = function() {
        var target = this.cssApplyMap['opacity'];
        target.css({'opacity': this.cssProps.opacity});
    };

    Animate.prototype.cssHandlerBottom = function() {
        var target = this.cssApplyMap['bottom'];
        target.css({'bottom': this.cssProps.bottom + 'vw'});
    };

    Animate.prototype.cssHandlerTransform = function() {
        var target = this.cssApplyMap['transform'];
        var that = this;
        var transform = supportedCssTransformProperties
            .filter(function(supportedCssTransformProperty) {
                return that.cssProps[supportedCssTransformProperty] !== undefined;
            })
            .map(function(cssTransformProperty) {
                switch (cssTransformProperty) {
                    case 'rotate':
                        return 'rotate(' + that.cssProps[cssTransformProperty] + 'deg)';
                    case 'scale':
                        return 'scale(' + that.cssProps[cssTransformProperty] + ')';
                    default:
                        break;
                }
            })
            .join(' ');

        target.css({'transform': transform});
    };

    window.Animate = Animate;

})();
