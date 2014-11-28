WAF.define('JQDateTime', ['waf-core/widget'], function(widget) {
	
	var _this;
	
	var format = {
		de: {dateTime: 'd.m.Y H:i', date: 'd.m.Y'},
		en: {dateTime: 'm-d-Y H:i', date: 'm-d-Y'},
		fr: {dateTime: 'd/m/Y H:i', date: 'd/m/Y'}
	};
	
	function fromFormatToDate(value) {
	    var date = new Date(),
	        matchArr;

	    if (value) {
	        // match date time string
	        matchArr = value.match(/([0-9]{1,2})[\.\:\,\/\- ]+([0-9]{1,2})[\.\:\,\/\- ]+([0-9]{1,4})[\.\:\,\/\- ]*([0-9]{1,2})?[\.\:\,\/\- ]*([0-9]{1,2})?/);
	        // extract values
            if (Object.prototype.toString.call(matchArr) === '[object Array]') {
    	        if (_this.language() !== 'en') {
        	        date.setDate(matchArr[1]);
                    date.setMonth(matchArr[2] - 1);
                } else {
                    date.setDate(matchArr[2]);
                    date.setMonth(matchArr[1] - 1);
                }
                date.setFullYear(matchArr[3]);
                date.setHours(matchArr[4] || 0);
                date.setMinutes(matchArr[5] || 0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                
                return date;
            }
	    }
	};
	
	function fromDateToFormat(value) {
	    var dateStr = '',
	        days,
	        months,
	        years,
	        hours,
	        minutes;

        // check if value is date
        if (Object.prototype.toString.call(value) === '[object Date]') {
            // get date values
	        days = ('0' + value.getDate()).slice(-2),
	        months = ('0' + (value.getMonth() + 1)).slice(-2),
	        years = value.getFullYear(),
	        hours = ('0' + value.getHours()).slice(-2),
	        minutes = ('0' + value.getMinutes()).slice(-2);
            // format date
    	    switch(_this.language()) {
        		case 'de':
        		    dateStr = days + '.' + months + '.' + years;
        			break;
        		case 'en':
        		    dateStr = months + '-' + days + '-' + years;
        			break;
        		case 'fr':
        		    dateStr = days + '/' + months + '/' + years;
        			break;
        	}
        	// result depending on timepicker
        	if (_this.timepicker()) {
        	    
        	    return dateStr + ' ' + hours + ':' + minutes;
        	} else {
        	    
        	    return dateStr;
        	}
    	}
	};
	
    var JQDateTime = widget.create('JQDateTime', {
        init: function() {
 
         	var $node = $(this.node);
       	
        	_this = this;
        	
        	// get date format
        	if (_this.timepicker()) {
        	    _this.dateFormat = format[_this.language()].dateTime;
        	} else {
        	    _this.dateFormat = format[_this.language()].date;
        	}
        	// add default text field class
        	_this.node.classList.add('waf-textField');
        	// add default label text field class
        	_this.node.labels[0].classList.add('waf-label-textField');

			// create jquery date time object
        	$node.datetimepicker({
				format: _this.dateFormat,
				defaultTime: this.defaultTime(),
				step: this.step(),
				lang: this.language(),
				timepicker: this.timepicker(),
				onChangeDateTime:function(dp,$input) {
					var newTime = $input.val();					
					// parse custom date
					_this.dateTime(fromFormatToDate(newTime));
				}
			});
        },
		tagName: 'input',
    	dateTime: widget.property({
    		onChange: function() {
                // to formatted date 
    			this.node.value = fromDateToFormat(this.dateTime());
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
    	    bindable : false,
    	    defaultValue: 'en'
    	}),
    	getDate: function() {
    		return _this.dateTime();
    	},
    	setDate: function(value) {
    		this.node.value = fromDateToFormat(value);
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