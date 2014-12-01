WAF.define('JQDateTime', ['waf-core/widget'], function(widget) {

	var format = {
		de: {dateTime: 'd.m.Y H:i', date: 'd.m.Y'},
		en: {dateTime: 'm-d-Y H:i', date: 'm-d-Y'},
		fr: {dateTime: 'd/m/Y H:i', date: 'd/m/Y'}
	};
	
    var JQDateTime = widget.create('JQDateTime', {
        init: function() {

        	var _this = this,
        	    $node = $(this.node);
        	
        	// get date format
        	if (_this.timepicker()) {
        	    _this.dateFormat = format[_this.language()].dateTime;
        	} else {
        	    _this.dateFormat = format[_this.language()].date;
        	}
        	// add default text field class
        	_this.node.classList.add('waf-textField');
        	_this.node.nextElementSibling.classList.add('waf-label-textField');

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
					_this.dateTime(_this.toDateTimeObj(newTime));
				}
			});
        },
		tagName: 'input',
    	dateTime: widget.property({
    		onChange: function() {
    		    var _this = this;
    		    
                // to formatted date 
    			_this.node.value = _this.toDateTimeStr(_this.dateTime());
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
    	    var _this = this;
    	    
    		return _this.dateTime();
    	},
    	setDate: function(value) {
    	    var _this = this;
    	    
    		_this.node.value = _this.toDateTimeStr(value);
    	},
    	getValue: function() {
    	    var _this = this;
    	    
    		return _this.node.value;
    	},
    	setValue: function(value) {
    	    var _this = this;
    	    
    		_this.node.value = value;
    	},
    	toDateTimeObj: function(value) {
     	    var _this = this,
     	        dateObj,
    	        matchArr;

    	    if (value) {
    	        // match date time string
    	        matchArr = value.match(/([0-9]{1,2})[\.\:\,\/\- ]+([0-9]{1,2})[\.\:\,\/\- ]+([0-9]{1,4})[\.\:\,\/\- ]*([0-9]{1,2})?[\.\:\,\/\- ]*([0-9]{1,2})?/);
    	        // extract values
                if (Object.prototype.toString.call(matchArr) === '[object Array]') {
        	        if (_this.language() !== 'en') {
                        dateObj = new Date(matchArr[3], (matchArr[2] - 1), matchArr[1], matchArr[4] || 0, matchArr[5] || 0, 0, 0);
                    } else {
                        dateObj = new Date(matchArr[3], (matchArr[1] - 1), matchArr[2], matchArr[4] || 0, matchArr[5] || 0, 0, 0);
                    }

                    return dateObj;
                }
    	    }   	
    	},
    	toDateTimeStr: function(value) {
    	    var _this = this,
    	        dateStr = '',
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
    	}
    });

    return JQDateTime;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */