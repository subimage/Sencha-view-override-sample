Ext.define('Ext.event.recognizer.LongPress', {
    extend: 'Ext.event.recognizer.SingleTouch',

    inheritableStatics: {
        DURATION_NOT_ENOUGH: 0x20
    },

    config: {
        minDuration: 1000
    },

    handledEvents: ['longpress'],

    fireLongPress: function(e) {
        var touch = e.changedTouches[0];

        this.fire('longpress', e, [touch], {
            touch: touch,
            duration: this.getMinDuration()
        });

        this.isLongPress = true;
    },

    onTouchStart: function(e) {
        var me = this;

        if (this.callParent(arguments) === false) {
            return false;
        }

        this.isLongPress = false;

        this.timer = setTimeout(function() {
            me.fireLongPress(e);
        }, this.getMinDuration());
    },

    onTouchMove: function() {
        return this.fail(this.self.TOUCH_MOVED);
    },

    onTouchEnd: function() {
        if (!this.isLongPress) {
            return this.fail(this.self.DURATION_NOT_ENOUGH);
        }
    },

    fail: function() {
        clearTimeout(this.timer);

        return this.callParent(arguments);
    }

}, function() {
    //<deprecated product=touch since=2.0>
    this.override({
        handledEvents: ['longpress', 'taphold'],

        fire: function(eventName) {
            if (eventName === 'longpress') {
                var args = Array.prototype.slice.call(arguments);
                args[0] = 'taphold';

                this.fire.apply(this, args);
            }

            return this.callOverridden(arguments);
        }
    });
    //</deprecated>
});
