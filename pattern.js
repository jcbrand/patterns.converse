define([
    "jquery",
    "pat-registry",
    'logging',
    "pat-parser",
    "converse"
], function($, patterns, logger, Parser, converse) {
    var log = logger.getLogger('pat.converse'),
        parser = new Parser("converse", { inherit: false });

    patterns.register({
        name: "converse",
        trigger: '.pat-converse',

        init: function($el, opts) {
            var data = {};
            // TODO: reuse same resource... (store in sessionStorage)
            /* var resource = SessionStorage.get('xmppresource');
             * if (resource) { 
             *     data.resource = resource;
             * }
             */
            $.ajax({
                'url': '/stardesk/@@xmpp-loader',  // FIXME
                'dataType': 'json',
                'data': data, 
                'success': function (data) {
                    converse.initialize({
                        prebind: true,
                        rid: data.rid,
                        sid: data.sid,
                        jid: data.jid,
                        bosh_service_url: data.BOSH_SERVICE,
                        xhr_user_search: true,
                        auto_subscribe: true,
                        auto_list_rooms: true,
                        hide_muc_server: true,
                        show_controlbox_by_default: false,
                        debug: true
                    });
                },
                'error': function () {
                    console.log('error while trying to call /@@xmpp-loader');
                }
            });
        }
    });
});
