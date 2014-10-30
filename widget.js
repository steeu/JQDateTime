WAF.define('JQDateTime', ['waf-core/widget'], function(widget) {
	
    var JQDateTime = widget.create('JQDateTime', {
        init: function() {
        	
        	var _this = this;
        	var $node = $(this.node);
        	
        	$node.datetimepicker({
				format: this.format(),
				defaultTime: this.defaultTime(),
				step: this.step(),
				lang: this.language(),
				onChangeDateTime:function(dp,$input) {
					var newTime = $input.val();
					// parse custom date
					_this.dateTime(moment(newTime, 'DD.MM.YYYY HH:mm').toDate());
				}
			});
//            /* Define a custom event */
//            this.fire('myEvent', {
//                message: 'Hello'
//            });
        },
		tagName: 'input',
    	dateTime: widget.property({
    		onChange: function(newValue) {
    			this.node.value = moment(this.dateTime()).format('DD.MM.YYYY HH:mm');
            }
    	}),
    	format: widget.property({
    		type: 'string',
    		defaultValue: 'd.m.Y H:i'
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
    	})
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