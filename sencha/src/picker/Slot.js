/**
 * @private
 *
 * A general {@link Ext.picker.Picker} slot class.  Slots are used to organize multiple scrollable slots into 
 * a single {@link Ext.picker.Picker}.
 *
 *     {
 *         name : 'limit_speed',
 *         title: 'Speed Limit',
 *         data : [
 *             {text: '50 KB/s', value: 50},
 *             {text: '100 KB/s', value: 100},
 *             {text: '200 KB/s', value: 200},
 *             {text: '300 KB/s', value: 300}
 *         ]
 *     }
 *
 * See the {@link Ext.picker.Picker} documentation on how to use slots.
 */
Ext.define('Ext.picker.Slot', {
    extend: 'Ext.DataView',
    xtype : 'pickerslot',
    alternateClassName: 'Ext.Picker.Slot',
    requires: [
        'Ext.XTemplate',
        'Ext.data.Store',
        'Ext.Component',
        'Ext.data.StoreManager'
    ],

    isSlot: true,

    config: {
        /**
         * @cfg {String} title
         * The title to use for this slot. Null for no title
         * @accessor
         */
        title: null,

        /**
         * @private
         * @cfg {Boolean} showTitle
         * @accessor
         */
        showTitle: true,

        /**
         * @private
         * @cfg {String} cls
         * The main component class
         * @accessor
         */
        cls: Ext.baseCSSPrefix + 'picker-slot',

        /**
         * @cfg {String} name
         * The name of this slot. This config option is required.
         * @accessor
         */
        name: null,

        /**
         * @cfg {Number} value The value of this slot
         * @accessor
         */
        value: null,

        /**
         * @hide
         * @cfg {Number} flex
         * @accessor
         */
        flex: 1,

        /**
         * @cfg {String} align
         * @accessor
         */
        align: 'left',

        /**
         * @hide
         * @cfg {String} itemSelector
         * @accessor
         */
        itemSelector: 'div.' + Ext.baseCSSPrefix + 'picker-item',

        /**
         * @cfg {String} displayField
         * The display field in the store.
         * Defaults to 'text'.
         * @accessor
         */
        displayField: 'text',

        /**
         * @cfg {String} valueField
         * The value field in the store.
         * Defaults to 'value'.
         * @accessor
         */
        valueField: 'value',

        /**
         * @hide
         * @cfg {Object} scrollable
         * @accessor
         */
        scrollable: {
            direction : 'vertical',
            indicators: false
        }
    },

    /**
     * @private
     * The current selectedIndex of the picker slot
     */
    selectedIndex: 0,

    /**
     * Sets the title for this dataview by creating element
     */
    applyTitle: function(title) {
        //check if the title isnt defined
        if (title) {
            //create a new title element
            title = Ext.create('Ext.Component', {
                cls: Ext.baseCSSPrefix + 'picker-slot-title',
                docked      : 'top',
                html        : title
            });
        }

        return title;
    },

    updateTitle: function(newTitle, oldTitle) {
        if (newTitle) {
            this.add(newTitle);
            this.setupBar();
        }

        if (oldTitle) {
            this.remove(oldTitle);
        }
    },

    updateShowTitle: function(showTitle) {
        var title = this.getTitle();
        if (title) {
            title[showTitle ? 'show' : 'hide']();

            this.setupBar();
        }
    },

    updateDisplayField: function(newDisplayField) {
        this.setItemTpl('<div class="' + Ext.baseCSSPrefix + 'picker-item {cls} <tpl if="extra">' + Ext.baseCSSPrefix + 'picker-invalid</tpl>">{' + newDisplayField + '}</div>');
    },

    /**
     * Updates the {@link #align} configuration
     */
    updateAlign: function(newAlign, oldAlign) {
        var element = this.element;
        element.addCls(Ext.baseCSSPrefix + 'picker-' + newAlign);
        element.removeCls(Ext.baseCSSPrefix + 'picker-' + oldAlign);
    },

    /**
     * Looks at the {@link #data} configuration and turns it into {@link #store}
     */
    applyData: function(data) {
        var parsedData = [],
            ln = data && data.length,
            i, item, obj;

        if (data && Ext.isArray(data) && ln) {
            for (i = 0; i < ln; i++) {
                item = data[i];
                obj = {};
                if (Ext.isArray(item)) {
                    obj[this.valueField] = item[0];
                    obj[this.displayField] = item[1];
                }
                else if (Ext.isString(item)) {
                    obj[this.valueField] = item;
                    obj[this.displayField] = item;
                }
                else if (Ext.isObject(item)) {
                    obj = item;
                }
                parsedData.push(obj);
            }
        }

        return data;
    },

    updateData: function(data) {
        this.setStore(Ext.create('Ext.data.Store', {
            model: 'x-textvalue',
            data : data
        }));
    },

    // @private
    initialize: function() {
        var me = this,
            scroller = this.getScrollable().getScroller();

        me.callParent(arguments);

        me.on({
            scope: this,
            painted: 'onPainted'
        });

        scroller.on({
            scope: this,

            scrollend: 'onScrollEnd'
        });
    },

    // @private
    onPainted: function() {
        this.setupBar();
    },

    // @private
    setupBar: function() {
        if (!this.rendered) {
            //if the component isnt rendered yet, there is no point in calculating the padding just eyt
            return;
        }

        var element = this.element,
            innerElement = this.innerElement,
            picker = this.picker,
            bar = picker.bar,
            value = this.getValue(),
            showTitle = this.getShowTitle(),
            title = this.getTitle(),
            scrollable = this.getScrollable(),
            scroller = scrollable.getScroller(),
            barY, elY, barHeight, padding, titleHeight, paddingBottom;

        barY = bar.getY();
        elY = element.getY();

        if (showTitle && title) {
            elY += title.element.getHeight();
        }

        padding = paddingBottom = Math.abs(elY - barY);
        this.slotPadding = padding;

        if (showTitle && title) {
            titleHeight = title.element.getHeight();
            paddingBottom += titleHeight;
        }

        innerElement.setStyle({
            padding: padding + 'px 0 ' + paddingBottom + 'px'
        });

        barHeight = bar.getHeight();
        scroller.refresh();
        scroller.setSnap(barHeight);

        this.setValue(value);
    },

    // @private
    doItemTap: function(list, index, item, e) {
        this.selectedIndex = index;
        this.selectedNode = item;
        this.scrollToItem(item, true);

        this.fireAction('slotpick', [this.getValue(), this.selectedNode]);
    },

    // @private
    scrollToItem: function(item, animated) {
        var y = item.getY(),
            parentEl = item.parent(),
            parentY = parentEl.getY(),
            // padding = this.slotPadding,
            scrollView = this.getScrollable(),
            scroller = scrollView.getScroller(),
            difference;

        difference = y - parentY;
        if (animated) {
            scroller.scrollToAnimated(0, difference);
        } else {
            scroller.scrollTo(0, difference);
        }
    },

    // @private
    onScrollEnd: function(scroller, position) {
        var picker = this.picker,
            bar = picker.bar,
            barHeight = bar.getHeight(),
            offset = position.y,
            index = Math.round(offset / barHeight),
            viewItems = this.getViewItems(),
            item = viewItems[index];

        if (item) {
            this.selectedIndex = index;
            this.selectedNode = item;

            this.fireAction('slotpick', [this.getValue(), this.selectedNode]);
        }
    },

    /**
     * Returns the vlaue of this slot
     * @private
     */
    getValue: function() {
        var store = this.getStore(),
            record, value;

        if (!store) {
            return;
        }

        record = store.getAt(this.selectedIndex);

        value = record ? record.get(this.getValueField()) : null;
        this._value = value;

        return value;
    },

    /**
     * Sets the value of this slot
     * @private
     */
    setValue: function(value) {
        if (!value) {
            return;
        }

        if (!this.rendered) {
            //we don't want to call this until the slot has been rendered
            this._value = value;
            return;
        }

        var store = this.getStore(),
            viewItems = this.getViewItems(),
            valueField = this.getValueField(),
            index, item;

        index = store.find(valueField, value);
        if (index != -1) {
            item = Ext.get(viewItems[index]);

            this.selectedIndex = index;
            this.scrollToItem(item);

            this._value = value;
        }
    },

    /**
     * Sets the value of this slot
     * @private
     */
    setValueAnimated: function(value) {
        if (!value) {
            return;
        }

        if (!this.rendered) {
            //we don't want to call this until the slot has been rendered
            this._value = value;
            return;
        }

        var store = this.getStore(),
            viewItems = this.getViewItems(),
            valueField = this.getValueField(),
            index, item;

        index = store.find(valueField, value);
        if (index != -1) {
            item = Ext.get(viewItems[index]);

            this.selectedIndex = index;
            this.scrollToItem(item, true);

            this._value = value;
        }
    }
});
