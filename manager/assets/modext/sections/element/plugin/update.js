/**
 * Loads the update plugin page
 *
 * @class MODx.page.UpdatePlugin
 * @extends MODx.Component
 * @param {Object} config An object of config properties
 * @xtype modx-page-plugin-update
 */
MODx.page.UpdatePlugin = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        formpanel: 'modx-panel-plugin'
        ,buttons: [{
            process: 'element/plugin/update'
            ,text: _('save')
            ,id: 'modx-abtn-save'
            ,cls: 'primary-button'
            ,method: 'remote'
            // ,checkDirty: true
            ,keys: [{
                key: MODx.config.keymap_save || 's'
                ,ctrl: true
            }]
        },{
            text: _('duplicate')
            ,id: 'modx-abtn-duplicate'
            ,handler: this.duplicate
            ,scope: this
        },{
            text: _('cancel')
            ,id: 'modx-abtn-cancel'
        },{
            text: _('help_ex')
            ,id: 'modx-abtn-help'
            ,handler: MODx.loadHelpPane
        }]
        ,components: [{
            xtype: 'modx-panel-plugin'
            ,renderTo: 'modx-panel-plugin-div'
            ,plugin: config.record.id || MODx.request.id
            ,record: config.record || {}
        }]
    });
    MODx.page.UpdatePlugin.superclass.constructor.call(this,config);
};
Ext.extend(MODx.page.UpdatePlugin,MODx.Component, {
    duplicate: function(btn, e) {
        var rec = {
            id: this.record.id
            ,type: 'plugin'
            ,name: _('duplicate_of',{name: this.record.name})
        };
        var w = MODx.load({
            xtype: 'modx-window-element-duplicate'
            ,record: rec
            ,listeners: {
                success: {
                    fn: function(r) {
                        var response = Ext.decode(r.a.response.responseText);
                        MODx.loadPage('element/'+ rec.type +'/update', 'id='+ response.object.id);
                    },scope:this}
                ,hide:{fn:function() {this.destroy();}}
            }
        });
        w.show(e.target);
    }
});
Ext.reg('modx-page-plugin-update',MODx.page.UpdatePlugin);
