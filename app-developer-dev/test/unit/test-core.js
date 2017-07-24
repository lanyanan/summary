
describe('core - Base.class单元测试', function(){
    var m = require('../../src/core/Base.class.js').BaseClass;
    var o = new m;

    it('getClassName()', function(){
        expect(o.getClassName()).toEqual('BaseClass');
    });

    it('toString()', function(){
        expect(o.toString()).toEqual('[Class BaseClass]');
    });

    it('toValue()', function(){
        expect(o.toValue()).toBeUndefined();
    });
});

describe('core - db.class单元测试', function(){
    var m = require('../../src/core/db.class.js').DBClass;
    var o = {};

    beforeAll(function(done){
        var data = {a:1, b:2, c:3};
        o = new m(['tb1', 'tb2']);
        o.open();
        o.set('tb1', 'key1', data).then(function(d){
            done();
        });
        o.set('tb2', 'key2', data).then(function(d){
            done();
        });
    });

    afterAll(function(){
        o.close();
    });

    it('constructor()', function(){
        var fun = function(){
            return new m();
        };
        expect(fun).toThrow();
    });

    it('open()', function(){
        spyOn(o, 'open');
        o.open('testStore');
        expect(o.open).toHaveBeenCalled();
        expect(o.open).toHaveBeenCalledWith('testStore');
    });

    it('set()', function(done){
        o.set('tb1', 'key1', {a:1,b:2}).then(function(data){
            expect(data).toBe(1);
            done();
        });
    });

    it('get()', function(done){
        o.get('tb2', 'key2').then(function(data){
            expect(data).toEqual({a:1,b:2, c:3});
            done();
        });
    });

    it('del()', function(done){
        o.del('tb2', 'key2').then(function(data){
            expect(data).toEqual(1);
        });
        o.get('tb2', 'key2').then(function(data){
            expect(data).toBeUndefined();
            done();
        });
    });

});

describe('core - PanelBase.class单元测试', function(){
    var m = require('../../src/core/PanelBase.class.js').PanelBase;
    var o = new m;

    it('loadCssFile()',function(){
        o.loadCssFile('me.css');
        expect(!document.querySelector('[href="../static/css/me.css"]')).toBe(false);
        o.loadCssFile('me.css', 'testPath/');
        expect(!document.querySelector('[href="testPath/me.css"]')).toBe(false);
    });
});