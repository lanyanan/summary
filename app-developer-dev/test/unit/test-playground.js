describe('playground - WidgetsPanel模块单元测试', function() {
    var React = require('react');
    var m = require('../../src/modules/WidgetsPanel/WidgetsPanel.js').default;
    var o = new m;

    it('super:getClassName()', function(){
        expect(o.getClassName()).toEqual('WidgetsPanel');
    });

    it('super:loadCssFile()',function(){
        o.loadCssFile('test.css', 'testPath/');
        expect(!document.querySelector('[href="testPath/test.css"]')).toBe(false);
    });
    
    it('getComponent()',function(){
        var App = o.getComponent();
        React.render(<App/> , document.body);
        expect(document.body.children.length).toBeGreaterThan(0);
    });
});

describe('playground - AssetsPanel模块单元测试', function() {
    var React = require('react');
    var m = require('../../src/modules/AssetsPanel/AssetsPanel.js').default;
    var o = new m;

    it('super:getClassName()', function(){
        expect(o.getClassName()).toEqual('AssetsPanel');
    });

    it('super:loadCssFile()',function(){
        o.loadCssFile('test.css', 'testPath/');
        expect(!document.querySelector('[href="testPath/test.css"]')).toBe(false);
    });
    
    it('getComponent()',function(){
        var App = o.getComponent();
        React.render(<App/> , document.body);
        expect(document.body.children.length).toBeGreaterThan(0);
    });
});