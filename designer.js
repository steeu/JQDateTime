(function(JQDateTime) {

    /* Default width and height of your widget */
    JQDateTime.setWidth('300');
    JQDateTime.setHeight('30');

    /* Customize existing properties */
    
    JQDateTime.customizeProperty('dateTime', {
        title: 'Date',
        description: '',
        display: false,
        sourceTitle: 'Date Source',
		sourceDisplay: true
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
    
    JQDateTime.addLabel({
        'defaultValue': 'Date',
        'position': 'left'
    });
});

// For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3870.html