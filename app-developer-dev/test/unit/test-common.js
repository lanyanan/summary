describe('common 模块单元测试', function() {
    var m = require('../../src/modules/common.js');
    
    it('domReady()',function(done){
        var foo = false;
        m.domReady(function(){
            foo = true;
            expect(foo).toBe(true);
            done();
        });
    });
});