(function(JQDateTime) {

    /* Default width and height of your widget */
    JQDateTime.setWidth('200');
    JQDateTime.setHeight('20');

//    /* Define custom event for your widget */
//    JQDateTime.addEvent('myEvent');

    /* Customize existing properties */
    
    JQDateTime.customizeProperty('dateTime', {
        title: 'Date',
        description: '',
        display: false,
        sourceTitle: 'Date Source',
		sourceDisplay: true
    });
    
    JQDateTime.customizeProperty('format', {
        title: 'Date Format',
        description: '',
        display: true,
        sourceTitle: '',
		sourceDisplay: false
    });
    
    JQDateTime.customizeProperty('defaultTime', {
        title: 'Default Time',
        description: '',
        display: true,
        sourceTitle: '',
		sourceDisplay: false
    });

    JQDateTime.customizeProperty('language', {
        title: 'Language',
        description: '',
        display: true,
        sourceTitle: '',
		sourceDisplay: false
    });
    
    JQDateTime.customizeProperty('step', {
        title: 'Time Step (min)',
        description: '',
        display: true,
        sourceTitle: '',
		sourceDisplay: false
    });
    
    /* Add a Label property */
    JQDateTime.addLabel({
        'defaultValue': 'Date',
        'position': 'top'
    });

//    /* Set the Design and Styles panels */
//    JQDateTime.setPanelStyle({
//        'fClass': true,
//        'text': true,
//        'background': true,
//        'border': true,
//        'sizePosition': true,
//        'label': true,
//        'disabled': ['border-radius']
//    });

//    /* Override widget's initialization */
//    JQDateTime.prototype.init = function() {
//        this.node.innerHTML = "Widget Text"; /* Include text inside the widget */
//    }

});

// For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3870.html