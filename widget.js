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

			// create jquery date time object
        	$node.datetimepicker({
				format: format[_this.language()].dateTime,
				defaultTime: this.defaultTime(),
				step: this.step(),
				lang: this.language(),
				onChangeDateTime:function(dp,$input) {
					var newTime = $input.val();
					// parse custom date
					_this.dateTime(moment(newTime, format[_this.language()].moment).toDate());
				}
			});
//            /* Define a custom event */
//            this.fire('myEvent', {
//                message: 'Hello'
//            });
        },
		tagName: 'input',
    	dateTime: widget.property({
    		onChange: function() {
    			this.node.value = moment(this.dateTime()).format(format[_this.language()].moment);
            }
    	}),
    	defaultTime: widget.property({
    		type: 'string',
    		defaultValue: '09:00'
    	}),
    	step: widget.property({
     		type: 'number',
    		defaultValue: '60'   		
    	}),
    	language: widget.property({
    		type: 'enum',
    		values: {
    			de: 'Deutsch',
    			en: 'English',
    			fr: 'Francias'
    		}
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
//    	,
//    	returnDate : function(){
//    		return $(this.node).val();
//    	}
//        ,
        
//        /* Create a property */
//        test: widget.property({
//            onChange: function(newValue) {
//                this.node.innerHTML = this.test(); /* this contains the widget and newValue contains its current value */
//            }
//        })
    });

//    /* Map the custom event above to the DOM click event */
//    JQDateTime.mapDomEvents({
//        'click': 'action'
//    });

    return JQDateTime;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */