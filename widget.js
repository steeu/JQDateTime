WAF.define('JQDateTime', ['waf-core/widget'], function(widget) {
	
	var _this;
	
	var format = {
		de: {dateTime: 'd.m.Y H:i', moment: 'DD.MM.YYYY HH:mm'},
		en: {dateTime: 'm-d-Y H:i', moment: 'MM-DD-YYYY HH:mm'},
		fr: {dateTime: 'd/m/Y H:i', moment: 'DD/MM/YYYY HH:mm'}
	};
	
    var JQDateTime = widget.create('JQDateTime', {
        init: function() {
 
         	var $node = $(this.node);
       	
        	_this = this;
        	
        	// add default text field class
        	_this.addClass('waf-textField');

			// create jquery date time object
        	$node.datetimepicker({
				format: format[_this.language()].dateTime,
				defaultTime: this.defaultTime(),
				step: this.step(),
				lang: this.language(),
				timepicker: this.timepicker(),
				onChangeDateTime:function(dp,$input) {
					var newTime = $input.val();
					// parse custom date
					_this.dateTime(moment(newTime, format[_this.language()].moment).toDate());
				}
			});
        },
		tagName: 'input',
    	dateTime: widget.property({
    		onChange: function() {
    			this.node.value = moment(this.dateTime()).format(format[_this.language()].moment);
            }
    	}),
    	defaultTime: widget.property({
    		type: 'string',
    		defaultValue: '09:00',
    	    bindable : false
    	}),
    	step: widget.property({
     		type: 'number',
    		defaultValue: '60',
    	    bindable : false	
    	}),
    	timepicker: widget.property({
    	    type : 'boolean',
    	    defaultValue: true,
    	    bindable : false
    	}),
    	language: widget.property({
    		type: 'enum',
    		values: {
    			de: 'Deutsch',
    			en: 'English',
    			fr: 'Francias'
    		},
    	    bindable : false
    	}),
    	getDate: function() {
    		return _this.dateTime();
    	},
    	setDate: function(value) {
    		this.node.value = moment(value).format(format[_this.language()].moment);
    	},
    	getValue: function() {
    		return this.node.value;
    	},
    	setValue: function(value) {
    		this.node.value = value;
    	}
    });

    return JQDateTime;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */