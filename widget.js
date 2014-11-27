WAF.define('JQDateTime', ['waf-core/widget'], function(widget) {
	
	var _this;
	
	var format = {
		de: {dateTime: 'd.m.Y H:i'},
		en: {dateTime: 'm-d-Y H:i'},
		fr: {dateTime: 'd/m/Y H:i'}
	};
	
	function fromFormatToDate(value, language) {
	    var date = new Date(),
	        matchArr;

	    if (value) {
	        matchArr = value.match(/([0-9]{1,2})[\.\:\,\/\- ]+([0-9]{1,2})[\.\:\,\/\- ]+([0-9]{1,4})[\.\:\,\/\- ]+([0-9]{1,2})[\.\:\,\/\- ]+([0-9]{1,2})/);
            if (Object.prototype.toString.call( matchArr ) === '[object Array]') {
    	        if (language !== 'en') {
        	        date.setDate(matchArr[1]);
                    date.setMonth(matchArr[2] - 1);
                } else {
                    date.setDate(matchArr[2]);
                    date.setMonth(matchArr[1] - 1);
                }
                date.setFullYear(matchArr[3]);
                date.setHours(matchArr[4]);
                date.setMinutes(matchArr[5]);
                date.setSeconds(0);
                date.setMilliseconds(0);
                
                return date;
            }
	    }
	};
	
	function fromDateToFormat(value, language) {	    
	    var days = ('0' + value.getDate()).slice(-2),
	        months = ('0' + (value.getMonth() + 1)).slice(-2),
	        years = value.getFullYear(),
	        hours = ('0' + value.getHours()).slice(-2),
	        minutes = ('0' + value.getMinutes()).slice(-2);
	    
	    switch(language) {
    		case 'de':
    		    return days + '.' + months + '.' + years + ' ' + hours + ':' + minutes;
    			break;
    		case 'en':
    		    return months + '-' + days + '-' + years + ' ' + hours + ':' + minutes;
    			break;
    		case 'fr':
    		    return days + '/' + months + '/' + years + ' ' + hours + ':' + minutes;
    			break;
    	}
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
					_this.dateTime(fromFormatToDate(newTime, _this.language()));
				}
			});
        },
		tagName: 'input',
    	dateTime: widget.property({
    		onChange: function() {
                // to formatted date 
    			this.node.value = fromDateToFormat(this.dateTime(), _this.language());
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
    		this.node.value = fromDateToFormat(value, _this.language());
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